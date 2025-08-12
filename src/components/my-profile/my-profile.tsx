import { useEffect, useState } from "react";
import {
  Spinner,
  Alert,
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";

function MyProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/get-user-profile");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.response || "Hubo un error al buscar tu perfil.");
        }
        const data = await res.json();
        setUser(data.response[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando Perfil...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const {
    username,
    full_name,
    email,
    avatar_url,
    created_at,
  } = user;

  return (
    <Container className="mt-5">
      <Card className="shadow border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col md="4" className="text-center mb-4 mb-md-0">
              <Image
                src={avatar_url || "https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/default-avatar-1.png"}
                roundedCircle
                width={150}
                height={150}
                alt="Avatar"
              />
            </Col>
            <Col md="8">
              <h4 className="mb-1">{full_name || username}</h4>
              <p className="text-muted mb-2">{email}</p>
              <p className="text-secondary mb-2">
                <strong>Usuario:</strong> {username}
              </p>
              <p className="text-secondary">
                <strong>Miembro desde:</strong>{" "}
                {new Date(created_at).toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <Button variant="dark" href="/editar-perfil">
                Editar Perfil
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default MyProfile;
