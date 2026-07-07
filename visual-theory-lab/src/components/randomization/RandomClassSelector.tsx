import { randomClasses } from '../../modules/randomization/randomizationData';
import type { RandomClassId } from '../../modules/randomization/randomizationTypes';

type RandomClassSelectorProps = {
  activeClassId: RandomClassId;
  onSelectClass: (classId: RandomClassId) => void;
};

export function RandomClassSelector({ activeClassId, onSelectClass }: RandomClassSelectorProps) {
  return (
    <div className="random-class-selector">
      {randomClasses.map((randomClass) => (
        <button
          className={randomClass.id === activeClassId ? 'random-class-card active' : 'random-class-card'}
          key={randomClass.id}
          type="button"
          onClick={() => onSelectClass(randomClass.id)}
        >
          <strong>{randomClass.label}</strong>
          <span>{randomClass.errorModel}</span>
        </button>
      ))}
    </div>
  );
}
