import { useEffect, useState } from "react";
import "./products-grid-pagination.css";
import AddToCartButton from "../../utils/add-to-cart-button/add-to-cart-button";
import AddToLikesButton from "../../utils/add-to-likes-button/add-to-likes-button";

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

export default function ProductGridPagination({
  products = [],
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [sortOption, setSortOption] = useState<
    "price-asc" | "price-desc" | "az" | "za"
  >("price-asc");

  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth >= 992 ? 8 : 6);
    };

    updateItemsPerPage(); // Initial set
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset page when sort changes
  }, [sortOption]);

  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "az":
          return a.name.localeCompare(b.name);
        case "za":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const sortedProducts = sortProducts(products);
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  return (
    <div className="container py-5">
      {/* Sort Dropdown */}
      <div className="mb-4 d-flex justify-content-end">
        <select
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as any)}>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="az">Nombre: A - Z</option>
          <option value="za">Nombre: Z - A</option>
        </select>
      </div>

      {/* Product Grid */}
      <div key={currentPage} className="row g-4 fade-in">
        {currentProducts.length === 0 ? (
          <p>No hay productos que coincidan con los filtros.</p>
        ) : (
          currentProducts.map((product) => (
            <div
              key={product.id}
              className="col-6 col-lg-3 position-relative product-grid_product-card">
              {/* Icons */}
              <div className="product-action-icons">
                <AddToLikesButton product={product} />
                {!product?.attributes?.sizes && (
                  <AddToCartButton product={product} />
                )}
              </div>

              <a
                href={`/productos/${product.id}`}
                className="text-decoration-none text-reset">
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${
                  currentPage === 1 ? "disabled text-black" : "text-black"
                }`}>
                <button
                  className="page-link text-black"
                  onClick={() => setCurrentPage(currentPage - 1)}>
                  Anterior
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}>
                  <button
                    className="page-link text-black"
                    onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages
                    ? "disabled text-black"
                    : "text-black"
                }`}>
                <button
                  className="page-link text-black"
                  onClick={() => setCurrentPage(currentPage + 1)}>
                  Siguiente
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
