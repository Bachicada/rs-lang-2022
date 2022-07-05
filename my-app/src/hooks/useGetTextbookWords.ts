import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (page === null || group === null) {
      return;
    }

    const fetchData = async () => {
      try {
        const data = await getPartOfTextbook(`${page}`, `${group}`);
        setResponse(data);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, group]);

  return { response, error, isLoading };
};
