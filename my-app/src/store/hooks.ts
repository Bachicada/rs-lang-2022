import { useContext, useReducer } from 'react';
import AudiocallContext, { initialAudiocallState } from './audiocallContext';
import audiocallReducer from './reducers/audiocallReducer';
import sprintReducer from './reducers/sprintReducer';
import SprintContext, { initialSprintState } from './sprintContext';

export const useSprintReducer = () => useReducer(sprintReducer, initialSprintState);
export const useAudiocallReducer = () => useReducer(audiocallReducer, initialAudiocallState);

export const useSprintContext = () => useContext(SprintContext);
export const useAudiocallContext = () => useContext(AudiocallContext);
