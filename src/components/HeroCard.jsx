import React, { useState } from 'react';
import { Info } from './Icons.jsx';

export function HeroCard({ hero, currentMode, onSelect }) {
  const displayRank = hero.rankings[currentMode] ?? 'Unranked';
  const [imageError, setImageError] = useState(false);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(hero)}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(hero)}
      className="group relative w-20 h-20 md:w-24 md:h-24 bg-slate-700 rounded-lg overflow-hidden border-2 border-slate-600 hover:border-indigo-400 transition-all shadow-lg flex-shrink-0 cursor-pointer"
    >
      {hero.image && !imageError ? (
        <>
          <img
            src={hero.image}
            alt={hero.name}
            className="w-full h-full object-cover pb-4"
            onError={() => setImageError(true)}
          />
          <div className="absolute bottom-0 inset-x-0 bg-slate-900/90 py-0.5 px-1 text-center border-t border-slate-600/50">
            <p className="text-[10px] font-bold text-slate-100 truncate leading-tight">{hero.name}</p>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500">
          <span className="text-xs text-center px-1 font-bold">{hero.name}</span>
        </div>
      )}
      <div className="absolute top-0 right-0 bg-black/60 px-1 text-[10px] font-mono text-white rounded-bl backdrop-blur-sm z-10">
        {displayRank}
      </div>
      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-1 text-center z-20">
        <p className="text-white text-xs font-bold truncate w-full">{hero.name}</p>
        <div className="mt-2 p-1 bg-indigo-500/20 text-indigo-200 rounded-full">
          <Info size={14} />
        </div>
      </div>
    </div>
  );
}
