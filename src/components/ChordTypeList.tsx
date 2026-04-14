import { getChordLabel } from '../lib/chords';
import type { ChordType, RootNote } from '../types';

type ChordTypeListProps = {
  chordTypes: ChordType[];
  root: RootNote;
  selectedChordTypeId: string;
  onSelect: (chordTypeId: string) => void;
  onBack: () => void;
};

export function ChordTypeList({
  chordTypes,
  root,
  selectedChordTypeId,
  onSelect,
  onBack,
}: ChordTypeListProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Step 2</p>
          <h2>Choose a chord variation</h2>
          <p className="section-note">Root note: {root.label}</p>
        </div>
        <button type="button" className="ghost-button" onClick={onBack}>
          Change note
        </button>
      </div>
      <div className="list-stack" role="list" aria-label={`${root.displayName} chord variations`}>
        {chordTypes.map((chordType) => (
          <button
            key={chordType.id}
            type="button"
            className={`list-card ${selectedChordTypeId === chordType.id ? 'list-card--active' : ''}`}
            onClick={() => onSelect(chordType.id)}
          >
            <span className="list-card__title">{getChordLabel(root, chordType)}</span>
            <span className="list-card__subtitle">{chordType.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
