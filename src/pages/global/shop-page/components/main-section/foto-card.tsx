import * as React from 'react';
import {
  Grid,
  Paper,
  Box,
  Typography,
  Button,
} from '@mui/material';
import Swiper from 'components/swiper';
import { useNavigate } from 'react-router-dom';

type CartItemType = {
  id: string;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

type FotoCardProps = Omit<Foto, 'categoryId' | 'materialTypeId' | 'colorId'> & {
  handleAddToCart: (clickedItem: CartItemType) => void;
};

const FotoCard: React.FC<FotoCardProps> = ({
  id,
  title,
  description,
  images,
  price,
  handleAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={3}
        sx={{
         p: 1,
         display: 'flex',
         flexDirection: 'column',
         height: '100%',
         backgroundColor: 'gray',

}}
      >
        <Box
          sx={{
        // p: 0.5,
        borderRadius: 1,
        color: 'common.white',
        border: '2px solid',
      }}
        >
          <Swiper images={images} />
        </Box>
        <Box sx={{
        p: 0.5,
        // pt: 1,
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
        >
          <Box>
            <Box sx={{ p: 0.5, pt: 1 }}>
              <Typography
                component="div"
                variant="h6"
                sx={{
      float: 'right',
      ml: 1,
      mb: 1,
      mt: 1,
      letterSpacing: '0.05em',
      fontWeightLight: 'fontWeightLigh',
      color: 'common.white',
      fontSize: 14,
    }}
              >
                {`${price}$`}
              </Typography>
              <Typography
                component="h2"
                variant="h5"
                sx={{
              color: 'common.white',
              p: 0,
              fontSize: 21,
              }}
              >
                {title}

              </Typography>
            </Box>
            <Box sx={{ height: 90, my: 1 }}>
              <Typography
                sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'elipsis',
              }}
              >
                {description}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              sx={{
            width: '50%',
            color: 'common.white',
            border: '1px solid',
            fontSize: 12,
            letterSpacing: '0.1em',
            ':hover': {
              bgcolor: 'primary.main',
              border: '1px solid',
            },
           }}
              onClick={() => navigate(`/foto/${id}`)}
            >
              Daugiau
            </Button>
            <Button
              variant="contained"
              sx={{
              width: '50%',
              color: 'common.white',
              bgcolor: 'primary.dark',
              border: '1px solid',
              fontSize: 12,
              letterSpacing: '0.1em',
              ':hover': {
                bgcolor: 'primary.main',
                border: '1px solid',
              },
            }}
              onClick={() => handleAddToCart(id)}
            >
              Dėti į krepšelį
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
);
};

export default FotoCard;
