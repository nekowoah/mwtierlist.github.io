/**
 * Parse CSV text into rows (array of string arrays).
 * Handles quoted fields and newlines inside quotes.
 */
export function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if (!inQuotes && (c === '\n' || (c === '\r' && text[i + 1] === '\n'))) {
      if (c === '\r') i++;
      row.push(cell.trim());
      rows.push(row);
      row = [];
      cell = '';
    } else if (!inQuotes && c === ',') {
      row.push(cell.trim());
      cell = '';
    } else {
      cell += c;
    }
  }

  if (cell !== '' || row.length > 0) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

/**
 * Convert CSV rows (with header row) to array of objects.
 * Header names are normalized (lowercase, single space); known names map to camelCase keys.
 */
export function csvRowsToObjects(rows) {
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => (h || '').trim().toLowerCase().replace(/\s+/g, ' '));
  const keyMap = {
    name: 'name',
    class: 'class',
    role: 'role',
    'early game': 'earlyGame',
    early: 'earlyGame',
    'late game': 'lateGame',
    late: 'lateGame',
    sacrament: 'sacrament',
    notes: 'notes',
    image: 'image',
    'image url': 'image',
  };

  const key = (h) => keyMap[h] ?? h.replace(/\s/g, '');

  return rows.slice(1).map((row) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[key(h)] = row[i] != null ? String(row[i]).trim() : '';
    });
    return obj;
  });
}
