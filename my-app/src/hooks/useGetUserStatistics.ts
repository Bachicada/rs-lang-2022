import { useEffect, useState } from 'react';
import { getUserStatistics } from '../services/UserStatisticsService';
import { UserStatistics } from '../types/types';

export const useGetUserStatistics = () => {
  const [response, setResponse] = useState<UserStatistics>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statistics = await getUserStatistics();
        setResponse(statistics);
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
