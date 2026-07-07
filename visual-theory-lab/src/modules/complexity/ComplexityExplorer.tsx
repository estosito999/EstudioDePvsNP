import { useState, type Dispatch, type SetStateAction } from 'react';
import { ComplexityGraph } from '../../components/graph/ComplexityGraph';
import { ComplexitySetVennView } from '../../components/graph/ComplexitySetVennView';
import { ComplexityUniverse3D } from '../../components/graph/ComplexityUniverse3D';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ToggleButton } from '../../components/ui/ToggleButton';
import { getComplexityConcept } from './complexityData';
import { complexityRelations } from './complexityRelations';
import { getGraphDiagnostics, getRelationTypeLabel, relationVisualLabels, type RelationVisualKind } from './complexityGraphAnalysis';
import { getVennExclusiveNodeIds, type VennSetId } from './complexityVennData';
import { getHighestMisconceptionSeverity, getMisconceptionsByIds } from './misconceptionsData';
import { mathSymbolLegend } from './complexitySetTheory';
import type { ComplexityExplorerToggles } from './complexityTypes';

type ComplexityExplorerProps = {
  selectedConceptId: string;
  toggles: ComplexityExplorerToggles;
  selectedRelationId?: string;
  selectedVennSetId?: VennSetId;
  onToggleChange: Dispatch<SetStateAction<ComplexityExplorerToggles>>;
  onSelectConcept: (conceptId: string) => void;
  onSelectRelation: (relationId: string) => void;
  onSelectVennSet: (setId: VennSetId) => void;
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

type ToggleCopy = {
  active: string;
  inactive: string;
};

const toggleCopy: Record<keyof ComplexityExplorerToggles, ToggleCopy> = {
  inclusions: { active: 'Relaciones de inclusion activadas', inactive: 'Relaciones de inclusion desactivadas' },
  reductions: { active: 'Relaciones de reduccion activadas', inactive: 'Relaciones de reduccion desactivadas' },
  labels: { active: 'Etiquetas activadas', inactive: 'Etiquetas desactivadas' },
  technicalMode: { active: 'Modo tecnico activado', inactive: 'Modo tecnico desactivado' },
  showBasic: { active: 'Capa basica activada', inactive: 'Capa basica oculta' },
  showRandomized: { active: 'Capa aleatorizacion activada', inactive: 'Capa aleatorizacion oculta' },
  showCircuit: { active: 'Capa circuitos activada', inactive: 'Capa circuitos oculta' },
  showAdvanced: { active: 'Capa avanzada activada', inactive: 'Capa avanzada oculta' },
  showProblems: { active: 'Problemas ejemplo activados', inactive: 'Problemas ejemplo ocultos' },
  showMisconceptions: { active: 'Misconception Layer activada', inactive: 'Misconception Layer desactivada' },
  showTruthStatus: { active: 'Truth Layer activada', inactive: 'Truth Layer desactivada' },
};

const severityEventLabels: Record<string, string> = {
  low: 'leve',
  medium: 'medio',
  high: 'alto',
  critical: 'critico',
};

const relationLegendKinds: RelationVisualKind[] = ['inclusion', 'reduction', 'membership', 'open', 'separation', 'conceptual'];

const graphZones = [
  { label: 'clases básicas', tone: 'cyan' },
  { label: 'problemas NP-completos', tone: 'red' },
  { label: 'clases de circuitos', tone: 'purple' },
  { label: 'aleatorización', tone: 'green' },
  { label: 'problemas abiertos', tone: 'yellow' },
] as const;

export function ComplexityExplorer({
  selectedConceptId,
  selectedRelationId,
  selectedVennSetId,
  toggles,
  onToggleChange,
  onSelectConcept,
  onSelectRelation,
  onSelectVennSet,
  onEvent,
}: ComplexityExplorerProps) {
  const [explorerView, setExplorerView] = useState<'universe' | 'venn'>('universe');
  const [graphView, setGraphView] = useState<'3d' | '2d'>('3d');
  const diagnostics = getGraphDiagnostics(toggles);
  const selectedRelation = selectedRelationId ? complexityRelations.find((relation) => relation.id === selectedRelationId) : undefined;
  const vennExclusiveNodeIds = getVennExclusiveNodeIds(selectedVennSetId);
  const graphDisplayToggles = selectedVennSetId
    ? { ...toggles, showBasic: true, showRandomized: true, showCircuit: true, showAdvanced: true, showProblems: true }
    : toggles;

  function updateToggle(key: keyof ComplexityExplorerToggles) {
    onToggleChange((current) => {
      const nextValue = !current[key];
      onEvent(nextValue ? toggleCopy[key].active : toggleCopy[key].inactive, 'system');

      if (key === 'showMisconceptions' && nextValue) {
        const selectedConcept = getComplexityConcept(selectedConceptId);
        const conceptMisconceptions = getMisconceptionsByIds(selectedConcept.misconceptionIds);
        const highestSeverity = getHighestMisconceptionSeverity(conceptMisconceptions);

        if (conceptMisconceptions.length > 0) {
          onEvent(
            `Nodo ${selectedConceptId} seleccionado: ${conceptMisconceptions.length} error comun ${highestSeverity ? severityEventLabels[highestSeverity] : 'registrado'} disponible`,
            highestSeverity === 'critical' ? 'warn' : 'info',
          );

          if (highestSeverity === 'critical') {
            onEvent(`Error comun critico detectado en ${selectedConceptId}`, 'warn');
          }

          onEvent(`Mostrando correcciones para ${selectedConceptId}`, 'system');
        }
      }

      return { ...current, [key]: nextValue };
    });
  }

  return (
    <section className="module-shell">
      <header className="module-toolbar">
        <div>
          <p className="eyebrow">Modulo activo</p>
          <h1>Complexity Explorer</h1>
        </div>
        <div className="toolbar-actions" aria-label="Controles del grafo">
          <StatusBadge label="LOCAL MOCK" tone="cyan" />
          <ToggleButton label="Universe View" active={explorerView === 'universe'} onClick={() => { setExplorerView('universe'); onEvent('Universe / Graph View activada', 'system'); }} />
          <ToggleButton label="Set / Venn View" active={explorerView === 'venn'} onClick={() => { setExplorerView('venn'); onEvent('Set / Venn View activada', 'system'); }} />
          {explorerView === 'universe' ? (
            <ToggleButton
              label={graphView === '3d' ? '3D Universe' : '2D fallback'}
              active={graphView === '3d'}
              onClick={() => {
                const nextView = graphView === '3d' ? '2d' : '3d';
                setGraphView(nextView);
                onEvent(nextView === '3d' ? 'Complexity Universe 3D activado' : 'Complexity Graph 2D fallback activado', 'system');
              }}
            />
          ) : null}
          {selectedVennSetId && explorerView === 'universe' ? <StatusBadge label={`VENN REGION: ${selectedVennSetId}`} tone="yellow" /> : null}
          {toggles.showMisconceptions ? <StatusBadge label="MISCONCEPTION LAYER" tone="red" /> : null}
          <ToggleButton
            label="Inclusiones"
            active={toggles.inclusions}
            onClick={() => updateToggle('inclusions')}
          />
          <ToggleButton
            label="Reducciones"
            active={toggles.reductions}
            onClick={() => updateToggle('reductions')}
          />
          <ToggleButton
            label="Etiquetas"
            active={toggles.labels}
            onClick={() => updateToggle('labels')}
          />
          <ToggleButton
            label="Modo tecnico"
            active={toggles.technicalMode}
            onClick={() => updateToggle('technicalMode')}
          />
          <ToggleButton
            label="Basic"
            active={toggles.showBasic}
            onClick={() => updateToggle('showBasic')}
          />
          <ToggleButton
            label="Randomized"
            active={toggles.showRandomized}
            onClick={() => updateToggle('showRandomized')}
          />
          <ToggleButton
            label="Circuit"
            active={toggles.showCircuit}
            onClick={() => updateToggle('showCircuit')}
          />
          <ToggleButton
            label="Advanced"
            active={toggles.showAdvanced}
            onClick={() => updateToggle('showAdvanced')}
          />
          <ToggleButton
            label="Problemas"
            active={toggles.showProblems}
            onClick={() => updateToggle('showProblems')}
          />
          <ToggleButton
            label="Errores comunes"
            active={toggles.showMisconceptions}
            onClick={() => updateToggle('showMisconceptions')}
          />
          <ToggleButton
            label="Truth Layer"
            active={toggles.showTruthStatus}
            onClick={() => updateToggle('showTruthStatus')}
          />
        </div>
      </header>

      <div className="graph-frame">
        <div className="complexity-view-tabs" aria-label="Vistas del Complexity Explorer">
          <button className={explorerView === 'universe' ? 'active' : ''} type="button" onClick={() => { setExplorerView('universe'); onEvent('Universe / Graph View activada', 'system'); }}>Universe View</button>
          <button className={explorerView === 'venn' ? 'active' : ''} type="button" onClick={() => { setExplorerView('venn'); onEvent('Set / Venn View activada', 'system'); }}>Set / Venn View</button>
        </div>

        <div className="complexity-view-body">
          {explorerView === 'venn' ? (
            <ComplexitySetVennView selectedSetId={selectedVennSetId} onSelectSet={onSelectVennSet} />
          ) : graphView === '3d' ? (
            <ComplexityUniverse3D
              selectedConceptId={selectedConceptId}
              vennExclusiveNodeIds={vennExclusiveNodeIds}
              toggles={graphDisplayToggles}
              onSelectConcept={onSelectConcept}
              onSelectRelation={onSelectRelation}
              onEvent={onEvent}
            />
          ) : (
            <>
              <div className="graph-zone-strip" aria-label="Zonas conceptuales del grafo">
                {graphZones.map((zone) => <span className={`graph-zone-chip ${zone.tone}`} key={zone.label}>{zone.label}</span>)}
              </div>

              <div className="graph-stats-panel" aria-label="Contadores del grafo">
                <strong>{diagnostics.visibleNodes}</strong><span>nodos visibles</span>
                <strong>{diagnostics.visibleEdges}</strong><span>relaciones visibles</span>
                <strong>{diagnostics.visibleTheorems}</strong><span>teoremas visibles</span>
                <strong>{diagnostics.visibleOpenProblems}</strong><span>abiertos visibles</span>
              </div>

              <div className="relation-legend-panel" aria-label="Leyenda de relaciones">
                {relationLegendKinds.map((kind) => (
                  <span className={`relation-legend-item ${kind}`} key={kind}><i />{relationVisualLabels[kind]}</span>
                ))}
              </div>
              <div className="math-symbol-legend">
                {mathSymbolLegend.map((item) => (
                  <span key={item.symbol}><code>{item.symbol}</code> {item.label}</span>
                ))}
              </div>

              <div className="graph-diagnostics-panel" aria-label="Graph Diagnostics">
                <div><strong>Graph Diagnostics</strong><span>control-room</span></div>
                <dl>
                  <dt>total nodes</dt><dd>{diagnostics.totalNodes}</dd>
                  <dt>total edges</dt><dd>{diagnostics.totalEdges}</dd>
                  <dt>active filters</dt><dd>{diagnostics.activeFilters.join(', ') || 'none'}</dd>
                  <dt>selected concept</dt><dd>{selectedConceptId}</dd>
                  <dt>selected relation</dt><dd>{selectedRelation ? `${selectedRelation.label} / ${getRelationTypeLabel(selectedRelation)}` : 'none'}</dd>
                </dl>
              </div>

              <ComplexityGraph
                selectedConceptId={selectedConceptId}
                selectedRelationId={selectedRelationId}
                vennExclusiveNodeIds={vennExclusiveNodeIds}
                toggles={graphDisplayToggles}
                onSelectConcept={onSelectConcept}
                onSelectRelation={onSelectRelation}
                onNodeMoved={(nodeId) => onEvent(`Nodo ${nodeId} movido`, 'info')}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
