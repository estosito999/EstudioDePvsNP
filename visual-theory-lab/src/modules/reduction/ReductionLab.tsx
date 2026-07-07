import { ReductionSelector } from '../../components/reduction/ReductionSelector';
import { ReductionVisualizer } from '../../components/reduction/ReductionVisualizer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getReduction } from './reductionsData';
import type { ReductionId } from './reductionTypes';

type ReductionLabProps = {
  activeReductionId: ReductionId;
  activeStepIndex: number;
  onReductionChange: (reductionId: ReductionId) => void;
  onStepChange: (stepIndex: number) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function ReductionLab({
  activeReductionId,
  activeStepIndex,
  onReductionChange,
  onStepChange,
  onEvent,
}: ReductionLabProps) {
  const activeReduction = getReduction(activeReductionId);

  function selectReduction(reductionId: ReductionId) {
    const reduction = getReduction(reductionId);
    onReductionChange(reductionId);
    onStepChange(0);
    onEvent(`Reduccion ${reduction.label} seleccionada`, 'system');
    onEvent('Transformacion polinomial mostrada', 'info');

    if (reduction.warning) {
      onEvent('Advertencia tecnica mostrada para SUBSET-SUM', 'warn');
    }
  }

  function selectStep(stepIndex: number) {
    onStepChange(stepIndex);
    onEvent(`Paso ${stepIndex + 1} de la reduccion cargado`, 'info');

    if (stepIndex === activeReduction.steps.length - 1) {
      onEvent('Conclusion de reduccion mostrada', 'system');
    }
  }

  return (
    <section className="module-shell reduction-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Reduction Lab</h1>
          <p className="module-subtitle">A ≤p B significa que A se transforma en B en tiempo polinomial; B es al menos tan dificil como A.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="POLYNOMIAL MAP" tone="cyan" />
          {activeReduction.warning ? <StatusBadge label="ADVANCED WARNING" tone="yellow" /> : null}
        </div>
      </header>

      <div className="verification-content">
        <ReductionSelector activeReductionId={activeReductionId} onSelectReduction={selectReduction} />
        <ReductionVisualizer reduction={activeReduction} activeStepIndex={activeStepIndex} onStepChange={selectStep} />
      </div>
    </section>
  );
}
