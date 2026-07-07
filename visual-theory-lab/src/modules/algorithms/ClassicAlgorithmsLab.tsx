import { useState } from 'react';
import { AlgorithmSelector } from '../../components/algorithms/AlgorithmSelector';
import { GraphAlgorithmVisualizer } from '../../components/algorithms/GraphAlgorithmVisualizer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getAlgorithm } from './algorithmsData';
import type { AlgorithmId } from './algorithmTypes';

type ClassicAlgorithmsLabProps = {
  activeAlgorithmId: AlgorithmId;
  onAlgorithmChange: (algorithmId: AlgorithmId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function ClassicAlgorithmsLab({ activeAlgorithmId, onAlgorithmChange, onEvent }: ClassicAlgorithmsLabProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const activeAlgorithm = getAlgorithm(activeAlgorithmId);

  function selectAlgorithm(algorithmId: AlgorithmId) {
    onAlgorithmChange(algorithmId);
    setActiveStepIndex(0);
    onEvent(`Algoritmo ${getAlgorithm(algorithmId).name} seleccionado`, 'system');
    onEvent('Error comun mostrado', 'warn');
  }

  function step() {
    const nextIndex = Math.min(activeStepIndex + 1, activeAlgorithm.steps.length - 1);
    setActiveStepIndex(nextIndex);
    onEvent('Step ejecutado', 'info');
    const event = activeAlgorithm.steps[nextIndex]?.event;
    if (event) onEvent(event, event.includes('Matriz') ? 'system' : 'info');
  }

  function run() {
    setActiveStepIndex(activeAlgorithm.steps.length - 1);
    onEvent('Step ejecutado', 'info');
    activeAlgorithm.steps.forEach((item) => {
      if (item.event) onEvent(item.event, item.event.includes('Camino aumentante') ? 'system' : 'info');
    });
  }

  function reset() {
    setActiveStepIndex(0);
    onEvent(`${activeAlgorithm.name} reset ejecutado`, 'system');
  }

  return (
    <section className="module-shell algorithms-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Classic Algorithms Lab</h1>
          <p className="module-subtitle">Algoritmos clasicos como procedimientos polinomiales visuales, con estructuras internas y errores comunes.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="MISCONCEPTION LAYER" tone="yellow" />
          <StatusBadge label="LOCAL TRACE" tone="cyan" />
        </div>
      </header>

      <div className="verification-content">
        <AlgorithmSelector activeAlgorithmId={activeAlgorithmId} onSelectAlgorithm={selectAlgorithm} />
        <GraphAlgorithmVisualizer
          algorithm={activeAlgorithm}
          activeStepIndex={activeStepIndex}
          onStep={step}
          onRun={run}
          onReset={reset}
        />
      </div>
    </section>
  );
}
