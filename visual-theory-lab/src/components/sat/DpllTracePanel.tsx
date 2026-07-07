import { CodeTracePanel } from '../code/CodeTracePanel';
import { satLabMeta } from '../../modules/sat/satData';
import type { DpllStep } from '../../modules/sat/satTypes';

type DpllTracePanelProps = {
  trace: DpllStep[];
  activeStepIndex: number;
  onStep: () => void;
  onReset: () => void;
};

export function DpllTracePanel({ trace, activeStepIndex, onStep, onReset }: DpllTracePanelProps) {
  const activeStep = trace[activeStepIndex];

  return (
    <section className="verification-card dpll-panel">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Mini DPLL</p>
          <h2>{activeStep?.title ?? 'Trace pendiente'}</h2>
        </div>
        <span className="status-badge yellow">educational</span>
      </div>

      {activeStep ? (
        <div className="dpll-active-step">
          <p>{activeStep.description}</p>
          <div className="structure-token-list">
            {Object.entries(activeStep.assignment).map(([variable, value]) => <code key={variable}>{variable}={String(value)}</code>)}
          </div>
        </div>
      ) : null}

      <div className="verification-actions">
        <button type="button" onClick={onStep}>Step DPLL</button>
        <button type="button" onClick={onReset}>Reset DPLL</button>
        <span>{trace.length} pasos</span>
      </div>
      <CodeTracePanel activeLine={activeStep?.activeLine ?? 0} lines={satLabMeta.codeLines} title="Codigo DPLL" />
    </section>
  );
}
