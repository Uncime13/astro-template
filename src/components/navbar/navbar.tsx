import { useEffect, useState } from "react";
import { FaUserCircle, FaHeart, FaShoppingCart } from "react-icons/fa";
import CartModal from "../items-cart/cart-modal";
import LikesModal from "../items-likes/likes-modal";
import "./navbar.css";

const Navbar = ({userSession}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showLikes, setShowLikes] = useState(false);

  const calculateCartTotal = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const total = Object.values(cart).reduce((sum: number, item: any) => {
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    // Initial cart total
    calculateCartTotal();

    // Listen for cart updates (custom event)
    const handleCartUpdate = () => {
      calculateCartTotal();
    };

    // Listen for updates across tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        calculateCartTotal();
      }
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <a className="mx-4" href="/">
        <img
          src="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/ecommerce-demo.png"
          alt="Logo"
          style={{ height: "80px" }}
        />
      </a>

      <button
        className="navbar-toggler mx-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-label="Toggle navigation">
        <i className="bi bi-border-width"></i>
      </button>

      <div className="offcanvas offcanvas-end w-75" id="navbarContent">
        <div className="offcanvas-body">
          <ul className="navbar-nav col-lg-10 justify-content-center">
            <li className="nav-item mx-3">
              <a className="nav-link text-center" href="/">
                Inicio
              </a>
            </li>

            <li className="nav-item dropdown mx-3 position-relative">
              <a
                href=""
                className="nav-link text-center dropdown-toggle"
                id="productosDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                Productos
              </a>
              <ul className="dropdown-menu" aria-labelledby="productosDropdown">
                <li>
                  <a className="dropdown-item text-center" href="/productos">
                    Todos los productos
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-center"
                    href="/productos?categoria=fragancias-femeninas">
                    Fragancias Femeninas
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-center"
                    href="/productos?categoria=fragancias-masculinas">
                    Fragancias Masculinas
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-center"
                    href="/productos?categoria=fragancias-unisex">
                    Fragancias Unisex
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item mx-3">
              <a className="nav-link text-center" href="/sobre-nosotros">
                Sobre Nosotros
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link text-center" href="/contacto">
                Contacto
              </a>
            </li>
            <li className="nav-item mx-3">
              <a className="nav-link text-center" href="/preguntas-frecuentes">
                Preguntas Frecuentes
              </a>
            </li>
          </ul>

          <div
            className="d-flex justify-content-evenly align-items-center col-lg-2"
            id="offcanvas-icons">
            {/* Shopping Cart */}
            <a
              href="#"
              className="text-dark fs-3 position-relative"
              onClick={(e) => {
                e.preventDefault();
                setShowCart(true);
              }}>
              <FaShoppingCart />
              {totalPrice >= 0 && (
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  id="cartBadge">
                  ${totalPrice}
                </span>
              )}
            </a>

            {showCart && <CartModal onClose={() => setShowCart(false)} />}

            {/* User Dropdown */}
            {userSession ? (
              <div className="dropdown">
                <a
                  className="text-dark fs-3 dropdown-toggle"
                  href="#"
                  role="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <FaUserCircle />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown">
                  <li>
                    <p className="dropdown-item">Hola {userSession.user_metadata.username}!</p>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/mi-perfil">
                      Mi Perfil
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={async (e) => {
                        e.preventDefault();
                        await fetch("/api/user/log-out", { method: "POST" });
                        window.location.href = "/";
                      }}>
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="dropdown">
                <a
                  className="text-dark fs-3 dropdown-toggle"
                  href="#"
                  role="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  <FaUserCircle />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="userDropdown">
                  <li>
                    <a className="dropdown-item" href="/registro">
                      Crear Cuenta
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/iniciar-sesion">
                      Iniciar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            )}

            {/* Likes */}
            <a
              href="#"
              className="text-dark fs-3 position-relative"
              onClick={(e) => {
                e.preventDefault();
                setShowLikes(true);
              }}>
              <FaHeart />
            </a>

            {showLikes && <LikesModal onClose={() => setShowLikes(false)} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
