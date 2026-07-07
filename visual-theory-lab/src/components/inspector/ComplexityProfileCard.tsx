import type { ComplexityCurve, ComplexityProfile } from '../../modules/complexity/complexityTypes';

type ComplexityProfileCardProps = {
  profile?: ComplexityProfile;
};

type CurveSpec = {
  label: ComplexityCurve;
  path: string;
  tone: 'green' | 'cyan' | 'purple' | 'red' | 'yellow';
};

const curves: CurveSpec[] = [
  { label: 'O(1)', path: 'M 34 118 C 70 118, 120 118, 178 118', tone: 'green' },
  { label: 'O(log n)', path: 'M 34 122 C 58 104, 88 92, 178 84', tone: 'cyan' },
  { label: 'O(n)', path: 'M 34 126 L 178 42', tone: 'cyan' },
  { label: 'O(n log n)', path: 'M 34 128 C 72 108, 122 68, 178 24', tone: 'purple' },
  { label: 'O(n^2)', path: 'M 34 130 C 78 126, 134 98, 178 16', tone: 'yellow' },
  { label: 'O(2^n)', path: 'M 34 132 C 110 132, 154 92, 178 8', tone: 'red' },
  { label: 'O(n!)', path: 'M 34 134 C 126 134, 166 82, 182 4', tone: 'red' },
];

const fallbackProfile: ComplexityProfile = {
  shortLabel: 'No profile',
  category: 'not_applicable',
  highlights: [],
  note: 'No hay perfil de complejidad especifico para este concepto todavia.',
};

export function ComplexityProfileCard({ profile = fallbackProfile }: ComplexityProfileCardProps) {
  const activeCurves = new Set(profile.highlights);

  return (
    <section className="complexity-profile-card">
      <div className="profile-header">
        <div>
          <p className="eyebrow">Complexity Profile</p>
          <h3>{profile.shortLabel}</h3>
        </div>
        <span className={`profile-category ${profile.category}`}>{profile.category}</span>
      </div>

      <div className="profile-chart-wrap">
        <svg className="profile-chart" viewBox="0 0 230 158" role="img" aria-label="Grafico conceptual Big-O">
          <line className="profile-axis" x1="28" y1="136" x2="205" y2="136" />
          <line className="profile-axis" x1="28" y1="136" x2="28" y2="8" />
          <text className="profile-axis-label" x="118" y="153">input size / elements</text>
          <text className="profile-axis-label y" x="-102" y="12" transform="rotate(-90)">cost / operations</text>
          {curves.map((curve) => {
            const active = activeCurves.has(curve.label);

            return (
              <g key={curve.label} className={active ? 'profile-curve active' : 'profile-curve muted'}>
                <path className={curve.tone} d={curve.path} />
                <text x="184" y={labelY(curve.label)}>{curve.label}</text>
              </g>
            );
          })}
        </svg>
      </div>

      <p className="profile-note">{profile.note}</p>
      {profile.warning ? <p className="profile-warning">{profile.warning}</p> : null}
    </section>
  );
}

function labelY(label: ComplexityCurve) {
  const positions: Record<ComplexityCurve, number> = {
    'O(1)': 121,
    'O(log n)': 87,
    'O(n)': 47,
    'O(n log n)': 29,
    'O(n^2)': 18,
    'O(2^n)': 10,
    'O(n!)': 22,
  };

  return positions[label];
}
