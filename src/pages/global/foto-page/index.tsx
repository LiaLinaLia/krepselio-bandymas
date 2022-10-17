import React from 'react';
import {
    Box,
    Container,
    Typography,
    Skeleton,
    Button,
    InputBase,
    Paper,
    IconButton,
    Divider,
} from '@mui/material';
import Swiper from 'components/swiper';
import { useParams, Navigate } from 'react-router-dom';
import FotoService from 'services/foto-service';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// Panaudokite kursuose įgytas žinias, kad atsiųsti duomenis ir atvaizduoti juos naudojant
//   JSON.stringify:
// 1. Aprašyti metodą parsiuntimui CupService'e, pagal gautą "id"
// 2. Naudoti useState saugoti parsiunčiamiems duomenims
// 3. Naudoti useEffect komponento sukūrimo metu, tam kad parsiųsti ir įrašyti duomenis į state.

// Atlikę užduotį, pažymėkite 👍

const FotoPage: React.FC = () => {
  const { id } = useParams();
   // 2. Naudoti useState saugoti parsiunčiamiems duomenims
   const [foto, setFoto] = React.useState<Foto | null>(null);

  if (id === undefined) return <Navigate to="/page-not-found" />;

    // 3. Naudoti useEffect komponento sukūrimo metu, tam kad parsiųsti ir įrašyti duomenis į state.
    React.useEffect(() => {
        (async () => {
            const fetchedFoto = await FotoService.fetchOne(id);
            setFoto(fetchedFoto);
        })();
    }, []);

  return (
    <Container sx={{ mt: 2, p: 2 }}>
      { foto ? (
        <Paper
          elevation={0}
          sx={(theme) => ({
            mx: 'auto',
            maxWidth: { xs: 400, md: 'initial' },
            p: { xs: 3 },
            boxShadow: { xs: theme.shadows[20] },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            backgroundColor: 'gray',
          })}
        >
          <Box sx={{ width: { md: 500 } }}>
            <Swiper
              images={foto.images}
              sx={{
                height: { xs: 300, md: 450 },
                borderRadius: 1,
                color: 'common.white',
                border: '2px solid',
               }}
            />
          </Box>
          <Box sx={{
            flexGrow: { md: 1 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          >
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography
                  component="h1"
                  variant="h4"
                  sx={{ color: 'common.white' }}
                >
                  {foto.title}
                </Typography>

                <Typography
                  component="div"
                  variant="h6"
                  color="common.white"
                  sx={{
                fontWeight: 'medium',
                whiteSpace: 'nowrap',
                alignSelf: 'flex-start',
                p: 0.5,
              }}
                >
                  {`${foto.price} $`}
                </Typography>
              </Box>

              <Divider textAlign="left" sx={{ my: 2 }}>Pagrindinė informacija</Divider>

              <Typography
                variant="body1"
                sx={{ fontWeight: 'medium', my: 5 }}
              >
                {foto.description}
              </Typography>
            </Box>

            <Box>
              <Divider textAlign="left" sx={{ my: 2 }}>Komercija</Divider>

              <Paper
                elevation={3}
                sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0.5,
              px: 3,
              mb: 2,
            }}
              >
                <Typography>Kiekis</Typography>
                <Box>
                  <IconButton><AddIcon /></IconButton>
                  <InputBase value={1} sx={{ width: 40 }} inputProps={{ sx: { textAlign: 'center' } }} />
                  <IconButton><RemoveIcon /></IconButton>
                </Box>
              </Paper>

              <Button
                variant="contained"
                fullWidth
                size="large"
                sx={{
            fontSize: 14,
            bgcolor: 'primary.dark',
            border: '1px solid',
            letterSpacing: '0.17em',
            ':hover': {
              bgcolor: 'primary.main',
              border: '1px solid',
            },
          }}
              >
                Pridėti į krepšelį
              </Button>
            </Box>

          </Box>
        </Paper>
      ) : (
        <>
          <Skeleton variant="rectangular" width="100%" height={300} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={20} sx={{ mb: 3 }} />
          <Skeleton variant="rectangular" width="100%" height={60} sx={{ mb: 3 }} />
        </>
      )}
      <Paper
        elevation={0}
        sx={(theme) => ({
        mx: 'auto',
        maxWidth: { xs: 400, md: 'initial' },
        p: { xs: 3 },
        boxShadow: { xs: theme.shadows[20] },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        backgroundColor: 'gray',
        my: 2,
      })}
      >
        <Typography
          component="h5"
          variant="h6"
          sx={{ color: 'common.white', letterSpacing: '0.1em' }}
        >
          Pirkimo sąlygos

        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: 'medium' }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Facilis necessitatibus ipsa distinctio delectus repudiandae cumque odio
          perferendis tempora est et voluptatibus doloremque ab totam, omnis beatae ipsam.
          Optio, explicabo commodi.
        </Typography>
      </Paper>

    </Container>
  );
};

export default FotoPage;
