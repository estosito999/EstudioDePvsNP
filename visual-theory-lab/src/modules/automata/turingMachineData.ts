import type { TuringMachineDefinition } from './automataTypes';

export const evenOnesMachine: TuringMachineDefinition = {
  name: 'DTM: numero par de unos',
  description: 'Maquina determinista que acepta cadenas binarias con cantidad par de simbolos 1.',
  states: ['q_even', 'q_odd', 'q_accept', 'q_reject'],
  alphabet: ['0', '1', '_'],
  blank: '_',
  startState: 'q_even',
  acceptState: 'q_accept',
  rejectState: 'q_reject',
  defaultInput: '10110',
  transitions: [
    { state: 'q_even', read: '0', write: '0', move: 'R', nextState: 'q_even' },
    { state: 'q_even', read: '1', write: '1', move: 'R', nextState: 'q_odd' },
    { state: 'q_even', read: '_', write: '_', move: 'S', nextState: 'q_accept' },
    { state: 'q_odd', read: '0', write: '0', move: 'R', nextState: 'q_odd' },
    { state: 'q_odd', read: '1', write: '1', move: 'R', nextState: 'q_even' },
    { state: 'q_odd', read: '_', write: '_', move: 'S', nextState: 'q_reject' },
  ],
};
