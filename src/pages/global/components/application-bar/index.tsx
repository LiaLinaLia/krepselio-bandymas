import React from 'react';
import {
  Toolbar,
  Box,
  AppBar,
  styled,
} from '@mui/material';
import { NavLink } from 'react-router-dom';

const Link = styled(NavLink)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  height: '100%',
  padding: theme.spacing(0, 2),
  color: theme.palette.grey[200],
  textDecoration: 'none',

  ':hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.grey[50],
    border: '1px solid',
    borderRadius: 5,

  },

  '&.active': {
    boxShadow: `inset 0 -2px 0 ${theme.palette.common.white}`,
  },
}));

const ApplicationBar: React.FC = () => (

  <AppBar position="fixed" sx={{ backgroundColor: 'gray', p: 0.7 }}>
    <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'stretch' }}>
      <Box sx={{ display: 'flex', letterSpacing: '0.1em' }}>
        <Link to="/" end>TAVO FOTOGRAFIJA</Link>
      </Box>
      <Box sx={{
 display: 'flex', gap: 0.5, letterSpacing: '0.05em', fontSize: 14,
}}
      >
        <Link to="/auth/login">PRISIJUNGIMAS</Link>
        <Link to="/auth/register">REGISTRACIJA</Link>
        {/* <Box sx={{ p: 2 }}>
          <Badge badgeContent={1} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </Box> */}

      </Box>
    </Toolbar>

  </AppBar>
);

export default ApplicationBar;
