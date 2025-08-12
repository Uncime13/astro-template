import AddToCartButton from "../../utils/add-to-cart-button/add-to-cart-button";
import AddToLikesButton from "../../utils/add-to-likes-button/add-to-likes-button";
import "./products-grid.css";
import { Spinner, Container } from "react-bootstrap";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category_id: number;
  description: string;
  attributes?: { [key: string]: any };
}

interface ProductGridProps {
  products?: Product[];
}

export default function ProductsGrid({ products = [] }: ProductGridProps) {
  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.length === 0 ? (
          <Container className="mt-5 text-center">
            <Spinner animation="border" role="status" />
            <p className="mt-2">Cargando Productos...</p>
          </Container>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="col-6 col-lg-3 position-relative product-grid_product-card">
              {/* Wishlist / Cart Icons */}
              <div className="product-action-icons">
                <AddToLikesButton product={product} />
                {!product?.attributes?.sizes && (
                  <AddToCartButton product={product} />
                )}
              </div>
              {/* Clickable Product Card */}
              <a href={`/productos/${product.id}`} className="text-decoration-none text-reset">
                <div className="product-card h-100 shadow-sm rounded overflow-hidden">
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="img-fluid product-image"
                    />
                  </div>
                  <div className="text-center p-2">
                    <p className="text-muted small my-1">{product.brand}</p>
                    <h5 className="text-muted small my-1">{product.name}</h5>
                    <span className="text-black fw-semibold">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
