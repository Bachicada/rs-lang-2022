import { useContext, useReducer } from 'react';
import AudiocallContext, { initialAudiocallState } from './contexts/audiocallContext';
import audiocallReducer from './reducers/audiocallReducer';
import sprintReducer from './reducers/sprintReducer';
import SprintContext, { initialSprintState } from './contexts/sprintContext';
import userReducer from './reducers/userReducer';
import UserContext, { initialUserState } from './contexts/userContext';

export const useSprintReducer = () => useReducer(sprintReducer, initialSprintState);
export const useAudiocallReducer = () => useReducer(audiocallReducer, initialAudiocallState);
export const useUserReducer = () => useReducer(userReducer, initialUserState);

export const useSprintContext = () => useContext(SprintContext);
export const useAudiocallContext = () => useContext(AudiocallContext);
export const useUserContext = () => useContext(UserContext);
