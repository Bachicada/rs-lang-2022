import { useCallback, useEffect, useState } from 'react';
import { getAggregatedWordsByType } from '../services/UserAggregatedWordsService';
import { UserWordItem } from '../types/types';
import { WORD_STATUS } from '../utils/Constants';

type Props = {
  type: WORD_STATUS;
};

export const useGetUserAggregatedWords = ({ type }: Props) => {
  const [response, setResponse] = useState<UserWordItem[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [response] = await getAggregatedWordsByType(type);
      setResponse(response.paginatedResults);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, [type]);

  return { response, error, isLoading, refetch: fetchData };
};
