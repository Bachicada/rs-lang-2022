import { useEffect, useState } from 'react';
import { getUserStatistics } from '../services/UserStatisticsService';
import { UserStatistics } from '../types/types';

export const useGetUserStatistics = () => {
  const [response, setResponse] = useState<UserStatistics>();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = () => {
      try {
        getUserStatistics().then((statistics) => {
          if (isMounted) {
            setResponse(statistics);
          }
        });
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

    if (isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchData = async () => {
  //     try {
  //       const statistics = await getUserStatistics();
  //       setResponse(statistics);
  //     } catch (err) {
  //       const { message } = err as Error;
  //       setError(message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return { response, error, isLoading };
};
