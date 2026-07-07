import { repetitionRows } from '../../modules/randomization/randomizationData';
import type { RandomClass } from '../../modules/randomization/randomizationTypes';

type ErrorReductionPanelProps = {
  randomClass: RandomClass;
};

export function ErrorReductionPanel({ randomClass }: ErrorReductionPanelProps) {
  return (
    <section className="verification-card error-reduction-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Amplification</p>
          <h2>Repetición para reducir error</h2>
        </div>
        <span className="complexity-chip">error base {randomClass.baseError}</span>
      </div>
      <div className="error-meter">
        <span style={{ width: randomClass.id === 'zpp' ? '2%' : randomClass.id === 'bpp' ? '33%' : '50%' }} />
      </div>
      <table className="distance-table random-error-table">
        <thead><tr><th>Ejecuciones</th><th>RP/co-RP unilateral</th><th>BPP intuición</th></tr></thead>
        <tbody>
          {repetitionRows.map((row) => (
            <tr key={row.runs}><td>{row.runs}</td><td>{row.rpError}</td><td>{row.bppIntuition}</td></tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
