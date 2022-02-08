import { Box, Container } from '@mui/material';
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
    <Container maxWidth="sm">
      <h2 style={{textAlign: 'center'}}>Выбери свой уровень</h2>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between', }}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
      </Container>
    </Container>
  );
};

export default LevelModal;
