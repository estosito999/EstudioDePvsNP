import { useState } from 'react';
import { RightInspector } from '../components/layout/RightInspector';
import { Sidebar } from '../components/layout/Sidebar';
import { TopBar, type MobilePanel } from '../components/layout/TopBar';
import { AlgebraicGrobnerLab } from '../modules/algebraic/AlgebraicGrobnerLab';
import { AlgebraicInspector } from '../modules/algebraic/AlgebraicInspector';
import type { AlgebraicConceptId } from '../modules/algebraic/algebraicTypes';
import { AlgorithmInspector } from '../modules/algorithms/AlgorithmInspector';
import { ClassicAlgorithmsLab } from '../modules/algorithms/ClassicAlgorithmsLab';
import { defaultAlgorithmId } from '../modules/algorithms/algorithmsData';
import type { AlgorithmId } from '../modules/algorithms/algorithmTypes';
import { AutomataInspector } from '../modules/automata/AutomataInspector';
import { TuringAutomataLab } from '../modules/automata/TuringAutomataLab';
import type { AutomataModelId } from '../modules/automata/automataTypes';
import { CircuitComplexityLab } from '../modules/circuits/CircuitComplexityLab';
import { CircuitInspector } from '../modules/circuits/CircuitInspector';
import { defaultCircuitId } from '../modules/circuits/circuitData';
import type { BooleanFunctionId } from '../modules/circuits/circuitTypes';
import { CodeVerificationInspector } from '../modules/code-verification/CodeVerificationInspector';
import { CodeVerificationLab } from '../modules/code-verification/CodeVerificationLab';
import type { VerificationLabId } from '../modules/code-verification/verificationTypes';
import { ComplexityExplorer } from '../modules/complexity/ComplexityExplorer';
import { defaultComplexityConceptId, getComplexityConcept } from '../modules/complexity/complexityData';
import { complexityRelations } from '../modules/complexity/complexityRelations';
import { getHighestMisconceptionSeverity, getMisconceptionsByIds } from '../modules/complexity/misconceptionsData';
import type { VennSetId } from '../modules/complexity/complexityVennData';
import {
  initialComplexityExplorerToggles,
  type ComplexityExplorerToggles,
} from '../modules/complexity/complexityTypes';
import { defaultFrontierTopicId } from '../modules/frontier/frontierData';
import type { FrontierTopicId } from '../modules/frontier/frontierTypes';
import { OpenFrontierInspector } from '../modules/frontier/OpenFrontierInspector';
import { OpenFrontierLab } from '../modules/frontier/OpenFrontierLab';
import { ProofInspector } from '../modules/proof/ProofInspector';
import { ProofLab } from '../modules/proof/ProofLab';
import type { ProofId } from '../modules/proof/proofTypes';
import { ProofConsole } from '../modules/proof-console/ProofConsole';
import { ProofConsoleInspector } from '../modules/proof-console/ProofConsoleInspector';
import { ProofComplexityInspector } from '../modules/proof-complexity/ProofComplexityInspector';
import { ProofComplexityLab } from '../modules/proof-complexity/ProofComplexityLab';
import type { ProofSystemId } from '../modules/proof-complexity/proofComplexityTypes';
import { defaultRandomClassId } from '../modules/randomization/randomizationData';
import type { RandomClassId } from '../modules/randomization/randomizationTypes';
import { RandomizationDerandomizationLab } from '../modules/randomization/RandomizationDerandomizationLab';
import { RandomizationInspector } from '../modules/randomization/RandomizationInspector';
import { ReductionInspector } from '../modules/reduction/ReductionInspector';
import { ReductionLab } from '../modules/reduction/ReductionLab';
import { defaultReductionId } from '../modules/reduction/reductionsData';
import type { ReductionId } from '../modules/reduction/reductionTypes';
import { SatInspector } from '../modules/sat/SatInspector';
import { SatZ3Lab } from '../modules/sat/SatZ3Lab';
import { defaultUniverseNodeId, defaultUniverseRouteTargetId } from '../modules/universe/universeData';
import { KnowledgeUniverse3D } from '../modules/universe/KnowledgeUniverse3D';
import { KnowledgeUniverseInspector } from '../modules/universe/KnowledgeUniverseInspector';
import type { UniverseNodeId } from '../modules/universe/universeTypes';

