import { useEffect, useMemo, useRef, useState } from 'react';
import ForceGraph3D, { type ForceGraph3DInstance } from '3d-force-graph';
import * as THREE from 'three';
import {
  buildComplexityUniverseGraph,
  endpointId,
  getNeighborIds,
  isIncidentLink,
  universeCategoryMeta,
  type ComplexityUniverseCategory,
  type ComplexityUniverseLink,
  type ComplexityUniverseNode,
} from '../../modules/complexity/complexityUniverse3D';
import { getRelationTooltip } from '../../modules/complexity/complexityGraphAnalysis';
import { complexityRelations } from '../../modules/complexity/complexityRelations';
import { complexityConcepts } from '../../modules/complexity/complexityData';
import { getClassMemberProblemIds, mathSymbolLegend } from '../../modules/complexity/complexitySetTheory';
import type { ComplexityExplorerToggles } from '../../modules/complexity/complexityTypes';
import { ToggleButton } from '../ui/ToggleButton';

type ComplexityUniverse3DProps = {
  selectedConceptId: string;
  vennExclusiveNodeIds: string[];
  toggles: ComplexityExplorerToggles;
  onSelectConcept: (conceptId: string) => void;
  onSelectRelation: (relationId: string) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const categoryOrder: ComplexityUniverseCategory[] = [
  'complexity-classes',
  'problems',
  'formal-languages',
  'decidability',
  'circuits',
  'randomization',
  'open-problems',
];

function createTextSprite(text: string, color: string, opacity: number) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.Sprite();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '600 38px Cascadia Code, monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.shadowColor = color;
  context.shadowBlur = 14;
  context.fillStyle = color;
  context.globalAlpha = opacity;
  context.fillText(text, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(16, 4, 1);
  sprite.position.y = 6.2;
  return sprite;
}

function createNodeObject(node: ComplexityUniverseNode, options: { selected: boolean; neighbor: boolean; dimmed: boolean; showLabels: boolean }) {
  const color = universeCategoryMeta[node.category].color;
  const opacity = options.selected ? 1 : options.dimmed ? 0.18 : options.neighbor ? 0.94 : 0.78;
  const group = new THREE.Group();
  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(options.selected ? 3.2 : options.neighbor ? 2.55 : 2.2, 24, 16),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: options.selected ? 0.95 : options.neighbor ? 0.48 : 0.26,
      transparent: true,
      opacity,
      roughness: 0.35,
      metalness: 0.25,
    }),
  );
  group.add(sphere);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(options.selected ? 4.2 : 3.1, 0.045, 8, 36),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: options.selected ? 0.75 : opacity * 0.32 }),
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);

  if (options.showLabels) {
    group.add(createTextSprite(node.name, color, options.dimmed ? 0.28 : 0.95));
  }

  return group;
}

function linkColor(link: ComplexityUniverseLink, selectedConceptId: string, showNonNeighborEdges: boolean) {
  const selected = selectedConceptId && isIncidentLink(selectedConceptId, link);
  if (selected) return '#ffd166';
  if (selectedConceptId && !showNonNeighborEdges) return '#18313a';
  if (link.truthStatus === 'open') return '#ff9f1c';
  if (link.kind === 'inclusion') return '#32e6ff';
  if (link.kind === 'membership') return '#6eff9e';
  if (link.kind === 'reduction' || link.kind === 'separation') return '#ff4d6d';
  return '#b682ff';
}

function linkTooltip(link: ComplexityUniverseLink) {
  const relation = complexityRelations.find((item) => item.id === link.id);
  return relation ? getRelationTooltip(relation) : link.label;
}

