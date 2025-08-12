import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: number;
  attributes?: { [key: string]: any }; // e.g., sizes, color, etc.
};

type CartItem = Product & { quantity: number };

export default function ItemsCart() {
  const [cartItems, setCartItems] = useState<{ [key: string]: CartItem }>({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "{}");
    setCartItems(storedCart);
  }, []);

  const updateCart = (newCart: { [key: string]: CartItem }) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cartUpdated"));
    setCartItems(newCart);
  };

  const increaseQuantity = (product: Product) => {
    const selectedSize = product.attributes?.selectedSize || "";
    const cartKey = `${product.id}${selectedSize}`;
    const newCart = { ...cartItems };
    newCart[cartKey].quantity += 1;
    updateCart(newCart);
  };

  const decreaseQuantity = (product: Product) => {
    const selectedSize = product.attributes?.selectedSize || "";
    const cartKey = `${product.id}${selectedSize}`;
    const newCart = { ...cartItems };
    if (newCart[cartKey].quantity > 1) {
      newCart[cartKey].quantity -= 1;
    } else {
      delete newCart[cartKey]; // Remove item if quantity is 1
    }
    updateCart(newCart);
  };

  const removeAllItems = () => {
    updateCart({});
  };

  const products = Object.values(cartItems);

  if (products.length === 0)
    return <p className="text-center">Tu carrito está vacío.</p>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">Carrito de compras</h2>
      <ul className="list-group">
        {products.map((product) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={product.id}>
            <div className="d-flex align-items-center">
              <a href={`/productos/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="rounded me-3"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </a>
              <div>
                <strong>{product.name}</strong>
                <br />
                <small>{product.brand}</small>
                <br />
                {product.attributes?.selectedSize && (
                  <p>Tamaño seleccionado: {product.attributes?.selectedSize}</p>
                )}
                <br />
                <span className="text-muted">Precio: ${product.price}</span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => decreaseQuantity(product)}>
                -
              </button>
              <span className="mx-3">{product.quantity}</span>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => increaseQuantity(product)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="row justify-content-evenly">
        <p className="mt-3 fw-bold text-center">
          Total: $
          {products
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        <Button
          variant="danger"
          className="col-5"
          onClick={() => removeAllItems()}>
          Vaciar Carrito
        </Button>
        <Button variant="dark" className="col-5" href="/pagar">
          Pagar
        </Button>
      </div>
    </div>
  );
}
