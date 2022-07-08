import { IUserWord, WordItem } from '../../types/types';
import { WORD_STATUS } from '../../utils/Constants';
import { changeUserWordType } from '../../services/UserWordService';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

type Props = {
  word: WordItem;
  userWord: IUserWord | undefined;
  onDataChanged: () => void;
};

export default function OptionalBtns({ word, userWord, onDataChanged }: Props) {
  const handleHardClick = async () => {
    const wordOption = {
      difficulty: WORD_STATUS.HARD,
    };

    await changeUserWordType({ wordId: word.id, word: wordOption });
    onDataChanged();
  };

  const handleLearnedClick = async () => {
    const wordOption = {
      difficulty: WORD_STATUS.LEARNED,
    };

    await changeUserWordType({ wordId: word.id, word: wordOption });
    onDataChanged();
  };

  return (
    <Container>
      <Button
        color="error"
        variant="outlined"
        size="small"
        disabled={userWord?.difficulty === WORD_STATUS.HARD}
        onClick={handleHardClick}
      >
        Сложное
      </Button>

      <Button
        color="success"
        variant="outlined"
        size="small"
        disabled={userWord?.difficulty === WORD_STATUS.LEARNED}
        onClick={handleLearnedClick}
      >
        Изученное
      </Button>
    </Container>
  );
}

const Container = styled('div')`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-wrap: wrap;
  gap: 5px;
}
`;
