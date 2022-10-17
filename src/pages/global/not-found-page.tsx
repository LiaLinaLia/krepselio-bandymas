import * as React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  styled,
} from '@mui/material';
import { Link as RRDLink } from 'react-router-dom';
import DeblurIcon from '@mui/icons-material/Deblur';

const Link = styled(RRDLink)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.common.white,
}));

const NotFoundPage: React.FC = () => (
  <Box sx={{
    display: 'grid',
    placeItems: 'center',
    height: '100vh',
    width: '100vw',
  }}
  >
    <Paper elevation={3} sx={{ p: 10, textAlign: 'center', backgroundColor: 'gray' }}>
      <DeblurIcon sx={{ fontSize: 65, alignSelf: 'center', color: 'primary.light' }} />
      <Typography color="primary.light" variant="h3">Puslapis nerastas... </Typography>
      <Button
        variant="outlined"
        sx={{
        mt: 5,
        color: 'common.white',
        border: '1px solid',
     }}
      >
        <Link
          to="/"
          sx={{
            p: 1,
            // color: 'common.white',
            // fontSize: 15,
            letterSpacing: '0.1em',
            textDecoration: 'none',
            ':hover': {
              color: 'primary.light',
            },
         }}
        >
          Grįžti į pagrindinį puslapį

        </Link>
      </Button>
    </Paper>
  </Box>
);

export default NotFoundPage;
