import { CodeTracePanel } from '../code/CodeTracePanel';
import type { AlgorithmMeta, AlgorithmStep } from '../../modules/algorithms/algorithmTypes';
import { AlgorithmStepPanel } from './AlgorithmStepPanel';
import { ComplexityCard } from './ComplexityCard';
import { InternalStructurePanel } from './InternalStructurePanel';

type GraphAlgorithmVisualizerProps = {
  algorithm: AlgorithmMeta;
  activeStepIndex: number;
  onStep: () => void;
  onRun: () => void;
  onReset: () => void;
};

function edgeLabel(edge: AlgorithmMeta['edges'][number]) {
  if (edge.capacity !== undefined) return `${edge.flow ?? 0}/${edge.capacity}`;
  return edge.weight !== undefined ? String(edge.weight) : '';
}

function isPathEdge(step: AlgorithmStep, source: string, target: string) {
  if (!step.augmentingPath) return false;
  return step.augmentingPath.some((node, index) => node === source && step.augmentingPath?.[index + 1] === target);
}

export function GraphAlgorithmVisualizer({ algorithm, activeStepIndex, onStep, onRun, onReset }: GraphAlgorithmVisualizerProps) {
  const step = algorithm.steps[activeStepIndex] ?? algorithm.steps[0];
  const edgesToRender = step.residualEdges ?? algorithm.edges;

  return (
    <div className="algorithm-visual-grid">
      <AlgorithmStepPanel activeStepIndex={activeStepIndex} steps={algorithm.steps} />

      <section className="verification-card graph-lab-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Graph visualization</p>
            <h2>{algorithm.name}</h2>
          </div>
          <span className="complexity-chip">{algorithm.timeComplexity}</span>
        </div>

        <div className="algorithm-graph-canvas">
          <svg viewBox="0 0 430 230">
            {edgesToRender.map((edge) => {
              const source = algorithm.nodes.find((node) => node.id === edge.source)!;
              const target = algorithm.nodes.find((node) => node.id === edge.target)!;
              const active = edge.id === step.activeEdgeId || isPathEdge(step, edge.source, edge.target);
              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;

              return (
                <g key={edge.id}>
                  <line className={active ? 'algorithm-edge active' : 'algorithm-edge'} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />
                  {edgeLabel(edge) ? <text className="algorithm-edge-label" x={midX} y={midY - 6}>{edgeLabel(edge)}</text> : null}
                </g>
              );
            })}
            {algorithm.nodes.map((node) => (
              <g className={node.id === step.activeNodeId ? 'algorithm-node active' : 'algorithm-node'} key={node.id}>
                <circle cx={node.x} cy={node.y} r="22" />
                <text x={node.x} y={node.y + 4}>{node.label}</text>
              </g>
            ))}
          </svg>
        </div>

        <div className="verification-actions">
          <button type="button" onClick={onStep}>Step</button>
          <button type="button" onClick={onRun}>Run</button>
          <button type="button" onClick={onReset}>Reset</button>
          <span>{step.title}</span>
        </div>
      </section>

      <InternalStructurePanel step={step} title={algorithm.internalStructure} />
      <ComplexityCard algorithm={algorithm} />
      <CodeTracePanel activeLine={step.activeLine} lines={algorithm.codeLines} title="Codigo del algoritmo" />

      {algorithm.category === 'max-flow' ? (
        <section className="verification-card max-flow-card">
          <div className="verification-card-header">
            <div>
              <p className="eyebrow">Residual network</p>
              <h2>Capacidades, flujo y camino aumentante</h2>
            </div>
          </div>
          <p>Camino aumentante: {step.augmentingPath?.join(' -> ') ?? 'ninguno'}</p>
          <p>El grafo residual representa capacidad disponible y aristas de retorno inducidas por el flujo actual.</p>
        </section>
      ) : null}

      <section className="verification-card concept-message-card">
        <div className="concept-message polynomial">Estos algoritmos muestran ejemplos concretos de procedimientos polinomiales. Ayudan a entender P, pero experimentar con ellos no reemplaza demostraciones formales.</div>
      </section>
    </div>
  );
}
