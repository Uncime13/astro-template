import { useEffect, useState } from "react";
import { Button, Spinner, Container } from "react-bootstrap";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: number;
};

type LikedItem = Product;

export default function ItemsLikes() {
  const [likedItems, setLikedItems] = useState<{ [key: string]: LikedItem }>(
    {}
  );
  const [loadingLikes, setLoadingLikes] = useState(true);

  const syncUserLikes = async () => {
    try {
      const localLikes = JSON.parse(localStorage.getItem("likes") || "{}");
      const req = await fetch("/api/likes/sync-user-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ localLikes }),
      });

      const response = await req.json();

      if (!req.ok) {
        throw new Error(response.message || "Error al agregar tu 'Me Gusta'");
      }

      localStorage.setItem("likes", JSON.stringify(response.data));
      setLikedItems(response.data);
    } catch (error: any) {
      console.error(error.message || "Error inesperado");
    } finally {
      setLoadingLikes(false);
    }
  };

  useEffect(() => {
    syncUserLikes();
  }, []);

  const removeLike = async (id: number) => {
    try {
      setLoadingLikes(true);
      const localLikes = JSON.parse(localStorage.getItem("likes") || "{}");
      const req = await fetch("/api/likes/delete-user-like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id, localLikes: localLikes }),
      });

      const response = await req.json();

      if (!req.ok) {
        throw new Error(response.message || "Error al eliminar tu 'Me Gusta'");
      }

      localStorage.setItem("likes", JSON.stringify(response.data));
      setLikedItems(response.data);
    } catch (error: any) {
      console.error(error.message || "Error inesperado");
    } finally {
      setLoadingLikes(false);
    }
  };

  const removeAllLikes = async () => {
    try {
      setLoadingLikes(true);
      const req = await fetch("/api/likes/delete-all-user-likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await req.json();

      if (!req.ok) {
        throw new Error(response.message || "Error al eliminar tus 'Me Gusta'");
      }

      localStorage.setItem("likes", JSON.stringify(response.data));
      setLikedItems(response.data);
    } catch (error: any) {
      console.error(error.message || "Error inesperado");
    } finally {
      setLoadingLikes(false);
    }
  };

  const products = Object.values(likedItems);

  return (
    <>
      {loadingLikes ? (
        <Container className="mt-5 text-center">
          <Spinner animation="border" role="status" />
          <p className="mt-2">Cargando 'Me Gusta'...</p>
        </Container>
      ) : products.length === 0 ? (
        <p className="mt-2">No has agregado productos a tus 'Me Gusta'</p>
      ) : (
        <div className="container mt-4">
          <h2 className="text-center">Productos que te gustan</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={product.id}>
                <div className="d-flex align-items-center">
                  <a href={`/productos/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="rounded me-3"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </a>
                  <div>
                    <strong>{product.name}</strong>
                    <br />
                    <small>{product.brand}</small>
                    <br />
                    <span className="text-muted">Precio: ${product.price}</span>
                  </div>
                </div>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => removeLike(product.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <div className="row justify-content-evenly my-2">
            <Button variant="danger" className="col-5" onClick={removeAllLikes}>
              Vaciar mis 'Me Gusta'
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
