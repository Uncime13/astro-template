import { useEffect, useState } from "react";
import SpecificProductPage from "./specific-product-page";

export default function SpecificProductPageLoader({ productId, userSession }) {
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/get-product/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product)
        setRelatedProducts(data.relatedProducts)
      });
  }, []);

  return <SpecificProductPage product={product} relatedProducts={relatedProducts} userSession={userSession} />;
}