export function ComplexityUniverse3D({ selectedConceptId, vennExclusiveNodeIds, toggles, onSelectConcept, onSelectRelation, onEvent }: ComplexityUniverse3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const graphRef = useRef<ForceGraph3DInstance<ComplexityUniverseNode, ComplexityUniverseLink> | null>(null);
  const onSelectConceptRef = useRef(onSelectConcept);
  const onSelectRelationRef = useRef(onSelectRelation);
  const onEventRef = useRef(onEvent);
  const [showLabels, setShowLabels] = useState(true);
  const [showNonNeighborEdges, setShowNonNeighborEdges] = useState(false);
  const [clusterMode, setClusterMode] = useState(true);

  const graphData = useMemo(() => buildComplexityUniverseGraph(toggles, clusterMode), [clusterMode, toggles]);
  const neighbors = useMemo(() => getNeighborIds(selectedConceptId, graphData.links), [graphData.links, selectedConceptId]);
  const vennExclusiveSet = useMemo(() => new Set(vennExclusiveNodeIds), [vennExclusiveNodeIds]);
  const selectedConceptKind = useMemo(() => complexityConcepts.find((c) => c.id === selectedConceptId)?.kind, [selectedConceptId]);
  const selectedClassMemberIds = useMemo(() => {
    if (selectedConceptKind === 'class') return new Set(getClassMemberProblemIds(selectedConceptId));
    return new Set<string>();
  }, [selectedConceptId, selectedConceptKind]);

  onSelectConceptRef.current = onSelectConcept;
  onSelectRelationRef.current = onSelectRelation;
  onEventRef.current = onEvent;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const graph = new ForceGraph3D(mount, {
      controlType: 'orbit',
      rendererConfig: { antialias: true, alpha: true },
    }) as unknown as ForceGraph3DInstance<ComplexityUniverseNode, ComplexityUniverseLink>;
    graphRef.current = graph;
    graph
      .backgroundColor('rgba(3,5,10,0)')
      .showNavInfo(false)
      .enableNodeDrag(true)
      .linkHoverPrecision(6)
      .nodeId('id')
      .nodeVal('value')
      .nodeLabel((node) => `${node.name} | ${universeCategoryMeta[node.category].label}`)
      .linkLabel((link) => linkTooltip(link))
      .onNodeClick((node) => onSelectConceptRef.current(node.id))
      .onLinkClick((link) => onSelectRelationRef.current(link.id))
      .onBackgroundClick(() => onSelectConceptRef.current(''))
      .onNodeDragEnd((node) => {
        node.fx = node.x;
        node.fy = node.y;
        node.fz = node.z;
        onEventRef.current(`Nodo 3D ${node.name} reposicionado`, 'info');
      })
      .linkDirectionalParticleSpeed(0.006)
      .linkDirectionalArrowRelPos(1)
      .linkDirectionalArrowLength((link) => (link.primary ? 2.6 : 1.6));

    const ambient = new THREE.AmbientLight(0x91e8ff, 0.62);
    const key = new THREE.PointLight(0x32e6ff, 1.45, 420);
    key.position.set(-80, 80, 120);
    const warm = new THREE.PointLight(0xffd166, 0.9, 320);
    warm.position.set(100, -70, 80);
    graph.lights([ambient, key, warm]);

    return () => {
      graph._destructor();
      graphRef.current = null;
      mount.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    const prevPos = graph.cameraPosition();
    graph.width(mountRef.current?.clientWidth ?? 1).height(mountRef.current?.clientHeight ?? 1);
    graph.graphData(graphData);
    if (prevPos) {
      graph.cameraPosition(prevPos, { x: 0, y: 0, z: 0 }, 0);
    }
  }, [graphData]);

  useEffect(() => {
    const graph = graphRef.current;
    if (!graph) return;
    graph
      .nodeThreeObject((node) => {
        const isClassNode = node.id === selectedConceptId && selectedConceptKind === 'class';
        const isMember = selectedClassMemberIds.has(node.id);
        const isSelectedOrMember = isClassNode || isMember;
        return createNodeObject(node, {
          selected: vennExclusiveSet.size > 0
            ? vennExclusiveSet.has(node.id)
            : isSelectedOrMember,
          neighbor: vennExclusiveSet.size > 0
            ? vennExclusiveSet.has(node.id)
            : isSelectedOrMember || neighbors.has(node.id),
          dimmed: vennExclusiveSet.size > 0
            ? !vennExclusiveSet.has(node.id)
            : selectedClassMemberIds.size > 0
              ? !isSelectedOrMember
              : Boolean(selectedConceptId) && !isSelectedOrMember && !neighbors.has(node.id),
          showLabels,
        });
      })
      .linkVisibility((link) => {
        if (vennExclusiveSet.size > 0) {
          return vennExclusiveSet.has(endpointId(link.source)) || vennExclusiveSet.has(endpointId(link.target));
        }
        if (selectedClassMemberIds.size > 0) {
          const srcId = endpointId(link.source);
          const tgtId = endpointId(link.target);
          if (isIncidentLink(selectedConceptId, link)) return true;
          if (selectedClassMemberIds.has(srcId) || selectedClassMemberIds.has(tgtId)) return true;
          return showNonNeighborEdges && link.primary;
        }
        if (!selectedConceptId) return link.primary;
        if (isIncidentLink(selectedConceptId, link)) return true;
        return showNonNeighborEdges && link.primary;
      })
      .linkColor((link) => linkColor(link, selectedConceptId, showNonNeighborEdges))
      .linkWidth((link) => (vennExclusiveSet.has(endpointId(link.source)) || vennExclusiveSet.has(endpointId(link.target)) || (selectedConceptId && isIncidentLink(selectedConceptId, link)) ? 2.8 : link.primary ? 1.35 : 0.75))
      .linkDirectionalParticles((link) => (vennExclusiveSet.has(endpointId(link.source)) || vennExclusiveSet.has(endpointId(link.target)) || (selectedConceptId && isIncidentLink(selectedConceptId, link)) ? 3 : 0))
      .linkDirectionalParticleWidth((link) => (vennExclusiveSet.has(endpointId(link.source)) || vennExclusiveSet.has(endpointId(link.target)) || (selectedConceptId && isIncidentLink(selectedConceptId, link)) ? 2.6 : 0))
      .linkDirectionalParticleColor((link) => linkColor(link, selectedConceptId, true));
    graph.refresh();
  }, [graphData, neighbors, selectedConceptId, showLabels, showNonNeighborEdges, vennExclusiveSet]);

  useEffect(() => {
    const resize = () => {
      const graph = graphRef.current;
      if (!graph || !mountRef.current) return;
      graph.width(mountRef.current.clientWidth).height(mountRef.current.clientHeight);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  function clearSelection() {
    onSelectConceptRef.current('');
    onEventRef.current('Seleccion limpiada', 'system');
  }

  function resetCamera() {
    graphRef.current?.zoomToFit(900, 80);
    onEventRef.current('Complexity Universe 3D: camera reset', 'system');
  }

  function focusSelectedNode() {
    const graph = graphRef.current;
    const node = graphData.nodes.find((item) => item.id === selectedConceptId);
    if (!graph || !node || node.x === undefined || node.y === undefined || node.z === undefined) return;
    const distance = 58;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);
    const lookAt = { x: node.x, y: node.y, z: node.z };
    graph.cameraPosition({ x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, lookAt, 900);
    onEventRef.current(`Complexity Universe 3D: focus ${node.name}`, 'system');
  }

  return (
    <div className="complexity-universe-shell">
      <div className="complexity-universe-canvas" ref={mountRef} />
      <div className="complexity-universe-topbar">
        <button type="button" onClick={clearSelection}>clear selection</button>
        <button type="button" onClick={resetCamera}>reset camera</button>
        <button type="button" onClick={focusSelectedNode}>focus selected node</button>
        <ToggleButton label="Labels" active={showLabels} onClick={() => setShowLabels((current) => !current)} />
        <ToggleButton label="Non-neighbor edges" active={showNonNeighborEdges} onClick={() => setShowNonNeighborEdges((current) => !current)} />
        <ToggleButton label="Cluster mode" active={clusterMode} onClick={() => setClusterMode((current) => !current)} />
      </div>
      <div className="complexity-universe-legend">
        {categoryOrder.map((category) => (
          <span key={category} style={{ color: universeCategoryMeta[category].color }}><i style={{ background: universeCategoryMeta[category].color }} />{universeCategoryMeta[category].label}</span>
        ))}
      </div>
      <div className="math-symbol-legend">
        {mathSymbolLegend.map((item) => (
          <span key={item.symbol}><code>{item.symbol}</code> {item.label}</span>
        ))}
      </div>
      <div className="complexity-universe-readout">
        <strong>Complexity Explorer Universe</strong>
        <span>{graphData.nodes.length} nodes</span>
        <span>{graphData.links.filter((link) => link.primary).length} primary links</span>
        <span>{vennExclusiveNodeIds.length > 0 ? `${vennExclusiveNodeIds.length} Venn-exclusive nodes emphasized` : selectedClassMemberIds.size > 0 ? `${selectedClassMemberIds.size} member problems highlighted` : selectedConceptId ? `${neighbors.size} neighbors highlighted` : 'no selection — all nodes visible'}</span>
      </div>
    </div>
  );
}
