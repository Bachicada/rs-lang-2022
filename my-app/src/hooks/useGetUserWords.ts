import { useEffect, useState } from 'react';
import { getUserAllWords } from '../services/UserWordService';
import { IUserWord } from '../types/types';

let refetch = () => {};

export const useGetUserWords = () => {
  const [response, setResponse] = useState<IUserWord[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getUserAllWords();
        if (!data.length) {
          return;
        }

        if (isMounted) {
          setResponse(data);
        }
      } catch (err) {
        const { message } = err as Error;
        if (isMounted) {
          setError(message);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    refetch = fetchData;

    return () => {
      isMounted = false;
    };
  }, []);

  return { response, error, isLoading, refetch };
};
