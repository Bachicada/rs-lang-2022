type Props = {
  question: any;
  item: any;
};

const GameQuestion = ({ question, item }: Props) => {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#fff', fontSize: '4em' }}>{item.word}</h2>
        <h2 style={{ fontSize: '4em', marginTop: '-45px' }}>
          {question.correct ? item.wordTranslate : question.incorrect}
        </h2>
      </div>
    </>
  );
};

export default GameQuestion;
