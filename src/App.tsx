import { useState } from 'react';
import { CHORD_TYPES, ROOT_NOTES } from './data/music';
import { findChordTypeById, buildGuitarVoicing, buildPianoVoicing, spellChordNotes } from './lib/chords';
import { ChordDetail } from './components/ChordDetail';
import { ChordTypeList } from './components/ChordTypeList';
import { RootNotePicker } from './components/RootNotePicker';

export default function App() {
  const [selectedRootId, setSelectedRootId] = useState<string | null>(null);
  const [selectedChordTypeId, setSelectedChordTypeId] = useState(CHORD_TYPES[0].id);
  const [activeStep, setActiveStep] = useState<'root' | 'variation'>('root');

  const selectedRoot = ROOT_NOTES.find((root) => root.id === selectedRootId) ?? null;
  const selectedChordType = findChordTypeById(selectedChordTypeId);

  function handleRootSelect(rootId: string) {
    setSelectedRootId(rootId);
    setActiveStep('variation');
  }

  return (
    <div className="app-shell">
      <header className="page-header">
        <div>
          <p className="eyebrow">Chord reference</p>
          <h1>chordMapper</h1>
        </div>
      </header>

      <main className={`workspace ${selectedRoot ? '' : 'workspace--landing'}`.trim()}>
        <aside className="control-column">
          {activeStep === 'root' ? (
            <RootNotePicker
              roots={ROOT_NOTES}
              selectedRootId={selectedRoot?.id ?? null}
              onSelect={handleRootSelect}
            />
          ) : selectedRoot ? (
            <ChordTypeList
              chordTypes={CHORD_TYPES}
              root={selectedRoot}
              selectedChordTypeId={selectedChordType.id}
              onSelect={setSelectedChordTypeId}
              onBack={() => setActiveStep('root')}
            />
          ) : null}
        </aside>

        {selectedRoot ? (
          <ChordDetail
            chordType={selectedChordType}
            root={selectedRoot}
            chordNotes={spellChordNotes(selectedRoot, selectedChordType)}
            guitarVoicing={buildGuitarVoicing(selectedRoot, selectedChordType)}
            pianoVoicing={buildPianoVoicing(selectedRoot, selectedChordType)}
          />
        ) : (
          <section className="hero-card hero-card--empty">
            <div className="hero-card__copy">
              <p className="eyebrow">Welcome</p>
              <h2>Pick a root note to begin</h2>
              <p className="hero-card__description">
                Browse curated chord variations for guitar and piano, then preview the notes and hear the
                voicing.
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
