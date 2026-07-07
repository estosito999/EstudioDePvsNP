import type { SatAssignment, SatClause } from '../../modules/sat/satTypes';
import { clauseStatus } from '../../modules/sat/satUtils';

type CnfBuilderProps = {
  variables: string[];
  clauses: SatClause[];
  assignment: SatAssignment;
  onAssignmentChange: (variable: string, value: boolean | undefined) => void;
  onAddClause: () => void;
  onToggleLiteral: (clauseId: string, variable: string) => void;
};

export function CnfBuilder({ variables, clauses, assignment, onAssignmentChange, onAddClause, onToggleLiteral }: CnfBuilderProps) {
  return (
    <section className="verification-card sat-builder-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">CNF Builder</p>
          <h2>Variables, clausulas y asignaciones</h2>
        </div>
        <button className="lab-tab active" type="button" onClick={onAddClause}>Agregar clausula</button>
      </div>

      <div className="sat-variable-grid">
        {variables.map((variable) => (
          <button
            className={assignment[variable] === true ? 'boolean-switch active' : assignment[variable] === false ? 'boolean-switch false' : 'boolean-switch'}
            key={variable}
            type="button"
            onClick={() => onAssignmentChange(variable, assignment[variable] === undefined ? true : assignment[variable] ? false : undefined)}
          >
            <span>{variable}</span>
            <strong>{assignment[variable] === undefined ? 'UNSET' : assignment[variable] ? 'TRUE' : 'FALSE'}</strong>
          </button>
        ))}
      </div>

      <div className="sat-clause-list">
        {clauses.map((clause) => (
          <article className={`sat-clause ${clauseStatus(clause, assignment)}`} key={clause.id}>
            <span>{clause.id}</span>
            <div>
              {variables.map((variable) => {
                const literal = clause.literals.find((item) => item.variable === variable);
                return (
                  <button key={variable} type="button" onClick={() => onToggleLiteral(clause.id, variable)}>
                    {literal ? `${literal.negated ? '!' : ''}${variable}` : `+${variable}`}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
