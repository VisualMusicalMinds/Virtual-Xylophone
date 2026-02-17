export interface NoteDefinition {
  id: string;
  note: string;
  octave: number;
  frequency: number;
  color: string;
  labelColor: string;
  heightPercent: number; // For visual bar length
}

export interface GeneratedMelodyNote {
  note: string; // e.g., "C4"
  duration: number; // in ms
}
