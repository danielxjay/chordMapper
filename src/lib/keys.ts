import { CHORD_TYPES, ROOT_NOTES } from '../data/music';
import type { ChordType, RootNote } from '../types';

const MAJOR_SCALE_SEMITONES = [0, 2, 4, 5, 7, 9, 11];
const DIATONIC_CHORD_TYPE_IDS = ['maj', 'min', 'min', 'maj', 'maj', 'min', 'dim'];
const ROMAN_NUMERALS = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];

export type DiatonicChord = {
  root: RootNote;
  chordType: ChordType;
  roman: string;
  position: number;
  label: string;
};

export type KeyMatch = {
  keyRoot: RootNote;
  roman: string;
  position: number;
  chords: DiatonicChord[];
};

function buildDiatonicChords(keyRoot: RootNote): DiatonicChord[] {
  return MAJOR_SCALE_SEMITONES.map((semitones, i) => {
    const pitchClass = (keyRoot.pitchClass + semitones) % 12;
    const root = ROOT_NOTES.find((r) => r.pitchClass === pitchClass)!;
    const chordType = CHORD_TYPES.find((ct) => ct.id === DIATONIC_CHORD_TYPE_IDS[i])!;
    return {
      root,
      chordType,
      roman: ROMAN_NUMERALS[i],
      position: i,
      label: getDiatonicLabel(root, chordType),
    };
  });
}

export function getDiatonicLabel(root: RootNote, chordType: ChordType): string {
  if (chordType.id === 'min') return root.label + 'm';
  if (chordType.id === 'dim') return root.label + '°';
  return root.label;
}

export function getKeysForChord(root: RootNote, chordType: ChordType): KeyMatch[] {
  if (!DIATONIC_CHORD_TYPE_IDS.includes(chordType.id)) return [];

  return ROOT_NOTES.flatMap((keyRoot) => {
    const chords = buildDiatonicChords(keyRoot);
    const match = chords.find(
      (d) => d.root.pitchClass === root.pitchClass && d.chordType.id === chordType.id,
    );
    return match ? [{ keyRoot, roman: match.roman, position: match.position, chords }] : [];
  });
}
