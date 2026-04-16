import { useState } from 'react';
import type { KeyMatch } from '../lib/keys';
import type { ChordType, RootNote } from '../types';

type Props = {
  root: RootNote;
  chordType: ChordType;
  keyMatches: KeyMatch[];
  onSelectChord: (rootId: string, chordTypeId: string) => void;
};

export function KeyContextDrawer({ root, chordType, keyMatches, onSelectChord }: Props) {
  const [selectedKeyIndex, setSelectedKeyIndex] = useState(0);
  const activeMatch = keyMatches[selectedKeyIndex] ?? keyMatches[0];

  return (
    <div className="key-drawer__panel">
      <div className="key-drawer__header">
        <p className="eyebrow">In key</p>
        <div className="key-drawer__tabs">
          {keyMatches.map((km, i) => (
            <button
              key={km.keyRoot.id}
              type="button"
              className={`mini-button${i === selectedKeyIndex ? ' mini-button--active' : ''}`}
              onClick={() => setSelectedKeyIndex(i)}
            >
              {km.keyRoot.label}
            </button>
          ))}
        </div>
      </div>
      <div className="key-drawer__chords">
        {activeMatch.chords.map((chord) => {
          const isActive =
            chord.root.pitchClass === root.pitchClass && chord.chordType.id === chordType.id;
          return (
            <button
              key={chord.position}
              type="button"
              className={`key-drawer__chord${isActive ? ' key-drawer__chord--active' : ''}`}
              onClick={() => !isActive && onSelectChord(chord.root.id, chord.chordType.id)}
              disabled={isActive}
            >
              <span className="key-drawer__roman">{chord.roman}</span>
              <span className="key-drawer__name">{chord.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
