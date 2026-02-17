import React, { useState, useEffect, useCallback } from 'react';
import { Xylophone } from './components/Xylophone';
import { xylophoneAudio } from './utils/audio';
import { NOTES } from './constants';
import { NoteDefinition } from './types';

const App: React.FC = () => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  const triggerNote = useCallback((noteId: string) => {
    const note = NOTES.find(n => n.id === noteId);
    if (note) {
      xylophoneAudio.playNote(note.frequency);
      setActiveNoteId(noteId);
      
      // Reset after a short duration to allow re-triggering animation
      setTimeout(() => {
        setActiveNoteId(prev => prev === noteId ? null : prev);
      }, 100);
    }
  }, []);

  const handleNotePlay = (note: NoteDefinition) => {
    triggerNote(note.id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      
      const key = e.key.toLowerCase();
      const keyMap: Record<string, string> = {
        '1': 'C4',
        '2': 'D4',
        '3': 'E4',
        '4': 'F4',
        '5': 'G4',
        '6': 'A4',
        '7': 'B4',
        '8': 'C5',
        '9': 'D5',
        '0': 'E5',
        'i': 'F5',
        'o': 'G5',
        'p': 'A5'
      };

      const noteId = keyMap[key];
      if (noteId) {
        triggerNote(noteId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [triggerNote]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="transform scale-100 sm:scale-105 md:scale-110 transition-transform w-full flex justify-center">
        <Xylophone 
          activeNoteId={activeNoteId} 
          onNotePlay={handleNotePlay} 
        />
      </div>
    </div>
  );
};

export default App;