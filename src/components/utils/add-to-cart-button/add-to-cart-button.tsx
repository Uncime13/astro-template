import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./add-to-cart-button.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category_id: number;
  description: string
}

type Props = {
  product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const [showNotification, setShowNotification] = useState(false);

  const addToCart = () => {
    if (!product || !product.id) {
      console.error("Product is undefined or missing 'id'");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart") || "{}");

    if (cart[product.id]) {
      cart[product.id].quantity += 1;
    } else {
      cart[product.id] = { ...product, quantity: 1 };
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));

    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="icon-btn"
        data-tooltip="Agregar al Carrito"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToCart();
        }}>
        <FaShoppingCart />
      </button>

      {showNotification && (
        <div
          className="position-absolute bottom-100 start-50 translate-middle-x mb-2"
          role="alert"
          id="add-to-cart-toast">
          <p className="show bg-black text-white text-center"> Producto añadido al carrito</p>
        </div>
      )}
    </div>
  );
}
