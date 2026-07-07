import type { ReductionStep } from '../../modules/reduction/reductionTypes';

type ReductionStepPanelProps = {
  steps: ReductionStep[];
  activeStepIndex: number;
  onStepSelect: (stepIndex: number) => void;
};

export function ReductionStepPanel({ steps, activeStepIndex, onStepSelect }: ReductionStepPanelProps) {
  return (
    <section className="reduction-step-panel">
      {steps.map((step, index) => (
        <button
          className={index === activeStepIndex ? 'reduction-step active' : index < activeStepIndex ? 'reduction-step complete' : 'reduction-step'}
          key={step.id}
          type="button"
          onClick={() => onStepSelect(index)}
        >
          <span>{index + 1}</span>
          <div>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </div>
        </button>
      ))}
    </section>
  );
}
