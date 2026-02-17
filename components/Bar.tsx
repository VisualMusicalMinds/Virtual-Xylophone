import React, { useState, useEffect } from 'react';
import { NoteDefinition } from '../types';

interface BarProps {
  noteData: NoteDefinition;
  isActive: boolean;
  onClick: (note: NoteDefinition) => void;
  accidental: 'sharp' | 'flat' | null;
  onToggleAccidental: (type: 'sharp' | 'flat') => void;
  isDisabled: boolean;
  onToggleEnabled: () => void;
}

export const Bar: React.FC<BarProps> = ({ 
  noteData, 
  isActive, 
  onClick, 
  accidental, 
  onToggleAccidental,
  isDisabled,
  onToggleEnabled
}) => {
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
    if (isDisabled) return;
    triggerHit();
    onClick(noteData);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (e.buttons === 1) {
      handleInteraction();
    }
  };

  const handleAccidentalClick = (e: React.MouseEvent | React.TouchEvent, type: 'sharp' | 'flat') => {
    e.stopPropagation();
    if (isDisabled) return;
    onToggleAccidental(type);
  };

  const toggleBolts = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onToggleEnabled();
  };

  return (
    <div className="flex items-center justify-center group select-none w-full landscape:w-auto h-auto landscape:h-full">
      {/* The Bar */}
      <button
        data-note-id={noteData.id}
        onMouseDown={handleInteraction}
        onMouseEnter={handleMouseEnter}
        onDragStart={(e) => e.preventDefault()}
        onTouchStart={(e) => { e.preventDefault(); handleInteraction(); }}
        className={`
          relative
          /* Portrait (Vertical Stack): Width varies (uses bar-length), Height fixed */
          w-[var(--bar-length)] h-12 sm:h-14
          
          /* Landscape (Horizontal Stack): Height varies (uses bar-length), Width fixed */
          landscape:h-[var(--bar-length)] 
          landscape:w-10 landscape:sm:w-12 landscape:md:w-14 landscape:lg:w-16
          
          ${isDisabled ? 'bg-gray-700' : noteData.color}
          ${animating ? 'animate-hit brightness-110' : ''}
          ${!isDisabled ? 'hover:brightness-105' : ''}
          rounded-md shadow-[4px_4px_0px_rgba(0,0,0,0.2)]
          ${!isDisabled ? 'active:shadow-[2px_2px_0px_rgba(0,0,0,0.2)] active:translate-y-[2px]' : ''}
          transition-all duration-75
          border-b-4 border-r-4 border-black/10
          flex items-center justify-center
          ${isDisabled ? 'cursor-default' : 'cursor-pointer'}
        `}
        style={{
          '--bar-length': `${noteData.heightPercent}%`
        } as React.CSSProperties}
        aria-label={`Play ${noteData.note}${noteData.octave}`}
      >
         {/* Bolt 1 */}
         <div 
           onMouseDown={toggleBolts}
           onTouchStart={toggleBolts}
           className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all duration-200 z-20
             ${!isDisabled ? 'bg-white shadow-[0_0_2px_rgba(0,0,0,0.3)]' : 'bg-white/40 shadow-none'}
             left-3 top-1/2 -translate-y-1/2 
             /* Landscape: Top centered horizontally */
             landscape:left-1/2 landscape:-translate-x-1/2 landscape:top-3 landscape:translate-y-0
         `}></div>
         
         {/* Note Label Container - Opacity control for disabled state */}
         <div className={`flex flex-row landscape:flex-col items-center justify-center gap-1 sm:gap-2 z-10 transition-opacity duration-200 ${isDisabled ? 'opacity-40' : 'opacity-100'}`}>
           {/* Sharp Sign (#) */}
           <span 
             onMouseDown={(e) => handleAccidentalClick(e, 'sharp')}
             onTouchStart={(e) => handleAccidentalClick(e, 'sharp')}
             className={`
               font-bold text-lg sm:text-2xl select-none transition-all duration-200 p-1
               ${accidental === 'sharp' ? 'text-white opacity-100 scale-110 drop-shadow-md' : 'text-white/40'}
               ${!isDisabled ? 'cursor-pointer hover:text-white/70' : 'cursor-default'}
             `}
           >
             #
           </span>

           {/* Note Name */}
           <span className={`font-bold text-lg sm:text-2xl drop-shadow-md text-white/90`}>
             {noteData.note}
           </span>

           {/* Flat Sign (♭) */}
           <span 
             onMouseDown={(e) => handleAccidentalClick(e, 'flat')}
             onTouchStart={(e) => handleAccidentalClick(e, 'flat')}
             className={`
               font-bold text-lg sm:text-2xl select-none transition-all duration-200 p-1
               ${accidental === 'flat' ? 'text-white opacity-100 scale-110 drop-shadow-md' : 'text-white/40'}
               ${!isDisabled ? 'cursor-pointer hover:text-white/70' : 'cursor-default'}
             `}
           >
             ♭
           </span>
         </div>

         {/* Bolt 2 */}
         <div 
           onMouseDown={toggleBolts}
           onTouchStart={toggleBolts}
           className={`absolute w-3 h-3 rounded-full cursor-pointer transition-all duration-200 z-20
             ${!isDisabled ? 'bg-white shadow-[0_0_2px_rgba(0,0,0,0.3)]' : 'bg-white/40 shadow-none'}
             right-3 top-1/2 -translate-y-1/2
             /* Landscape: Bottom centered horizontally */
             landscape:right-auto landscape:left-1/2 landscape:-translate-x-1/2 landscape:bottom-3 landscape:translate-y-0 landscape:top-auto
         `}></div>
      </button>
    </div>
  );
};