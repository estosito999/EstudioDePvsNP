import type { CSSProperties } from 'react';
import {
  getVennChildren,
  getVennExclusiveNodeIds,
  getVennMarkerConcepts,
  getVennOverlaySets,
  getVennSet,
  getVennStrictSubsetIds,
  vennGroups,
  type VennSetId,
  type VennSetNode,
} from '../../modules/complexity/complexityVennData';
import { StatusBadge } from '../ui/StatusBadge';

type ComplexitySetVennViewProps = {
  selectedSetId?: string;
  onSelectSet: (setId: VennSetId) => void;
};

function VennBox({ set, selectedSetId, onSelectSet, depth = 0 }: { set: VennSetNode; selectedSetId?: string; onSelectSet: (setId: VennSetId) => void; depth?: number }) {
  const children = getVennChildren(set.id);
  const markers = getVennMarkerConcepts(set.id);
  const selected = selectedSetId === set.id;
  const exclusiveIds = getVennExclusiveNodeIds(set.id);

  return (
    <article
      className={selected ? 'venn-box selected' : 'venn-box'}
      role="button"
      tabIndex={0}
      style={{ '--venn-depth': depth } as CSSProperties}
      onClick={(event) => {
        event.stopPropagation();
        onSelectSet(set.id);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') onSelectSet(set.id);
      }}
    >
      <div className="venn-box-header">
        <div>
          <strong>{set.label}</strong>
          <span>{set.exclusiveLabel}</span>
        </div>
        <StatusBadge label={`${exclusiveIds.length} exclusive`} tone={selected ? 'yellow' : 'cyan'} />
      </div>

      {markers.length > 0 ? (
        <div className="venn-marker-row" aria-label={`Marcadores de ${set.label}`}>
          {markers.map((marker) => (
            <span className="venn-marker" key={marker.id} title="Marcador de pertenencia/completitud; no afirma separacion abierta.">{marker.label}</span>
          ))}
        </div>
      ) : null}

      {children.length > 0 ? (
        <div className="venn-child-stack">
          {children.map((child) => (
            <VennBox key={child.id} set={child} selectedSetId={selectedSetId} onSelectSet={onSelectSet} depth={depth + 1} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

function OverlayRegionCard({ set, selectedSetId, onSelectSet }: { set: VennSetNode; selectedSetId?: string; onSelectSet: (setId: VennSetId) => void }) {
  const markers = getVennMarkerConcepts(set.id);
  const selected = selectedSetId === set.id;
  return (
    <button className={selected ? 'venn-overlay-card selected' : 'venn-overlay-card'} type="button" onClick={() => onSelectSet(set.id)}>
      <strong>{set.label}</strong>
      <span>{set.visualHint ?? set.exclusiveLabel}</span>
      {markers.length > 0 ? <small>{markers.map((marker) => marker.label).join(' ↔ ')}</small> : null}
    </button>
  );
}

export function ComplexitySetVennView({ selectedSetId, onSelectSet }: ComplexitySetVennViewProps) {
  const selectedSet = getVennSet(selectedSetId);
  const strictSubsetIds = selectedSet ? getVennStrictSubsetIds(selectedSet.id) : [];
  const exclusiveIds = selectedSet ? getVennExclusiveNodeIds(selectedSet.id) : [];

  return (
    <div className="set-venn-shell">
      <header className="set-venn-header">
        <div>
          <p className="eyebrow">Set / Venn View</p>
          <h2>Inclusiones formales como regiones anidadas</h2>
          <p>Las cajas muestran inclusiones conocidas. Los marcadores de completitud no se usan como testigos de separaciones abiertas.</p>
        </div>
        <div className="set-venn-status-row">
          <StatusBadge label="P ⊆ NP ⊆ PSPACE ⊆ EXPTIME" tone="cyan" />
          <StatusBadge label="Decidable ⊆ RE" tone="green" />
          <StatusBadge label="No separations claimed" tone="yellow" />
        </div>
      </header>

      <div className="set-venn-grid">
        {vennGroups.map((group) => (
          <section className={`set-venn-group ${group.id}`} key={group.id}>
            <div className="set-venn-group-title">
              <div>
                <p className="eyebrow">{group.id}</p>
                <h3>{group.title}</h3>
              </div>
              <span>{group.note}</span>
            </div>
            <div className="set-venn-root-stack">
              {group.rootIds.map((rootId) => {
                const root = getVennSet(rootId);
                return root ? <VennBox key={root.id} set={root} selectedSetId={selectedSetId} onSelectSet={onSelectSet} /> : null;
              })}
            </div>
            {getVennOverlaySets(group.id).length > 0 ? (
              <div className="venn-overlay-region-list" aria-label={`Regiones no anidadas de ${group.title}`}>
                <p className="eyebrow">overlap / side regions</p>
                {getVennOverlaySets(group.id).map((overlay) => (
                  <OverlayRegionCard key={overlay.id} set={overlay} selectedSetId={selectedSetId} onSelectSet={onSelectSet} />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <aside className="set-venn-selection-card">
        <strong>{selectedSet ? selectedSet.label : 'No set selected'}</strong>
        <span>subsets: {strictSubsetIds.length > 0 ? strictSubsetIds.join(', ') : 'none visible'}</span>
        <span>exclusive region: {exclusiveIds.length > 0 ? exclusiveIds.join(', ') : 'none'}</span>
        <p>{selectedSet?.note ?? 'Selecciona una caja para fijar una region exclusiva y usarla como filtro visual al volver a Universe View.'}</p>
      </aside>
    </div>
  );
}
