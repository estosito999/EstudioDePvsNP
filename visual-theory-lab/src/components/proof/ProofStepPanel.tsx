import type { ProofStep, ProofStepStatus } from '../../modules/proof/proofTypes';

type ProofStepPanelProps = {
  steps: ProofStep[];
  activeStepIndex: number;
};

function statusFor(index: number, activeStepIndex: number): ProofStepStatus {
  if (index < activeStepIndex) return 'complete';
  if (index === activeStepIndex) return 'active';
  return 'pending';
}

export function ProofStepPanel({ steps, activeStepIndex }: ProofStepPanelProps) {
  return (
    <section className="proof-step-panel">
      {steps.map((step, index) => {
        const status = statusFor(index, activeStepIndex);

        return (
          <article className={`proof-step ${status}`} key={step.id}>
            <span>{index + 1}</span>
            <div>
              <strong>{step.label}</strong>
              <p>{step.description}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
