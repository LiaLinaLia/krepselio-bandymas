import * as React from 'react';
import {
   IconButton,
  } from '@mui/material';
  import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';
  import SwitchRightIcon from '@mui/icons-material/SwitchRight';
import DrawerContext from '../contexts/drawer-context';
//   import MenuIcon from '@mui/icons-material/Menu';

const DrawerButton: React.FC = () => {
    const { open, toggleDrawer } = React.useContext(DrawerContext);

    return (
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer}
        size="large"
        sx={{
        position: 'fixed',
        bottom: 15,
        left: 15,
        bgcolor: 'gray',
        borderRadius: 1,
        WebkitBackfaceVisibility: 'hidden',
        color: 'common.white',
        border: '1px solid',
        ':hover': {
          bgcolor: 'primary.main',
        },
        zIndex: 'drawerButton',
      }}
      >
        { open ? <SwitchLeftIcon /> : <SwitchRightIcon />}
      </IconButton>
  );
};

export default DrawerButton;
