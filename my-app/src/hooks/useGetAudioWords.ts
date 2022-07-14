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
        const randomPageNumbers = new Array(3).fill(null).map((item, idx, arr) => {
          let rand = Utils.random(0, 29);
          while (arr.includes(rand)) {
            rand = Utils.random(0, 29);
          }

          return rand;
        });

        const data = [
          await getPartOfTextbook(`${randomPageNumbers[0]}`, `${level}`),
          await getPartOfTextbook(`${randomPageNumbers[1]}`, `${level}`),
          await getPartOfTextbook(`${randomPageNumbers[2]}`, `${level}`),
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
