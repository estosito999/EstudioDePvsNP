import { complexityConcepts, getComplexityConcept } from '../complexity/complexityData';
import { misconceptions } from '../complexity/misconceptionsData';
import type { CodeReference } from '../complexity/complexityTypes';
import { frontierTopics } from '../frontier/frontierData';
import type { ProofConsoleCommand, ProofConsoleResponse, ProofConsoleStatus } from './proofConsoleTypes';

const consoleReference: CodeReference = {
  label: 'Proof Console',
  path: 'src/modules/proof-console/ProofConsole.tsx',
  module: 'Proof Console',
  symbol: 'ProofConsole',
  description: 'Interfaz terminal para consultar afirmaciones, teoremas, errores comunes y problemas abiertos.',
};

const commandReference: CodeReference = {
  label: 'Motor de comandos',
  path: 'src/modules/proof-console/proofConsoleData.ts',
  module: 'Proof Console',
  symbol: 'evaluateProofConsoleCommand',
  description: 'Clasifica comandos usando Truth Layer, Misconception Layer, Complexity Explorer y Open Frontier Lab.',
};

const theoremReference: CodeReference = {
  label: 'Proof Lab',
  path: 'src/modules/proof/ProofLab.tsx',
  module: 'Proof Lab',
  symbol: 'ProofLab',
  description: 'Contiene pruebas visuales como 2-SAT en P y SAT en NP.',
};

function firstReference(conceptId: string, fallback: CodeReference = commandReference) {
  return getComplexityConcept(conceptId).codeReferences?.[0] ?? fallback;
}

function misconceptionReference(conceptId: string | undefined) {
  if (!conceptId) return commandReference;
  return getComplexityConcept(conceptId).codeReferences?.[4] ?? commandReference;
}

function frontierReference() {
  return frontierTopics[0]?.codeReferences[0] ?? commandReference;
}

export const proofConsoleCommands: ProofConsoleCommand[] = [
  { command: 'help', description: 'Muestra comandos disponibles.' },
  { command: 'list theorems', description: 'Lista teoremas y hechos demostrados del laboratorio.' },
  { command: 'list open', description: 'Lista problemas abiertos registrados en Open Frontier Lab.' },
  { command: 'list errors', description: 'Lista errores comunes de Misconception Layer.' },
  { command: 'query P vs NP', description: 'Consulta el estado abierto de P vs NP.' },
  { command: 'query NP', description: 'Consulta la definicion de NP.' },
  { command: 'query SAT', description: 'Consulta SAT ∈ NP.' },
  { command: 'query 2-SAT', description: 'Consulta 2-SAT ∈ P.' },
  { command: 'claim "P ⊆ NP"', description: 'Valida una afirmacion como teorema conocido.' },
  { command: 'claim "NP significa no polinomial"', description: 'Detecta un error comun.' },
];

