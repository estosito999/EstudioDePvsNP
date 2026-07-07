import { useState } from 'react';
import { CodeTracePanel } from '../code/CodeTracePanel';
import { bellmanFordEdges, bellmanFordMeta, bellmanFordNodes } from '../../modules/code-verification/bellmanFordData';
import type { WeightedEdge, WeightedGraphNode } from '../../modules/code-verification/verificationTypes';

type BellmanFordVisualizerProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const graphWidth = 500;
const graphHeight = 300;
const sourceNode = 'A';

function initialDistances(nodes: WeightedGraphNode[]) {
  return Object.fromEntries(nodes.map((node) => [node.id, node.id === sourceNode ? 0 : Number.POSITIVE_INFINITY]));
}

function formatDistance(value: number) {
  return Number.isFinite(value) ? String(value) : '∞';
}

export function BellmanFordVisualizer({ onEvent }: BellmanFordVisualizerProps) {
  const [nodes, setNodes] = useState<WeightedGraphNode[]>(bellmanFordNodes);
  const [edges, setEdges] = useState<WeightedEdge[]>(bellmanFordEdges);
  const [distances, setDistances] = useState<Record<string, number>>(() => initialDistances(bellmanFordNodes));
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [edgeIndex, setEdgeIndex] = useState(0);
  const [passIndex, setPassIndex] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [lastRelaxedEdgeId, setLastRelaxedEdgeId] = useState<string | null>(null);

  const maxPasses = nodes.length - 1;
  const completed = passIndex >= maxPasses;

  function reset() {
    setDistances(initialDistances(nodes));
    setEdges(bellmanFordEdges);
    setEdgeIndex(0);
    setPassIndex(0);
    setActiveLine(0);
    setLastRelaxedEdgeId(null);
    onEvent('Bellman-Ford reset ejecutado', 'system');
  }

  function step() {
    if (completed) {
      onEvent('Bellman-Ford ya completo para V - 1 pasadas', 'system');
      return;
    }

    const edge = edges[edgeIndex];
    const sourceDistance = distances[edge.source];
    const candidate = sourceDistance + edge.weight;
    const canRelax = Number.isFinite(sourceDistance) && candidate < distances[edge.target];

    onEvent('Bellman-Ford step ejecutado', 'info');

    if (canRelax) {
      setDistances((current) => ({ ...current, [edge.target]: candidate }));
      setActiveLine(3);
      setLastRelaxedEdgeId(edge.id);
      onEvent(`Arista relajada: ${edge.source} -> ${edge.target}`, 'info');
    } else {
      setActiveLine(2);
      setLastRelaxedEdgeId(null);
    }

    const nextEdgeIndex = edgeIndex + 1;
    if (nextEdgeIndex >= edges.length) {
      setEdgeIndex(0);
      setPassIndex((current) => current + 1);
      return;
    }

    setEdgeIndex(nextEdgeIndex);
  }

  function updateWeight(edgeId: string, weight: number) {
    setEdges((current) => current.map((edge) => (edge.id === edgeId ? { ...edge, weight } : edge)));
  }

  function moveNode(clientX: number, clientY: number, bounds: DOMRect) {
    if (!draggingNodeId) return;

    const x = Math.min(Math.max(clientX - bounds.left, 28), graphWidth - 28);
    const y = Math.min(Math.max(clientY - bounds.top, 28), graphHeight - 28);
    setNodes((current) => current.map((node) => (node.id === draggingNodeId ? { ...node, x, y } : node)));
  }

  function getNode(id: string) {
    return nodes.find((node) => node.id === id)!;
  }

  return (
    <div className="verification-grid two-columns">
      <section className="verification-card graph-lab-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Weighted graph</p>
            <h2>Bellman-Ford trace</h2>
          </div>
          <span className="complexity-chip">{bellmanFordMeta.complexity}</span>
        </div>

        <div
          className="weighted-graph-canvas"
          onMouseMove={(event) => moveNode(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect())}
          onMouseUp={() => setDraggingNodeId(null)}
          onMouseLeave={() => setDraggingNodeId(null)}
        >
          <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
            {edges.map((edge) => {
              const source = getNode(edge.source);
              const target = getNode(edge.target);
              const active = edge.id === edges[edgeIndex]?.id;
              const relaxed = edge.id === lastRelaxedEdgeId;

              return (
                <line
                  className={relaxed ? 'bf-edge relaxed' : active ? 'bf-edge active' : 'bf-edge'}
                  key={edge.id}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                />
              );
            })}
          </svg>
          {edges.map((edge) => {
            const source = getNode(edge.source);
            const target = getNode(edge.target);
            return (
              <input
                aria-label={`Peso ${edge.source} a ${edge.target}`}
                className="edge-weight-input"
                key={edge.id}
                style={{ left: (source.x + target.x) / 2 - 18, top: (source.y + target.y) / 2 - 14 }}
                type="number"
                value={edge.weight}
                onChange={(event) => updateWeight(edge.id, Number(event.target.value))}
              />
            );
          })}
          {nodes.map((node) => (
            <button
              className={node.id === sourceNode ? 'graph-node source' : 'graph-node'}
              key={node.id}
              style={{ left: node.x - 23, top: node.y - 23 }}
              type="button"
              onMouseDown={() => setDraggingNodeId(node.id)}
            >
              {node.label}
            </button>
          ))}
        </div>

        <div className="verification-actions">
          <button type="button" onClick={step}>Step</button>
          <button type="button" onClick={reset}>Reset</button>
          <span>Pasada {Math.min(passIndex + 1, maxPasses)} / {maxPasses}</span>
        </div>
      </section>

      <section className="verification-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Distance table</p>
            <h2>dist[source → v]</h2>
          </div>
        </div>
        <table className="distance-table">
          <thead>
            <tr>
              <th>Nodo</th>
              <th>Distancia</th>
            </tr>
          </thead>
          <tbody>
            {nodes.map((node) => (
              <tr key={node.id}>
                <td>{node.label}</td>
                <td>{formatDistance(distances[node.id])}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="concept-message polynomial">
          {bellmanFordMeta.conceptualMessage}
        </div>
      </section>

      <CodeTracePanel activeLine={activeLine} lines={bellmanFordMeta.codeLines} />
    </div>
  );
}
