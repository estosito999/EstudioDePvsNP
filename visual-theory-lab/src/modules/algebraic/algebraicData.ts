import type { AlgebraicConcept, AlgebraicLabMeta } from './algebraicTypes';

export const algebraicConcepts: AlgebraicConcept[] = [
  {
    id: 'boolean-equations',
    title: 'Variables booleanas',
    description: 'Una variable booleana x se fuerza con la ecuacion x^2 - x = 0.',
    intuition: 'Las soluciones sobre {0,1} son exactamente los valores booleanos false/true.',
  },
  {
    id: 'clause-polynomial',
    title: 'Clausulas como polinomios',
    description: 'Una clausula se traduce como una restriccion que solo falla cuando todos sus literales son falsos.',
    intuition: 'Para (x or y or not z), la clausula falla si x=0, y=0, z=1; eso se codifica con (1-x)(1-y)z = 0.',
  },
  {
    id: 'ideal',
    title: 'Ideal polinomial',
    description: 'El sistema genera un ideal: todas las combinaciones polinomiales de las ecuaciones.',
    intuition: 'El ideal empaqueta las restricciones algebraicas de la formula.',
  },
  {
    id: 'variety',
    title: 'Variedad',
    description: 'La variedad es el conjunto de soluciones comunes del sistema de ecuaciones.',
    intuition: 'Si la variedad es vacia, la formula no tiene asignacion satisfactoria.',
  },
  {
    id: 'grobner',
    title: 'Bases de Gröbner',
    description: 'Una base de Gröbner reorganiza el ideal para facilitar eliminacion y deduccion algebraica.',
    intuition: 'Puede revelar inconsistencia, pero el calculo puede crecer enormemente.',
  },
  {
    id: 'nullstellensatz',
    title: 'Nullstellensatz',
    description: 'Relaciona inexistencia de soluciones con certificados algebraicos de insatisfacibilidad.',
    intuition: 'Un certificado puede mostrar que 1 pertenece al ideal generado por las ecuaciones.',
  },
];

export const algebraicLabMeta: AlgebraicLabMeta = {
  booleanFormula: '(x ∨ y ∨ ¬z)',
  algebraicTranslation: '(1 - x)(1 - y)z = 0',
  variables: ['x', 'y', 'z'],
  equations: [
    { id: 'bool-x', label: 'Booleanidad de x', expression: 'x^2 - x = 0', explanation: 'Fuerza x a tomar valores 0 o 1.' },
    { id: 'bool-y', label: 'Booleanidad de y', expression: 'y^2 - y = 0', explanation: 'Fuerza y a tomar valores 0 o 1.' },
    { id: 'bool-z', label: 'Booleanidad de z', expression: 'z^2 - z = 0', explanation: 'Fuerza z a tomar valores 0 o 1.' },
    { id: 'clause', label: 'Restriccion de clausula', expression: '(1 - x)(1 - y)z = 0', explanation: 'La clausula solo es falsa cuando x=0, y=0 y z=1; el producto detecta exactamente ese caso prohibido.' },
  ],
  warning: 'Convertir SAT a algebra no elimina automaticamente la dificultad. El costo puede reaparecer en el tamaño de las bases de Gröbner, grados altos o certificados algebraicos grandes.',
  misconception: {
    error: 'Creer que convertir SAT en algebra lo vuelve facil automaticamente.',
    correction: 'La dificultad puede reaparecer en el tamaño del calculo algebraico, por ejemplo en bases de Gröbner enormes.',
  },
  codeReferences: [
    { label: 'Modulo principal', path: 'src/modules/algebraic/AlgebraicGrobnerLab.tsx', module: 'Algebraic / Gröbner Lab', symbol: 'AlgebraicGrobnerLab', description: 'Orquesta conceptos algebraicos, traduccion SAT-polynomial y visualizacion de ecuaciones.' },
    { label: 'Datos algebraicos', path: 'src/modules/algebraic/algebraicData.ts', module: 'Algebraic / Gröbner Lab', symbol: 'algebraicLabMeta / algebraicConcepts', description: 'Define formula booleana, traduccion algebraica, ecuaciones, ideal/variedad/Groebner/Nullstellensatz y misconception.' },
    { label: 'Visualizador algebraico', path: 'src/components/algebraic/AlgebraicTranslationVisualizer.tsx', module: 'Algebraic / Gröbner Lab', symbol: 'AlgebraicTranslationVisualizer', description: 'Renderiza formula original, traduccion, variables, ecuaciones y explicaciones.' },
  ],
};
