import { useState } from "react";
import { FaFacebook, FaInstagram, FaPinterest, FaTiktok, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import "./footer.css"; // Optional for extra styling

export default function Footer() {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [collapseOpenSupport, setCollapseOpenSupport] = useState(false);

  return (
    <footer className="pt-4">
      <div className="container">
        {/* First Row: Collapsible on small screens */}

        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-3">
            <p className="text-black bold text-center m-0  social-media-title">Siguenos en nuestras redes sociales</p>
            <ul className="list-unstyled d-flex justify-content-center">
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaWhatsapp /></a></li>
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaYoutube /></a></li>
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaFacebook /></a></li>
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaPinterest /></a></li>
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaTwitter /></a></li>
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaInstagram /></a></li>
              <li><a href="/" className="text-decoration-none text-black text-center fs-3 mx-1"><FaTiktok /></a></li>
            </ul>
          </div>
          <div className="col-9">
            <div className="d-md-flex justify-content-evenly mb-2">
              <div className="accordion d-md-none w-100" id="footerAccordion">
                <div className="accordion-item border border-black">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      onClick={() => setCollapseOpen(!collapseOpen)}
                    >
                      Información
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${collapseOpen ? "show" : ""}`}>
                    <div className="accordion-body">
                      <ul className="list-unstyled">
                        <li><a href="/sobre-nosotros" className="text-decoration-none text-black">Sobre Nosotros</a></li>
                        <li><a href="/preguntas-frecuentes#formas-de-pago" className="text-decoration-none text-black">Formas de Pago</a></li>
                        <li><a href="/preguntas-frecuentes#formas-de-envio" className="text-decoration-none text-black">Envíos</a></li>
                        <li><a href="/preguntas-frecuentes#devoluciones" className="text-decoration-none text-black">Devoluciones</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="accordion d-md-none w-100" id="footerAccordion">
                <div className="accordion-item border border-black">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      onClick={() => setCollapseOpenSupport(!collapseOpenSupport)}
                    >
                      Soporte
                    </button>
                  </h2>
                  <div className={`accordion-collapse collapse ${collapseOpenSupport ? "show" : ""}`}>
                    <div className="accordion-body">
                      <ul className="list-unstyled">
                        <li><a href="/preguntas-frecuentes" className="text-decoration-none text-black">Preguntas Frecuentes</a></li>
                        <li><a href="/contacto" className="text-decoration-none text-black">Contáctanos</a></li>
                        <li><a href="/aviso-de-privacidad" className="text-decoration-none text-black">Aviso de Privacidad</a></li>
                        <li><a href="/terminos-y-condiciones" className="text-decoration-none text-black">Términos y Condiciones</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              

              <div className="d-none d-md-block">
                <h5>Información</h5>
                <ul className="list-unstyled">
                  <li><a href="/sobre-nosotros" className="text-decoration-none text-black">Sobre Nosotros</a></li>
                  <li><a href="/preguntas-frecuentes#formas-de-pago" className="text-decoration-none text-black">Formas de Pago</a></li>
                  <li><a href="/preguntas-frecuentes#formas-de-envio" className="text-decoration-none text-black">Envíos</a></li>
                  <li><a href="/preguntas-frecuentes#devoluciones" className="text-decoration-none text-black">Devoluciones</a></li>
                </ul>
              </div>

              <div className="d-none d-md-block">
                <h5>Soporte</h5>
                <ul className="list-unstyled">
                  <li><a href="/preguntas-frecuentes" className="text-decoration-none text-black">Preguntas Frecuentes</a></li>
                  <li><a href="/contacto" className="text-decoration-none text-black">Contáctanos</a></li>
                  <li><a href="/aviso-de-privacidad" className="text-decoration-none text-black">Aviso de Privacidad</a></li>
                  <li><a href="/terminos-y-condiciones" className="text-decoration-none text-black">Términos y Condiciones</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>


        {/* Second Row: Watermark + logos */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3 border-top border-secondary">
          <p className="mb-2 mb-md-0">© rf-ecommerce-demo {new Date().getFullYear()}</p>
          <div className="d-flex gap-3">
            <img src="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/brand-logos/paymen-platforms.png" alt="Sponsor 1" style={{ height: "6rem" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
