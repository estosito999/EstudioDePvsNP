import type { DpllStep, SatAssignment, SatClause, SatLiteral } from './satTypes';

export function parseCnfText(text: string): SatClause[] {
  const matches = Array.from(text.matchAll(/\(([^()]+)\)/g));
  return matches.map((match, index) => ({
    id: `c${index + 1}`,
    literals: match[1].split(/\s+or\s+|\s*∨\s*|\s*,\s*/i).map((raw) => raw.trim()).filter(Boolean).map((raw) => ({
      variable: raw.replace(/^!|^~|^not\s+/i, ''),
      negated: /^!|^~|^not\s+/i.test(raw),
    })),
  })).filter((clause) => clause.literals.length > 0);
}

export function variablesFromClauses(clauses: SatClause[]) {
  return Array.from(new Set(clauses.flatMap((clause) => clause.literals.map((literal) => literal.variable)))).sort();
}

export function literalValue(literal: SatLiteral, assignment: SatAssignment) {
  const value = assignment[literal.variable];
  if (value === undefined) return undefined;
  return literal.negated ? !value : value;
}

export function clauseStatus(clause: SatClause, assignment: SatAssignment) {
  const values = clause.literals.map((literal) => literalValue(literal, assignment));
  if (values.some(Boolean)) return 'satisfied';
  if (values.every((value) => value === false)) return 'conflict';
  return 'open';
}

export function bruteForceCount(variableCount: number) {
  return 2 ** variableCount;
}

function findUnitLiteral(clauses: SatClause[], assignment: SatAssignment) {
  for (const clause of clauses) {
    if (clauseStatus(clause, assignment) !== 'open') continue;
    const unassigned = clause.literals.filter((literal) => assignment[literal.variable] === undefined);
    const falseCount = clause.literals.filter((literal) => literalValue(literal, assignment) === false).length;
    if (unassigned.length === 1 && falseCount === clause.literals.length - 1) return unassigned[0];
  }
  return undefined;
}

export function buildDpllTrace(clauses: SatClause[], variables: string[]): DpllStep[] {
  const steps: DpllStep[] = [];

  function recurse(assignment: SatAssignment, depth: number): boolean {
    steps.push({ title: 'Evaluar formula', description: `Profundidad ${depth}: revisar clausulas con asignacion parcial.`, assignment: { ...assignment }, action: 'choose', activeLine: 1 });
    if (clauses.every((clause) => clauseStatus(clause, assignment) === 'satisfied')) {
      steps.push({ title: 'Resultado SAT', description: 'Todas las clausulas estan satisfechas.', assignment: { ...assignment }, action: 'sat', activeLine: 1 });
      return true;
    }
    if (clauses.some((clause) => clauseStatus(clause, assignment) === 'conflict')) {
      steps.push({ title: 'Conflicto', description: 'Alguna clausula quedo falsa; backtracking.', assignment: { ...assignment }, action: 'backtrack', activeLine: 2 });
      return false;
    }

    const unit = findUnitLiteral(clauses, assignment);
    if (unit) {
      const value = !unit.negated;
      steps.push({ title: 'Propagacion unitaria', description: `${unit.negated ? '!' : ''}${unit.variable} fuerza ${unit.variable}=${value}.`, assignment: { ...assignment, [unit.variable]: value }, activeVariable: unit.variable, action: 'unit', activeLine: 4 });
      return recurse({ ...assignment, [unit.variable]: value }, depth + 1);
    }

    const variable = variables.find((item) => assignment[item] === undefined);
    if (!variable) return false;
    steps.push({ title: 'Elegir variable', description: `Seleccionar ${variable} y probar True.`, assignment: { ...assignment }, activeVariable: variable, action: 'choose', activeLine: 5 });
    if (recurse({ ...assignment, [variable]: true }, depth + 1)) return true;
    steps.push({ title: 'Backtracking', description: `${variable}=True fallo; probar False.`, assignment: { ...assignment, [variable]: false }, activeVariable: variable, action: 'backtrack', activeLine: 6 });
    return recurse({ ...assignment, [variable]: false }, depth + 1);
  }

  const sat = recurse({}, 0);
  if (!sat) steps.push({ title: 'Resultado UNSAT', description: 'Todas las ramas exploradas fallaron.', assignment: {}, action: 'unsat', activeLine: 2 });
  return steps;
}
