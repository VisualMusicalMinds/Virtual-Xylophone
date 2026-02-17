import React, { useState, useEffect, useCallback } from 'react';
import { Xylophone } from './components/Xylophone';
import { xylophoneAudio } from './utils/audio';
import { NOTES } from './constants';
import { NoteDefinition } from './types';

const App: React.FC = () => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [accidentals, setAccidentals] = useState<Record<string, 'sharp' | 'flat' | null>>({});
  const [disabledNotes, setDisabledNotes] = useState<Set<string>>(new Set());

  const toggleAccidental = (noteId: string, type: 'sharp' | 'flat') => {
    setAccidentals(prev => {
      const current = prev[noteId];
      if (current === type) {
        // Toggle off if already active
        const newState = { ...prev };
        delete newState[noteId];
        return newState;
      }
      // Set new accidental (overrides existing)
      return { ...prev, [noteId]: type };
    });
  };

  const toggleNoteEnabled = (noteId: string) => {
    setDisabledNotes(prev => {
      const next = new Set(prev);
      if (next.has(noteId)) {
        next.delete(noteId); // Enable
      } else {
        next.add(noteId); // Disable
        // If disabling, also remove any accidentals
        setAccidentals(prevAcc => {
          const newAcc = { ...prevAcc };
          delete newAcc[noteId];
          return newAcc;
        });
      }
      return next;
    });
  };

  const triggerNote = useCallback((noteId: string) => {
    // Do not play if disabled
    if (disabledNotes.has(noteId)) return;

    const note = NOTES.find(n => n.id === noteId);
    if (note) {
      let frequency = note.frequency;
      const accidental = accidentals[noteId];

      // Adjust pitch based on accidental
      // 2^(1/12) is approximately 1.059463
      if (accidental === 'sharp') {
        frequency = note.frequency * 1.059463;
      } else if (accidental === 'flat') {
        frequency = note.frequency / 1.059463;
      }

      xylophoneAudio.playNote(frequency);
      setActiveNoteId(noteId);
      
      // Reset after a short duration to allow re-triggering animation
      setTimeout(() => {
        setActiveNoteId(prev => prev === noteId ? null : prev);
      }, 100);
    }
  }, [accidentals, disabledNotes]);

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
          accidentals={accidentals}
          onToggleAccidental={toggleAccidental}
          disabledNotes={disabledNotes}
          onToggleNoteEnabled={toggleNoteEnabled}
        />
      </div>
    </div>
  );
};

export default App;