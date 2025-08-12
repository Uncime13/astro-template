import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import "./add-to-likes-button.css";

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

export default function AddToLikesButton({ product }: Props) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("")
  
  const addToLikes = async () => {
    if (!product || !product.id) {
      console.error("Product is undefined or missing 'id'");
      return;
    }
    
    const res = await fetch("/api/likes/post-user-likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: product,
        localLikes: JSON.parse(localStorage.getItem("likes") || "{}")
      }),
    });
    
    const response = await res.json();

    if (!res.ok) {
      setNotificationMessage(response.message || "Error al agregar tu 'Me Gusta'.")
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 2000);
      throw new Error(response.message || "Error al agregar tu 'Me Gusta'.");
    }

    if (response.message !== "Ya se encuentra en tus 'Me Gusta'") {
      localStorage.setItem("likes", JSON.stringify(response.data));
    }
    
    // Show notification
    setNotificationMessage(response.message)
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        className="icon-btn"
        data-tooltip="Agregar a tus 'Me Gusta'"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          addToLikes();
        }}>
        <FaHeart />
      </button>

      {showNotification && (
        <div
          className="position-absolute bottom-100 start-50 translate-middle-x mb-2"
          role="alert"
          id="add-to-likes-toast">
          <p className="bg-black text-white text-center">
            {notificationMessage}
          </p>
          '
        </div>
      )}
    </div>
  );
}
