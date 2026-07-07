import type { ReductionMeta } from './reductionTypes';

export const reductions: ReductionMeta[] = [
  {
    id: 'sat-to-3sat',
    label: 'SAT ≤p 3-SAT',
    sourceProblem: 'SAT',
    targetProblem: '3-SAT',
    difficulty: 'intro',
    theoremStatus: 'TEOREMA DEMOSTRADO',
    inputInstance: '(x1 or x2 or x3 or x4) and (!x1 or x5)',
    transformedInstance: '(x1 or x2 or y1) and (!y1 or x3 or x4) and (!x1 or x5 or z1)',
    intuition: 'Clausulas largas se parten introduciendo variables auxiliares. Clausulas cortas se rellenan sin cambiar satisfacibilidad.',
    equivalence: 'La formula original es satisfacible si y solo si la formula 3-CNF construida es satisfacible.',
    steps: [
      { id: 'input', title: 'Instancia SAT', description: 'Partimos de una formula booleana arbitraria.', construction: 'Identificar clausulas de tamaño mayor, menor o igual a 3.' },
      { id: 'split', title: 'Partir clausulas largas', description: 'Una clausula larga se reemplaza por una cadena de clausulas de tres literales.', construction: '(a or b or c or d) se transforma usando una variable auxiliar y1.' },
      { id: 'pad', title: 'Rellenar clausulas cortas', description: 'Clausulas con menos de 3 literales se adaptan con variables auxiliares.', construction: '(a or b) puede convertirse en clausulas de tres literales que preservan satisfacibilidad.' },
      { id: 'polynomial', title: 'Tamaño polinomial', description: 'El numero de clausulas y variables nuevas crece polinomialmente.', construction: 'Cada clausula produce una cantidad lineal de clausulas nuevas.' },
      { id: 'conclusion', title: 'Equivalencia', description: 'La transformacion preserva satisfacibilidad.', construction: 'SAT ≤p 3-SAT queda demostrado.' },
    ],
    codeReferences: [
      { label: 'Datos de reducciones', path: 'src/modules/reduction/reductionsData.ts', module: 'Reduction Lab', symbol: 'reductions', description: 'Define instancias, pasos, advertencias y equivalencias de cada reduccion.' },
      { label: 'Visualizador', path: 'src/components/reduction/ReductionVisualizer.tsx', module: 'Reduction Lab', symbol: 'ReductionVisualizer', description: 'Renderiza flujo origen-transformacion-destino y pasos interactivos.' },
    ],
  },
  {
    id: '3sat-to-clique',
    label: '3-SAT ≤p CLIQUE',
    sourceProblem: '3-SAT',
    targetProblem: 'CLIQUE',
    difficulty: 'standard',
    theoremStatus: 'TEOREMA DEMOSTRADO',
    inputInstance: '(x1 or !x2 or x3) and (!x1 or x2 or x3) and (x1 or x2 or !x3)',
    transformedInstance: 'Grafo con un nodo por literal de cada clausula; buscar clique de tamaño 3.',
    intuition: 'Elegir un literal verdadero por clausula debe formar un conjunto compatible. Las incompatibilidades se eliminan no conectando literales contradictorios.',
    equivalence: 'Existe asignacion satisfactoria si y solo si existe un clique de tamaño igual al numero de clausulas.',
    steps: [
      { id: 'clauses', title: 'Crear grupos por clausula', description: 'Cada clausula produce tres nodos, uno por literal.', construction: 'C1: x1, !x2, x3; C2: !x1, x2, x3; C3: x1, x2, !x3.' },
      { id: 'edges', title: 'Conectar literales compatibles', description: 'Se conectan nodos de clausulas distintas si no se contradicen.', construction: 'No conectar x1 con !x1, ni x2 con !x2, etc.' },
      { id: 'k', title: 'Definir k', description: 'El tamaño del clique buscado es el numero de clausulas.', construction: 'Aqui k = 3.' },
      { id: 'assignment', title: 'Clique a asignacion', description: 'Un clique elige un literal compatible por clausula.', construction: 'Los literales elegidos pueden hacerse verdaderos simultaneamente.' },
      { id: 'conclusion', title: 'Equivalencia', description: 'Satisfacibilidad y existencia de clique coinciden.', construction: '3-SAT ≤p CLIQUE queda demostrado.' },
    ],
    codeReferences: [
      { label: 'Datos de reducciones', path: 'src/modules/reduction/reductionsData.ts', module: 'Reduction Lab', symbol: 'reductions', description: 'Define la construccion de nodos por literal y equivalencia con clique.' },
      { label: 'Visualizador', path: 'src/components/reduction/ReductionVisualizer.tsx', module: 'Reduction Lab', symbol: 'ReductionVisualizer', description: 'Muestra la transformacion y pasos de compatibilidad visual.' },
    ],
  },
  {
    id: '3sat-to-vertex-cover',
    label: '3-SAT ≤p VERTEX-COVER',
    sourceProblem: '3-SAT',
    targetProblem: 'VERTEX-COVER',
    difficulty: 'standard',
    theoremStatus: 'TEOREMA DEMOSTRADO',
    inputInstance: '(x1 or !x2 or x3) and (!x1 or x2 or x3)',
    transformedInstance: 'Grafo con gadgets de variables y clausulas; buscar vertex cover de tamaño K.',
    intuition: 'La construccion fuerza elegir de cada gadget una opcion coherente con una asignacion y cubrir aristas de clausulas.',
    equivalence: 'La formula es satisfacible si y solo si el grafo tiene un vertex cover del tamaño construido.',
    steps: [
      { id: 'variables', title: 'Gadgets de variables', description: 'Cada variable crea una estructura que representa verdadero/falso.', construction: 'Elegir un lado del gadget codifica una asignacion.' },
      { id: 'clauses', title: 'Gadgets de clausulas', description: 'Cada clausula exige cubrir aristas dejando al menos un literal satisfecho.', construction: 'Triangulos de clausula conectan con literales compatibles.' },
      { id: 'budget', title: 'Presupuesto K', description: 'El tamaño K fuerza elecciones exactas.', construction: 'K combina aportes de variables y clausulas.' },
      { id: 'equivalence', title: 'Preservar satisfacibilidad', description: 'Una asignacion satisfactoria produce un cover y viceversa.', construction: 'Las aristas no cubiertas revelarian una clausula no satisfecha.' },
      { id: 'conclusion', title: 'Conclusion', description: 'La transformacion es polinomial.', construction: '3-SAT ≤p VERTEX-COVER queda demostrado.' },
    ],
    codeReferences: [
      { label: 'Datos de reducciones', path: 'src/modules/reduction/reductionsData.ts', module: 'Reduction Lab', symbol: 'reductions', description: 'Describe gadgets de variables, clausulas y presupuesto K.' },
      { label: 'Visualizador', path: 'src/components/reduction/ReductionVisualizer.tsx', module: 'Reduction Lab', symbol: 'ReductionVisualizer', description: 'Renderiza la secuencia de construccion y advertencias conceptuales.' },
    ],
  },
  {
    id: '3sat-to-subset-sum',
    label: '3-SAT ≤p SUBSET-SUM',
    sourceProblem: '3-SAT',
    targetProblem: 'SUBSET-SUM',
    difficulty: 'advanced',
    theoremStatus: 'TEOREMA DEMOSTRADO',
    inputInstance: '(x1 or !x2 or x3) and (!x1 or x2 or !x3)',
    transformedInstance: 'Tabla de numeros por variable/clausula y objetivo T con columnas de control.',
    intuition: 'Los digitos de los numeros codifican elecciones de verdad y cobertura exacta de clausulas sin acarreos.',
    equivalence: 'Una asignacion satisfactoria corresponde a un subconjunto que suma T, y todo subconjunto que suma T induce una asignacion satisfactoria.',
    warning: 'Esta reduccion es mas tecnica. Conviene verla despues de SAT ≤p 3-SAT y 3-SAT ≤p CLIQUE.',
    steps: [
      { id: 'np', title: 'SUBSET-SUM pertenece a NP', description: 'Un subconjunto candidato se verifica sumando numeros.', construction: 'El certificado es la lista de indices elegidos.' },
      { id: 'input', title: 'Instancia 3-SAT', description: 'Tomamos clausulas de tres literales.', construction: 'Cada variable tendra filas para elegir verdadero o falso.' },
      { id: 'numbers', title: 'Numeros especiales', description: 'Construimos numeros con columnas para variables y clausulas.', construction: 'Los digitos se diseñan para evitar acarreos y controlar contribuciones.' },
      { id: 'target', title: 'Objetivo T', description: 'T exige una eleccion por variable y satisfaccion de clausulas.', construction: 'Las columnas objetivo fuerzan suma exacta.' },
      { id: 'forward', title: 'Asignacion a subconjunto', description: 'Si la formula es satisfacible, elegimos numeros compatibles.', construction: 'La suma alcanza T usando filas de verdad y relleno de clausulas.' },
      { id: 'backward', title: 'Subconjunto a asignacion', description: 'Si existe subconjunto que suma T, induce una asignacion satisfactoria.', construction: 'Las columnas de variables obligan elecciones consistentes.' },
    ],
    codeReferences: [
      { label: 'Datos de reducciones', path: 'src/modules/reduction/reductionsData.ts', module: 'Reduction Lab', symbol: 'reductions', description: 'Contiene la reduccion avanzada 3-SAT a SUBSET-SUM, pasos y advertencia tecnica.' },
      { label: 'Visualizador', path: 'src/components/reduction/ReductionVisualizer.tsx', module: 'Reduction Lab', symbol: 'ReductionVisualizer', description: 'Muestra la construccion avanzada sin implementar solver ni backend.' },
    ],
  },
];

export const defaultReductionId = 'sat-to-3sat';

export function getReduction(id: string) {
  return reductions.find((reduction) => reduction.id === id) ?? reductions[0];
}
