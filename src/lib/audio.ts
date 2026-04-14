let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const AudioContextCtor = window.AudioContext;

  if (!AudioContextCtor) {
    return null;
  }

  if (!audioContext) {
    audioContext = new AudioContextCtor();
  }

  return audioContext;
}

function midiToFrequency(midiNote: number): number {
  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

export async function playChord(midiNotes: number[]): Promise<void> {
  const context = getAudioContext();

  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    await context.resume();
  }

  const startTime = context.currentTime + 0.02;
  const duration = 1.35;

  midiNotes.forEach((midiNote, index) => {
    const fundamental = context.createOscillator();
    const overtone = context.createOscillator();
    const gain = context.createGain();
    const toneDelay = index * 0.012;
    const noteStart = startTime + toneDelay;
    const noteEnd = noteStart + duration;
    const frequency = midiToFrequency(midiNote);

    fundamental.type = 'triangle';
    overtone.type = 'sine';
    fundamental.frequency.value = frequency;
    overtone.frequency.value = frequency * 2;

    gain.gain.setValueAtTime(0.0001, noteStart);
    gain.gain.exponentialRampToValueAtTime(0.15, noteStart + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.085, noteStart + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteEnd);

    fundamental.connect(gain);
    overtone.connect(gain);
    gain.connect(context.destination);

    fundamental.start(noteStart);
    overtone.start(noteStart);
    fundamental.stop(noteEnd);
    overtone.stop(noteEnd);
  });
}

