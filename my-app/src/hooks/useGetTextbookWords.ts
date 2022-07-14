import { useCallback, useEffect, useState } from 'react';
import { getPartOfTextbook } from '../services/WordService';
import { WordItem } from '../types/types';

type Props = {
  page: number | null;
  group: number | null;
};

export const useGetTextbookWords = ({ page, group }: Props) => {
  const [response, setResponse] = useState<WordItem[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const data = await getPartOfTextbook(`${page}`, `${group}`);
      setResponse(data);
    } catch (err) {
      const { message } = err as Error;
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [group, page]);

  useEffect(() => {
    if (page === null || group === null) {
      return;
    }

    fetchData();
  }, [page, group, fetchData]);

  return { response, error, isLoading, refetch: fetchData };
};
