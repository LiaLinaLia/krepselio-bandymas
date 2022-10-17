import { InputLabel, styled } from '@mui/material';

const FieldLabel = styled(InputLabel)(({ theme }) => ({
  letterSpacing: '0.05em',
  marginBottom: theme.spacing(1),
  fontSize: '1.2rem',
}));

export default FieldLabel;
