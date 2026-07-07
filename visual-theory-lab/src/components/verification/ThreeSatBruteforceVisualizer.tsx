import { useState } from 'react';
import { CodeTracePanel } from '../code/CodeTracePanel';
import {
  assignmentComparisons,
  threeSatBruteforceMeta,
  threeSatClauses,
  threeSatVariables,
} from '../../modules/code-verification/threeSatBruteforceData';
import type { Clause, Literal } from '../../modules/code-verification/verificationTypes';

type ThreeSatBruteforceVisualizerProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

type Assignment = Record<string, boolean>;

function assignmentFromIndex(index: number): Assignment {
  return Object.fromEntries(threeSatVariables.map((variable, bit) => [variable.id, Boolean(index & (1 << bit))]));
}

function literalSatisfied(literal: Literal, assignment: Assignment) {
  const value = assignment[literal.variableId];
  return literal.negated ? !value : value;
}

function clauseSatisfied(clause: Clause, assignment: Assignment) {
  return clause.literals.some((literal) => literalSatisfied(literal, assignment));
}

function formatLiteral(literal: Literal) {
  return `${literal.negated ? '¬' : ''}${literal.variableId}`;
}

export function ThreeSatBruteforceVisualizer({ onEvent }: ThreeSatBruteforceVisualizerProps) {
  const [assignmentIndex, setAssignmentIndex] = useState(0);
  const [assignment, setAssignment] = useState<Assignment>(() => assignmentFromIndex(0));
  const [activeLine, setActiveLine] = useState(0);
  const totalAssignments = 2 ** threeSatVariables.length;
  const formulaSatisfied = threeSatClauses.every((clause) => clauseSatisfied(clause, assignment));

  function generateNextAssignment() {
    const nextAssignment = assignmentFromIndex(assignmentIndex);
    const satisfied = threeSatClauses.every((clause) => clauseSatisfied(clause, nextAssignment));

    setAssignment(nextAssignment);
    setActiveLine(satisfied ? 2 : 1);
    setAssignmentIndex((current) => (current + 1) % totalAssignments);
    onEvent('3-SAT assignment generado', 'info');

    if (assignmentIndex === 0) {
      onEvent('Advertencia conceptual mostrada', 'warn');
    }
  }

  function updateManualAssignment(variableId: string) {
    setAssignment((current) => ({ ...current, [variableId]: !current[variableId] }));
    setActiveLine(1);
  }

  return (
    <div className="verification-grid two-columns">
      <section className="verification-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Boolean switches</p>
            <h2>Current assignment</h2>
          </div>
          <span className="complexity-chip danger">{threeSatBruteforceMeta.complexity}</span>
        </div>

        <div className="boolean-switch-grid">
          {threeSatVariables.map((variable) => (
            <button
              className={assignment[variable.id] ? 'boolean-switch active' : 'boolean-switch'}
              key={variable.id}
              type="button"
              onClick={() => updateManualAssignment(variable.id)}
            >
              <span>{variable.label}</span>
              <strong>{assignment[variable.id] ? 'TRUE' : 'FALSE'}</strong>
            </button>
          ))}
        </div>

        <div className="assignment-readout">
          <span>Asignaciones generadas</span>
          <strong>{assignmentIndex} / {totalAssignments}</strong>
        </div>

        <div className="verification-actions">
          <button type="button" onClick={generateNextAssignment}>Generate assignment</button>
          <span>{formulaSatisfied ? 'formula satisfied' : 'searching'}</span>
        </div>
      </section>

      <section className="verification-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">3-CNF formula</p>
            <h2>Clauses</h2>
          </div>
        </div>

        <div className="clause-grid">
          {threeSatClauses.map((clause) => (
            <div className={clauseSatisfied(clause, assignment) ? 'clause-block satisfied' : 'clause-block'} key={clause.id}>
              <span>{clause.id}</span>
              <strong>({clause.literals.map(formatLiteral).join(' ∨ ')})</strong>
            </div>
          ))}
        </div>

        <div className="concept-message warning">
          {threeSatBruteforceMeta.conceptualMessage}
        </div>
      </section>

      <section className="verification-card growth-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Growth reference</p>
            <h2>2^n assignments</h2>
          </div>
        </div>
        <div className="assignment-comparison-list">
          {assignmentComparisons.map((item) => (
            <div key={item.variables}>
              <span>{item.variables} variables</span>
              <strong>{item.assignments}</strong>
            </div>
          ))}
        </div>
        <svg className="sat-growth-chart" viewBox="0 0 260 135" role="img" aria-label="Grafica conceptual de crecimiento exponencial">
          <line x1="20" y1="116" x2="238" y2="116" />
          <line x1="20" y1="116" x2="20" y2="12" />
          <path d="M 24 112 C 115 112, 178 86, 234 16" />
          <text x="160" y="36">O(2^n)</text>
        </svg>
      </section>

      <CodeTracePanel activeLine={activeLine} lines={threeSatBruteforceMeta.codeLines} />
    </div>
  );
}
