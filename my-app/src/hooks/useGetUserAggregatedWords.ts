import { useEffect, useState } from 'react';
import { getAggregatedWordsByType } from '../services/UserAggregatedWordsService';
import { WORD_STATUS } from '../utils/Constants';

type Response = {
  hard: any[];
  learned: any[];
  new: any[];
};

export const useGetUserAggregatedWords = () => {
  const [response, setResponse] = useState<Response>({ hard: [], learned: [], new: [] });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hardResponse = await getAggregatedWordsByType(WORD_STATUS.HARD);
        const learnedResponse = await getAggregatedWordsByType(WORD_STATUS.LEARNED);
        const newResponse = await getAggregatedWordsByType(WORD_STATUS.NEW);

        const response = {
          hard: hardResponse[0]?.paginatedResults,
          learned: learnedResponse[0]?.paginatedResults,
          new: newResponse[0]?.paginatedResults,
        };

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
