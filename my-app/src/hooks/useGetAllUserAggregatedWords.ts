import { useEffect, useState } from 'react';
import { getAllUserAggrWords } from '../services/UserAggregatedWordsService';
import { UserWordItem } from '../types/types';

type TotalCount = {
  count: number;
};

type AggrWords = {
  paginatedResult: UserWordItem[];
  totalCount: TotalCount[];
};

export const useGetUserAggregatedWords = () => {
  const [response, setResponse] = useState<AggrWords>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response] = await getAllUserAggrWords();
        setResponse(response);
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
