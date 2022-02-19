
import React, { SyntheticEvent, useContext } from 'react';
import './../general.css'
import { APP_ROUTES } from '../../utils/Constants';
import { Link, useNavigate } from 'react-router-dom';
import { CurUser } from '../../types';
import { UserContext } from '../../App';
import { TramTwoTone } from '@mui/icons-material';

export default function BurgerMenu() {
    const navigate= useNavigate();
    
    const userContext = useContext<{ user: CurUser; dispatchUserEvent: (actionType: string, payload: CurUser) => void; }>(
        UserContext
      );

    function checkNavigation(event: SyntheticEvent){
        const target = (event.target as HTMLElement).dataset.part;
        if (target !=='hardWords'){
            const partNumber = (Number(target) - 1).toString();
            navigate(`${APP_ROUTES.TEXTBOOK}/${partNumber}/0`)
        }
        else{
            navigate(`${APP_ROUTES.TEXTBOOK}/hardwords/0`)
        }
        
    }
        return (
            <ul className='menuList'>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.MAIN}>RS Lang</Link>
                </li>
                <li className='menuItem'>
                    <Link to={`${APP_ROUTES.TEXTBOOK}/0`}>Учебник</Link>
                </li>
                   <ul className='menuBook' 
                   onClick={(event)=> checkNavigation(event)}>
                      <li className='bookItem' data-part='1'>
                         Раздел 1
                      </li>
                      <li className='bookItem' data-part='2'>
                         Раздел 2
                      </li>
                      <li className='bookItem' data-part='3'>
                         Раздел 3
                      </li>
                      <li className='bookItem' data-part='4'>
                         Раздел 4
                      </li>
                      <li className='bookItem' data-part='5'>
                         Раздел 5
                      </li>
                      <li className='bookItem' data-part='6'>
                         Раздел 6
                      </li>
                      {userContext.user.name ? 
                      <li className='bookItem' data-part='hardWords'>
                        Сложные слова
                       </li>:
                      ''
                      }
                
                   </ul>
                
                <li className='menuItem'>
                    <Link to={APP_ROUTES.SPRINT}>Спринт</Link>
                </li>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.AUDIOCALL}>Аудиовызов</Link>
                </li>
                <li className='menuItem'>
                    <Link to={APP_ROUTES.STATISTICS}>Статистика</Link>
                </li>

            </ul>
        )
    
}
/*
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function BurgerMenu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{backgroundColor:'transparent', color:'#fff'}}>
          Nested List Items
        </ListSubheader>
      }
    >
      <ListItemButton>
    xbfcf
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
           Tra,nv
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
       xnjx
      </ListItemButton>
    </List>
  );
}*/