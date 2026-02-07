import { parseCSV, csvRowsToObjects } from './csv.js';
import { GOOGLE_SHEET_CONFIG } from '../config/sheet.js';

/**
 * Map a row from the sheet (object with earlyGame, lateGame, name, etc.) to app hero shape.
 */
export function mapSheetRowToHero(row, index) {
  const early = (row.earlyGame ?? row['early game'] ?? '').trim() || 'Unranked';
  const late = (row.lateGame ?? row['late game'] ?? '').trim() || 'Unranked';
  const sac = (row.sacrament ?? '').trim() || 'Unranked';
  return {
    id: row.id ?? `sheet-${index}-${(row.name ?? '').replace(/\W/g, '-')}`,
    name: (row.name ?? '').trim() || 'Unknown',
    class: (row.class ?? '').trim() || 'Unknown',
    role: (row.role ?? '').trim() || '',
    rankings: { earlyGame: early, lateGame: late, sacrament: sac },
    notes: (row.notes ?? '').trim() || '',
    image: (row.image ?? '').trim() || null,
  };
}

/**
 * Fetch tier data from the configured Google Sheet (CSV export).
 * Returns array of heroes or null on failure/missing config.
 */
export async function fetchSheetData() {
  if (!GOOGLE_SHEET_CONFIG?.SHEET_ID) return null;

  const { SHEET_ID, DATA_SHEET_GID } = GOOGLE_SHEET_CONFIG;
  let url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
  if (DATA_SHEET_GID != null && DATA_SHEET_GID !== '') {
    url += `&gid=${DATA_SHEET_GID}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const text = await res.text();
    const rows = parseCSV(text);
    const raw = csvRowsToObjects(rows);
    const heroes = raw
      .filter((r) => r.name || r.Name)
      .map((r, i) => mapSheetRowToHero(r, i));
    return heroes.length > 0 ? heroes : null;
  } catch {
    return null;
  }
}
