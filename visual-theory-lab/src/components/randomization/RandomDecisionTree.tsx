import type { RandomClass } from '../../modules/randomization/randomizationTypes';

type RandomDecisionTreeProps = {
  randomClass: RandomClass;
};

export function RandomDecisionTree({ randomClass }: RandomDecisionTreeProps) {
  const leaves = randomClass.id === 'zpp'
    ? ['respuesta verificada', 'reintentar', 'respuesta verificada', 'reintentar']
    : randomClass.id === 'rp'
      ? ['rechaza', 'acepta testigo', 'rechaza', 'acepta testigo']
      : randomClass.id === 'co-rp'
        ? ['rechaza certificado', 'acepta', 'rechaza certificado', 'acepta']
        : ['acepta', 'rechaza', 'acepta', 'error posible'];

  return (
    <section className="verification-card random-tree-card">
      <div className="verification-card-header">
        <div>
          <p className="eyebrow">Random decision tree</p>
          <h2>Árbol de decisiones aleatorias</h2>
        </div>
        <span className="status-badge cyan">bits aleatorios</span>
      </div>
      <svg className="random-tree-svg" viewBox="0 0 620 300" role="img" aria-label="Arbol de decisiones aleatorias">
        <line x1="310" y1="55" x2="170" y2="135" className="random-tree-edge" />
        <line x1="310" y1="55" x2="450" y2="135" className="random-tree-edge" />
        <line x1="170" y1="135" x2="95" y2="230" className="random-tree-edge" />
        <line x1="170" y1="135" x2="245" y2="230" className="random-tree-edge" />
        <line x1="450" y1="135" x2="375" y2="230" className="random-tree-edge" />
        <line x1="450" y1="135" x2="525" y2="230" className="random-tree-edge" />
        <text x="225" y="88" className="random-bit-label">r1=0</text>
        <text x="390" y="88" className="random-bit-label">r1=1</text>
        <text x="118" y="180" className="random-bit-label">r2=0</text>
        <text x="220" y="180" className="random-bit-label">r2=1</text>
        <text x="395" y="180" className="random-bit-label">r2=0</text>
        <text x="498" y="180" className="random-bit-label">r2=1</text>
        <g className="random-tree-node root"><circle cx="310" cy="55" r="33" /><text x="310" y="60">A(x,r)</text></g>
        <g className="random-tree-node"><circle cx="170" cy="135" r="29" /><text x="170" y="140">r1=0</text></g>
        <g className="random-tree-node"><circle cx="450" cy="135" r="29" /><text x="450" y="140">r1=1</text></g>
        {leaves.map((leaf, index) => {
          const x = [95, 245, 375, 525][index];
          const isError = leaf.includes('error');
          const isAccept = leaf.includes('acepta') || leaf.includes('verificada');
          return (
            <g className={`random-tree-leaf ${isError ? 'error' : isAccept ? 'accept' : 'reject'}`} key={`${leaf}-${index}`}>
              <rect x={x - 62} y="212" width="124" height="40" rx="8" />
              <text x={x} y="237">{leaf}</text>
            </g>
          );
        })}
      </svg>
      <p className="random-tree-note">La garantía de {randomClass.label} controla cuántas hojas pueden ser incorrectas bajo una distribución uniforme de bits aleatorios.</p>
    </section>
  );
}
