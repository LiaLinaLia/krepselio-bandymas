import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import ApplicationBar from './application-bar';

const GlobalLayout: React.FC = () => (
  <Box>
    <ApplicationBar />
    <Box sx={(theme) => theme.mixins.toolbar} />
    <Outlet />
  </Box>
);

export default GlobalLayout;
