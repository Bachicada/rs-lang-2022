import { createContext } from 'react';
import { IAudiocallContext, InitialAudiocallState } from '../types/audiocallTypes';

export const initialAudiocallState: InitialAudiocallState = {
  questions: [],
  answers: [],
  newWords: [],

  score: 0,
  level: null,
  currentQuestionIndex: 0,
  currentLifeIndex: 5,
  correctAnswersCount: 0,
  secondsPerQuestion: 12,

  isGameReady: false,
  isGameFinished: false,
  isLoading: false,
  isTimerActive: false,
};

const AudiocallContext = createContext<IAudiocallContext>([initialAudiocallState, () => null]);

export default AudiocallContext;
