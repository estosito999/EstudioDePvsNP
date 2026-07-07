import { getUniverseNode, universeNodes } from '../../modules/universe/universeData';
import type { UniverseNodeId } from '../../modules/universe/universeTypes';

type UniverseRoutePanelProps = {
  sourceNodeId: UniverseNodeId;
  targetNodeId: UniverseNodeId;
  routeNodeIds: UniverseNodeId[];
  onSourceChange: (nodeId: UniverseNodeId) => void;
  onTargetChange: (nodeId: UniverseNodeId) => void;
};

export function UniverseRoutePanel({ sourceNodeId, targetNodeId, routeNodeIds, onSourceChange, onTargetChange }: UniverseRoutePanelProps) {
  return (
    <section className="verification-card universe-route-panel">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Spatial routing</p>
          <h2>Ruta entre conceptos</h2>
        </div>
        <span className="status-badge yellow">{routeNodeIds.length} nodos</span>
      </div>
      <div className="universe-route-controls">
        <label>Origen<select value={sourceNodeId} onChange={(event) => onSourceChange(event.target.value as UniverseNodeId)}>{universeNodes.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}</select></label>
        <label>Destino<select value={targetNodeId} onChange={(event) => onTargetChange(event.target.value as UniverseNodeId)}>{universeNodes.map((node) => <option key={node.id} value={node.id}>{node.label}</option>)}</select></label>
      </div>
      <div className="universe-route-readout">
        {routeNodeIds.map((nodeId, index) => (
          <span key={`${nodeId}-${index}`}>{getUniverseNode(nodeId).label}</span>
        ))}
      </div>
    </section>
  );
}
