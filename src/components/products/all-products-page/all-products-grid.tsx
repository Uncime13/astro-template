import { useState, useMemo, useEffect } from "react";
import ProductGridPagination from "../products-grid-pagination/products-grid-pagination";
import "./all-products-grid.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category_id: number;
  description: string
}

interface AllProductGridProps {
  products: Product[];
  initialFilters?: number;
}


export default function AllProductsPage({ products, initialFilters }: AllProductGridProps) {
  const [category_id, setCategory] = useState(initialFilters);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");

  // Get unique sorted brands
  const uniqueBrands = useMemo(() => {
    const brandSet = new Set<string>();
    products.forEach((product) => brandSet.add(product.brand));
    return Array.from(brandSet).sort((a, b) => a.localeCompare(b));
  }, [products]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setCategory(0);
    setMinPrice(0);
    setMaxPrice(maxAvailablePrice);
    setSelectedBrands([]);
    setBrandSearch("");
  };
  

  const handleBrandSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = e.target.value.replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ ]/g, "");
    setBrandSearch(sanitized);
  };

  const visibleBrands = useMemo(() => {
    return uniqueBrands.filter((brand) =>
      brand.toLowerCase().includes(brandSearch.toLowerCase())
    );
  }, [brandSearch, uniqueBrands]);

  const maxAvailablePrice = useMemo(() => {
    return Math.max(...products.map((p) => p.price), 0);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        category_id === 0 || category_id === product.category_id;
      const matchMaxPrice = product.price <= maxPrice;
      const matchMinPrice = product.price >= minPrice;
      const matchBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return matchCategory && matchMaxPrice && matchMinPrice && matchBrand;
    });
  }, [products, category_id, maxPrice, minPrice, selectedBrands]);

  useEffect(() => {
    setMaxPrice(maxAvailablePrice);
  }, [maxAvailablePrice]);


  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Filters Column */}
        <aside className="col-12 col-md-3 mb-4 mb-md-0">
          <div className="filters p-3 bg-light rounded shadow-sm">
            <h5 className="mb-3">Filtros</h5>

            {/* Category Filter */}
            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                value={category_id}
                onChange={(e) => setCategory(Number(e.target.value))}>
                <option value={0}>Todas las Fragancias</option>
                <option value={2}>Fragancias Femeninas</option>
                <option value={1}>Fragancias Masculinas</option>
                <option value={3}>Fragancias Unisex</option>
              </select>
            </div>

            {/* Price Filters */}
            <div className="mb-3">
              <label className="form-label">Precio Mínimo: ${minPrice}</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max={maxAvailablePrice}
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio Máximo: ${maxPrice}</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max={maxAvailablePrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Marca</label>

              <div className="position-relative mb-2">
                <input
                  type="text"
                  className="form-control pe-5"
                  placeholder="Buscar marca..."
                  value={brandSearch}
                  onChange={handleBrandSearchChange}
                />
                {brandSearch && (
                  <button
                    type="button"
                    className="btn btn-sm btn-link position-absolute end-0 top-0 mt-1 me-2 text-decoration-none"
                    onClick={() => setBrandSearch("")}
                    aria-label="Limpiar búsqueda"
                    style={{ fontSize: "1.25rem", lineHeight: "1" }}>
                    &times;
                  </button>
                )}
              </div>

              <div
                className="d-flex flex-column"
                style={{ maxHeight: "200px", overflowY: "auto" }}>
                {visibleBrands.map((brand) => (
                  <div key={brand} className="form-check mx-1">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value={brand}
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`brand-${brand}`}>
                      {brand}
                    </label>
                  </div>
                ))}
                {visibleBrands.length === 0 && (
                  <small className="text-muted">No se encontraron marcas</small>
                )}
              </div>
            </div>

            {/* Reset Filters Button */}
            <div className="d-grid">
              <button
                className="btn btn-outline-secondary"
                onClick={handleResetFilters}>
                Limpiar filtros
              </button>
            </div>
          </div>
        </aside>

        {/* Product Grid Column */}
        <main className="col-12 col-md-9">
          <div
            className="fade-in"
            key={`${category_id}-${maxPrice}-${minPrice}-${selectedBrands.join(
              ","
            )}`}>
            <ProductGridPagination products={filteredProducts} />
          </div>
        </main>
      </div>
    </div>
  );
}
