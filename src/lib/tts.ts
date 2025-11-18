import { TTSSettings } from "@/types";

export const isTTSSupported = (): boolean => {
  return typeof window !== "undefined" && "speechSynthesis" in window;
};

export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!isTTSSupported()) return [];
  return window.speechSynthesis.getVoices();
};

export const stopSpeaking = (): void => {
  if (isTTSSupported()) {
    window.speechSynthesis.cancel();
  }
};

export const speak = (
  text: string,
  settings: TTSSettings,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: Error) => void
): void => {
  if (!isTTSSupported()) {
    onError?.(new Error("Text-to-speech is not supported in this browser"));
    return;
  }

  // Stop any current speech
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);

  // Apply settings
  utterance.lang = settings.language || "en-US";
  utterance.rate = settings.speed || 1;
  utterance.pitch = settings.pitch || 1;
  utterance.volume = settings.volume || 1;

  // Find and set the selected voice
  if (settings.voice) {
    const voices = getAvailableVoices();
    const selectedVoice = voices.find((voice) => voice.name === settings.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  }

  utterance.onstart = () => {
    onStart?.();
  };

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = (event) => {
    onError?.(new Error(`Speech synthesis error: ${event.error}`));
  };

  window.speechSynthesis.speak(utterance);
};

export const speakWithRepeat = (
  text: string,
  settings: TTSSettings,
  repeatCount: number = 3,
  pauseDuration: number = 1000,
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (error: Error) => void
): void => {
  let currentCount = 0;

  const speakOnce = () => {
    if (currentCount >= repeatCount) {
      onEnd?.();
      return;
    }

    speak(
      text,
      settings,
      currentCount === 0 ? onStart : undefined,
      () => {
        currentCount++;
        if (currentCount < repeatCount) {
          setTimeout(speakOnce, pauseDuration);
        } else {
          onEnd?.();
        }
      },
      onError
    );
  };

  speakOnce();
};

export const isSpeaking = (): boolean => {
  if (!isTTSSupported()) return false;
  return window.speechSynthesis.speaking;
};

export const getDefaultTTSSettings = (): TTSSettings => {
  return {
    voice: "",
    speed: 1,
    pitch: 1,
    volume: 1,
    language: "en-US",
  };
};

export const ensureVoicesLoaded = (): Promise<SpeechSynthesisVoice[]> => {
  return new Promise((resolve) => {
    if (!isTTSSupported()) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // Wait for voices to be loaded
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };

    // Fallback timeout
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 1000);
  });
};
