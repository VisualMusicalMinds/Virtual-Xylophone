import { NoteDefinition } from './types';

// Range: C4 to A5 (Octave + 6th)
// Frequencies based on A4 = 440Hz

// Visual Configuration
// Longest bar (C4) ~ 100% height
// Shortest bar (A5) ~ 50% height
// We will distribute the heights linearly or logarithmically.

export const NOTES: NoteDefinition[] = [
  { id: 'C4', note: 'C', octave: 4, frequency: 261.63, color: 'bg-red-500', labelColor: 'text-red-900', heightPercent: 100 },
  { id: 'D4', note: 'D', octave: 4, frequency: 293.66, color: 'bg-orange-500', labelColor: 'text-orange-900', heightPercent: 96 },
  { id: 'E4', note: 'E', octave: 4, frequency: 329.63, color: 'bg-yellow-400', labelColor: 'text-yellow-900', heightPercent: 92 },
  { id: 'F4', note: 'F', octave: 4, frequency: 349.23, color: 'bg-green-500', labelColor: 'text-green-900', heightPercent: 88 },
  { id: 'G4', note: 'G', octave: 4, frequency: 392.00, color: 'bg-teal-400', labelColor: 'text-teal-900', heightPercent: 84 },
  { id: 'A4', note: 'A', octave: 4, frequency: 440.00, color: 'bg-blue-500', labelColor: 'text-blue-900', heightPercent: 80 },
  { id: 'B4', note: 'B', octave: 4, frequency: 493.88, color: 'bg-purple-500', labelColor: 'text-purple-900', heightPercent: 76 },
  { id: 'C5', note: 'C', octave: 5, frequency: 523.25, color: 'bg-red-500', labelColor: 'text-red-900', heightPercent: 72 },
  { id: 'D5', note: 'D', octave: 5, frequency: 587.33, color: 'bg-orange-500', labelColor: 'text-orange-900', heightPercent: 68 },
  { id: 'E5', note: 'E', octave: 5, frequency: 659.25, color: 'bg-yellow-400', labelColor: 'text-yellow-900', heightPercent: 64 },
  { id: 'F5', note: 'F', octave: 5, frequency: 698.46, color: 'bg-green-500', labelColor: 'text-green-900', heightPercent: 60 },
  { id: 'G5', note: 'G', octave: 5, frequency: 783.99, color: 'bg-teal-400', labelColor: 'text-teal-900', heightPercent: 56 },
  { id: 'A5', note: 'A', octave: 5, frequency: 880.00, color: 'bg-blue-500', labelColor: 'text-blue-900', heightPercent: 52 },
];
