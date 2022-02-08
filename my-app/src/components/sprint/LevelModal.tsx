import { Box } from '@mui/material';
import React from 'react';

interface ModalProps {
  active: boolean;
  setActive: () => void;
}


const LevelModal = () => {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      
    </div>
  );
};

export default LevelModal;
