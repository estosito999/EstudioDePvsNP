import { useState } from 'react';
import { evenOnesMachine } from '../../modules/automata/turingMachineData';
import type { TuringConfiguration, TuringRunStatus, TuringTransition } from '../../modules/automata/automataTypes';
import { ConfigurationHistory } from './ConfigurationHistory';
import { TransitionTable } from './TransitionTable';
import { TuringTape } from './TuringTape';

type TuringMachineVisualizerProps = {
  onEvent: (message: string, level?: 'system' | 'info' | 'warn') => void;
};

const tapePadding = 4;

function makeTape(input: string) {
  return [...input, ...Array(tapePadding).fill(evenOnesMachine.blank)];
}

function statusForState(state: string): TuringRunStatus {
  if (state === evenOnesMachine.acceptState) return 'accepted';
  if (state === evenOnesMachine.rejectState) return 'rejected';
  return 'running';
}

export function TuringMachineVisualizer({ onEvent }: TuringMachineVisualizerProps) {
  const [input, setInput] = useState(evenOnesMachine.defaultInput);
  const [tape, setTape] = useState<string[]>(() => makeTape(evenOnesMachine.defaultInput));
  const [head, setHead] = useState(0);
  const [state, setState] = useState(evenOnesMachine.startState);
  const [stepCount, setStepCount] = useState(0);
  const [activeTransition, setActiveTransition] = useState<TuringTransition | undefined>();
  const [history, setHistory] = useState<TuringConfiguration[]>([]);
  const status = statusForState(state);
  const readSymbol = tape[head] ?? evenOnesMachine.blank;

  function record(nextTape: string[], nextHead: number, nextState: string, transition?: TuringTransition) {
    const nextStatus = statusForState(nextState);
    setHistory((current) => [
      ...current,
      { step: stepCount + 1, state: nextState, head: nextHead, tape: nextTape, status: nextStatus, transition },
    ].slice(-12));
  }

  function reset(nextInput = input) {
    setTape(makeTape(nextInput));
    setHead(0);
    setState(evenOnesMachine.startState);
    setStepCount(0);
    setActiveTransition(undefined);
    setHistory([]);
    onEvent('Maquina de Turing cargada', 'system');
  }

  function updateInput(value: string) {
    const sanitized = value.replace(/[^01]/g, '');
    setInput(sanitized);
    reset(sanitized);
    onEvent('Input actualizado', 'info');
  }

  function step() {
    if (status !== 'running') return;

    const transition = evenOnesMachine.transitions.find((candidate) => candidate.state === state && candidate.read === readSymbol);
    if (!transition) {
      setState(evenOnesMachine.rejectState);
      onEvent('Estado de rechazo alcanzado', 'warn');
      return;
    }

    const nextTape = [...tape];
    nextTape[head] = transition.write;
    const nextHead = Math.max(0, transition.move === 'R' ? head + 1 : transition.move === 'L' ? head - 1 : head);
    if (nextHead >= nextTape.length) nextTape.push(evenOnesMachine.blank);

    setTape(nextTape);
    setHead(nextHead);
    setState(transition.nextState);
    setActiveTransition(transition);
    setStepCount((current) => current + 1);
    record(nextTape, nextHead, transition.nextState, transition);
    onEvent('Step ejecutado', 'info');
    onEvent('Transicion aplicada', 'info');

    const nextStatus = statusForState(transition.nextState);
    if (nextStatus === 'accepted') onEvent('Estado de aceptacion alcanzado', 'system');
    if (nextStatus === 'rejected') onEvent('Estado de rechazo alcanzado', 'warn');
  }

  function run() {
    let nextTape = [...tape];
    let nextHead = head;
    let nextState = state;
    let nextStepCount = stepCount;
    let lastTransition: TuringTransition | undefined;
    const newHistory: TuringConfiguration[] = [];

    for (let i = 0; i < 32 && statusForState(nextState) === 'running'; i += 1) {
      const currentSymbol = nextTape[nextHead] ?? evenOnesMachine.blank;
      const transition = evenOnesMachine.transitions.find((candidate) => candidate.state === nextState && candidate.read === currentSymbol);

      if (!transition) {
        nextState = evenOnesMachine.rejectState;
        break;
      }

      nextTape = [...nextTape];
      nextTape[nextHead] = transition.write;
      nextHead = Math.max(0, transition.move === 'R' ? nextHead + 1 : transition.move === 'L' ? nextHead - 1 : nextHead);
      if (nextHead >= nextTape.length) nextTape.push(evenOnesMachine.blank);
      nextState = transition.nextState;
      nextStepCount += 1;
      lastTransition = transition;
      newHistory.push({
        step: nextStepCount,
        state: nextState,
        head: nextHead,
        tape: nextTape,
        status: statusForState(nextState),
        transition,
      });
    }

    setTape(nextTape);
    setHead(nextHead);
    setState(nextState);
    setStepCount(nextStepCount);
    setActiveTransition(lastTransition);
    setHistory((current) => [...current, ...newHistory].slice(-12));
    onEvent('Step ejecutado', 'info');
    onEvent('Transicion aplicada', 'info');

    const nextStatus = statusForState(nextState);
    if (nextStatus === 'accepted') onEvent('Estado de aceptacion alcanzado', 'system');
    if (nextStatus === 'rejected') onEvent('Estado de rechazo alcanzado', 'warn');
  }

  return (
    <div className="turing-visual-grid">
      <section className="verification-card turing-machine-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Deterministic Turing Machine</p>
            <h2>{evenOnesMachine.name}</h2>
          </div>
          <span className={`tm-status ${status}`}>{status}</span>
        </div>
        <p className="automata-copy">{evenOnesMachine.description}</p>
        <label className="tm-input-label">
          Input de cinta
          <input value={input} onChange={(event) => updateInput(event.target.value)} />
        </label>
        <TuringTape tape={tape} head={head} />
        <div className="tm-readout-grid">
          <div><span>Estado actual</span><strong>{state}</strong></div>
          <div><span>Simbolo leido</span><strong>{readSymbol}</strong></div>
          <div><span>Head</span><strong>{head}</strong></div>
          <div><span>Pasos</span><strong>{stepCount}</strong></div>
        </div>
        <div className="verification-actions">
          <button type="button" onClick={step}>Step</button>
          <button type="button" onClick={run}>Run</button>
          <button type="button" onClick={() => reset()}>Reset</button>
        </div>
      </section>

      <section className="verification-card transition-table-card">
        <div className="verification-card-header">
          <div>
            <p className="eyebrow">Transition function</p>
            <h2>Tabla de transicion</h2>
          </div>
        </div>
        <TransitionTable transitions={evenOnesMachine.transitions} activeTransition={activeTransition} />
      </section>

      <ConfigurationHistory history={history} />
    </div>
  );
}
