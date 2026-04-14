import type { RootNote } from '../types';

type RootNotePickerProps = {
  roots: RootNote[];
  selectedRootId: string | null;
  onSelect: (rootId: string) => void;
};

export function RootNotePicker({ roots, selectedRootId, onSelect }: RootNotePickerProps) {
  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Step 1</p>
        <h2>Pick a root note</h2>
      </div>
      <div className="chip-grid" role="list" aria-label="Root notes">
        {roots.map((root) => (
          <button
            key={root.id}
            type="button"
            className={`chip ${root.id === selectedRootId ? 'chip--active' : ''}`}
            onClick={() => onSelect(root.id)}
          >
            {root.label}
          </button>
        ))}
      </div>
    </section>
  );
}
