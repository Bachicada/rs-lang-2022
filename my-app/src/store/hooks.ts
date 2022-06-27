import { useContext, useReducer } from 'react';
import sprintReducer from './reducers/sprintReducer';
import SprintContext, { initialState } from './sprintContext';

export const useSprintReducer = () => useReducer(sprintReducer, initialState);

export const useSprintContext = () => useContext(SprintContext);
