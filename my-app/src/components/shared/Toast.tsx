import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  open: boolean;
  title: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const Toast = ({ open, title, setOpen }: Props) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar sx={{ bottom: '50px' }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" severity="error" elevation={6} onClose={handleClose}>
        {title}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
