import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { getUniverseCluster, getUniverseNode, universeClusters, universeLinks, universeNodes } from '../../modules/universe/universeData';
import type { UniverseNodeId } from '../../modules/universe/universeTypes';

type UniverseCanvas3DProps = {
  selectedNodeId: UniverseNodeId;
  routeNodeIds: UniverseNodeId[];
  onSelectNode: (nodeId: UniverseNodeId) => void;
};

type DragState = {
  mode: 'rotate' | 'pan' | null;
  startX: number;
  startY: number;
  lastX: number;
  lastY: number;
  moved: boolean;
};

function createLabelSprite(label: string, color: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.Sprite();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = '600 44px Cascadia Code, monospace';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.shadowColor = color;
  context.shadowBlur = 18;
  context.fillStyle = color;
  context.fillText(label, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.8, 0.45, 1);
  return sprite;
}

function pairKey(a: UniverseNodeId, b: UniverseNodeId) {
  return [a, b].sort().join('::');
}

export function UniverseCanvas3D({ selectedNodeId, routeNodeIds, onSelectNode }: UniverseCanvas3DProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const onSelectRef = useRef(onSelectNode);
  onSelectRef.current = onSelectNode;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const mountElement = mount;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x03050a);
    scene.fog = new THREE.Fog(0x03050a, 12, 28);

    const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.className = 'universe-webgl-canvas';
    mountElement.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x8aa8ff, 0.5);
    const keyLight = new THREE.PointLight(0x32e6ff, 2.2, 32);
    keyLight.position.set(-3, 6, 8);
    const warmLight = new THREE.PointLight(0xffd166, 1.5, 28);
    warmLight.position.set(5, -5, 4);
    scene.add(ambient, keyLight, warmLight);

    const target = new THREE.Vector3(0, -0.6, 0);
    let radius = 14;
    let theta = 0.74;
    let phi = 1.16;

    function updateCamera() {
      phi = Math.max(0.22, Math.min(Math.PI - 0.22, phi));
      radius = Math.max(6, Math.min(28, radius));
      camera.position.set(
        target.x + radius * Math.sin(phi) * Math.sin(theta),
        target.y + radius * Math.cos(phi),
        target.z + radius * Math.sin(phi) * Math.cos(theta),
      );
      camera.lookAt(target);
    }

    const grid = new THREE.GridHelper(18, 18, 0x164a5a, 0x0d2330);
    grid.position.y = -6.5;
    scene.add(grid);

    const routePairs = new Set<string>();
    for (let index = 0; index < routeNodeIds.length - 1; index += 1) {
      routePairs.add(pairKey(routeNodeIds[index], routeNodeIds[index + 1]));
    }

    const nodeMeshes: THREE.Mesh[] = [];
    const nodePositions = new Map<UniverseNodeId, THREE.Vector3>();
    const routePoints: THREE.Vector3[] = [];

    universeNodes.forEach((node) => {
      const cluster = getUniverseCluster(node.cluster);
      const color = new THREE.Color(cluster.color);
      const isSelected = node.id === selectedNodeId;
      const isInRoute = routeNodeIds.includes(node.id);
      const geometry = new THREE.SphereGeometry(isSelected ? 0.24 : 0.18, 32, 16);
      const material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: isSelected ? 1.1 : isInRoute ? 0.72 : 0.35,
        roughness: 0.4,
        metalness: 0.35,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...node.position);
      mesh.userData.nodeId = node.id;
      scene.add(mesh);
      nodeMeshes.push(mesh);
      nodePositions.set(node.id, mesh.position.clone());

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(isSelected ? 0.42 : 0.32, 32, 12),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: isSelected ? 0.18 : 0.075, wireframe: true }),
      );
      halo.position.copy(mesh.position);
      scene.add(halo);

      const label = createLabelSprite(node.label, cluster.color);
      label.position.copy(mesh.position).add(new THREE.Vector3(0, 0.48, 0));
      scene.add(label);
    });

    universeClusters.forEach((cluster) => {
      const clusterNodes = universeNodes.filter((node) => node.cluster === cluster.id);
      const center = clusterNodes.reduce((sum, node) => sum.add(new THREE.Vector3(...node.position)), new THREE.Vector3()).divideScalar(clusterNodes.length);
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(2.45, 0.01, 8, 96),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(cluster.color), transparent: true, opacity: 0.35 }),
      );
      ring.position.copy(center);
      ring.rotation.x = Math.PI / 2.25;
      scene.add(ring);
    });

    universeLinks.forEach((link) => {
      const source = nodePositions.get(link.source);
      const targetPoint = nodePositions.get(link.target);
      if (!source || !targetPoint) return;
      const isRoute = routePairs.has(pairKey(link.source, link.target));
      const geometry = new THREE.BufferGeometry().setFromPoints([source, targetPoint]);
      const material = new THREE.LineBasicMaterial({ color: isRoute ? 0xffd166 : 0x2a6b7a, transparent: true, opacity: isRoute ? 0.96 : 0.32 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    });

    routeNodeIds.forEach((nodeId) => {
      const point = nodePositions.get(nodeId);
      if (point) routePoints.push(point.clone());
    });

    const particles = Array.from({ length: Math.max(3, routePoints.length * 2) }, (_, index) => {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.055, 12, 8),
        new THREE.MeshBasicMaterial({ color: index % 2 === 0 ? 0xffd166 : 0x32e6ff }),
      );
      scene.add(particle);
      return particle;
    });

    const drag: DragState = { mode: null, startX: 0, startY: 0, lastX: 0, lastY: 0, moved: false };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    function resize() {
      const width = Math.max(1, mountElement.clientWidth);
      const height = Math.max(1, mountElement.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }

    function pickNode(event: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(nodeMeshes, false)[0];
      const nodeId = hit?.object.userData.nodeId as UniverseNodeId | undefined;
      if (nodeId) onSelectRef.current(nodeId);
    }

    function onPointerDown(event: PointerEvent) {
      renderer.domElement.setPointerCapture(event.pointerId);
      drag.mode = event.button === 2 || event.shiftKey ? 'pan' : 'rotate';
      drag.startX = event.clientX;
      drag.startY = event.clientY;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      drag.moved = false;
    }

    function onPointerMove(event: PointerEvent) {
      if (!drag.mode) return;
      const dx = event.clientX - drag.lastX;
      const dy = event.clientY - drag.lastY;
      if (Math.abs(event.clientX - drag.startX) + Math.abs(event.clientY - drag.startY) > 4) drag.moved = true;
      if (drag.mode === 'rotate') {
        theta -= dx * 0.006;
        phi -= dy * 0.006;
      } else {
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        const right = new THREE.Vector3().crossVectors(direction, camera.up).normalize();
        const up = new THREE.Vector3().copy(camera.up).normalize();
        target.addScaledVector(right, -dx * 0.01);
        target.addScaledVector(up, dy * 0.01);
      }
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      updateCamera();
    }

    function onPointerUp(event: PointerEvent) {
      if (!drag.moved) pickNode(event);
      drag.mode = null;
      renderer.domElement.releasePointerCapture(event.pointerId);
    }

    function onWheel(event: WheelEvent) {
      event.preventDefault();
      radius += event.deltaY * 0.012;
      updateCamera();
    }

    function onContextMenu(event: MouseEvent) {
      event.preventDefault();
    }

    renderer.domElement.addEventListener('pointerdown', onPointerDown);
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerup', onPointerUp);
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false });
    renderer.domElement.addEventListener('contextmenu', onContextMenu);
    window.addEventListener('resize', resize);

    let frameId = 0;
    const clock = new THREE.Clock();
    function animate() {
      const elapsed = clock.getElapsedTime();
      keyLight.intensity = 1.8 + Math.sin(elapsed * 1.8) * 0.35;
      if (routePoints.length > 1) {
        particles.forEach((particle, index) => {
          const phase = (elapsed * 0.28 + index / particles.length) % 1;
          const segmentCount = routePoints.length - 1;
          const scaled = phase * segmentCount;
          const segment = Math.min(segmentCount - 1, Math.floor(scaled));
          const local = scaled - segment;
          particle.position.copy(routePoints[segment]).lerp(routePoints[segment + 1], local);
        });
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }

    resize();
    updateCamera();
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('pointerup', onPointerUp);
      renderer.domElement.removeEventListener('wheel', onWheel);
      renderer.domElement.removeEventListener('contextmenu', onContextMenu);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line || object instanceof THREE.Sprite) {
          object.geometry?.dispose?.();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material?.dispose?.();
        }
      });
      renderer.dispose();
      mountElement.removeChild(renderer.domElement);
    };
  }, [routeNodeIds, selectedNodeId]);

  const selectedNode = getUniverseNode(selectedNodeId);
  return (
    <div className="universe-canvas-shell">
      <div className="universe-canvas" ref={mountRef} />
      <div className="universe-hud top-left">
        <span>ROTATE drag</span>
        <span>PAN shift+drag / right drag</span>
        <span>ZOOM wheel</span>
        <span>CLICK node</span>
      </div>
      <div className="universe-hud bottom-right">
        <strong>{selectedNode.label}</strong>
        <span>{getUniverseCluster(selectedNode.cluster).label}</span>
      </div>
    </div>
  );
}
