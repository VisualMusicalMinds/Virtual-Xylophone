import React, { useState, useEffect } from 'react';
import { NoteDefinition } from '../types';

interface BarProps {
  noteData: NoteDefinition;
  isActive: boolean;
  onClick: (note: NoteDefinition) => void;
}

export const Bar: React.FC<BarProps> = ({ noteData, isActive, onClick }) => {
  const [animating, setAnimating] = useState(false);

  // Trigger animation when external isActive becomes true
  useEffect(() => {
    if (isActive) {
      triggerHit();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  const triggerHit = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 150);
  };

  const handleInteraction = () => {
    triggerHit();
    onClick(noteData);
  };

  return (
    <div className="flex items-center justify-center group select-none w-full landscape:w-auto h-auto landscape:h-full">
      {/* The Bar */}
      <button
        onMouseDown={handleInteraction}
        onTouchStart={(e) => { e.preventDefault(); handleInteraction(); }}
        className={`
          relative
          /* Portrait (Vertical Stack): Width varies (uses bar-length), Height fixed */
          w-[var(--bar-length)] h-12 sm:h-14
          
          /* Landscape (Horizontal Stack): Height varies (uses bar-length), Width fixed */
          landscape:h-[var(--bar-length)] 
          landscape:w-10 landscape:sm:w-12 landscape:md:w-14 landscape:lg:w-16
          
          ${noteData.color}
          ${animating ? 'animate-hit brightness-110' : 'hover:brightness-105'}
          rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
          active:shadow-[2px_2px_0px_rgba(0,0,0,0.2)]
          active:translate-y-[2px]
          transition-all duration-75
          border-b-4 border-r-4 border-black/10
          flex items-center justify-center
          cursor-pointer
        `}
        style={{
          '--bar-length': `${noteData.heightPercent}%`
        } as React.CSSProperties}
        aria-label={`Play ${noteData.note}${noteData.octave}`}
      >
         {/* Bolt 1 */}
         {/* Portrait: Left centered vertically */}
         <div className="absolute w-3 h-3 rounded-full bg-white/30 shadow-inner
           left-3 top-1/2 -translate-y-1/2 
           /* Landscape: Top centered horizontally */
           landscape:left-1/2 landscape:-translate-x-1/2 landscape:top-3 landscape:translate-y-0
         "></div>
         
         {/* Note Label */}
         <span className={`font-bold text-lg sm:text-2xl drop-shadow-md text-white/90`}>
           {noteData.note}
         </span>

         {/* Bolt 2 */}
         {/* Portrait: Right centered vertically */}
         <div className="absolute w-3 h-3 rounded-full bg-white/30 shadow-inner
           right-3 top-1/2 -translate-y-1/2
           /* Landscape: Bottom centered horizontally */
           landscape:right-auto landscape:left-1/2 landscape:-translate-x-1/2 landscape:bottom-3 landscape:translate-y-0 landscape:top-auto
         "></div>
      </button>
    </div>
  );
};