import { DerandomizationAdvancedPanel } from '../../components/randomization/DerandomizationAdvancedPanel';
import { DeterministicComparisonPanel } from '../../components/randomization/DeterministicComparisonPanel';
import { ErrorReductionPanel } from '../../components/randomization/ErrorReductionPanel';
import { PseudorandomGeneratorPanel } from '../../components/randomization/PseudorandomGeneratorPanel';
import { RandomClassSelector } from '../../components/randomization/RandomClassSelector';
import { RandomDecisionTree } from '../../components/randomization/RandomDecisionTree';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { getRandomClass, randomizationLabMeta } from './randomizationData';
import type { RandomClassId } from './randomizationTypes';

type RandomizationDerandomizationLabProps = {
  activeClassId: RandomClassId;
  onClassChange: (classId: RandomClassId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function RandomizationDerandomizationLab({ activeClassId, onClassChange, onEvent }: RandomizationDerandomizationLabProps) {
  const randomClass = getRandomClass(activeClassId);

  function selectClass(classId: RandomClassId) {
    onClassChange(classId);
    onEvent(`Clase probabilistica seleccionada: ${classId.toUpperCase()}`, 'system');
    if (classId === 'zpp') onEvent('ZPP muestra aleatoriedad sin error, con tiempo esperado polinomial', 'info');
  }

  return (
    <section className="module-shell randomization-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Randomization & Derandomization Lab</h1>
          <p className="module-subtitle">Clases probabilisticas, reduccion de error, PRGs y el puente Hardness vs Randomness.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="BPP / RP / co-RP / ZPP" tone="cyan" />
          <StatusBadge label="PRG" tone="purple" />
          <StatusBadge label="DERANDOMIZATION" tone="yellow" />
        </div>
      </header>

      <div className="verification-content">
        <section className="verification-intro randomization-intro">
          <div>
            <p className="eyebrow">Mensaje conceptual</p>
            <h2>{randomizationLabMeta.conceptualMessage}</h2>
          </div>
        </section>
        <RandomClassSelector activeClassId={activeClassId} onSelectClass={selectClass} />
        <div className="randomization-grid">
          <RandomDecisionTree randomClass={randomClass} />
          <ErrorReductionPanel randomClass={randomClass} />
          <DeterministicComparisonPanel randomClass={randomClass} />
          <PseudorandomGeneratorPanel />
          <DerandomizationAdvancedPanel />
        </div>
      </div>
    </section>
  );
}
