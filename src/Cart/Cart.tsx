import React from 'react';
import { Typography, Container } from '@mui/material';
import CartItem from '../CartItem/CartItem';

type CartItemType = {
    id: string;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  };

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: string) => void;
};

const Cart = ({ cartItems, addToCart, removeFromCart }: Props) => {
  // eslint-disable-next-line max-len
  const calculateTotal = (fotos: CartItemType[]) => fotos.reduce((acc, foto) => acc + foto.amount * foto.price, 0);

  return (
    <Container>
      <Typography>Your Cart</Typography>
      {cartItems.length === 0 ? <Typography>No items in cart.</Typography> : null}
      {cartItems.map((foto) => (
        <CartItem
          key={foto.id}
          foto={foto}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <Typography>
        Total: $
        {calculateTotal(cartItems).toFixed(2)}
      </Typography>
    </Container>
  );
};

export default Cart;
