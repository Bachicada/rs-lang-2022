import { useEffect, useState } from 'react';
import { getPartOfTextbook } from '../services/WordService';
import { Questions } from '../types/audiocallTypes';
import Utils from '../utils/Utils';

type Props = {
  level: number | null;
};

export const useGetAudioWords = ({ level }: Props) => {
  const [response, setResponse] = useState<Questions[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (level === null) {
      setResponse([]);
      setIsLoading(true);
      return;
    }

    const fetchData = async () => {
      try {
        const data = [
          await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
          await getPartOfTextbook(`${Utils.random(0, 29)}`, `${level}`),
        ];

        const result = Utils.getAudioWords(data);
        setResponse(result);
      } catch (err) {
        const { message } = err as Error;
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [level]);

  return { response, error, isLoading };
};
