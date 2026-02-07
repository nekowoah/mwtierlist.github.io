import React from 'react';
import { RANK_COLORS } from '../config/constants.js';
import { HeroCard } from './HeroCard.jsx';

export function TierRow({ rank, heroes, currentMode, onSelectHero }) {
  if (heroes.length === 0) return null;
  const colorClass = RANK_COLORS[rank] ?? 'bg-slate-600';

  return (
    <div className="flex w-full min-h-[6rem] border-b border-slate-800 bg-slate-900/50">
      <div
        className={`w-24 md:w-32 flex-shrink-0 flex items-center justify-center ${colorClass} text-slate-900 font-black text-2xl md:text-3xl shadow-inner border-r-4 border-black/10`}
      >
        {rank}
      </div>
      <div className="flex-1 p-2 flex flex-wrap gap-2 items-center content-center bg-slate-800/30">
        {heroes.map((hero) => (
          <HeroCard
            key={hero.id}
            hero={hero}
            currentMode={currentMode}
            onSelect={onSelectHero}
          />
        ))}
      </div>
    </div>
  );
}
