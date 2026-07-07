export type ConsoleEvent = {
  id: string;
  timestamp: string;
  level: 'system' | 'info' | 'warn';
  message: string;
};

type BottomConsoleProps = {
  events: ConsoleEvent[];
};

export function BottomConsole({ events }: BottomConsoleProps) {
  return (
    <footer className="console-panel">
      <div className="console-header">
        <span>EVENT LOG</span>
        <small>{events.length} registros</small>
      </div>
      <div className="console-stream" aria-live="polite">
        {events.map((event) => (
          <div className={`console-line ${event.level}`} key={event.id}>
            <span>{event.timestamp}</span>
            <strong>[{event.level.toUpperCase()}]</strong>
            <p>{event.message}</p>
          </div>
        ))}
      </div>
    </footer>
  );
}
