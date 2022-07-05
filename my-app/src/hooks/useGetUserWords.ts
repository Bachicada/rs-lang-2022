import { useEffect, useState } from 'react';
import { getUserAllWords } from '../services/UserWordService';
import { IUserWord } from '../types/types';

export const useGetUserWords = () => {
  const [response, setResponse] = useState<IUserWord[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserAllWords();
        if (!data.length) {
          return;
        }

        setResponse(data);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { response, error, isLoading };
};