type ModuleId =
  | 'Complexity Explorer'
  | 'Code Verification Lab'
  | 'Proof Lab'
  | 'Reduction Lab'
  | 'Classic Algorithms Lab'
  | 'Turing & Automata Lab'
  | 'SAT / Z3 Lab'
  | 'Circuit Complexity Lab'
  | 'Proof Complexity Lab'
  | 'Algebraic / Gröbner Lab'
  | 'Randomization & Derandomization Lab'
  | 'Open Frontier Lab'
  | '3D Knowledge Universe'
  | 'Proof Console';

type EventLevel = 'system' | 'info' | 'warn';

const severityEventLabels: Record<string, string> = {
  low: 'leve',
  medium: 'medio',
  high: 'alto',
  critical: 'critico',
};

export function App() {
  const [activeModule, setActiveModule] = useState<ModuleId>('Complexity Explorer');
  const [selectedConceptId, setSelectedConceptId] = useState<string>('');
  const [selectedRelationId, setSelectedRelationId] = useState<string | undefined>();
  const [selectedVennSetId, setSelectedVennSetId] = useState<VennSetId | undefined>();
  const [activeVerificationLabId, setActiveVerificationLabId] = useState<VerificationLabId>('bellman-ford');
  const [activeProofId, setActiveProofId] = useState<ProofId>('two-sat-in-p');
  const [activeReductionId, setActiveReductionId] = useState<ReductionId>(defaultReductionId);
  const [activeReductionStepIndex, setActiveReductionStepIndex] = useState(0);
  const [activeAlgorithmId, setActiveAlgorithmId] = useState<AlgorithmId>(defaultAlgorithmId);
  const [activeAutomataModelId, setActiveAutomataModelId] = useState<AutomataModelId>('dtm');
  const [activeCircuitId, setActiveCircuitId] = useState<BooleanFunctionId>(defaultCircuitId);
  const [activeProofSystemId, setActiveProofSystemId] = useState<ProofSystemId>('resolution');
  const [activeAlgebraicConceptId, setActiveAlgebraicConceptId] = useState<AlgebraicConceptId>('clause-polynomial');
  const [activeRandomClassId, setActiveRandomClassId] = useState<RandomClassId>(defaultRandomClassId);
  const [activeFrontierTopicId, setActiveFrontierTopicId] = useState<FrontierTopicId>(defaultFrontierTopicId);
  const [selectedUniverseNodeId, setSelectedUniverseNodeId] = useState<UniverseNodeId>(defaultUniverseNodeId);
  const [universeRouteTargetNodeId, setUniverseRouteTargetNodeId] = useState<UniverseNodeId>(defaultUniverseRouteTargetId);
  const [explorerToggles, setExplorerToggles] = useState<ComplexityExplorerToggles>(initialComplexityExplorerToggles);
  const [mobilePanel, setMobilePanel] = useState<MobilePanel>('workspace');

  const selectedConcept = getComplexityConcept(selectedConceptId);

  function pushEvent(_message: string, _level: EventLevel = 'info') {
    // Event Log was intentionally removed from the UI; keep this no-op callback so modules stay decoupled.
  }

  function handleSelectConcept(conceptId: string) {
    setSelectedConceptId(conceptId);
    setSelectedRelationId(undefined);

    if (!conceptId) {
      setSelectedVennSetId(undefined);
      pushEvent('Seleccion limpiada', 'system');
      return;
    }

    const concept = getComplexityConcept(conceptId);
    const conceptMisconceptions = getMisconceptionsByIds(concept.misconceptionIds);
    const highestSeverity = getHighestMisconceptionSeverity(conceptMisconceptions);

    if (explorerToggles.showMisconceptions && conceptMisconceptions.length > 0) {
      pushEvent(
        `Nodo ${conceptId} seleccionado: ${conceptMisconceptions.length} error comun ${highestSeverity ? severityEventLabels[highestSeverity] : 'registrado'} disponible`,
        highestSeverity === 'critical' ? 'warn' : 'info',
      );

      if (highestSeverity === 'critical') {
        pushEvent(`Error comun critico detectado en ${conceptId}`, 'warn');
      }

      pushEvent(`Mostrando correcciones para ${conceptId}`, 'system');
      return;
    }

    pushEvent(`Nodo ${conceptId} seleccionado`, 'info');
  }

  function handleSelectVennSet(setId: VennSetId) {
    setSelectedVennSetId(setId);
    setSelectedConceptId(setId);
    setSelectedRelationId(undefined);
    pushEvent(`Set / Venn seleccionado: ${setId}`, 'system');
    pushEvent(`Region exclusiva activa para Universe / Graph View: ${setId}`, 'info');
  }

  function handleSelectRelation(relationId: string) {
    const relation = complexityRelations.find((item) => item.id === relationId);
    setSelectedRelationId(relationId);
    setSelectedVennSetId(undefined);
    if (relation) {
      pushEvent(`Relacion ${relation.label} seleccionada`, relation.truthStatus === 'open' ? 'warn' : 'info');
      return;
    }

    pushEvent(`Relacion ${relationId} seleccionada`, 'info');
  }

  function handleModuleChange(module: string) {
    const nextModule = module as ModuleId;
    setActiveModule(nextModule);

    if (nextModule === 'Code Verification Lab') {
      pushEvent('Code Verification Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Proof Lab') {
      pushEvent('Proof Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Reduction Lab') {
      pushEvent('Reduction Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Classic Algorithms Lab') {
      pushEvent('Classic Algorithms Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Turing & Automata Lab') {
      pushEvent('Turing & Automata Lab abierto', 'system');
      pushEvent('Maquina de Turing cargada', 'system');
      return;
    }

    if (nextModule === 'SAT / Z3 Lab') {
      pushEvent('SAT / Z3 Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Circuit Complexity Lab') {
      pushEvent('Circuit Complexity Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Proof Complexity Lab') {
      pushEvent('Proof Complexity Lab abierto', 'system');
      return;
    }

    if (nextModule === 'Algebraic / Gröbner Lab') {
      pushEvent('Algebraic / Gröbner Lab abierto', 'system');
      pushEvent('Traduccion SAT a sistema polinomial cargada', 'system');
      return;
    }

    if (nextModule === 'Randomization & Derandomization Lab') {
      pushEvent('Randomization & Derandomization Lab abierto', 'system');
      pushEvent('Clases BPP, RP, co-RP y ZPP cargadas', 'system');
      return;
    }

    if (nextModule === 'Open Frontier Lab') {
      pushEvent('Open Frontier Lab abierto', 'system');
      pushEvent('Guardrail: problemas abiertos y barreras no son demostraciones', 'warn');
      return;
    }

    if (nextModule === '3D Knowledge Universe') {
      pushEvent('3D Knowledge Universe abierto', 'system');
      pushEvent('Canvas Three.js cargado con clusters SAT, Complexity y Proof', 'system');
      return;
    }

    if (nextModule === 'Proof Console') {
      pushEvent('Proof Console abierto', 'system');
      pushEvent('Terminal de Truth Layer listo para comandos', 'system');
      return;
    }

    pushEvent('Complexity Explorer abierto', 'system');
  }

  const selectedLabel = (() => {
    if (activeModule === 'Complexity Explorer') return selectedConceptId ? selectedConcept.label : '— no selection —';
    if (activeModule === 'Code Verification Lab') {
      return activeVerificationLabId === 'bellman-ford' ? 'Bellman-Ford Lab' : 'Brute Force 3-SAT Lab';
    }
    if (activeModule === 'Reduction Lab') return activeReductionId;
    if (activeModule === 'Classic Algorithms Lab') return activeAlgorithmId;
    if (activeModule === 'Turing & Automata Lab') return activeAutomataModelId;
    if (activeModule === 'SAT / Z3 Lab') return 'CNF Builder + DPLL + Z3';
    if (activeModule === 'Circuit Complexity Lab') return activeCircuitId;
    if (activeModule === 'Proof Complexity Lab') return activeProofSystemId;
    if (activeModule === 'Algebraic / Gröbner Lab') return activeAlgebraicConceptId;
    if (activeModule === 'Randomization & Derandomization Lab') return activeRandomClassId.toUpperCase();
    if (activeModule === 'Open Frontier Lab') return activeFrontierTopicId;
    if (activeModule === '3D Knowledge Universe') return selectedUniverseNodeId;
    if (activeModule === 'Proof Console') return 'Truth Query Terminal';
    return activeProofId === 'two-sat-in-p' ? '2-SAT en P' : 'SAT en NP';
  })();

  return (
    <div className={`app-shell mobile-${mobilePanel}`}>
      <TopBar activeModule={activeModule} selectedClass={selectedLabel} mobilePanel={mobilePanel} onMobilePanelChange={setMobilePanel} />
      <Sidebar activeModule={activeModule} onModuleChange={handleModuleChange} onMobilePanelChange={() => setMobilePanel('workspace')} />
      <main className="workspace-panel" aria-label="Visualizacion principal">
        {activeModule === 'Complexity Explorer' ? (
          <ComplexityExplorer
            selectedConceptId={selectedConceptId}
            selectedRelationId={selectedRelationId}
            selectedVennSetId={selectedVennSetId}
            toggles={explorerToggles}
            onToggleChange={setExplorerToggles}
            onSelectConcept={handleSelectConcept}
            onSelectRelation={handleSelectRelation}
            onSelectVennSet={handleSelectVennSet}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Code Verification Lab' ? (
          <CodeVerificationLab
            activeLabId={activeVerificationLabId}
            onLabChange={setActiveVerificationLabId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Proof Lab' ? (
          <ProofLab
            activeProofId={activeProofId}
            onProofChange={setActiveProofId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Reduction Lab' ? (
          <ReductionLab
            activeReductionId={activeReductionId}
            activeStepIndex={activeReductionStepIndex}
            onReductionChange={setActiveReductionId}
            onStepChange={setActiveReductionStepIndex}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Classic Algorithms Lab' ? (
          <ClassicAlgorithmsLab
            activeAlgorithmId={activeAlgorithmId}
            onAlgorithmChange={setActiveAlgorithmId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Turing & Automata Lab' ? (
          <TuringAutomataLab
            activeModelId={activeAutomataModelId}
            onModelChange={setActiveAutomataModelId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'SAT / Z3 Lab' ? (
          <SatZ3Lab onEvent={pushEvent} />
        ) : activeModule === 'Circuit Complexity Lab' ? (
          <CircuitComplexityLab
            activeCircuitId={activeCircuitId}
            onCircuitChange={setActiveCircuitId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Proof Complexity Lab' ? (
          <ProofComplexityLab
            activeTopicId={activeProofSystemId}
            onTopicChange={setActiveProofSystemId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Algebraic / Gröbner Lab' ? (
          <AlgebraicGrobnerLab
            activeConceptId={activeAlgebraicConceptId}
            onConceptChange={setActiveAlgebraicConceptId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Randomization & Derandomization Lab' ? (
          <RandomizationDerandomizationLab
            activeClassId={activeRandomClassId}
            onClassChange={setActiveRandomClassId}
            onEvent={pushEvent}
          />
        ) : activeModule === 'Open Frontier Lab' ? (
          <OpenFrontierLab
            activeTopicId={activeFrontierTopicId}
            onTopicChange={setActiveFrontierTopicId}
            onEvent={pushEvent}
          />
        ) : activeModule === '3D Knowledge Universe' ? (
          <KnowledgeUniverse3D
            selectedNodeId={selectedUniverseNodeId}
            routeTargetNodeId={universeRouteTargetNodeId}
            onNodeChange={setSelectedUniverseNodeId}
            onRouteTargetChange={setUniverseRouteTargetNodeId}
            onEvent={pushEvent}
          />
        ) : (
          <ProofConsole onEvent={pushEvent} />
        )}
      </main>
      {activeModule === 'Complexity Explorer' ? (
        <RightInspector selectedConcept={selectedConcept} selectedRelationId={selectedRelationId} selectedVennSetId={selectedVennSetId} toggles={explorerToggles} />
      ) : activeModule === 'Code Verification Lab' ? (
        <CodeVerificationInspector activeLabId={activeVerificationLabId} />
      ) : activeModule === 'Proof Lab' ? (
        <ProofInspector activeProofId={activeProofId} />
      ) : activeModule === 'Reduction Lab' ? (
        <ReductionInspector activeReductionId={activeReductionId} />
      ) : activeModule === 'Classic Algorithms Lab' ? (
        <AlgorithmInspector activeAlgorithmId={activeAlgorithmId} />
      ) : activeModule === 'Turing & Automata Lab' ? (
        <AutomataInspector activeModelId={activeAutomataModelId} />
      ) : activeModule === 'SAT / Z3 Lab' ? (
        <SatInspector />
      ) : activeModule === 'Circuit Complexity Lab' ? (
        <CircuitInspector activeCircuitId={activeCircuitId} />
      ) : activeModule === 'Proof Complexity Lab' ? (
        <ProofComplexityInspector activeTopicId={activeProofSystemId} />
      ) : activeModule === 'Algebraic / Gröbner Lab' ? (
        <AlgebraicInspector activeConceptId={activeAlgebraicConceptId} />
      ) : activeModule === 'Randomization & Derandomization Lab' ? (
        <RandomizationInspector activeClassId={activeRandomClassId} />
      ) : activeModule === 'Open Frontier Lab' ? (
        <OpenFrontierInspector activeTopicId={activeFrontierTopicId} />
      ) : activeModule === '3D Knowledge Universe' ? (
        <KnowledgeUniverseInspector selectedNodeId={selectedUniverseNodeId} routeTargetNodeId={universeRouteTargetNodeId} />
      ) : (
        <ProofConsoleInspector />
      )}
    </div>
  );
}
