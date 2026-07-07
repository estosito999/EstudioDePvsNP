import { useEffect, type ReactNode } from 'react';
import {
  Background,
  ConnectionMode,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  type OnNodeDrag,
  ReactFlow,
  type Edge,
  type Node,
  type NodeProps,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { complexityConcepts } from '../../modules/complexity/complexityData';
import { complexityRelations } from '../../modules/complexity/complexityRelations';
import { getRelationTooltip, getVisibleComplexityRelations, isLayerVisible } from '../../modules/complexity/complexityGraphAnalysis';
import { getHighestMisconceptionSeverity, getMisconceptionsByIds } from '../../modules/complexity/misconceptionsData';
import { getClassMemberProblemIds, mathSymbolLegend } from '../../modules/complexity/complexitySetTheory';
import {
  conceptLayerLabels,
  truthStatusLabels,
  type ComplexityExplorerToggles,
  type ComplexityRelation,
  type ConceptAccent,
  type ConceptLayer,
  type ConceptNode,
  type MisconceptionSeverity,
  type TruthStatus,
} from '../../modules/complexity/complexityTypes';

type ComplexityGraphProps = {
  selectedConceptId: string;
  selectedRelationId?: string;
  vennExclusiveNodeIds: string[];
  toggles: ComplexityExplorerToggles;
  onSelectConcept: (conceptId: string) => void;
  onSelectRelation: (relationId: string) => void;
  onNodeMoved: (conceptId: string) => void;
};

type ComplexityNodeData = Record<string, unknown> & {
  label: ReactNode;
  accent: ConceptAccent;
};

type ComplexityNode = Node<ComplexityNodeData>;
type HandleSide = 'top' | 'bottom' | 'left' | 'right';

const accentColors: Record<ConceptAccent, string> = {
  green: '#6eff9e',
  cyan: '#32e6ff',
  purple: '#b682ff',
  red: '#ff4d6d',
  yellow: '#ffd166',
};

const truthTones: Record<TruthStatus, ConceptAccent> = {
  definition: 'cyan',
  theorem: 'green',
  experiment: 'yellow',
  intuition: 'purple',
  conjecture: 'yellow',
  open: 'red',
  common_error: 'red',
};

const severityColors: Record<MisconceptionSeverity, string> = {
  low: '#32e6ff',
  medium: '#ffd166',
  high: '#ff9f1c',
  critical: '#ff4d6d',
};

const handlePositions: Record<HandleSide, Position> = {
  top: Position.Top,
  bottom: Position.Bottom,
  left: Position.Left,
  right: Position.Right,
};

function ComplexityFlowNode({ data }: NodeProps<ComplexityNode>) {
  return (
    <>
      <div className="complexity-flow-node-content">{data.label}</div>
      {(Object.keys(handlePositions) as HandleSide[]).map((side) => (
        <Handle
          className={`complexity-card-handle ${side}`}
          id={side}
          key={side}
          position={handlePositions[side]}
          type="source"
          isConnectableEnd
          isConnectableStart
        />
      ))}
    </>
  );
}

const nodeTypes = {
  complexity: ComplexityFlowNode,
};

function layerVisible(layer: ConceptLayer, toggles: ComplexityExplorerToggles) {
  return isLayerVisible(layer, toggles);
}

function conceptVisible(concept: ConceptNode, toggles: ComplexityExplorerToggles) {
  return layerVisible(concept.layer, toggles);
}

function nodeLabel(item: ConceptNode, toggles: ComplexityExplorerToggles) {
  const misconceptions = getMisconceptionsByIds(item.misconceptionIds);
  const highestSeverity = getHighestMisconceptionSeverity(misconceptions);

  return (
    <div className="complexity-node-label">
      <div className="node-title-row">
        <strong>{item.label}</strong>
        {toggles.showTruthStatus ? (
          <span className={`truth-pill ${truthTones[item.truthStatus]}`}>{truthStatusLabels[item.truthStatus]}</span>
        ) : null}
      </div>
      {toggles.labels ? (
        <span>{toggles.technicalMode ? `${item.kind} / ${conceptLayerLabels[item.layer]}` : item.kind}</span>
      ) : null}
      {toggles.showMisconceptions && highestSeverity ? (
        <span className={`misconception-node-badge ${highestSeverity}`}>{highestSeverity} warning</span>
      ) : null}
    </div>
  );
}

function nodeStyle(item: ConceptNode, selected: boolean, toggles: ComplexityExplorerToggles, vennExclusiveNodeIds: Set<string>, selectedClassMemberIds?: Set<string>, selConceptId?: string) {
  const color = accentColors[item.accent];
  const isProblem = item.kind === 'problem';
  const vennRegionActive = vennExclusiveNodeIds.size > 0;
  const inVennExclusiveRegion = vennExclusiveNodeIds.has(item.id);
  const classMemberActive = !vennRegionActive && selectedClassMemberIds && selectedClassMemberIds.size > 0;
  const isMemberProblem = classMemberActive && item.kind === 'problem' && selectedClassMemberIds!.has(item.id);
  const isClassSelf = classMemberActive && item.id === selConceptId;
  const highlighted = selected || isMemberProblem || isClassSelf;
  const highestSeverity = toggles.showMisconceptions
    ? getHighestMisconceptionSeverity(getMisconceptionsByIds(item.misconceptionIds))
    : undefined;
  const warningColor = highestSeverity ? severityColors[highestSeverity] : undefined;

  return {
    border: `1px solid ${warningColor ?? (highlighted ? color : isProblem ? 'rgba(255, 209, 102, 0.34)' : 'rgba(125, 245, 255, 0.26)')}`,
    boxShadow: highlighted
      ? `0 0 22px ${color}55, inset 0 0 18px rgba(255,255,255,0.05)`
      : vennRegionActive && inVennExclusiveRegion
        ? `0 0 24px ${color}66, inset 0 0 18px ${color}22`
      : warningColor
        ? `0 0 18px ${warningColor}42, inset 0 0 10px ${warningColor}10`
        : toggles.technicalMode
        ? `0 0 14px ${color}18`
        : 'none',
    background: highlighted
      ? `linear-gradient(135deg, ${color}24, rgba(7, 10, 18, 0.96))`
      : isProblem
        ? 'linear-gradient(135deg, rgba(42, 31, 12, 0.94), rgba(5, 8, 14, 0.96))'
        : 'linear-gradient(135deg, rgba(14, 21, 35, 0.96), rgba(5, 8, 14, 0.96))',
    color: '#e9fbff',
    width: isProblem ? 174 : 168,
    minHeight: 74,
    borderRadius: 2,
    fontFamily: 'var(--font-mono)',
    opacity: vennRegionActive && !inVennExclusiveRegion ? 0.18 : classMemberActive && !isMemberProblem && !isClassSelf ? 0.4 : 1,
    filter: vennRegionActive && !inVennExclusiveRegion ? 'grayscale(0.85)' : classMemberActive && !isMemberProblem && !isClassSelf ? 'grayscale(0.6)' : 'none',
  };
}

function buildNodes(selectedConceptId: string, toggles: ComplexityExplorerToggles, vennExclusiveNodeIds: string[]): ComplexityNode[] {
  const vennExclusiveSet = new Set(vennExclusiveNodeIds);
  const selectedClass = complexityConcepts.find((c) => c.id === selectedConceptId && c.kind === 'class');
  const selectedClassMemberIds = selectedClass ? new Set(getClassMemberProblemIds(selectedClass.id)) : undefined;
  return complexityConcepts.filter((item) => conceptVisible(item, toggles)).map((item) => ({
    id: item.id,
    type: 'complexity',
    position: item.position,
    data: {
      label: nodeLabel(item, toggles),
      accent: item.accent,
    },
    style: nodeStyle(item, item.id === selectedConceptId, toggles, vennExclusiveSet, selectedClassMemberIds, selectedConceptId),
    domAttributes: {
      title: item.shortDefinition,
    },
  }));
}

function edgeStyle(relation: ComplexityRelation, selected: boolean) {
  if (selected) {
    return { stroke: '#ffd166', strokeWidth: 2.8, filter: 'drop-shadow(0 0 6px rgba(255, 209, 102, 0.6))' };
  }

  if (relation.kind === 'inclusion') {
    return { stroke: '#32e6ff', strokeWidth: 1.6 };
  }

  if (relation.kind === 'membership') {
    return { stroke: '#6eff9e', strokeWidth: 1.5 };
  }

  if (relation.kind === 'separation') {
    return { stroke: '#ff4d6d', strokeWidth: 1.8, strokeDasharray: '2 5' };
  }

  if (relation.kind === 'reduction') {
    return { stroke: '#ff4d6d', strokeWidth: 1.4, strokeDasharray: '6 5' };
  }

  return { stroke: '#b682ff', strokeWidth: 1.4, strokeDasharray: '3 4' };
}

function edgeLabel(relation: ComplexityRelation, selected: boolean) {
  return (
    <span className={selected ? 'complexity-edge-label selected' : 'complexity-edge-label'} title={getRelationTooltip(relation)}>
      {relation.label}
    </span>
  );
}

function handleSidesForRelation(relation: ComplexityRelation): { sourceHandle: HandleSide; targetHandle: HandleSide } {
  const source = complexityConcepts.find((item) => item.id === relation.source);
  const target = complexityConcepts.find((item) => item.id === relation.target);

  if (!source || !target) return { sourceHandle: 'right', targetHandle: 'left' };

  const dx = target.position.x - source.position.x;
  const dy = target.position.y - source.position.y;

  if (Math.abs(dx) >= Math.abs(dy)) {
    return dx >= 0
      ? { sourceHandle: 'right', targetHandle: 'left' }
      : { sourceHandle: 'left', targetHandle: 'right' };
  }

  return dy >= 0
    ? { sourceHandle: 'bottom', targetHandle: 'top' }
    : { sourceHandle: 'top', targetHandle: 'bottom' };
}

function labelOffsetForRelation(relation: ComplexityRelation) {
  const baseOffsets: Record<ComplexityRelation['kind'], number> = {
    inclusion: 26,
    reduction: 42,
    duality: 58,
    membership: 34,
    separation: 66,
  };
  return baseOffsets[relation.kind] + (relation.id.length % 4) * 8;
}

function buildEdges(toggles: ComplexityExplorerToggles, selectedRelationId?: string): Edge[] {
  return getVisibleComplexityRelations(toggles).map((relation) => {
    const selected = relation.id === selectedRelationId;
    const style = edgeStyle(relation, selected);
    const { sourceHandle, targetHandle } = handleSidesForRelation(relation);

    return {
      id: relation.id,
      source: relation.source,
      target: relation.target,
      sourceHandle,
      targetHandle,
      label: toggles.labels ? edgeLabel(relation, selected) : undefined,
      type: 'smoothstep',
      selected,
      animated: relation.kind !== 'inclusion' && toggles.technicalMode,
      style,
      data: {
        tooltip: getRelationTooltip(relation),
      },
      ariaLabel: getRelationTooltip(relation),
      interactionWidth: 18,
      pathOptions: {
        offset: labelOffsetForRelation(relation),
        borderRadius: 14,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: style.stroke,
      },
      labelStyle: {
        fill: toggles.showTruthStatus ? accentColors[truthTones[relation.truthStatus]] : '#c9fbff',
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
      },
      labelBgStyle: {
        fill: '#050812',
        fillOpacity: 0.92,
      },
      labelBgPadding: [5, 4] as [number, number],
      labelBgBorderRadius: 2,
    };
  });
}

export function ComplexityGraph({ selectedConceptId, selectedRelationId, vennExclusiveNodeIds, toggles, onSelectConcept, onSelectRelation, onNodeMoved }: ComplexityGraphProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<ComplexityNode>(buildNodes(selectedConceptId, toggles, vennExclusiveNodeIds));
  const [edges, setEdges, onEdgesChange] = useEdgesState(buildEdges(toggles, selectedRelationId));

  useEffect(() => {
    setNodes((currentNodes) => {
      const positions = new Map(currentNodes.map((node) => [node.id, node.position]));
      const vennExclusiveSet = new Set(vennExclusiveNodeIds);
      const selectedClass = complexityConcepts.find((c) => c.id === selectedConceptId && c.kind === 'class');
      const selectedClassMemberIds = selectedClass ? new Set(getClassMemberProblemIds(selectedClass.id)) : undefined;

      return complexityConcepts.filter((item) => conceptVisible(item, toggles)).map((item) => ({
        id: item.id,
        type: 'complexity',
        position: positions.get(item.id) ?? item.position,
        data: {
          label: nodeLabel(item, toggles),
          accent: item.accent,
        },
        style: nodeStyle(item, item.id === selectedConceptId, toggles, vennExclusiveSet, selectedClassMemberIds, selectedConceptId),
        domAttributes: {
          title: item.shortDefinition,
        },
      }));
    });
    setEdges(buildEdges(toggles, selectedRelationId));
  }, [selectedConceptId, selectedRelationId, setEdges, setNodes, toggles, vennExclusiveNodeIds]);

  const handleNodeDragStop: OnNodeDrag<ComplexityNode> = (_, node) => {
    onNodeMoved(node.id);
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={(_, node) => onSelectConcept(node.id)}
      onEdgeClick={(_, edge) => onSelectRelation(edge.id)}
      onNodeDragStop={handleNodeDragStop}
      nodeTypes={nodeTypes}
      connectionMode={ConnectionMode.Loose}
      fitView
      minZoom={0.25}
      maxZoom={1.8}
      proOptions={{ hideAttribution: true }}
      className={toggles.technicalMode ? 'technical-flow' : 'quiet-flow'}
    >
      <Background color={toggles.technicalMode ? '#123947' : '#17202b'} gap={24} size={1} />
      <MiniMap
        nodeColor={(node) => accentColors[(node.data as ComplexityNodeData).accent]}
        maskColor="rgba(2, 5, 10, 0.72)"
        pannable
        zoomable
      />
      <Controls showInteractive={false} />
    </ReactFlow>
  );
}
