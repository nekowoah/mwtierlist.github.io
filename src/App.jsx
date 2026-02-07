import React, { useState, useEffect } from 'react';
import { RANK_ORDER, RANK_COLORS, CLASSES } from './config/constants.js';
import { GOOGLE_SHEET_CONFIG } from './config/sheet.js';
import { fetchSheetData } from './utils/sheet.js';
import { PRELOADED_DATA } from './data/preloadedHeroes.js';
import { Modal, TierRow } from './components/index.js';
import { Crown, Filter, Swords, Zap, ImageIcon } from './components/Icons.jsx';

const SORT_MODES = [
  { id: 'earlyGame', label: 'Early', icon: Swords },
  { id: 'lateGame', label: 'Late', icon: Crown },
  { id: 'sacrament', label: 'Sacrament', icon: Zap },
];

export default function App() {
  const [heroes, setHeroes] = useState(PRELOADED_DATA);
  const [loading, setLoading] = useState(!!(GOOGLE_SHEET_CONFIG?.SHEET_ID));
  const [selectedHero, setSelectedHero] = useState(null);
  const [activeSortMode, setActiveSortMode] = useState('earlyGame');
  const [filterClass, setFilterClass] = useState('All');
  const [selectedHeroImgError, setSelectedHeroImgError] = useState(false);

  useEffect(() => {
    if (!GOOGLE_SHEET_CONFIG?.SHEET_ID) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    fetchSheetData()
      .then((data) => {
        if (!cancelled && data?.length > 0) setHeroes(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredHeroes =
    filterClass === 'All'
      ? heroes
      : heroes.filter((h) => h.class === filterClass);

  const heroesByRank = {};
  RANK_ORDER.forEach((rank) => (heroesByRank[rank] = []));
  filteredHeroes.forEach((hero) => {
    const rank = hero.rankings[activeSortMode] ?? 'Unranked';
    if (heroesByRank[rank]) heroesByRank[rank].push(hero);
    else if (heroesByRank.Unranked) heroesByRank.Unranked.push(hero);
  });

  const handleSelectHero = (hero) => {
    setSelectedHero(hero);
    setSelectedHeroImgError(false);
  };

  const titleByMode = {
    earlyGame: 'Early Game Tier List',
    lateGame: 'Late Game Tier List',
    sacrament: 'Sacrament Tier List',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30">
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
                <Crown className="text-indigo-400" /> TIER LIST
              </h1>
              <div className="flex bg-slate-800 p-1 rounded-lg">
                {SORT_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setActiveSortMode(mode.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-bold transition-all ${
                      activeSortMode === mode.id
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700'
                    }`}
                  >
                    <mode.icon size={14} /> {mode.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg border border-slate-700 text-sm">
              <Filter size={16} className="text-slate-400" />
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="bg-slate-800 text-slate-200 outline-none cursor-pointer"
              >
                <option value="All">All Classes</option>
                {CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col gap-6">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-8 text-slate-400">
            <span className="animate-pulse">Loading tier list from Google Sheets…</span>
          </div>
        )}
        {!loading && (
          <div className="text-slate-400 text-sm">
            Showing <span className="text-white font-bold">{filteredHeroes.length}</span> heroes.
          </div>
        )}
        {!loading && (
          <div className="bg-slate-900 rounded-xl shadow-2xl border border-slate-800 overflow-hidden">
            <div className="bg-slate-800/50 p-4 border-b border-slate-800 flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-300">
                {titleByMode[activeSortMode]}
              </h2>
              <div className="text-slate-500 text-xs uppercase tracking-wider font-bold">
                {filterClass === 'All' ? 'All Classes' : filterClass}
              </div>
            </div>
            <div className="flex flex-col bg-slate-900">
              {RANK_ORDER.map((rank) => (
                <TierRow
                  key={rank}
                  rank={rank}
                  heroes={heroesByRank[rank]}
                  currentMode={activeSortMode}
                  onSelectHero={handleSelectHero}
                />
              ))}
              {filteredHeroes.length === 0 && (
                <div className="p-12 text-center text-slate-500">
                  <p>No heroes found.</p>
                </div>
              )}
            </div>
            <div className="p-2 bg-slate-950 text-center text-slate-600 text-xs font-mono">
              built by neko
            </div>
          </div>
        )}
      </main>

      <Modal
        isOpen={!!selectedHero}
        onClose={() => setSelectedHero(null)}
        title="Hero Details"
      >
        {selectedHero && (
          <div className="space-y-6">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-xl bg-slate-700 overflow-hidden border-4 border-slate-600 shadow-xl mb-4">
                {selectedHero.image && !selectedHeroImgError ? (
                  <img
                    src={selectedHero.image}
                    alt={selectedHero.name}
                    className="w-full h-full object-cover"
                    onError={() => setSelectedHeroImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={48} className="text-slate-500" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedHero.name}</h2>
              <div className="flex gap-2 mt-1">
                <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 text-xs rounded border border-indigo-500/30">
                  {selectedHero.class}
                </span>
                <span className="px-2 py-0.5 bg-slate-700 text-slate-300 text-xs rounded border border-slate-600">
                  {selectedHero.role}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Early Game', val: selectedHero.rankings.earlyGame },
                { label: 'Late Game', val: selectedHero.rankings.lateGame },
                { label: 'Sacrament', val: selectedHero.rankings.sacrament },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 text-center"
                >
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div
                    className={`text-2xl font-black ${
                      RANK_COLORS[stat.val]?.replace('bg-', 'text-') ?? 'text-white'
                    }`}
                  >
                    {stat.val}
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-slate-700/20 p-4 rounded-lg border border-slate-700">
              <h4 className="text-sm font-bold text-slate-300 mb-2">Notes</h4>
              <p className="text-sm text-slate-400 leading-relaxed whitespace-pre-wrap">
                {selectedHero.notes ?? 'No notes available for this hero.'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
