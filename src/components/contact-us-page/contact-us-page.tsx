import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

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
  name: string().required("El nombre es requerido"),
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
  message: string().required("El mensaje es requerido"),
  website: string().max(0),
});

export default function ContactUsPage() {
  const [status, setStatus] = useState("idle");

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("No se pudo enviar el correo.");
      }

      setStatus("success");
      reset();
    } catch (err) {
      console.log(err);
      setStatus("error");
    }
  };

  return (
    <div className="container py-5">
      <div className="row mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img
            src="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/tom-ford-carousel.png"
            alt="Nuestra tienda"
            className="img-fluid rounded shadow"
          />
          <div className="mt-3">
            <h5>Visítanos</h5>
            <p>
              Estamos ubicados en el corazón de la ciudad. Ven a descubrir
              nuestra colección de perfumes y recibe atención personalizada de
              nuestro equipo.
            </p>
          </div>
        </div>

        <div className="col-md-6">
          <h4>Contáctanos</h4>

          {status === "success" && (
            <Alert variant="success">Mensaje enviado correctamente.</Alert>
          )}
          {status === "error" && (
            <Alert variant="danger">
              Hubo un problema al enviar el mensaje.
            </Alert>
          )}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre completo"
                isInvalid={!!errors.name}
                {...register("name")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
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

            <Form.Group className="mb-3 d-none" controlId="formWebsite">
              <Form.Control
                type="text"
                placeholder="No llenar este campo"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu mensaje aquí"
                isInvalid={!!errors.message}
                {...register("message")}
              />
              <Form.Control.Feedback type="invalid">
                {errors.message?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar"}
            </Button>
          </Form>

          <div className="mt-4">
            <h6>¿Tienes dudas?</h6>
            <p>
              También puedes llamarnos al <strong>+52 33 1234 5678</strong> o
              escribirnos en redes sociales.
            </p>
            <ul className="list-unstyled d-flex justify-content-center">
              {[
                FaWhatsapp,
                FaYoutube,
                FaFacebook,
                FaPinterest,
                FaTwitter,
                FaInstagram,
                FaTiktok,
              ].map((Icon, i) => (
                <li key={i}>
                  <a
                    href="/"
                    className="text-decoration-none text-black text-center fs-3 mx-1">
                    <Icon />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
