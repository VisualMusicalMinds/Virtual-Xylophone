class XylophoneAudio {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  private init() {
    if (!this.context) {
      this.context = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.5; // Overall volume
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  public playNote(frequency: number) {
    this.init();
    if (!this.context || !this.masterGain) return;

    const t = this.context.currentTime;

    // 1. The Fundamental Tone (Sine wave for pure bell-like sound)
    const osc = this.context.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, t);

    // Envelope for the fundamental
    const gain = this.context.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(1, t + 0.005); // Fast attack
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.6); // Decay

    // 2. The "Hard" Hit (Triangle wave, very short, adds attack definition)
    const attackOsc = this.context.createOscillator();
    attackOsc.type = 'triangle';
    attackOsc.frequency.setValueAtTime(frequency * 2.4, t); // Non-harmonic overtone often found in bars
    
    const attackGain = this.context.createGain();
    attackGain.gain.setValueAtTime(0, t);
    attackGain.gain.linearRampToValueAtTime(0.2, t + 0.005);
    attackGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05); // Very fast decay

    // Connections
    osc.connect(gain);
    gain.connect(this.masterGain);

    attackOsc.connect(attackGain);
    attackGain.connect(this.masterGain);

    // Start
    osc.start(t);
    attackOsc.start(t);

    // Stop and cleanup
    osc.stop(t + 1);
    attackOsc.stop(t + 1);

    // Garage collection helper
    setTimeout(() => {
        gain.disconnect();
        attackGain.disconnect();
    }, 1100);
  }
}

export const xylophoneAudio = new XylophoneAudio();
