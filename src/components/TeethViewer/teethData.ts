export interface ToothData {
  id: string;
  name: string;
  type: 'incisor' | 'canine' | 'premolar' | 'molar' | 'wisdom';
  jaw: 'upper' | 'lower';
  angle: number; // angle in the arch (radians or degrees)
  archRadius: number;
}

// Map types to sizes
export const TOOTH_SIZES = {
  incisor: { width: 0.6, height: 0.8, depth: 0.4 },
  canine: { width: 0.6, height: 0.9, depth: 0.5 },
  premolar: { width: 0.7, height: 0.7, depth: 0.7 },
  molar: { width: 1.0, height: 0.7, depth: 1.0 },
  wisdom: { width: 0.9, height: 0.6, depth: 0.9 },
};

const createArch = (jaw: 'upper' | 'lower') => {
  const teeth: ToothData[] = [];
  const radiusX = 4.5;
  const radiusY = 5.5;
  const startAngle = -Math.PI * 0.1; // slightly back
  const endAngle = Math.PI * 1.1;

  // We want 16 teeth per arch
  const labels = [
    { type: 'wisdom', name: 'Third Molar (Wisdom Tooth)' },
    { type: 'molar', name: 'Second Molar' },
    { type: 'molar', name: 'First Molar' },
    { type: 'premolar', name: 'Second Premolar' },
    { type: 'premolar', name: 'First Premolar' },
    { type: 'canine', name: 'Canine' },
    { type: 'incisor', name: 'Lateral Incisor' },
    { type: 'incisor', name: 'Central Incisor' },
    { type: 'incisor', name: 'Central Incisor' },
    { type: 'incisor', name: 'Lateral Incisor' },
    { type: 'canine', name: 'Canine' },
    { type: 'premolar', name: 'First Premolar' },
    { type: 'premolar', name: 'Second Premolar' },
    { type: 'molar', name: 'First Molar' },
    { type: 'molar', name: 'Second Molar' },
    { type: 'wisdom', name: 'Third Molar (Wisdom Tooth)' },
  ];

  for (let i = 0; i < 16; i++) {
    const t = i / 15;
    // Map t [0, 1] to angle [PI*1.2, -PI*0.2] for a full U-shape
    const angle = Math.PI * 1.2 - t * Math.PI * 1.4;
    const item = labels[i];
    
    teeth.push({
      id: `${jaw}-${i}`,
      name: `${jaw === 'upper' ? 'Upper' : 'Lower'} ${item.name}`,
      type: item.type as any,
      jaw,
      angle,
      archRadius: 5
    });
  }

  return teeth;
};

export const ALL_TEETH: ToothData[] = [
  ...createArch('upper'),
  ...createArch('lower')
];
