import { ModalProps } from './LevelModal';

interface LevelButtonProps {
  item: number;
  props: ModalProps;
}

const LevelButton = ({item, props}: LevelButtonProps) => {
  return (
    <div onClick={() => {
      props.setActive(false);
      props.setLevel(item - 1);
    }}>{item}</div>
  )
}

export default LevelButton