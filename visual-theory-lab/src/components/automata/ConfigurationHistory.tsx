import type { TuringConfiguration } from '../../modules/automata/automataTypes';

type ConfigurationHistoryProps = {
  history: TuringConfiguration[];
};

export function ConfigurationHistory({ history }: ConfigurationHistoryProps) {
  return (
    <section className="verification-card configuration-history-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Configuration history</p>
          <h2>Historial</h2>
        </div>
      </div>
      <div className="configuration-history-list">
        {history.map((configuration) => (
          <code key={configuration.step}>
            step {configuration.step}: state={configuration.state}, head={configuration.head}, tape={configuration.tape.join('')}, status={configuration.status}
          </code>
        ))}
      </div>
    </section>
  );
}
