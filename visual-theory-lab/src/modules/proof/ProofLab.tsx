import { SatInNpVisualizer } from '../../components/proof/SatInNpVisualizer';
import { TwoSatProofVisualizer } from '../../components/proof/TwoSatProofVisualizer';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { satInNpProofMeta } from './satInNpProofData';
import { twoSatProofMeta } from './twoSatProofData';
import type { ProofId } from './proofTypes';

type ProofLabProps = {
  activeProofId: ProofId;
  onProofChange: (proofId: ProofId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const proofs = [twoSatProofMeta, satInNpProofMeta];

export function ProofLab({ activeProofId, onProofChange, onEvent }: ProofLabProps) {
  const activeProof = proofs.find((proof) => proof.id === activeProofId) ?? twoSatProofMeta;

  function selectProof(proofId: ProofId) {
    onProofChange(proofId);
    onEvent(`${proofId === 'two-sat-in-p' ? 'Prueba 2-SAT en P' : 'Prueba SAT en NP'} abierta`, 'system');
  }

  return (
    <section className="module-shell proof-module">
      <header className="module-toolbar verification-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Proof Lab</h1>
          <p className="module-subtitle">Demostraciones visuales paso a paso con estado de verdad explicito.</p>
        </div>
        <div className="toolbar-actions" aria-label="Pruebas disponibles">
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="MISCONCEPTION-AWARE" tone="yellow" />
          {proofs.map((proof) => (
            <button
              className={proof.id === activeProofId ? 'lab-tab active' : 'lab-tab'}
              key={proof.id}
              type="button"
              onClick={() => selectProof(proof.id)}
            >
              {proof.title}
            </button>
          ))}
        </div>
      </header>

      <div className="verification-content">
        <div className="verification-intro proof-intro">
          <div>
            <p className="eyebrow">Prueba seleccionada</p>
            <h2>{activeProof.title}</h2>
            <p>{activeProof.shortStatement}</p>
          </div>
          <span className="complexity-chip">{activeProof.theoremStatus}</span>
        </div>

        {activeProofId === 'two-sat-in-p' ? (
          <TwoSatProofVisualizer onEvent={onEvent} />
        ) : (
          <SatInNpVisualizer onEvent={onEvent} />
        )}
      </div>
    </section>
  );
}
