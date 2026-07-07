import { algorithms } from '../../modules/algorithms/algorithmsData';
import type { AlgorithmId } from '../../modules/algorithms/algorithmTypes';

type AlgorithmSelectorProps = {
  activeAlgorithmId: AlgorithmId;
  onSelectAlgorithm: (algorithmId: AlgorithmId) => void;
};

export function AlgorithmSelector({ activeAlgorithmId, onSelectAlgorithm }: AlgorithmSelectorProps) {
  return (
    <div className="algorithm-selector">
      {algorithms.map((algorithm) => (
        <button
          className={algorithm.id === activeAlgorithmId ? 'algorithm-option active' : `algorithm-option ${algorithm.category}`}
          key={algorithm.id}
          type="button"
          onClick={() => onSelectAlgorithm(algorithm.id)}
        >
          <strong>{algorithm.name}</strong>
          <span>{algorithm.category}</span>
        </button>
      ))}
    </div>
  );
}
