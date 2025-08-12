import "./specific-product-page.css";
import { useState } from "react";
import { Tab, Tabs, Form, Button, Alert } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import DOMPurify from "dompurify";
import ProductsGrid from "../products-grid/products-grid";
import ProductPageAddToCartButton from "../../utils/product-page-add-to-cart-button/product-page-add-to-cart-button";
import ProductPageAddToLikesButton from "../../utils/product-page-add-to-likes-button/product-page-add-to-likes-button";
import ReviewsPagination from "../../reviews-pagination/reviews-pagination";

const schema = object({
  review: string()
    .transform((value) => value.trim()) // Remove whitespace before validation
    .required("La reseña es requerida")
    .min(1, "La reseña no puede estar vacía")
    .max(1000, "La reseña no puede tener más de 1000 caracteres"),
});

const SpecificProductPage = ({ product, relatedProducts, userSession }) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [reviewStatus, setReviewStatus] = useState("");
  const [reviews, setReviews] = useState([]);
  const [reviewsUsers, setReviewsUsers] = useState(new Map());
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
  const [safeDescription, setSafeDescription] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(() => {
    const sizeObj = product.attributes?.sizes.find(
      (s) => s.label === selectedSize
    );
    return sizeObj?.price || product.price;
  });
  const [currentProduct, setCurrentProduct] = useState(product || null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (product?.id) {
      updateReviewSection();
    }
  }, [product?.id]);

  useEffect(() => {
    if (reviews.length > 0) {
      const userIds = [...new Set(reviews.map((review) => review.user_id))];
      getReviewSectionUsers(userIds);
    }
  }, [reviews]);

  useEffect(() => {
    if (product?.description && DOMPurify) {
      setSafeDescription(DOMPurify.sanitize(product.description));
    }
    setCurrentProduct(product);
  }, [product]);

  // Inside your component:
  useEffect(() => {
    if (product?.attributes?.sizes?.length > 0) {
      const defaultSize = product.attributes.sizes[0];
      setSelectedSize(defaultSize.label);
      setSelectedPrice(defaultSize.price || product.price);

      // Optionally update currentProduct
      const tempProduct = {
        ...product,
        price: defaultSize.price || product.price,
        attributes: {
          ...(product.attributes || {}),
          selectedSize: defaultSize.label,
        },
      };
      setCurrentProduct(tempProduct);
    }
  }, [product]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/reviews/create-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: data.review,
          productId: product.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.response || "No se pudo registrar.");
      }

      updateReviewSection();
      setReviewStatus("success");
      reset();
    } catch (err) {
      console.log(err);
      setReviewStatus(err.message);
    } finally {
      setTimeout(() => {
        setReviewStatus("");
      }, 3000);
    }
  };

  const updateReviewSection = async () => {
    try {
      const request = await fetch(
        `/api/reviews/get-product-reviews/${product.id}`
      );
      const response = await request.json();

      if (!request.ok) {
        throw new Error(response.message || "Error al actualizar las reseñas");
      }
      setReviews(response.response);
    } catch (err) {
      console.error("Error al actualizar las reseñas:", err);
    }
  };

  const getReviewSectionUsers = async (users) => {
    try {
      const request = await fetch("/api/user/get-multiple-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ users }),
      });
      const response = await request.json();

      if (!request.ok) {
        throw new Error(
          response.message || "Error al obtener usuarios de reseñas"
        );
      }
      const usersMap = new Map(
        response.response.map((user) => [user.id, user])
      );
      setReviewsUsers(usersMap);
    } catch (err) {
      console.error("Error al obtener usuarios de reseñas: ", err);
    }
  };

  const handleProductSizeChange = (e) => {
    const newSize = e.target.value;
    const sizeObj = product.attributes?.sizes.find((s) => s.label === newSize);
    const newPrice = sizeObj?.price || product.price;

    // Update state (for UI)
    setSelectedSize(newSize);
    setSelectedPrice(newPrice);

    const tempProduct = {
      ...product,
      price: newPrice,
      attributes: {
        ...(product.attributes || {}),
        selectedSize: newSize,
      },
    };
    setCurrentProduct(tempProduct);
  };

  return (
    <div className="container mt-5">
      {/* Row 1: Product Image and Info */}
      <div className="row mb-5">
        {/* Image Gallery */}
        <div className="col-md-6">
          <div className="">
            <div className="flex-grow-1 d-flex justify-content-center align-items-center border">
              <img
                src={selectedImage || product.image}
                alt="product"
                className="img-fluid"
              />
            </div>

            {product.attributes?.utilImages?.length > 0 && (
              <img
                src={product.image}
                alt="thumbnail"
                className="img-thumbnail my-2 me-1"
                style={{ width: 60, cursor: "pointer" }}
                onClick={() => setSelectedImage(product.image)}
              />
            )}

            {product.attributes?.utilImages?.length > 0 &&
              product.attributes.utilImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="thumbnail"
                  className="img-thumbnail my-2 me-1"
                  style={{ width: 60, cursor: "pointer" }}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6 align-content-center">
          <h2 className="text-center">{product.name}</h2>

          {(() => {
            const finalPrice = selectedPrice || product.price;
            const originalPrice = (finalPrice / 0.7).toFixed(2);
            const discountPercent = 30;

            return (
              <div className="d-flex justify-content-center">
                <h4 className="text-success fs-1 d-flex align-items-center mb-0">
                  ${finalPrice}.00MXN
                  <span className="text-muted text-decoration-line-through ms-2 fs-6">
                    ${originalPrice}
                  </span>
                  <span className="text-danger ms-2 fs-6">
                    ({discountPercent}% de descuento!)
                  </span>
                </h4>
              </div>
            );
          })()}

          {product.attributes?.sizes?.length > 0 && (
            <div className="d-flex justify-content-center">
              <Form.Group controlId="sizeRadioSelect" className="my-3 d-flex">
                <Form.Label className="mx-2">Tamaño</Form.Label>
                {product.attributes?.sizes.map((size) => (
                  <Form.Check
                    type="radio"
                    key={size.label}
                    id={`size-${size.label}`}
                    name="sizeOptions"
                    label={`${size.label}`}
                    value={size.label}
                    checked={selectedSize === size.label}
                    onChange={(e) => {
                      handleProductSizeChange(e);
                    }}
                    className="mb-2 mx-2"
                  />
                ))}
              </Form.Group>
            </div>
          )}

          <p className="text-center">
            IVA incluido. Envío calculado al finalizar la compra.
          </p>

          <div className="d-flex justify-content-center align-items-center gap-3 my-3">
            <ProductPageAddToLikesButton product={product} />
            <ProductPageAddToCartButton product={currentProduct} />
            <a href="/pagar" className="btn btn-dark w-50 w-md-auto">
              Pagar Pedido
            </a>
          </div>

          {/* Estimated delivery date */}
          {(() => {
            const getDeliveryDate = (daysToAdd = 3) => {
              const date = new Date();
              let addedDays = 0;

              while (addedDays < daysToAdd) {
                date.setDate(date.getDate() + 1);
                const day = date.getDay();
                if (day !== 0 && day !== 6) {
                  // skip Sunday (0) and Saturday (6)
                  addedDays++;
                }
              }

              return date.toLocaleDateString("es-MX", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              });
            };

            return (
              <p className="text-center text-muted fs-6">
                Ordena hoy y recibe tu pedido el{" "}
                <strong>{getDeliveryDate(5)}</strong>.
              </p>
            );
          })()}
          <div className="d-flex justify-content-center">
            <img
              src="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/brand-logos/paymen-platforms.png"
              alt="Sponsor 1"
              className="img-fluid"
              style={{ height: "8rem" }}
            />
          </div>
        </div>
      </div>

      {/* Row 2: Tabs Section */}
      <div className="row mb-5">
        <div className="col">
          <Tabs
            id="product-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3">
            <Tab eventKey="description" title="Descripción">
              <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
            </Tab>
            <Tab eventKey="details" title="Detalles">
              <ul>
                <li>
                  <strong>Tamaño:</strong> {product.attributes?.tamaño || "N/A"}
                </li>
                <li>
                  <strong>Marca:</strong> {product.brand || "N/A"}
                </li>
                <li>
                  <strong>SKU:</strong> {product.sku}
                </li>
                <li>
                  <strong>Stock disponible:</strong> {product.stock_quantity}{" "}
                  unidades
                </li>
                <li>
                  <strong>Precio final:</strong> ${product.price}.00 MXN
                </li>

                {/* Add more details as needed */}
              </ul>
            </Tab>
            <Tab eventKey="shipment" title="Envío">
              <div className="card border-0 shadow-sm my-4">
                <div className="card-body">
                  <h5 className="card-title text-center text-dark fw-bold text-uppercase mb-4">
                    Formas de Envío y Tiempos de Entrega
                  </h5>
                  <p className="card-text text-dark lh-lg">
                    En <strong>Ecommerce Demo</strong> utilizamos diferentes
                    empresas de paquetería que trabajan a nivel nacional, como{" "}
                    <strong>
                      DHL, FedEx, Estafeta, Paqueteexpress, Redpack
                    </strong>
                    , entre otras.
                  </p>
                  <p className="card-text text-dark lh-lg">
                    Nuestro sistema asigna automáticamente el transportista y
                    genera la guía en el momento de la compra, basándose en la
                    paquetería que ofrezca el{" "}
                    <strong>mejor tiempo de entrega</strong> para la ubicación
                    indicada, siempre buscando ofrecer el{" "}
                    <strong>mejor servicio</strong> para el cliente.
                  </p>
                </div>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Row 3: Reviews Section */}
      <div className="row mb-5">
        <div className="col-lg-8 mx-auto">
          <h4 className="mb-4 text-center">Reseñas</h4>

          <ReviewsPagination
            reviews={reviews}
            reviewsUsers={reviewsUsers}
            userSession={userSession}
            setShowDeleteReviewModal={setShowDeleteReviewModal}
            showDeleteReviewModal={showDeleteReviewModal}
          />

          {reviewStatus === "success" && (
            <div className="mb-3">
              <Alert variant="success" className="text-center">
                Reseña agregada
              </Alert>
            </div>
          )}

          {reviewStatus && reviewStatus !== "success" && (
            <div className="mb-3">
              <Alert variant="danger" className="text-center">
                {reviewStatus}
              </Alert>
            </div>
          )}

          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="shadow-sm p-4 border rounded bg-light">
            <Form.Group className="mb-3" controlId="reviewTextarea">
              <Form.Label className="fw-semibold">Deja tu reseña:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu reseña aquí"
                isInvalid={!!errors.review}
                {...register("review")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.review?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid justify-content-center">
              <Button type="submit" variant="dark" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </div>
          </Form>
        </div>
      </div>

      {/* Row 4: Related Products Carousel */}
      <div className="row mb-5">
        <div className="col">
          <h4 className="text-center">Nuestras Sugerencias</h4>
          <ProductsGrid products={relatedProducts} />
        </div>
      </div>
    </div>
  );
};

export default SpecificProductPage;
