import { useContext, useEffect, useState } from 'react';
import { getPartOfTextbook } from '../../services/WordService';
import Utils from '../../utils/Utils';
import { QuizContext } from '../sprint/Sprint';
import { ModalProps } from './LevelModal';

interface LevelButtonProps {
  item: number;
  props: ModalProps;
}

const LevelButton = ({item, props}: LevelButtonProps) => {
  const [quizState, dispatch] = useContext(QuizContext);
  const [level, setLevel] = useState<number>();

  useEffect(() => {
    if (level) {
      const fetchData = async() => {
        dispatch({ type: 'LOADING' })
        try {
          const data = [await getPartOfTextbook('0', `${level}`), await getPartOfTextbook('2', `${level}`), await getPartOfTextbook('1', `${level}`)];
          const result = Utils.getRandomWords(data);
          dispatch({ type: 'CHANGE_LEVEL', payload: {result, level} });
        } catch(err) {
          alert('Oops! Something goes wrong.')
        }
      }

      fetchData();
    }
    // const fetchData = async () => {
    //   dispatch({ type: 'FETCH_INIT' });

    //   try {
    //     const result = await axios(url);

    //     dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    //   } catch (error) {
    //     dispatch({ type: 'FETCH_FAILURE' });
    //   }
    // };

    // fetchData();
  }, [level]);

  console.log('LEVEL', quizState);
  return (
    <div style={{ cursor: 'pointer', background: 'yellow', width: '50px', height: '50px',
        borderRadius: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} onClick={() => {
      // props.setActive(false);
      // props.setLevel(item - 1);
      // dispatch({ type: 'CHANGE_LEVEL', payload: item - 1 });
      setLevel(item - 1);
    }}>{item}</div>
  )
}

export default LevelButton