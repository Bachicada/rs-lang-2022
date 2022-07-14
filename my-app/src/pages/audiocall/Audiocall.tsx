import AudiocallGame from '../../components/AudiocallGame/AudiocallGame';
import AudiocallContext from '../../store/contexts/audiocallContext';
import { useAudiocallReducer } from '../../store/hooks';

const Sprint = () => {
  const value = useAudiocallReducer();

  return (
    <AudiocallContext.Provider value={value}>
      <AudiocallGame />
    </AudiocallContext.Provider>
  );
};

export default Sprint;
