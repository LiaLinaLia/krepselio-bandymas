import React from 'react';
import { Button, Container } from '@mui/material';

// import { Wrapper } from './CartItem.styles';

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
  foto: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: string) => void;
};

const CartItem = ({ foto, addToCart, removeFromCart }: Props) => (
  <Container>
    <div>
      <h3>{foto.title}</h3>
      <div className="information">
        <p>
          Price: $
          {foto.price}
        </p>
        <p>
          Total: $
          {(foto.amount * foto.price).toFixed(2)}
        </p>
      </div>
      <div className="buttons">
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => removeFromCart(foto.id)}
        >
          -
        </Button>
        <p>{foto.amount}</p>
        <Button
          size="small"
          disableElevation
          variant="contained"
          onClick={() => addToCart(foto)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={foto.image} alt={foto.title} />
  </Container>
  );

export default CartItem;
