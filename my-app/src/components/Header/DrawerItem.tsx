import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText, styled } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ItemProps {
  id: number;
  link: string;
  name: string;
  collapse: ItemProps[] | null;
}

interface Props extends ItemProps {
  handleDrawerClose: () => void;
}

const DrawerItem = ({ link, name, collapse, handleDrawerClose }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigate = () => {
    navigate(link);
    handleDrawerClose();
  };

  if (!collapse) {
    return (
      <StyledListItemButton onClick={handleNavigate}>
        <ListItemText primary={name} />
      </StyledListItemButton>
    );
  }

  return (
    <>
      <StyledListItemButton onClick={handleClick}>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </StyledListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit sx={{ pl: 2 }}>
        <List component="div" disablePadding>
          {collapse.map(({ id, link, name, collapse }) => (
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
      </Collapse>
    </>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  &:hover {
    background: rgb(255 255 255 / 16%);
  }
`;

export default DrawerItem;
