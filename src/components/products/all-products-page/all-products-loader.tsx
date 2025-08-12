import { useEffect, useState } from "react";
import AllProductsGrid from "./all-products-grid";

interface InitialFilters {
  initialFilters: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category_id: number;
  description: string;
}

interface FetchResponse {
  response: Product[];
}

export default function AllProductsLoader({ initialFilters }: InitialFilters) {
  const [products, setProducts] = useState<Product[]>([]); // ✅ Typed state

  useEffect(() => {
    fetch("/api/fetch-most-sold-products")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "No se pudo obtener la información de los productos."
          );
        }
        return res.json() as Promise<FetchResponse>; // ✅ cast to expected type
      })
      .then((data) => {
        setProducts(data.response);
      });
  }, []);

  return (
    <AllProductsGrid products={products} initialFilters={initialFilters} />
  );
}
