export type LetterName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export type RootNote = {
  id: string;
  label: string;
  displayName: string;
  pitchClass: number;
  letter: LetterName;
  accidental: -1 | 0 | 1;
  preferFlats: boolean;
};

export type Interval = {
  degree: number;
  semitones: number;
  label: string;
};

export type ChordType = {
  id: string;
  suffix: string;
  label: string;
  description: string;
  intervals: Interval[];
};

export type GuitarTemplate = {
  id: string;
  label: string;
  rootString: 5 | 6;
  frets: Array<number | null>;
};

export type GuitarVoicing = {
  label: string;
  strings: Array<number | null>;
  rootString: 5 | 6;
};

