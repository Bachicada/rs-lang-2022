import { useCallback, useState } from 'react';
import { createUserWord } from '../services/UserWordService';
import { UserWord } from '../types/types';
import { WORD_STATUS } from '../utils/Constants';

type Props = {
  wordId: string;
  type: WORD_STATUS;
};

const useSetHardWord = () => {
  const [response, setResponse] = useState<UserWord>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async ({ wordId, type }: Props) => {
    const wordOption = {
      difficulty: type,
      optional: {
        failCounter: 0,
        successCounter: 4,
      },
    };

    try {
      const data = await createUserWord({ wordId, word: wordOption });
      if (!data) {
        return;
      }

      setResponse(data);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { response, error, isLoading, setHardWord: fetchData };
};

export default useSetHardWord;
