import { useState } from 'react';
import { CodeTracePanel } from '../code/CodeTracePanel';
import { satFormulaClauses, satInNpProofMeta } from '../../modules/proof/satInNpProofData';
import type { SatAssignment } from '../../modules/proof/proofTypes';
import { ProofStepPanel } from './ProofStepPanel';

type SatInNpVisualizerProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const variables = ['x1', 'x2', 'x3'];

function literalValue(literal: string, assignment: SatAssignment) {
  const negated = literal.startsWith('!');
  const variable = negated ? literal.slice(1) : literal;
  const value = assignment[variable];
  return negated ? !value : value;
}

function literalLabel(literal: string) {
  return literal.startsWith('!') ? `not ${literal.slice(1)}` : literal;
}

export function SatInNpVisualizer({ onEvent }: SatInNpVisualizerProps) {
  const [assignment, setAssignment] = useState<SatAssignment>({ x1: true, x2: true, x3: false });
  const [activeStep, setActiveStep] = useState(1);
  const [activeLine, setActiveLine] = useState(0);
  const clauseResults = satFormulaClauses.map((clause) => clause.some((literal) => literalValue(literal, assignment)));
  const accepted = clauseResults.every(Boolean);

  function loadFormula() {
    setActiveStep(0);
    setActiveLine(0);
    onEvent('Formula SAT cargada', 'system');
  }

  function verifyCertificate() {
    setActiveStep(3);
    setActiveLine(accepted ? 5 : 3);
    onEvent('Certificado SAT verificado', accepted ? 'info' : 'warn');
    onEvent('Conclusion SAT pertenece a NP mostrada', 'system');
  }

  function toggleVariable(variable: string) {
    setAssignment((current) => ({ ...current, [variable]: !current[variable] }));
    setActiveStep(1);
    setActiveLine(2);
  }

  return (
    <div className="proof-grid sat-proof-grid">
      <ProofStepPanel activeStepIndex={activeStep} steps={satInNpProofMeta.steps} />

      <section className="verification-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Formula SAT</p>
            <h2>Instancia</h2>
          </div>
          <span className="status-badge green">{satInNpProofMeta.theoremStatus}</span>
        </div>
        <div className="clause-grid">
          {satFormulaClauses.map((clause, index) => (
            <div className={clauseResults[index] ? 'clause-block satisfied' : 'clause-block'} key={clause.join('-')}>
              <span>clause {index + 1}</span>
              <strong>({clause.map(literalLabel).join(' or ')})</strong>
            </div>
          ))}
        </div>
        <div className="verification-actions">
          <button type="button" onClick={loadFormula}>Cargar formula</button>
          <button type="button" onClick={verifyCertificate}>Verificar certificado</button>
        </div>
      </section>

      <section className="verification-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Certificado</p>
            <h2>Asignacion candidata</h2>
          </div>
          <span className={accepted ? 'complexity-chip' : 'complexity-chip danger'}>{accepted ? 'ACCEPT' : 'REJECT'}</span>
        </div>
        <div className="boolean-switch-grid">
          {variables.map((variable) => (
            <button
              className={assignment[variable] ? 'boolean-switch active' : 'boolean-switch'}
              key={variable}
              type="button"
              onClick={() => toggleVariable(variable)}
            >
              <span>{variable}</span>
              <strong>{assignment[variable] ? 'TRUE' : 'FALSE'}</strong>
            </button>
          ))}
        </div>
        <div className="concept-message polynomial">El verificador revisa clausulas y literales: tiempo polinomial en el tamano de la formula.</div>
      </section>

      <section className="verification-card proof-result-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Conclusion</p>
            <h2>SAT pertenece a NP</h2>
          </div>
        </div>
        <p>{satInNpProofMeta.formalIdea}</p>
        <div className="concept-message warning">{satInNpProofMeta.misconceptionNote}</div>
      </section>

      <CodeTracePanel activeLine={activeLine} lines={satInNpProofMeta.codeLines} title="Codigo del verificador" />
    </div>
  );
}
