import type { ProofComplexityMeta, ProofComplexityTopic, ResolutionClause, ResolutionStep } from './proofComplexityTypes';

export const proofComplexityTopics: ProofComplexityTopic[] = [
  { id: 'resolution', label: 'Resolution', description: 'Sistema de prueba proposicional basado en resolver literales complementarios.', status: 'functional' },
  { id: 'cutting-planes', label: 'Cutting Planes', description: 'Sistema algebraico/geometrico basado en desigualdades lineales enteras.', status: 'prepared' },
  { id: 'frege', label: 'Frege Systems', description: 'Familia de sistemas proposicionales muy expresivos.', status: 'prepared' },
  { id: 'unsat-proofs', label: 'Pruebas de insatisfacibilidad', description: 'Certificados que demuestran que una formula no tiene asignacion satisfactoria.', status: 'prepared' },
  { id: 'proof-size', label: 'Tamaño de prueba', description: 'Medida del numero de clausulas, inferencias o simbolos usados en una demostracion.', status: 'prepared' },
];

export const resolutionClauses: ResolutionClause[] = [
  { id: 'c1', label: '(A ∨ B)', literals: ['A', 'B'], kind: 'initial' },
  { id: 'c2', label: '(¬A ∨ C)', literals: ['¬A', 'C'], kind: 'initial' },
  { id: 'c3', label: '(B ∨ C)', literals: ['B', 'C'], kind: 'derived' },
  { id: 'c4', label: '(¬B)', literals: ['¬B'], kind: 'initial' },
  { id: 'c5', label: '(C)', literals: ['C'], kind: 'derived' },
  { id: 'c6', label: '(¬C)', literals: ['¬C'], kind: 'initial' },
  { id: 'empty', label: '□', literals: [], kind: 'contradiction' },
];

export const resolutionSteps: ResolutionStep[] = [
  {
    id: 'resolve-a',
    title: 'Resolver sobre A',
    premises: ['c1', 'c2'],
    conclusion: 'c3',
    pivot: 'A',
    rule: '(A ∨ B), (¬A ∨ C) ⟹ (B ∨ C)',
    explanation: 'A y ¬A no pueden ser ambos necesarios; Resolution elimina el pivote y conserva los literales restantes.',
  },
  {
    id: 'resolve-b',
    title: 'Resolver sobre B',
    premises: ['c3', 'c4'],
    conclusion: 'c5',
    pivot: 'B',
    rule: '(B ∨ C), (¬B) ⟹ (C)',
    explanation: 'Si ¬B es forzado, entonces la clausula (B ∨ C) obliga C.',
  },
  {
    id: 'resolve-c',
    title: 'Contradiccion final',
    premises: ['c5', 'c6'],
    conclusion: 'empty',
    pivot: 'C',
    rule: '(C), (¬C) ⟹ □',
    explanation: 'Derivar la clausula vacia demuestra insatisfacibilidad del conjunto de clausulas.',
  },
];

export const proofComplexityMeta: ProofComplexityMeta = {
  misconception: {
    error: 'Creer que limites inferiores en un sistema de prueba especifico resuelven automaticamente NP vs co-NP.',
    correction: 'Son modelos restringidos de demostracion. Dan evidencia, pero no resuelven necesariamente las clases generales.',
  },
  codeReferences: [
    { label: 'Modulo principal', path: 'src/modules/proof-complexity/ProofComplexityLab.tsx', module: 'Proof Complexity Lab', symbol: 'ProofComplexityLab', description: 'Orquesta temas, visualizador de Resolution y eventos de consola.' },
    { label: 'Datos de prueba', path: 'src/modules/proof-complexity/proofComplexityData.ts', module: 'Proof Complexity Lab', symbol: 'resolutionClauses / resolutionSteps', description: 'Define clausulas, derivaciones, contradiccion final, temas y misconception.' },
    { label: 'Visualizador Resolution', path: 'src/components/proof-complexity/ResolutionVisualizer.tsx', module: 'Proof Complexity Lab', symbol: 'ResolutionVisualizer', description: 'Renderiza clausulas como nodos, inferencias como flechas y derivacion paso a paso.' },
  ],
};
