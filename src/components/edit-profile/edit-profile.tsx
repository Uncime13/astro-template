import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
  Image,
} from "react-bootstrap";

interface UserProfile {
  id: string;
  username: string;
  full_name: string | null;
  avatar_url: string | null;
  email: string;
  created_at: string;
}

function EditProfile() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    full_name?: string;
  }>({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/get-user-profile");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.response || "Hubo un error al buscar tu perfil."
          );
        }

        const user = data.response[0];
        setUser(user);
        setFormData({
          username: user.username || "",
          full_name: user.full_name || "",
        });
        setAvatarPreview(user.avatar_url || "");
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    const errors: { username?: string; full_name?: string } = {};
    if (!formData.username.trim()) {
      errors.username = "El nombre de usuario es obligatorio.";
    } else if (formData.username.length < 3) {
      errors.username = "Debe tener al menos 3 caracteres.";
    }

    if (!formData.full_name.trim()) {
      errors.full_name = "El nombre de usuario es obligatorio.";
    } else if (formData.username.length < 3) {
      errors.full_name = "Debe tener al menos 3 caracteres.";
    }

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    try {
      const formPayload = new FormData();
      formPayload.append("username", formData.username);
      formPayload.append("full_name", formData.full_name);
      if (avatarFile) {
        formPayload.append("avatar", avatarFile);
      }

      const res = await fetch("/api/user/update-user-profile", {
        method: "POST",
        body: formPayload,
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "No se pudo actualizar el perfil.");

      setSuccess("Perfil actualizado correctamente.");
      setTimeout(() => (window.location.href = "/mi-perfil"), 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    if (!user) return;
    setFormData({
      username: user.username || "",
      full_name: user.full_name || "",
    });
    setAvatarPreview(user.avatar_url || "");
    setAvatarFile(null);
    setSuccess(null);
    setError(null);
  };

  const handleCancel = () => {
    window.location.href = "/mi-perfil";
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Cargando Perfil...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="bg-dark text-white text-center">
              <h4 className="mb-0">Editar Perfil</h4>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Row className="mb-4">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <Image
                    src={
                      avatarPreview ||
                      "https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/default-avatar-1.png"
                    }
                    roundedCircle
                    width={150}
                    height={150}
                    alt="Avatar Preview"
                  />
                  <Form.Group className="mt-3" controlId="formAvatarFile">
                    <Form.Label>Sube tu nueva imagen</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={8}>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label>Nombre de Usuario</Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        isInvalid={!!validationErrors.username}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.username}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="formFullName">
                      <Form.Label>Nombre Completo</Form.Label>
                      <Form.Control
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                        isInvalid={!!validationErrors.full_name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {validationErrors.full_name}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex flex-column flex-md-row justify-content-end gap-2">
                      <Button
                        type="button"
                        variant="outline-danger"
                        onClick={handleCancel}>
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        variant="outline-secondary"
                        onClick={handleReset}>
                        Restablecer
                      </Button>
                      <Button type="submit" variant="dark" disabled={saving}>
                        {saving ? "Guardando..." : "Guardar Cambios"}
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
