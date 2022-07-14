import { List, Typography } from '@mui/material';
import DrawerItem from './DrawerItem';
import { DRAWER_LINKS } from '../../utils/Constants';

interface Props {
  userName: string;
  handleDrawerClose: () => void;
}

const DrawerContent = ({ userName, handleDrawerClose }: Props) => {
  return (
    <>
      <Typography sx={{ textAlign: 'center' }} variant="h6" component="h3" noWrap>
        Здравствуй, {userName}
      </Typography>

      <List sx={{ width: '100%' }} component="nav">
        {DRAWER_LINKS.map(({ id, link, name, collapse }) => (
          <DrawerItem
            key={id}
            id={id}
            link={link}
            name={name}
            collapse={collapse}
            handleDrawerClose={handleDrawerClose}
          />
        ))}
      </List>
    </>
  );
};

export default DrawerContent;
