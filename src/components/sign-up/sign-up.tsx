import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Form, Button, Alert } from "react-bootstrap";

const allowedDomains = [
  "gmail.com",
  "yahoo.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "aol.com",
  "icloud.com",
  "msn.com",
  "me.com",
  "protonmail.com",
  "mail.com",
  "zoho.com",
  "gmx.com",
  "yandex.com",
  "inbox.com",
];

const schema = object({
  email: string()
    .email("Correo inválido")
    .required("El correo es requerido")
    .test("is-valid-domain", "Dominio de correo no permitido", (value) => {
      if (!value) return false;
      const domain = value.split("@")[1]?.toLowerCase();
      return allowedDomains.some(
        (allowed) => domain === allowed || domain.endsWith(`.${allowed}`)
      );
    }),
  password: string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es requerida"),
  username: string()
    .min(4, "Tu nombre de usuario debe tener al menos 4 caracteres")
    .required("El nombre de usuario es requerido"),
});

export default function SignUp() {
  const [status, setStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("/api/user/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "No se pudo registrar.");
      }

      setStatus("success");
      reset();
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (err) {
      console.log(err);
      setStatus(err.message);
    }
  };

  return (
    <div className="container justify-content-center align-items-center py-5">
      <div className="row justify-content-center">
        <div className="col-md-6" >
          <h4 className="text-center mb-4">Crear Cuenta</h4>

          {status === "success" && (
            <Alert variant="success" className="text-center">
              Correo de confirmación enviado, por favor revise su bandeja de
              entrada.
            </Alert>
          )}

          {status && status !== "success" && (
            <Alert variant="danger" className="text-center">
              {status}
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3 text-center" controlId="formUserName">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Usuario nuevo"
                isInvalid={!!errors.username}
                {...register("username")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-center" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                isInvalid={!!errors.email}
                {...register("email")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3 text-center" controlId="formMessage">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                isInvalid={!!errors.password}
                {...register("password")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid justify-content-center">
              <Button type="submit" disabled={isSubmitting} className="btn-dark">
                {isSubmitting ? "Registrando..." : "Registrar"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h4 className="text-center my-3">¿Ya tienes cuenta?</h4>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <a href="/iniciar-sesion" className="text-decoration-none text-black">
            Iniciar Sesión
          </a>
        </div>
      </div>
    </div>
  );
}
