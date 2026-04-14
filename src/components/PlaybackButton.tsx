import { useState } from 'react';
import { playChord } from '../lib/audio';

type PlaybackButtonProps = {
  midiNotes: number[];
};

export function PlaybackButton({ midiNotes }: PlaybackButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  async function handleClick() {
    if (isPlaying) {
      return;
    }

    setIsPlaying(true);

    try {
      await playChord(midiNotes);
      window.setTimeout(() => setIsPlaying(false), 1400);
    } catch {
      setIsPlaying(false);
    }
  }

  return (
    <button type="button" className="play-button" onClick={handleClick}>
      {isPlaying ? 'Playing...' : 'Play chord'}
    </button>
  );
}

