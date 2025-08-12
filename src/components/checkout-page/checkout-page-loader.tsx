import  { useEffect, useState } from 'react';
import CheckoutPage from './checkout-page'; // the one you built before

const CheckoutPageLoader = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  return <CheckoutPage cart={cart} />;
};

export default CheckoutPageLoader;
