import { useEffect, useState } from 'react';
import { WordItem } from '../types/types';
import { API_URL } from '../utils/Constants';

type Props = {
  word: WordItem;
};

//is other audio playing when starts trying to play audio
let currentPlayingWord = '';
let stopCurrentPlaying = () => {};

const useGetWordAudio = ({ word }: Props) => {
  const [isPlay, setIsPlay] = useState(false);
  const [audioList, setAudioList] = useState<HTMLAudioElement[]>([]);

  useEffect(() => {
    if (isPlay && !audioList.length) {
      const newAudioList: HTMLAudioElement[] = [];
      newAudioList.push(new Audio(`${API_URL}/${word.audio}`));
      newAudioList.push(new Audio(`${API_URL}/${word.audioMeaning}`));
      newAudioList.push(new Audio(`${API_URL}/${word.audioExample}`));

      setAudioList(newAudioList);
    }

    if (isPlay && audioList.length) {
      if (currentPlayingWord !== word.word) {
        stopCurrentPlaying();
      }
      currentPlayingWord = word.word || '';
      stopCurrentPlaying = () => endPlay();

      audioList[0].play();
      audioList[0].onended = () => audioList[1].play();
      audioList[1].onended = () => audioList[2].play();
      audioList[2].onended = () => endPlay();
    }

    if (!isPlay && audioList.length) {
      stopAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlay, audioList]);

  const switchPlay = () => {
    setIsPlay(!isPlay);
  };

  const endPlay = () => {
    setIsPlay(false);
  };

  const stopAudio = () => {
    audioList.forEach((item) => {
      item.pause();
      item.currentTime = 0;
    });

    setIsPlay(false);
  };

  return { isPlay, switchPlay };
};

export default useGetWordAudio;
