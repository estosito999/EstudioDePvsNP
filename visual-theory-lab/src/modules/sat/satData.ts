import type { SatClause, SatLabMeta, SatLiteral } from './satTypes';

export const initialSatVariables = ['x1', 'x2', 'x3'];

export const initialSatClauses: SatClause[] = [
  { id: 'c1', literals: [{ variable: 'x1', negated: false }, { variable: 'x2', negated: true }] },
  { id: 'c2', literals: [{ variable: 'x2', negated: false }, { variable: 'x3', negated: false }] },
  { id: 'c3', literals: [{ variable: 'x1', negated: true }, { variable: 'x3', negated: false }] },
];

export const satLabMeta: SatLabMeta = {
  conceptualMessage: 'Un solver puede ser muy rapido en muchas instancias, pero eso no significa que P = NP.',
  codeLines: [
    'def dpll(formula, assignment):',
    '    if all_clauses_satisfied(formula, assignment): return SAT',
    '    if some_clause_conflicts(formula, assignment): return UNSAT',
    '    unit = find_unit_clause(formula, assignment)',
    '    if unit: return dpll(formula, assign(unit))',
    '    x = choose_unassigned_variable(formula, assignment)',
    '    return dpll(formula, assign(x, True)) or dpll(formula, assign(x, False))',
  ],
  codeReferences: [
    { label: 'Modulo principal', path: 'src/modules/sat/SatZ3Lab.tsx', module: 'SAT / Z3 Lab', symbol: 'SatZ3Lab', description: 'Orquesta builder CNF, editor textual, DPLL educativo, llamada a Z3 y comparacion de metodos.' },
    { label: 'Datos SAT', path: 'src/modules/sat/satData.ts', module: 'SAT / Z3 Lab', symbol: 'satLabMeta / initialSatClauses', description: 'Define formula inicial, codigo visible, mensaje conceptual y referencias del laboratorio.' },
    { label: 'Backend Z3', path: 'backend/app/main.py', module: 'SAT / Z3 Lab API', symbol: 'solve_z3', description: 'Endpoint FastAPI POST /api/sat/solve-z3 que traduce CNF a Z3 y devuelve SAT/UNSAT con modelo.' },
    { label: 'Visualizador SAT', path: 'src/components/sat/SatWorkbench.tsx', module: 'SAT / Z3 Lab', symbol: 'SatWorkbench', description: 'Renderiza builder visual, clausulas, DPLL, Z3 y comparacion de solvers.' },
  ],
};

export function literalToText(literal: SatLiteral) {
  return `${literal.negated ? '!' : ''}${literal.variable}`;
}

export function clauseToText(clause: SatClause) {
  return `(${clause.literals.map(literalToText).join(' or ')})`;
}

export function formulaToText(clauses: SatClause[]) {
  return clauses.map(clauseToText).join(' and ');
}
