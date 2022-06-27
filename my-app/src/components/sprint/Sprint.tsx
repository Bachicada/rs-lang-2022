import { useSprintReducer } from '../../store/hooks';
import SprintContext from '../../store/sprintContext';
import SprintGame from '../REFACTORING/SprintGame/SprintGame';

const Sprint = () => {
  const value = useSprintReducer();

  return (
    <SprintContext.Provider value={value}>
      <SprintGame />
    </SprintContext.Provider>
  );
};

export default Sprint;
