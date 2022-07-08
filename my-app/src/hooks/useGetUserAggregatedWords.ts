import { useCallback, useEffect, useState } from 'react';
import { getAggregatedWordsByType } from '../services/UserAggregatedWordsService';
import { IUserWord, UserWordItem } from '../types/types';
import { WORD_STATUS } from '../utils/Constants';

// type Response = {
//   hard: any[];
//   learned: any[];
//   new: any[];
// };

type Props = {
  type: WORD_STATUS;
};

export const useGetUserAggregatedWords = ({ type }: Props) => {
  // const [response, setResponse] = useState<UserWordItemp[]>({ hard: [], learned: [], new: [] });
  const [response, setResponse] = useState<UserWordItem[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [response] = await getAggregatedWordsByType(type);
      // const hardResponse = await getAggregatedWordsByType(WORD_STATUS.HARD);
      // const learnedResponse = await getAggregatedWordsByType(WORD_STATUS.LEARNED);
      // const newResponse = await getAggregatedWordsByType(WORD_STATUS.NEW);

      // const response = {
      //   hard: hardResponse[0]?.paginatedResults,
      //   learned: learnedResponse[0]?.paginatedResults,
      //   new: newResponse[0]?.paginatedResults,
      // };

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
