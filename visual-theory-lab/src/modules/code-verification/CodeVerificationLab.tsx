import { BellmanFordVisualizer } from '../../components/verification/BellmanFordVisualizer';
import { ThreeSatBruteforceVisualizer } from '../../components/verification/ThreeSatBruteforceVisualizer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { bellmanFordMeta } from './bellmanFordData';
import { threeSatBruteforceMeta } from './threeSatBruteforceData';
import type { VerificationLabId } from './verificationTypes';

type CodeVerificationLabProps = {
  activeLabId: VerificationLabId;
  onLabChange: (labId: VerificationLabId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const labs = [bellmanFordMeta, threeSatBruteforceMeta];

export function CodeVerificationLab({ activeLabId, onLabChange, onEvent }: CodeVerificationLabProps) {
  const activeLab = labs.find((lab) => lab.id === activeLabId) ?? bellmanFordMeta;

  function selectLab(labId: VerificationLabId) {
    onLabChange(labId);
    onEvent(`${labId === 'bellman-ford' ? 'Bellman-Ford Lab' : 'Brute Force 3-SAT Lab'} abierto`, 'system');
  }

  return (
    <section className="module-shell verification-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Code Verification Lab</h1>
          <p className="module-subtitle">Experimentos locales para contrastar intuiciones, no sustitutos de demostraciones formales.</p>
        </div>
        <div className="toolbar-actions" aria-label="Laboratorios de verificacion">
          <StatusBadge label="LOCAL EXPERIMENT" tone="yellow" />
          <StatusBadge label="TRUTH-AWARE" tone="purple" />
          {labs.map((lab) => (
            <button
              className={lab.id === activeLabId ? 'lab-tab active' : 'lab-tab'}
              key={lab.id}
              type="button"
              onClick={() => selectLab(lab.id)}
            >
              {lab.title}
            </button>
          ))}
        </div>
      </header>

      <div className="verification-content">
        <div className="verification-intro">
          <div>
            <p className="eyebrow">Laboratorio seleccionado</p>
            <h2>{activeLab.title}</h2>
            <p>{activeLab.subtitle}</p>
          </div>
          <span className="complexity-chip">{activeLab.complexity}</span>
        </div>

        {activeLabId === 'bellman-ford' ? (
          <BellmanFordVisualizer onEvent={onEvent} />
        ) : (
          <ThreeSatBruteforceVisualizer onEvent={onEvent} />
        )}
      </div>
    </section>
  );
}
