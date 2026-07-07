import { AlgebraicConceptPanel } from '../../components/algebraic/AlgebraicConceptPanel';
import { AlgebraicConceptSelector } from '../../components/algebraic/AlgebraicConceptSelector';
import { AlgebraicTranslationVisualizer } from '../../components/algebraic/AlgebraicTranslationVisualizer';
import { AlgebraicWarningPanel } from '../../components/algebraic/AlgebraicWarningPanel';
import { PolynomialSystemPanel } from '../../components/algebraic/PolynomialSystemPanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import type { AlgebraicConceptId } from './algebraicTypes';

type AlgebraicGrobnerLabProps = {
  activeConceptId: AlgebraicConceptId;
  onConceptChange: (conceptId: AlgebraicConceptId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function AlgebraicGrobnerLab({ activeConceptId, onConceptChange, onEvent }: AlgebraicGrobnerLabProps) {
  function selectConcept(conceptId: AlgebraicConceptId) {
    onConceptChange(conceptId);
    onEvent(`Concepto algebraico seleccionado: ${conceptId}`, 'system');
    if (conceptId === 'grobner') onEvent('Advertencia sobre crecimiento de bases de Groebner mostrada', 'warn');
  }

  return (
    <section className="module-shell algebraic-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Algebraic / Gröbner Lab</h1>
          <p className="module-subtitle">SAT como sistema polinomial: ideales, variedades, bases de Gröbner y Nullstellensatz.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="SAT → ALGEBRA" tone="purple" />
          <StatusBadge label="GROBNER" tone="yellow" />
          <StatusBadge label="NULLSTELLENSATZ" tone="cyan" />
        </div>
      </header>

      <div className="verification-content">
        <AlgebraicConceptSelector activeConceptId={activeConceptId} onSelectConcept={selectConcept} />
        <div className="algebraic-lab-grid">
          <AlgebraicTranslationVisualizer />
          <AlgebraicConceptPanel activeConceptId={activeConceptId} />
          <PolynomialSystemPanel />
          <AlgebraicWarningPanel />
        </div>
      </div>
    </section>
  );
}
