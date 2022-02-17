import { ModalProps } from './LevelModal';

interface LevelButtonProps {
  item: number;
  props: ModalProps;
}

const LevelButton = ({item, props}: LevelButtonProps) => {
  return (
    <div style={{ cursor: 'pointer', background: 'yellow', width: '50px', height: '50px',
        borderRadius: '5px', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} onClick={() => {
      props.setActive(false);
      props.setLevel(item - 1);
    }}>{item}</div>
  )
}

export default LevelButton