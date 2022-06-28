import React, { Dispatch } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';
import { APP_ROUTES } from '../../../utils/Constants';
import { ReducerAction, SprintActionTypes } from '../../../types/sprintTypes';

type Props = {
  dispatch: Dispatch<ReducerAction>;
};

const GameTableControls = ({ dispatch }: Props) => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <CloseIcon
        sx={{ fontSize: 80, cursor: 'pointer' }}
        onClick={() => {
          navigate(`${APP_ROUTES.MAIN}`);
        }}
      />

      <RestartAltIcon
        sx={{ fontSize: 80, cursor: 'pointer' }}
        onClick={() => {
          dispatch({ type: SprintActionTypes.RESTART });
        }}
      />
    </div>
  );
};

export default GameTableControls;
