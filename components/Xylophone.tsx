import React from 'react';
import { NOTES } from '../constants';
import { Bar } from './Bar';
import { NoteDefinition } from '../types';

interface XylophoneProps {
  activeNoteId: string | null;
  onNotePlay: (note: NoteDefinition) => void;
}

export const Xylophone: React.FC<XylophoneProps> = ({ activeNoteId, onNotePlay }) => {
  
  const handlePlay = (note: NoteDefinition) => {
    onNotePlay(note);
  };

  return (
    <div className="relative p-6 md:p-8 rounded-3xl bg-[#5d4037] shadow-[10px_10px_30px_rgba(0,0,0,0.5)] border-4 border-[#3e2723] w-full max-w-md landscape:max-w-5xl transition-all duration-300">
      
      {/* Background Rails (SVG) */}
      
      {/* Portrait Vertical Rails (Hidden in Landscape) */}
      {/* Rails converge from bottom (wide) to top (narrow) to match bar widths */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply block landscape:hidden">
         {/* Left Rail */}
         <line x1="5%" y1="96%" x2="26%" y2="4%" stroke="#2d1b15" strokeWidth="16" strokeLinecap="round" />
         {/* Right Rail */}
         <line x1="95%" y1="96%" x2="74%" y2="4%" stroke="#2d1b15" strokeWidth="16" strokeLinecap="round" />
      </svg>

      {/* Landscape Horizontal Rails (Hidden in Portrait) */}
      <svg className="hidden landscape:block absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-multiply">
         {/* Top Rail */}
         <line x1="4%" y1="12%" x2="96%" y2="28%" stroke="#2d1b15" strokeWidth="16" strokeLinecap="round" />
         {/* Bottom Rail */}
         <line x1="4%" y1="88%" x2="96%" y2="72%" stroke="#2d1b15" strokeWidth="16" strokeLinecap="round" />
      </svg>

      {/* Bars Container */}
      {/* Portrait: flex-col-reverse (C4 bottom, A5 top). Landscape: flex-row (C4 left, A5 right) */}
      {/* Height is auto in portrait, fixed in landscape */}
      <div className="relative z-10 flex flex-col-reverse landscape:flex-row items-center justify-center gap-2 w-full h-auto landscape:h-64 landscape:sm:h-80 landscape:md:h-96 py-4 landscape:py-0">
        {NOTES.map((note) => (
          <Bar
            key={note.id}
            noteData={note}
            isActive={activeNoteId === note.id}
            onClick={handlePlay}
          />
        ))}
      </div>
      
      {/* Frame Ends */}
      
      {/* Portrait Frame Ends (Top/Bottom) */}
      <div className="landscape:hidden absolute left-1/2 -translate-x-1/2 -bottom-2 w-48 h-4 bg-[#4e342e] rounded-b border border-black/20 shadow-lg"></div>
      <div className="landscape:hidden absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-4 bg-[#4e342e] rounded-t border border-black/20 shadow-lg"></div>

      {/* Landscape Frame Ends (Left/Right) */}
      <div className="hidden landscape:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-48 bg-[#4e342e] rounded-l border border-black/20 shadow-lg"></div>
      <div className="hidden landscape:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-32 bg-[#4e342e] rounded-r border border-black/20 shadow-lg"></div>
    </div>
  );
};