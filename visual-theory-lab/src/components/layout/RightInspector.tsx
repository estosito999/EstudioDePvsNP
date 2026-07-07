import { ComplexityProfileCard } from '../inspector/ComplexityProfileCard';
import { MisconceptionPanel } from '../inspector/MisconceptionPanel';
import { complexityCodeSnippets } from '../../modules/complexity/complexityCodeSnippets';
import { complexityRelations } from '../../modules/complexity/complexityRelations';
import {
  getRelationCodeReferences,
  getRelationExample,
  getRelationExplanation,
  getRelationTypeLabel,
  relationTruthLabels,
} from '../../modules/complexity/complexityGraphAnalysis';
import {
  getVennChildren,
  getVennCodeReferences,
  getVennExclusiveNodeIds,
  getVennMarkerConcepts,
  getVennSet,
  getVennStrictSubsetIds,
  getVennSupersetIds,
  type VennSetId,
} from '../../modules/complexity/complexityVennData';
import { getMisconceptionsByIds } from '../../modules/complexity/misconceptionsData';
import {
  conceptLayerLabels,
  truthStatusLabels,
  type CodeReference,
  type ComplexityExplorerToggles,
  type ConceptNode,
  type TruthStatus,
} from '../../modules/complexity/complexityTypes';
import {
  formatMembershipFormula,
  formatInclusionFormula,
  getClassInclusionFormulas,
  getClassSubInclusionFormulas,
  getClassMemberFormulas,
  getClassReductionFormulas,
  getProblemMembershipFormulas,
  getProblemReductionFormulas,
  getMathConceptLabel,
} from '../../modules/complexity/complexitySetTheory';
import { StatusBadge } from '../ui/StatusBadge';

type RightInspectorProps = {
  selectedConcept: ConceptNode;
  selectedRelationId?: string;
  selectedVennSetId?: VennSetId;
  toggles: ComplexityExplorerToggles;
};

const truthTone: Record<TruthStatus, 'green' | 'cyan' | 'purple' | 'red' | 'yellow'> = {
  definition: 'cyan',
  theorem: 'green',
  experiment: 'yellow',
  intuition: 'purple',
  conjecture: 'yellow',
  open: 'red',
  common_error: 'red',
};