const theoremFacts = [
  {
    aliases: ['p ⊆ np', 'p subset np', 'p esta contenido en np', 'p está contenido en np'],
    title: 'P ⊆ NP',
    explanation: 'Todo problema resoluble en tiempo polinomial tambien tiene certificados verificables en tiempo polinomial.',
    details: ['STATUS: THEOREM', 'P ⊆ NP', 'Esto no demuestra P = NP ni P ≠ NP.'],
    codeReference: firstReference('P'),
  },
  {
    aliases: ['2-sat', 'two sat', '2 sat', '2-sat ∈ p', '2-sat en p'],
    title: '2-SAT ∈ P',
    explanation: '2-SAT se decide en tiempo polinomial usando el grafo de implicacion y componentes fuertemente conexas.',
    details: ['STATUS: THEOREM', '2-SAT ∈ P', 'Contrasta con 3-SAT, que es NP-completo.'],
    codeReference: theoremReference,
  },
  {
    aliases: ['sat', 'sat ∈ np', 'sat en np'],
    title: 'SAT ∈ NP',
    explanation: 'Una asignacion candidata permite verificar una formula SAT en tiempo polinomial.',
    details: ['STATUS: THEOREM', 'SAT ∈ NP', 'SAT tambien es NP-completo por Cook-Levin.'],
    codeReference: theoremReference,
  },
];

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/["“”]/g, '')
    .replace(/[.?!]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function response(command: string, status: ProofConsoleStatus, title: string, explanation: string, details: string[], codeReference: CodeReference = commandReference): ProofConsoleResponse {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    command,
    status,
    title,
    explanation,
    details,
    codeReference,
  };
}

function findTheorem(query: string) {
  const normalized = normalize(query);
  return theoremFacts.find((fact) => fact.aliases.some((alias) => normalize(alias) === normalized || normalized.includes(normalize(alias))));
}

function findCommonError(query: string) {
  const normalized = normalize(query);
  return misconceptions.find((item) => {
    const wrongIdea = normalize(item.wrongIdea);
    const title = normalize(item.title);
    return normalized === wrongIdea || normalized.includes(wrongIdea) || normalized.includes(title) || wrongIdea.includes(normalized);
  });
}

function findFrontierTopic(query: string) {
  const normalized = normalize(query);
  return frontierTopics.find((topic) => normalize(topic.title) === normalized || normalized.includes(normalize(topic.title)));
}

function findComplexityConcept(query: string) {
  const normalized = normalize(query);
  return complexityConcepts.find((concept) => normalize(concept.label) === normalized || normalize(concept.id) === normalized);
}

export function evaluateProofConsoleCommand(command: string): ProofConsoleResponse {
  const trimmed = command.trim();
  const normalized = normalize(trimmed);

  if (!trimmed) {
    return response(command, 'INTUITION', 'Empty command', 'Escribe help para ver comandos disponibles.', ['STATUS: INTUITION'], consoleReference);
  }

  if (normalized === 'help') {
    return response(command, 'INTUITION', 'Proof Console help', 'Comandos simples disponibles para consultar la base conceptual del laboratorio.', proofConsoleCommands.map((item) => `${item.command} — ${item.description}`), consoleReference);
  }

  if (normalized === 'list theorems') {
    return response(command, 'THEOREM', 'Teoremas registrados', 'Hechos demostrados o tratados como teoremas en los modulos del laboratorio.', theoremFacts.map((fact) => fact.title), theoremReference);
  }

  if (normalized === 'list open') {
    const openTopics = frontierTopics.filter((topic) => topic.status === 'OPEN');
    return response(command, 'OPEN', 'Problemas abiertos', 'Temas marcados como OPEN en Open Frontier Lab.', openTopics.map((topic) => `${topic.title}: ${topic.unknown[0]}`), frontierReference());
  }

  if (normalized === 'list errors') {
    return response(command, 'COMMON ERROR', 'Errores comunes', 'Entradas registradas en Misconception Layer.', misconceptions.map((item) => `${item.wrongIdea} → ${item.correction}`), misconceptionReference('NP'));
  }

  const queryMatch = trimmed.match(/^query\s+(.+)$/i);
  if (queryMatch) {
    const query = queryMatch[1];
    const theorem = findTheorem(query);
    if (theorem) return response(command, 'THEOREM', theorem.title, theorem.explanation, theorem.details, theorem.codeReference);

    const frontierTopic = findFrontierTopic(query);
    if (frontierTopic) {
      return response(command, 'OPEN', frontierTopic.title, frontierTopic.whyItMatters, [`STATUS: ${frontierTopic.status}`, `Lo que sí sabemos: ${frontierTopic.known.join(' ')}`, `Lo que no sabemos: ${frontierTopic.unknown.join(' ')}`], frontierTopic.codeReferences[0]);
    }

    const concept = findComplexityConcept(query);
    if (concept) {
      return response(command, 'DEFINITION', concept.label, concept.shortDefinition, [`STATUS: DEFINITION`, concept.definition, `Intuicion: ${concept.intuition}`], concept.codeReferences?.[0] ?? commandReference);
    }
  }

  const claimMatch = trimmed.match(/^claim\s+(.+)$/i);
  if (claimMatch) {
    const claim = claimMatch[1];
    const commonError = findCommonError(claim);
    if (commonError) {
      return response(command, 'COMMON ERROR', commonError.title, commonError.explanation, [`STATUS: COMMON ERROR`, `Afirmacion: ${commonError.wrongIdea}`, `Correccion: ${commonError.correction}`], misconceptionReference(commonError.relatedConceptIds[0]));
    }

    const theorem = findTheorem(claim);
    if (theorem) return response(command, 'THEOREM', theorem.title, theorem.explanation, theorem.details, theorem.codeReference);

    const frontierTopic = findFrontierTopic(claim);
    if (frontierTopic) {
      return response(command, 'OPEN', frontierTopic.title, 'La afirmacion cae en un problema abierto; no debe presentarse como demostrada.', [`STATUS: OPEN`, `Lo desconocido: ${frontierTopic.unknown.join(' ')}`], frontierTopic.codeReferences[0]);
    }
  }

  return response(command, 'INTUITION', 'Consulta no reconocida', 'La consola no encontro una entrada exacta. Prueba help, query SAT, query NP, query P vs NP o claim "P ⊆ NP".', ['STATUS: INTUITION', 'No se infiere ningun teorema nuevo desde comandos no reconocidos.'], commandReference);
}

export const initialProofConsoleEntry = response('boot', 'INTUITION', 'Proof Console ready', 'Consola local para consultar teoremas, definiciones, errores comunes y problemas abiertos.', ['Escribe help para empezar.', 'Los comandos no constituyen demostraciones nuevas.'], consoleReference);
