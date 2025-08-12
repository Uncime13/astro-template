import { Button, Alert } from "react-bootstrap";
import { useState } from "react";

export default function ReviewDeleteButton({ reviewId }) {
  const [requestStatus, setRequestStatus] = useState("");
  const deleteReview = async () => {
    try {
      const req = await fetch(`/api/reviews/delete/${reviewId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const response = await req.json();

      if (!req.ok) {
        throw new Error(response.message || "Error al eliminar reseña");
      }
      setRequestStatus("success");

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error(error.message || "Error inesperado");
      setRequestStatus(error.message);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center">Confirmación Para Eliminar Reseña</h2>
      <div className="row justify-content-evenly my-2">
        {requestStatus === "success" && (
          <div className="m-2">
            <Alert variant="success" className="text-center">
              Reseña Eliminada
            </Alert>
          </div>
        )}

        {requestStatus && requestStatus !== "success" && (
          <div className="m2-2">
            <Alert variant="danger" className="text-center">
              {requestStatus}
            </Alert>
          </div>
        )}
        <Button variant="danger" className="col-5" onClick={deleteReview}>
          Eliminar Reseña
        </Button>
      </div>
    </div>
  );
}
