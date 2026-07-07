import { useState } from 'react';
import { CodeTracePanel } from '../code/CodeTracePanel';
import { twoSatProofMeta, twoSatSamples } from '../../modules/proof/twoSatProofData';
import { ProofStepPanel } from './ProofStepPanel';

type TwoSatProofVisualizerProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

type ImplicationEdge = {
  source: string;
  target: string;
};

type ParsedFormula = {
  variables: string[];
  clauses: [string, string][];
};

function normalizeLiteral(literal: string) {
  return literal.trim().replace(/^~/, '!').replace(/^not\s+/i, '!');
}

function neg(literal: string) {
  return literal.startsWith('!') ? literal.slice(1) : `!${literal}`;
}

function variableOf(literal: string) {
  return literal.replace(/^!/, '');
}

function parseFormula(input: string): ParsedFormula {
  const clauses = Array.from(input.matchAll(/\(([^()]+)\)/g)).map((match) => {
    const literals = match[1].split(/\s+or\s+|\s*∨\s*|\s*,\s*/i).map(normalizeLiteral).filter(Boolean);
    const first = literals[0] ?? 'x1';
    const second = literals[1] ?? first;
    return [first, second] as [string, string];
  });
  const variables = Array.from(new Set(clauses.flat().map(variableOf))).sort();

  return { variables, clauses };
}

function buildImplications(clauses: [string, string][]) {
  return clauses.flatMap(([a, b]) => [
    { source: neg(a), target: b },
    { source: neg(b), target: a },
  ]);
}

function stronglyConnectedComponents(nodes: string[], edges: ImplicationEdge[]) {
  const adjacency = Object.fromEntries(nodes.map((node) => [node, [] as string[]]));
  const reverse = Object.fromEntries(nodes.map((node) => [node, [] as string[]]));
  edges.forEach((edge) => {
    adjacency[edge.source]?.push(edge.target);
    reverse[edge.target]?.push(edge.source);
  });

  const visited = new Set<string>();
  const order: string[] = [];

  function dfs(node: string) {
    visited.add(node);
    adjacency[node].forEach((next) => {
      if (!visited.has(next)) dfs(next);
    });
    order.push(node);
  }

  nodes.forEach((node) => {
    if (!visited.has(node)) dfs(node);
  });

  const components: Record<string, number> = {};
  let componentId = 0;

  function reverseDfs(node: string) {
    components[node] = componentId;
    reverse[node].forEach((next) => {
      if (components[next] === undefined) reverseDfs(next);
    });
  }

  order.reverse().forEach((node) => {
    if (components[node] === undefined) {
      reverseDfs(node);
      componentId += 1;
    }
  });

  return components;
}

export function TwoSatProofVisualizer({ onEvent }: TwoSatProofVisualizerProps) {
  const [formula, setFormula] = useState(twoSatSamples.sat);
  const [parsed, setParsed] = useState<ParsedFormula>(() => parseFormula(twoSatSamples.sat));
  const [edges, setEdges] = useState<ImplicationEdge[]>(() => buildImplications(parseFormula(twoSatSamples.sat).clauses));
  const [scc, setScc] = useState<Record<string, number>>({});
  const [activeStep, setActiveStep] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [highlightVariable, setHighlightVariable] = useState('x1');
  const allLiterals = parsed.variables.flatMap((variable) => [variable, `!${variable}`]);
  const result = parsed.variables.some((variable) => scc[variable] !== undefined && scc[variable] === scc[`!${variable}`]) ? 'UNSAT' : 'SAT';

  function loadSample(kind: 'sat' | 'unsat') {
    const nextFormula = twoSatSamples[kind];
    setFormula(nextFormula);
    const nextParsed = parseFormula(nextFormula);
    setParsed(nextParsed);
    setEdges(buildImplications(nextParsed.clauses));
    setScc({});
    setHighlightVariable(nextParsed.variables[0] ?? 'x1');
    setActiveStep(0);
    setActiveLine(0);
    onEvent('Formula 2-SAT cargada', 'system');
  }

  function buildGraph() {
    const nextParsed = parseFormula(formula);
    setParsed(nextParsed);
    setEdges(buildImplications(nextParsed.clauses));
    setScc({});
    setHighlightVariable(nextParsed.variables[0] ?? 'x1');
    setActiveStep(1);
    setActiveLine(1);
    onEvent('Grafo de implicaciones generado', 'info');
  }

  function detectScc() {
    const nodes = parsed.variables.flatMap((variable) => [variable, `!${variable}`]);
    const components = stronglyConnectedComponents(nodes, edges);
    setScc(components);
    setActiveStep(4);
    setActiveLine(4);
    onEvent('SCC detectadas', 'info');
    onEvent(`Resultado 2-SAT: ${parsed.variables.some((variable) => components[variable] === components[`!${variable}`]) ? 'UNSAT' : 'SAT'}`, 'system');
  }

  return (
    <div className="proof-grid">
      <ProofStepPanel activeStepIndex={activeStep} steps={twoSatProofMeta.steps} />

      <section className="verification-card proof-input-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Formula 2-CNF</p>
            <h2>Entrada editable</h2>
          </div>
          <span className="status-badge green">{twoSatProofMeta.theoremStatus}</span>
        </div>
        <textarea value={formula} onChange={(event) => setFormula(event.target.value)} />
        <div className="verification-actions">
          <button type="button" onClick={() => loadSample('sat')}>Cargar SAT</button>
          <button type="button" onClick={() => loadSample('unsat')}>Cargar UNSAT</button>
          <button type="button" onClick={buildGraph}>Construir grafo</button>
          <button type="button" onClick={detectScc}>Detectar SCC</button>
        </div>
      </section>

      <section className="verification-card implication-graph-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Implication graph</p>
            <h2>Literales y aristas</h2>
          </div>
          <select value={highlightVariable} onChange={(event) => setHighlightVariable(event.target.value)}>
            {parsed.variables.map((variable) => <option key={variable}>{variable}</option>)}
          </select>
        </div>
        <div className="literal-node-grid">
          {allLiterals.map((literal) => (
            <div
              className={literal === highlightVariable || literal === `!${highlightVariable}` ? 'literal-node highlighted' : 'literal-node'}
              key={literal}
            >
              <strong>{literal}</strong>
              <span>SCC {scc[literal] ?? '-'}</span>
            </div>
          ))}
        </div>
        <div className="implication-edge-list">
          {edges.map((edge, index) => (
            <code key={`${edge.source}-${edge.target}-${index}`}>{edge.source} {'->'} {edge.target}</code>
          ))}
        </div>
      </section>

      <section className="verification-card proof-result-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Criterio</p>
            <h2>{result}</h2>
          </div>
          <span className={result === 'SAT' ? 'complexity-chip' : 'complexity-chip danger'}>{result}</span>
        </div>
        <p>{twoSatProofMeta.formalIdea}</p>
        <div className="concept-message polynomial">Estado: {twoSatProofMeta.theoremStatus}</div>
      </section>

      <CodeTracePanel activeLine={activeLine} lines={twoSatProofMeta.codeLines} title="Codigo de criterio SCC" />
    </div>
  );
}
