import { useState } from 'react';
import { initialSatClauses, initialSatVariables, formulaToText, satLabMeta } from '../../modules/sat/satData';
import type { DpllStep, SatAssignment, SatClause, Z3SolveResponse } from '../../modules/sat/satTypes';
import { bruteForceCount, buildDpllTrace, parseCnfText, variablesFromClauses } from '../../modules/sat/satUtils';
import { CnfBuilder } from './CnfBuilder';
import { DpllTracePanel } from './DpllTracePanel';
import { SolverComparison } from './SolverComparison';

type SatWorkbenchProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function SatWorkbench({ onEvent }: SatWorkbenchProps) {
  const [variables, setVariables] = useState(initialSatVariables);
  const [clauses, setClauses] = useState<SatClause[]>(initialSatClauses);
  const [text, setText] = useState(formulaToText(initialSatClauses));
  const [assignment, setAssignment] = useState<SatAssignment>({});
  const [trace, setTrace] = useState<DpllStep[]>(() => buildDpllTrace(initialSatClauses, initialSatVariables));
  const [traceIndex, setTraceIndex] = useState(0);
  const [z3Result, setZ3Result] = useState<Z3SolveResponse | undefined>();
  const dpllStatus = trace[traceIndex]?.action === 'sat' ? 'SAT' : trace[traceIndex]?.action === 'unsat' ? 'UNSAT' : trace.length ? 'running' : 'idle';

  function syncFromText() {
    const nextClauses = parseCnfText(text);
    const nextVariables = variablesFromClauses(nextClauses);
    setClauses(nextClauses);
    setVariables(nextVariables);
    setTrace(buildDpllTrace(nextClauses, nextVariables));
    setTraceIndex(0);
    setZ3Result(undefined);
    onEvent('Formula CNF textual cargada', 'system');
  }

  function addClause() {
    const nextClause = { id: `c${clauses.length + 1}`, literals: [{ variable: variables[0] ?? 'x1', negated: false }] };
    const nextClauses = [...clauses, nextClause];
    setClauses(nextClauses);
    setText(formulaToText(nextClauses));
  }

  function toggleLiteral(clauseId: string, variable: string) {
    const nextClauses = clauses.map((clause) => {
      if (clause.id !== clauseId) return clause;
      const existing = clause.literals.find((literal) => literal.variable === variable);
      if (!existing) return { ...clause, literals: [...clause.literals, { variable, negated: false }] };
      if (!existing.negated) return { ...clause, literals: clause.literals.map((literal) => literal.variable === variable ? { ...literal, negated: true } : literal) };
      return { ...clause, literals: clause.literals.filter((literal) => literal.variable !== variable) };
    });
    setClauses(nextClauses);
    setText(formulaToText(nextClauses));
  }

  function stepDpll() {
    setTraceIndex((current) => Math.min(current + 1, trace.length - 1));
    onEvent('DPLL step ejecutado', 'info');
    const next = trace[Math.min(traceIndex + 1, trace.length - 1)];
    if (next?.action === 'unit') onEvent('Propagacion unitaria aplicada', 'info');
    if (next?.action === 'backtrack') onEvent('Backtracking ejecutado', 'warn');
  }

  async function solveZ3() {
    const api = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
    try {
      const response = await fetch(`${api}/api/sat/solve-z3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variables, clauses }),
      });
      const result = await response.json() as Z3SolveResponse;
      setZ3Result(result);
      onEvent(`Z3 resultado: ${result.status}`, result.status === 'SAT' ? 'system' : 'warn');
      onEvent('Advertencia conceptual mostrada', 'warn');
    } catch {
      onEvent('Backend Z3 no disponible', 'warn');
    }
  }

  return (
    <div className="sat-workbench-grid">
      <section className="verification-card sat-editor-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Text CNF editor</p>
            <h2>Formula</h2>
          </div>
          <button className="lab-tab active" type="button" onClick={syncFromText}>Parse CNF</button>
        </div>
        <textarea value={text} onChange={(event) => setText(event.target.value)} />
        <div className="concept-message warning">{satLabMeta.conceptualMessage}</div>
      </section>

      <CnfBuilder
        variables={variables}
        clauses={clauses}
        assignment={assignment}
        onAssignmentChange={(variable, value) => setAssignment((current) => ({ ...current, [variable]: value }))}
        onAddClause={addClause}
        onToggleLiteral={toggleLiteral}
      />

      <DpllTracePanel trace={trace} activeStepIndex={traceIndex} onStep={stepDpll} onReset={() => setTraceIndex(0)} />

      <section className="verification-card z3-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Z3 backend</p>
            <h2>FastAPI solver</h2>
          </div>
          <button className="lab-tab active" type="button" onClick={solveZ3}>Solve with Z3</button>
        </div>
        <p>Endpoint: <code>POST /api/sat/solve-z3</code></p>
      </section>

      <SolverComparison bruteForceAssignments={bruteForceCount(variables.length)} dpllStatus={dpllStatus} z3Result={z3Result} />
    </div>
  );
}
