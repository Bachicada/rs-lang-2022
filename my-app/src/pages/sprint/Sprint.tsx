import { useSprintReducer } from '../../store/hooks';
import SprintContext from '../../store/contexts/sprintContext';
import SprintGame from '../../components/REFACTORING/SprintGame/SprintGame';

const Sprint = () => {
  const value = useSprintReducer();
  console.log(value);
  return (
    <SprintContext.Provider value={value}>
      <SprintGame />
    </SprintContext.Provider>
  );
};

export default Sprint;