function renderList(items: string[], emptyText: string) {
  if (items.length === 0) {
    return <p className="muted-copy">{emptyText}</p>;
  }

  return (
    <ul className="inspector-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function copyPath(path: string) {
  if (!navigator.clipboard) return;
  void navigator.clipboard.writeText(path);
}

function CodeReferenceCard({ reference }: { reference: CodeReference }) {
  const fileName = reference.path.split('/').at(-1) ?? reference.path;

  return (
    <article className="code-reference-card">
      <div className="code-reference-topline">
        <strong>{reference.label}</strong>
        <button type="button" onClick={() => copyPath(reference.path)}>Copiar ruta</button>
      </div>
      <dl className="code-reference-grid">
        <dt>Archivo</dt>
        <dd><code>{reference.path}</code></dd>
        <dt>Nombre</dt>
        <dd>{fileName}</dd>
        {reference.module ? (
          <>
            <dt>Modulo</dt>
            <dd>{reference.module}</dd>
          </>
        ) : null}
        {reference.symbol ? (
          <>
            <dt>Simbolo</dt>
            <dd><code>{reference.symbol}</code></dd>
          </>
        ) : null}
        <dt>Uso</dt>
        <dd>{reference.description}</dd>
      </dl>
    </article>
  );
}

export function RightInspector({ selectedConcept, selectedRelationId, selectedVennSetId, toggles }: RightInspectorProps) {
  const snippetId = selectedConcept.codeSnippetId ?? selectedConcept.id;
  const snippet = complexityCodeSnippets[snippetId];
  const codeReferences = selectedConcept.codeReferences ?? [];
  const conceptMisconceptions = getMisconceptionsByIds(selectedConcept.misconceptionIds);
  const selectedRelation = selectedRelationId ? complexityRelations.find((relation) => relation.id === selectedRelationId) : undefined;
  const selectedVennSet = getVennSet(selectedVennSetId);

  if (selectedVennSet && selectedVennSet.id === selectedConcept.id) {
    const childSets = getVennChildren(selectedVennSet.id);
    const supersetIds = getVennSupersetIds(selectedVennSet.id);
    const strictSubsetIds = getVennStrictSubsetIds(selectedVennSet.id);
    const exclusiveNodeIds = getVennExclusiveNodeIds(selectedVennSet.id);
    const markers = getVennMarkerConcepts(selectedVennSet.id);
    const vennReferences = getVennCodeReferences(selectedVennSet.id);

    return (
      <aside className="inspector-panel">
        <div className="panel-title-row inspector-heading">
          <div>
            <p className="eyebrow">Inspector / Set Venn</p>
            <h2>{selectedVennSet.label}</h2>
          </div>
          <StatusBadge label="SET REGION" tone="yellow" />
        </div>

        <div className="inspector-meta-grid">
          <StatusBadge label={selectedVennSet.group} tone="cyan" />
          <StatusBadge label={selectedVennSet.exclusiveLabel} tone="yellow" />
          <StatusBadge label={`${exclusiveNodeIds.length} exclusive nodes`} tone="purple" />
        </div>

        <section className="inspector-section compact">
          <h3>Definicion</h3>
          <p>{selectedConcept.id === selectedVennSet.id ? selectedConcept.definition : selectedVennSet.note}</p>
        </section>

        <section className="inspector-section compact">
          <h3>Subconjuntos visibles</h3>
          {renderList(childSets.map((child) => child.label), 'No tiene subconjuntos visibles en este diagrama.')}
        </section>

        <section className="inspector-section compact">
          <h3>Superconjuntos visibles</h3>
          {renderList(supersetIds, 'No tiene superconjuntos visibles en este diagrama.')}
        </section>

        <section className="inspector-section compact">
          <h3>Subconjuntos estrictos</h3>
          {renderList(strictSubsetIds, 'No hay subconjuntos estrictos visibles.')}
        </section>

        <section className="inspector-section compact">
          <h3>Region exclusiva</h3>
          <p>{selectedVennSet.exclusiveLabel}</p>
          {renderList(exclusiveNodeIds, 'No hay nodos exclusivos asociados.')}
        </section>

        <section className="inspector-section compact">
          <h3>Marcadores</h3>
          {renderList(markers.map((marker) => `${marker.label}: ${marker.shortDefinition}`), 'Sin marcadores adicionales.')}
        </section>

        <section className="inspector-section compact">
          <h3>Nota de honestidad</h3>
          <p>{selectedVennSet.note}</p>
        </section>

        {selectedVennSet.visualHint ? (
          <section className="inspector-section compact">
            <h3>Representacion visual</h3>
            <p>{selectedVennSet.visualHint}</p>
          </section>
        ) : null}

        <section className="related-code-section">
          <div className="code-header">
            <h3>Codigo relacionado</h3>
            <span>local paths</span>
          </div>

          <div className="code-reference-list">
            {vennReferences.map((reference) => (
              <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />
            ))}
          </div>
        </section>
      </aside>
    );
  }

  if (selectedRelation) {
    const relationCodeReferences = getRelationCodeReferences(selectedRelation);

    return (
      <aside className="inspector-panel">
        <div className="panel-title-row inspector-heading">
          <div>
            <p className="eyebrow">Inspector / Relacion</p>
            <h2>{selectedRelation.label}</h2>
          </div>
          <StatusBadge label={getRelationTypeLabel(selectedRelation)} tone={truthTone[selectedRelation.truthStatus]} />
        </div>

        <div className="inspector-meta-grid">
          <StatusBadge label={`Tipo: ${getRelationTypeLabel(selectedRelation)}`} tone="cyan" />
          <StatusBadge label={relationTruthLabels[selectedRelation.truthStatus]} tone={truthTone[selectedRelation.truthStatus]} />
          <StatusBadge label={`${selectedRelation.source} → ${selectedRelation.target}`} tone="purple" />
        </div>

        <section className="inspector-section compact">
          <h3>Explicacion</h3>
          <p>{getRelationExplanation(selectedRelation)}</p>
        </section>

        <section className="inspector-section compact">
          <h3>Ejemplo</h3>
          <p>{getRelationExample(selectedRelation)}</p>
        </section>

        <section className="inspector-section compact">
          <h3>Tooltip tecnico</h3>
          <p>{selectedRelation.label} | {getRelationTypeLabel(selectedRelation)} | {relationTruthLabels[selectedRelation.truthStatus]}</p>
        </section>

        <section className="related-code-section">
          <div className="code-header">
            <h3>Codigo relacionado</h3>
            <span>local paths</span>
          </div>

          <div className="code-reference-list">
            {relationCodeReferences.map((reference) => (
              <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />
            ))}
          </div>
        </section>
      </aside>
    );
  }

  return (
    <aside className="inspector-panel">
      <div className="panel-title-row inspector-heading">
        <div>
          <p className="eyebrow">Inspector</p>
          <h2>{selectedConcept.label}</h2>
        </div>
        <StatusBadge label={selectedConcept.kind} tone={selectedConcept.accent} />
      </div>

      <div className="inspector-meta-grid">
        <StatusBadge label={`Layer: ${conceptLayerLabels[selectedConcept.layer]}`} tone="cyan" />
        <StatusBadge label={`Kind: ${selectedConcept.kind}`} tone={selectedConcept.accent} />
        {toggles.showTruthStatus ? (
          <StatusBadge label={truthStatusLabels[selectedConcept.truthStatus]} tone={truthTone[selectedConcept.truthStatus]} />
        ) : null}
      </div>

      <section className="inspector-section compact">
        <h3>Definicion ampliada</h3>
        <p>{selectedConcept.definition}</p>
      </section>

      <section className="inspector-section compact">
        <h3>Intuicion visual</h3>
        <p>{selectedConcept.intuition}</p>
      </section>

      <ComplexityProfileCard profile={selectedConcept.complexityProfile} />

      <section className="inspector-section compact">
        <h3>Ejemplos</h3>
        {renderList(selectedConcept.examples, 'Sin ejemplos mock para este concepto.')}
      </section>

      {selectedConcept.kind === 'problem' ? (() => {
        const memFormulas = getProblemMembershipFormulas(selectedConcept.id);
        const redFormulas = getProblemReductionFormulas(selectedConcept.id);
        return (
          <>
            {memFormulas.length > 0 ? (
              <section className="inspector-section compact">
                <h3>Pertenencia</h3>
                <ul className="inspector-list">
                  {memFormulas.map((f) => <li key={f}><code>{f}</code></li>)}
                </ul>
              </section>
            ) : null}
            {redFormulas.length > 0 ? (
              <section className="inspector-section compact">
                <h3>Reducciones</h3>
                <ul className="inspector-list">
                  {redFormulas.map((f) => <li key={f}><code>{f}</code></li>)}
                </ul>
              </section>
            ) : null}
          </>
        );
      })() : null}

      {selectedConcept.kind === 'class' ? (() => {
        const incFormulas = getClassInclusionFormulas(selectedConcept.id);
        const subIncFormulas = getClassSubInclusionFormulas(selectedConcept.id);
        const memFormulas = getClassMemberFormulas(selectedConcept.id);
        const redFormulas = getClassReductionFormulas(selectedConcept.id);
        return (
          <>
            {incFormulas.length > 0 ? (
              <section className="inspector-section compact">
                <h3>Inclusiones (superconjuntos)</h3>
                <ul className="inspector-list">
                  {incFormulas.map((f) => <li key={f}><code>{f}</code></li>)}
                </ul>
              </section>
            ) : null}
            {subIncFormulas.length > 0 ? (
              <section className="inspector-section compact">
                <h3>Inclusiones (subconjuntos)</h3>
                <ul className="inspector-list">
                  {subIncFormulas.map((f) => <li key={f}><code>{f}</code></li>)}
                </ul>
              </section>
            ) : null}
            {memFormulas.length > 0 ? (
              <section className="inspector-section compact">
                <h3>Miembros ({memFormulas.length})</h3>
                <ul className="inspector-list">
                  {memFormulas.map((f) => <li key={f}><code>{f}</code></li>)}
                </ul>
              </section>
            ) : null}
            {redFormulas.length > 0 ? (
              <section className="inspector-section compact">
                <h3>Reducciones entre miembros</h3>
                <ul className="inspector-list">
                  {redFormulas.map((f) => <li key={f}><code>{f}</code></li>)}
                </ul>
              </section>
            ) : null}
          </>
        );
      })() : null}

      <MisconceptionPanel
        active={toggles.showMisconceptions}
        misconceptions={conceptMisconceptions}
        conceptLabel={selectedConcept.label}
      />

      <section className="related-code-section">
        <div className="code-header">
          <h3>Codigo relacionado</h3>
          <span>local paths</span>
        </div>

        <div className="code-reference-list">
          {codeReferences.map((reference) => (
            <CodeReferenceCard key={`${reference.path}-${reference.symbol ?? reference.label}`} reference={reference} />
          ))}
        </div>

        {snippet ? (
          <details className="related-snippet">
            <summary>Snippet conceptual opcional</summary>
            <pre><code>{snippet}</code></pre>
          </details>
        ) : null}
      </section>
    </aside>
  );
}
