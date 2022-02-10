import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import SignInForm from './SignIn-Form';
import RegForm from './RegisterForm';
import styles from './autorisation.module.css';
import FormContainer from './FormContainer';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: 'whitesmoke',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [hasAccount, setStatus] = React.useState(true)

  const checkForm =(event: React.SyntheticEvent) =>{
     const id = (event.target as HTMLElement).id;
     let userStatus;
     if ((id==='mainEnterBtn') || (id==='signInBtn')){
       userStatus = true;
     }
     else {userStatus = false}
     return userStatus;
  }
   
  return (
    <div onClick={(event)=>setStatus(checkForm(event))}>
      <button className={styles.signInBtn} onClick={handleOpen} id='mainEnterBtn'>Войти</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box id='popupForm' sx={style} >
            <FormContainer hasAccount={hasAccount} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}