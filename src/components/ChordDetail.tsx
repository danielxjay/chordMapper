import { useEffect, useMemo, useRef, useState } from 'react';
import {
  formatIntervalSet,
  getChordLabel,
  getLongFormChordLabel,
} from '../lib/chords';
import { getKeysForChord } from '../lib/keys';
import type { ChordType, GuitarVoicing, RootNote } from '../types';
import { GuitarChordDiagram } from './GuitarChordDiagram';
import { KeyContextDrawer } from './KeyContextDrawer';
import { PianoKeyboardDiagram } from './PianoKeyboardDiagram';
import { PlaybackButton } from './PlaybackButton';

type ChordDetailProps = {
  chordType: ChordType;
  root: RootNote;
  chordNotes: string[];
  pianoVoicing: number[];
  guitarVoicing: GuitarVoicing;
  guitarVoicingCount: number;
  guitarVoicingIndex: number;
  onSelectPreviousGuitarVoicing: () => void;
  onSelectNextGuitarVoicing: () => void;
  onSelectChord: (rootId: string, chordTypeId: string) => void;
};

function ChevronIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3,6 8,11 13,6" />
    </svg>
  );
}

export function ChordDetail({
  chordType,
  root,
  chordNotes,
  pianoVoicing,
  guitarVoicing,
  guitarVoicingCount,
  guitarVoicingIndex,
  onSelectPreviousGuitarVoicing,
  onSelectNextGuitarVoicing,
  onSelectChord,
}: ChordDetailProps) {
  const chordLabel = getChordLabel(root, chordType);
  const longFormChordLabel = getLongFormChordLabel(root, chordType);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigatingFromDrawer = useRef(false);

  const keyMatches = useMemo(() => getKeysForChord(root, chordType), [root, chordType]);

  useEffect(() => {
    if (navigatingFromDrawer.current) {
      navigatingFromDrawer.current = false;
      return;
    }
    setIsDrawerOpen(false);
  }, [root.id, chordType.id]);

  function handleSelectChord(rootId: string, chordTypeId: string) {
    navigatingFromDrawer.current = true;
    onSelectChord(rootId, chordTypeId);
  }

  return (
    <section className="detail-layout">
      <div className="chord-overview">
        <section className="hero-card">
          <div className="hero-card__copy">
            <div className="card-header">
              <div>
                <p className="eyebrow">Selected chord</p>
                <h2>{longFormChordLabel}</h2>
              </div>
              <span className="tag">{chordLabel}</span>
            </div>
            <p className="hero-card__description">{chordType.description}</p>
          </div>

          <div className="hero-card__meta">
            <div className="detail-block">
              <p className="detail-label">Chord tones</p>
              <p className="detail-value">{chordNotes.join(' • ')}</p>
            </div>
            <div className="detail-block">
              <p className="detail-label">Formula</p>
              <p className="detail-value">{formatIntervalSet(chordType)}</p>
            </div>
            <PlaybackButton midiNotes={pianoVoicing} />
          </div>

          {keyMatches.length > 0 && (
            <button
              type="button"
              className={`key-context-trigger${isDrawerOpen ? ' key-context-trigger--open' : ''}`}
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              aria-expanded={isDrawerOpen}
            >
              Keys <ChevronIcon />
            </button>
          )}
        </section>

        {keyMatches.length > 0 && (
          <div className={`key-drawer-wrap${isDrawerOpen ? ' key-drawer-wrap--open' : ''}`}>
            <div>
              <KeyContextDrawer
                key={root.id + ':' + chordType.id}
                root={root}
                chordType={chordType}
                keyMatches={keyMatches}
                onSelectChord={handleSelectChord}
              />
            </div>
          </div>
        )}
      </div>

      <div className="instrument-grid">
        <GuitarChordDiagram
          chordLabel={chordLabel}
          strings={guitarVoicing.strings}
          voicingLabel={guitarVoicing.label}
          voicingCount={guitarVoicingCount}
          voicingIndex={guitarVoicingIndex}
          onPrevious={onSelectPreviousGuitarVoicing}
          onNext={onSelectNextGuitarVoicing}
        />
        <PianoKeyboardDiagram activeMidiNotes={pianoVoicing} noteLabels={chordNotes} />
      </div>
    </section>
  );
}
