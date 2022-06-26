import { useContext, useReducer } from 'react';
import sprintReducer from './reducers/sprintReducer';
import SprintContext, { initialState } from './sprintContext';

// const Sprint: FC = () => {
//   const value = useReducer(reducer, initialState);
//   return (
//     <QuizContext.Provider value={value}>
//       <Game type={GAME_TYPE.SPRINT} />
//     </QuizContext.Provider>
//   );
// };

const useSprintReducer = () => useReducer(sprintReducer, initialState);

const useSprintContext = () => useContext(SprintContext);
