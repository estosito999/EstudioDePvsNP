import { useMemo } from 'react';
import { UniverseCanvas3D } from '../../components/universe/UniverseCanvas3D';
import { UniverseClusterLegend } from '../../components/universe/UniverseClusterLegend';
import { UniverseNodePanel } from '../../components/universe/UniverseNodePanel';
import { UniverseRoutePanel } from '../../components/universe/UniverseRoutePanel';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { findUniverseRoute, getUniverseNode } from './universeData';
import type { UniverseNodeId } from './universeTypes';

type KnowledgeUniverse3DProps = {
  selectedNodeId: UniverseNodeId;
  routeTargetNodeId: UniverseNodeId;
  onNodeChange: (nodeId: UniverseNodeId) => void;
  onRouteTargetChange: (nodeId: UniverseNodeId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

export function KnowledgeUniverse3D({ selectedNodeId, routeTargetNodeId, onNodeChange, onRouteTargetChange, onEvent }: KnowledgeUniverse3DProps) {
  const selectedNode = getUniverseNode(selectedNodeId);
  const routeNodeIds = useMemo(() => findUniverseRoute(selectedNodeId, routeTargetNodeId), [selectedNodeId, routeTargetNodeId]);

  function selectNode(nodeId: UniverseNodeId) {
    const node = getUniverseNode(nodeId);
    onNodeChange(nodeId);
    onEvent(`Nodo 3D seleccionado: ${node.label}`, node.severity === 'critical' ? 'warn' : 'info');
    if (node.severity === 'critical') onEvent(`Misconception Layer critica activa en ${node.label}`, 'warn');
  }

  function changeRouteTarget(nodeId: UniverseNodeId) {
    onRouteTargetChange(nodeId);
    onEvent(`Ruta 3D recalculada hacia ${getUniverseNode(nodeId).label}`, 'system');
  }

  return (
    <section className="module-shell universe-module">
      <header className="module-toolbar verification-toolbar universe-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>3D Knowledge Universe</h1>
          <p className="module-subtitle">Un mapa espacial de teoría de la computación con clusters SAT, Complexity y Proof.</p>
        </div>
        <div className="toolbar-actions">
          <StatusBadge label="THREE.JS" tone="cyan" />
          <StatusBadge label="TRUTH LAYER" tone="green" />
          <StatusBadge label="MISCONCEPTION LAYER" tone="red" />
        </div>
      </header>

      <div className="universe-workbench">
        <UniverseCanvas3D selectedNodeId={selectedNodeId} routeNodeIds={routeNodeIds} onSelectNode={selectNode} />
        <div className="universe-side-stack">
          <UniverseNodePanel node={selectedNode} />
          <UniverseRoutePanel
            sourceNodeId={selectedNodeId}
            targetNodeId={routeTargetNodeId}
            routeNodeIds={routeNodeIds}
            onSourceChange={selectNode}
            onTargetChange={changeRouteTarget}
          />
          <UniverseClusterLegend />
        </div>
      </div>
    </section>
  );
}
