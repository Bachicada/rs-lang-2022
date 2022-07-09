import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import { APP_ROUTES } from '../../utils/Constants';

type Props = {
  restartGame: () => void;
};

const GameTableControls = ({ restartGame }: Props) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <CloseIcon
        sx={{ fontSize: 45, cursor: 'pointer' }}
        onClick={() => {
          navigate(`${APP_ROUTES.MAIN}`);
        }}
      />

      <RestartAltIcon
        sx={{ fontSize: 45, cursor: 'pointer' }}
        onClick={() => {
          restartGame();
        }}
      />
    </div>
  );
};

export default GameTableControls;
