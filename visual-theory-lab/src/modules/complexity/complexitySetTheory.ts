import { complexityConcepts } from './complexityData';
import { complexityRelations } from './complexityRelations';
import type { ComplexityRelation } from './complexityTypes';

export const mathSymbolLegend = [
  { symbol: '∈', label: 'pertenece' },
  { symbol: '⊆', label: 'subconjunto' },
  { symbol: '≤p', label: 'reduccion polinomial' },
  { symbol: '?=', label: 'problema abierto' },
] as const;

const conceptById = new Map(complexityConcepts.map((c) => [c.id, c]));

function isClass(conceptId: string) {
  return conceptById.get(conceptId)?.kind === 'class';
}

function isProblem(conceptId: string) {
  return conceptById.get(conceptId)?.kind === 'problem';
}

export function getMathConceptLabel(conceptId: string) {
  return conceptById.get(conceptId)?.label ?? conceptId;
}

export function formatMembershipFormula(problemId: string, classId: string) {
  return `${getMathConceptLabel(problemId)} ∈ ${getMathConceptLabel(classId)}`;
}

export function formatInclusionFormula(subsetId: string, supersetId: string) {
  return `${getMathConceptLabel(subsetId)} ⊆ ${getMathConceptLabel(supersetId)}`;
}

function getDirectClassSupersetIds(classId: string) {
  return complexityRelations
    .filter((r) => r.kind === 'inclusion' && r.source === classId && isClass(r.target))
    .map((r) => r.target);
}

function getClassSupersetIdsTransitive(classId: string, seen = new Set<string>()): string[] {
  getDirectClassSupersetIds(classId).forEach((sid) => {
    if (seen.has(sid)) return;
    seen.add(sid);
    getClassSupersetIdsTransitive(sid, seen);
  });
  return [...seen];
}

function getDirectMemberClassIds(problemId: string) {
  const ids = new Set<string>();
  complexityRelations
    .filter((r) => r.source === problemId && isProblem(r.source) && isClass(r.target))
    .forEach((r) => ids.add(r.target));
  return [...ids];
}

function getDirectSubClassIds(classId: string) {
  return complexityRelations
    .filter((r) => r.kind === 'inclusion' && r.target === classId && isClass(r.source))
    .map((r) => r.source);
}

function getMemberProblemIdsForClassInternal(classId: string): string[] {
  const result: string[] = [];
  complexityConcepts
    .filter((c) => c.kind === 'problem')
    .forEach((problem) => {
      const directClasses = getDirectMemberClassIds(problem.id);
      const allClasses = new Set(directClasses.flatMap((cid) => [cid, ...getClassSupersetIdsTransitive(cid)]));
      if (allClasses.has(classId)) result.push(problem.id);
    });
  return result;
}

export function getClassMemberFormulas(classId: string) {
  return getMemberProblemIdsForClassInternal(classId).map((pid) => formatMembershipFormula(pid, classId));
}

export function getClassInclusionFormulas(classId: string) {
  return getDirectClassSupersetIds(classId).map((sid) => formatInclusionFormula(classId, sid));
}

export function getClassSubInclusionFormulas(classId: string) {
  return getDirectSubClassIds(classId).map((scid) => formatInclusionFormula(scid, classId));
}

export function getProblemMembershipFormulas(problemId: string) {
  const direct = getDirectMemberClassIds(problemId);
  const all = [...new Set(direct.flatMap((cid) => [cid, ...getDirectClassSupersetIds(cid)]))];
  return all.map((cid) => formatMembershipFormula(problemId, cid));
}

export function getClassMemberProblemIds(classId: string | undefined) {
  if (!classId || !isClass(classId)) return [];
  return getMemberProblemIdsForClassInternal(classId);
}

function isProblemReduction(relation: ComplexityRelation) {
  return relation.kind === 'reduction' && isProblem(relation.source) && isProblem(relation.target);
}

export function getProblemReductionFormulas(problemId: string) {
  const formulas: string[] = [];
  complexityRelations
    .filter((r) => isProblemReduction(r) && (r.source === problemId || r.target === problemId))
    .forEach((r) => {
      if (r.source === problemId) {
        formulas.push(`${getMathConceptLabel(problemId)} ≤p ${getMathConceptLabel(r.target)}`);
      } else {
        formulas.push(`${getMathConceptLabel(r.source)} ≤p ${getMathConceptLabel(problemId)}`);
      }
    });
  return formulas;
}

export function getClassReductionFormulas(classId: string) {
  const memberIds = new Set(getClassMemberProblemIds(classId) as string[]);
  if (memberIds.size === 0) return [];
  const formulas: string[] = [];
  complexityRelations
    .filter((r) => isProblemReduction(r) && memberIds.has(r.source) && memberIds.has(r.target))
    .forEach((r) => {
      formulas.push(`${getMathConceptLabel(r.source)} ≤p ${getMathConceptLabel(r.target)}`);
    });
  return formulas;
}
