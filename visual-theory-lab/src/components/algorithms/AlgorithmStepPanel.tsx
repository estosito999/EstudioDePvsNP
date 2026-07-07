import type { AlgorithmStep } from '../../modules/algorithms/algorithmTypes';

type AlgorithmStepPanelProps = {
  steps: AlgorithmStep[];
  activeStepIndex: number;
};

export function AlgorithmStepPanel({ steps, activeStepIndex }: AlgorithmStepPanelProps) {
  return (
    <section className="algorithm-step-panel">
      {steps.map((step, index) => (
        <article className={index === activeStepIndex ? 'algorithm-step active' : index < activeStepIndex ? 'algorithm-step complete' : 'algorithm-step'} key={step.id}>
          <span>{index + 1}</span>
          <div>
            <strong>{step.title}</strong>
            <p>{step.description}</p>
          </div>
        </article>
      ))}
    </section>
  );
}
