import * as React from 'react';
import {
  Box,
  Typography,
  Grid,
  Divider,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Cart from 'Cart/Cart';
import ShopContext from '../../contexts/shop-context';
import FotoCard from './foto-card';

type MainSectionProps = {
  isExtendedLayout: boolean
};

type CartItemType = {
  id: string;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const MainSection: React.FC<MainSectionProps> = ({ isExtendedLayout }) => {
  const { fotos } = React.useContext(ShopContext);

  const [cartOpen, setCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItemType[]>([]);

  const getTotalItems = (
    items: CartItemType[],
) => items.reduce((acc, foto) => acc + foto.amount, 0);

const handleAddToCart = (clickedItem: CartItemType) => {
  setCartItems((prev) => {
    const isItemInCart = prev.find((foto) => foto.id === clickedItem.id);

    if (isItemInCart) {
      return prev.map((foto) => (foto.id === clickedItem.id
          ? { ...foto, amount: foto.amount + 1 }
          : foto));
    }

    return [...prev, { ...clickedItem, amount: 1 }];
  });
};

const handleRemoveFromCart = (id: string) => {
  setCartItems((prev) => prev.reduce((acc, foto) => {
      if (foto.id === id) {
        if (foto.amount === 1) return acc;
        return [...acc, { ...foto, amount: foto.amount - 1 }];
      }
        return [...acc, foto];
    }, [] as CartItemType[]));
};

  return (
    <Box
      component="main"
      sx={(theme) => ({
      flexGrow: 1,
      p: 3,
      ...(isExtendedLayout && {
        ml: `${theme.common.drawerWidth.md}px`,
      }),
    })}
    >
      <Box sx={{ justifyContent: 'space-between', alignItems: 'center', display: 'flex' }}>
        <Typography component="h1" variant="h6" sx={{ letterSpacing: '0.05em', color: 'primary.main' }}>Paslaugos/Albumai</Typography>
        <Box sx={{ p: 2, mb: -2 }}>
          <Badge badgeContent={getTotalItems(cartItems)} color="primary">
            <ShoppingCartIcon sx={{ color: 'gray' }} />
          </Badge>
        </Box>
      </Box>
      <Divider sx={{ mt: 2, mb: 3 }} />

      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <Grid container spacing={3} sx={{ alignItem: 'stretch' }}>
        {fotos.map((foto) => (
          <FotoCard
            key={foto.id}
            id={foto.id}
            title={foto.title}
            description={foto.description}
            images={foto.images}
            price={foto.price}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default MainSection;
