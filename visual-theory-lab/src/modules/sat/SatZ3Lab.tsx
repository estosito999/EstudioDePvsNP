import { SatWorkbench } from '../../components/sat/SatWorkbench';
import { StatusBadge } from '../../components/ui/StatusBadge';

type SatZ3LabProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function SatZ3Lab({ onEvent }: SatZ3LabProps) {
  return (
    <section className="module-shell sat-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>SAT / Z3 Lab</h1>
          <p className="module-subtitle">Construccion CNF, DPLL educativo y consulta a Z3 via backend FastAPI.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="DPLL VISUAL" tone="cyan" />
          <StatusBadge label="FASTAPI + Z3" tone="purple" />
          <StatusBadge label="MISCONCEPTION-AWARE" tone="yellow" />
        </div>
      </header>
      <div className="verification-content">
        <SatWorkbench onEvent={onEvent} />
      </div>
    </section>
  );
}
