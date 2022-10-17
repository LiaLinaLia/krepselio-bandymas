import * as React from 'react';
import {
  Paper,
  Typography,
  Button,
} from '@mui/material';
import DeblurIcon from '@mui/icons-material/Deblur';

type AuthFormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  title: string,
  submitText: string,
  children: React.ReactNode,
  isValid?: boolean,
};

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  title,
  submitText,
  children,
  isValid = true,
}) => (
  <Paper
    component="form"
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      width: 450,
      p: 5,
          // ml: 40, į šoną

    }}
    elevation={10}
    onSubmit={onSubmit}
  >
    <DeblurIcon sx={{ fontSize: 50, alignSelf: 'center', color: 'primary.main' }} />
    <Typography component="h1" variant="h4" align="center" color="primary.main">{title}</Typography>
    {children}
    <Button
      type="submit"
      variant="contained"
      sx={{
        // height: 60,
        color: 'common.white',
              bgcolor: 'primary.main',
              border: '1px solid',
              fontSize: 18,
              letterSpacing: '0.1em',
              ':hover': {
                bgcolor: 'gray',
                border: '1px solid',
              },
    }}
      size="large"
      disabled={!isValid}
    >
      {submitText}
    </Button>
  </Paper>
);

export default AuthForm;
