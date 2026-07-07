import type { TuringTransition } from '../../modules/automata/automataTypes';

type TransitionTableProps = {
  transitions: TuringTransition[];
  activeTransition?: TuringTransition;
};

function sameTransition(a?: TuringTransition, b?: TuringTransition) {
  return Boolean(a && b && a.state === b.state && a.read === b.read && a.nextState === b.nextState);
}

export function TransitionTable({ transitions, activeTransition }: TransitionTableProps) {
  return (
    <table className="transition-table">
      <thead>
        <tr>
          <th>Estado</th>
          <th>Lee</th>
          <th>Escribe</th>
          <th>Mueve</th>
          <th>Siguiente</th>
        </tr>
      </thead>
      <tbody>
        {transitions.map((transition) => (
          <tr className={sameTransition(activeTransition, transition) ? 'active' : ''} key={`${transition.state}-${transition.read}-${transition.nextState}`}>
            <td>{transition.state}</td>
            <td>{transition.read}</td>
            <td>{transition.write}</td>
            <td>{transition.move}</td>
            <td>{transition.nextState}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
