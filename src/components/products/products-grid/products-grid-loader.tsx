import { useEffect, useState } from "react";
import ProductsGrid from "./products-grid";

export default function ProductsGridLoader({ endpoint }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/${endpoint}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setProducts(data.response)
      }
      );
  }, []);

  return <ProductsGrid products={products} />;
}
