import React, { Dispatch } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import { APP_ROUTES } from '../../utils/Constants';

type Props = {
  dispatch: Dispatch<{ type: string; payload?: any }>;
};

const GameTableControls = ({ dispatch }: Props) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CloseIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          navigate(`${APP_ROUTES.MAIN}`);
        }}
        sx={{ fontSize: 80 }}
      />
      <RestartAltIcon
        style={{ cursor: 'pointer' }}
        onClick={() => {
          dispatch({ type: 'RESTART' });
        }}
        sx={{ fontSize: 80 }}
      />
    </div>
  );
};

export default GameTableControls;
