import type { ReductionId } from '../../modules/reduction/reductionTypes';
import { reductions } from '../../modules/reduction/reductionsData';

type ReductionSelectorProps = {
  activeReductionId: ReductionId;
  onSelectReduction: (reductionId: ReductionId) => void;
};

export function ReductionSelector({ activeReductionId, onSelectReduction }: ReductionSelectorProps) {
  return (
    <div className="reduction-selector">
      {reductions.map((reduction) => (
        <button
          className={reduction.id === activeReductionId ? 'reduction-option active' : `reduction-option ${reduction.difficulty}`}
          key={reduction.id}
          type="button"
          onClick={() => onSelectReduction(reduction.id)}
        >
          <strong>{reduction.label}</strong>
          <span>{reduction.difficulty}</span>
        </button>
      ))}
    </div>
  );
}
