import { getKeyboardRange } from '../lib/chords';

type PianoKeyboardDiagramProps = {
  activeMidiNotes: number[];
  noteLabels: string[];
};

const WHITE_PITCH_CLASSES = new Set([0, 2, 4, 5, 7, 9, 11]);
const BLACK_KEY_OFFSETS: Partial<Record<number, number>> = {
  1: 0.7,
  3: 1.7,
  6: 3.7,
  8: 4.7,
  10: 5.7,
};

export function PianoKeyboardDiagram({ activeMidiNotes, noteLabels }: PianoKeyboardDiagramProps) {
  const range = getKeyboardRange();
  const activeSet = new Set(activeMidiNotes);
  const whiteKeys = range.filter((note) => WHITE_PITCH_CLASSES.has(note % 12));
  const blackKeys = range
    .map((note) => ({ midi: note, pitchClass: note % 12 }))
    .filter(({ pitchClass }) => !WHITE_PITCH_CLASSES.has(pitchClass));

  return (
    <section className="panel panel--compact">
      <div className="card-header">
        <div>
          <p className="eyebrow">Piano</p>
          <h3>Keyboard diagram</h3>
        </div>
        <span className="tag">{noteLabels.join(' • ')}</span>
      </div>

      <div className="keyboard-shell">
        <div className="keyboard keyboard--white">
          {whiteKeys.map((note) => (
            <div
              key={note}
              className={`key key--white ${activeSet.has(note) ? 'key--active' : ''}`}
            />
          ))}
        </div>
        <div className="keyboard keyboard--black">
          {blackKeys.map(({ midi, pitchClass }) => {
            const whiteBefore = Math.floor((midi - 48) / 12) * 7 + (BLACK_KEY_OFFSETS[pitchClass] ?? 0);

            return (
              <div
                key={midi}
                className={`key key--black ${activeSet.has(midi) ? 'key--active' : ''}`}
                style={{ left: `calc(${whiteBefore} * var(--white-key-width))` }}
              />
            );
          })}
        </div>
      </div>

      <div className="detail-block">
        <p className="detail-label">Piano notes</p>
        <p className="detail-value">{noteLabels.join(' • ')}</p>
      </div>
    </section>
  );
}

