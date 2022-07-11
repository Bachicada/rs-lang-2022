import { useEffect, useState } from 'react';
import { getAggregatedWordsByType } from '../services/UserAggregatedWordsService';
import { UserWordItem } from '../types/types';
import { WORD_STATUS } from '../utils/Constants';

type Props = {
  type: WORD_STATUS;
};

let refetch = () => {};

export const useGetUserAggregatedWords = ({ type }: Props) => {
  const [response, setResponse] = useState<UserWordItem[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [response] = await getAggregatedWordsByType(type);
        if (isMounted) {
          setResponse(response.paginatedResults);
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
  }, [type]);

  return { response, error, isLoading, refetch };
};
