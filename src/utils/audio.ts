type AudioContextConstructor = new () => AudioContext
type FeedbackType = 'success' | 'error'

type Tone = {
  frequency: number
  start: number
  duration: number
  volume: number
  wave: OscillatorType
}

const feedbackTones: Record<FeedbackType, Tone[]> = {
  success: [
    { frequency: 523.25, start: 0, duration: 0.09, volume: 0.06, wave: 'sine' },
    {
      frequency: 783.99,
      start: 0.08,
      duration: 0.14,
      volume: 0.07,
      wave: 'triangle',
    },
  ],
  error: [
    {
      frequency: 293.66,
      start: 0,
      duration: 0.12,
      volume: 0.09,
      wave: 'square',
    },
    {
      frequency: 196,
      start: 0.1,
      duration: 0.16,
      volume: 0.08,
      wave: 'sawtooth',
    },
  ],
}

function getAudioContext() {
  const AudioContextClass =
    window.AudioContext ??
    (window as Window & { webkitAudioContext?: AudioContextConstructor })
      .webkitAudioContext

  if (!AudioContextClass) {
    return null
  }

  return new AudioContextClass()
}

function scheduleTone(audioContext: AudioContext, tone: Tone) {
  const oscillator = audioContext.createOscillator()
  const gain = audioContext.createGain()
  const startTime = audioContext.currentTime + tone.start
  const endTime = startTime + tone.duration

  oscillator.type = tone.wave
  oscillator.frequency.setValueAtTime(tone.frequency, startTime)

  gain.gain.setValueAtTime(0.001, startTime)
  gain.gain.exponentialRampToValueAtTime(tone.volume, startTime + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.001, endTime)

  oscillator.connect(gain)
  gain.connect(audioContext.destination)
  oscillator.start(startTime)
  oscillator.stop(endTime + 0.02)
}

export function playFeedback(type: FeedbackType) {
  const audioContext = getAudioContext()

  if (!audioContext) {
    return
  }

  if (audioContext.state === 'suspended') {
    void audioContext.resume()
  }

  feedbackTones[type].forEach((tone) => scheduleTone(audioContext, tone))

  window.setTimeout(() => {
    void audioContext.close()
  }, 450)
}
