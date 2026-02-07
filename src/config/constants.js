/** Display order for tier ranks */
export const RANK_ORDER = [
  'SSS', 'SS+', 'SS', 'SS-', 'S+', 'S', 'S-',
  'A+', 'A', 'A-', 'B+', 'B', 'B-', 'C', 'D', 'F', 'Unranked',
];

/** Tailwind background classes per rank */
export const RANK_COLORS = {
  SSS: 'bg-red-600',
  'SS+': 'bg-red-500',
  SS: 'bg-red-500',
  'SS-': 'bg-red-500',
  'S+': 'bg-orange-500',
  S: 'bg-orange-500',
  'S-': 'bg-orange-500',
  'A+': 'bg-yellow-500',
  A: 'bg-yellow-500',
  'A-': 'bg-yellow-500',
  'B+': 'bg-green-500',
  B: 'bg-green-500',
  'B-': 'bg-green-500',
  C: 'bg-blue-400',
  D: 'bg-gray-400',
  F: 'bg-gray-600',
  Unranked: 'bg-slate-700',
};

/** Hero class filter options */
export const CLASSES = [
  'Swordman', 'Archer', 'Mage', 'Spearman',
  'Cavalry', 'Pegasus Knight', 'Priest', 'Shield Guard',
];
