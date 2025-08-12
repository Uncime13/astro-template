import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./about-us-page.css";

interface ImageCardProps {
  imageUrl: string;
  title: string;
  onMoreInfo: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUrl,
  title,
  onMoreInfo,
}) => (
  <div className="position-relative w-100 h-100 overflow-hidden rounded shadow-sm image-card-hover">
    <img
      src={imageUrl}
      alt={title}
      className="img-fluid w-100 h-100 object-fit-cover"
      loading="lazy"
      style={{ objectFit: "cover" }}
    />
    <Button
      variant="dark"
      size="sm"
      className="position-absolute bottom-0 end-0 m-2"
      onClick={onMoreInfo}>
      Más Info
    </Button>
  </div>
);

interface InfoTextProps {
  variant: number;
}

const InfoText: React.FC<InfoTextProps> = ({ variant }) => {
  let content;

  switch (variant) {
    case 1:
      content = (
        <>
          <p>
            Nuestra empresa inició su operación en el año de 2016 con la meta de
            brindarles al consumidor perfumes originales de todo el mundo a un
            precio competitivo y fácil de comprar en línea.
          </p>
          <p>
            En México, encontrar perfumes originales a precios justos es una
            tarea complicada, ya que las tiendas departamentales suben los
            precios debido a sus gastos operativos y, por otro lado, las tiendas
            en línea no siempre resultan la opción más confiable.
          </p>
          <p>
            Es gracias a esto que nuestra empresa nace con la meta de brindar la
            solución a este problema: estableciendo una tienda en línea con los
            más altos estándares de seguridad web y ofreciendo un catálogo de
            perfumes originales a un precio justo.
          </p>
          <p>
            A un ritmo trepidante, nuestra empresa consolidó un amplio catálogo
            de perfumes para dama, caballero y niños; así como un servicio al
            cliente distinguido por su cercanía con el público, todo esto
            respaldado por una plataforma web intuitiva y de fácil uso para
            todos los usuarios.
          </p>
          <p>
            El resultado de la suma de la confianza y la satisfacción de miles
            de clientes a lo largo y ancho del país colocó a nuestra empresa
            como una de las líderes en la venta de perfumes originales en
            México.
          </p>
          <p>
            El compromiso con un servicio de excelencia, la satisfacción de sus
            clientes y el mejoramiento continuo de sus procesos han sido claves
            del éxito de nuestra empresa. Gracias a esta filosofía, su
            crecimiento continúa día con día.
          </p>
        </>
      );
      break;
    case 2:
      content = (
        <p>
          Ofrecer una experiencia segura, intuitiva y satisfactoria a nuestros
          usarios que los lleve a encontrar y comprar el perfume ideal de
          acuerdo a sus gustos y necesidades.
        </p>
      );
      break;
    case 3:
      content = (
        <p>
          Ser la marca líder en la venta de perfumes originales online en
          México, reconocida por su amplia variedad de productos, excelente
          servicio al cliente y precios competitivos.
        </p>
      );
      break;
    case 4:
      content = (
        <p>
          Nos aseguramos de que nuestros productos sean 100% originales gracias
          a que nos regulamos bajo los más altos estándares de calidad
          internacional.
        </p>
      );
      break;
    case 5:
      content = (
        <p>Brindarle a todos nuestros usuarios un servicio excepcional.</p>
      );
      break;
    case 6:
      content = (
        <p>
          Activamente, buscamos el mejoramiento continuo en todas nuestras áreas
          y servicios, aplicando la creatividad y tecnologías para lograrlo.
        </p>
      );
      break;
    case 7:
      content = (
        <p>
          Ser único, creativo y diferenciarse de la competencia a través de
          ideas innovadoras y productos o servicios único.
        </p>
      );
      break;
    case 8:
      content = (
        <p>
          Nos esforzamos por ofrecer siempre el mejor servicio y productos de la
          más alta calidad.
        </p>
      );
      break;
    default:
      content = <p>Información no disponible.</p>;
  }

  return <div>{content}</div>;
};

export default function AboutUsPage() {
  const [modalContent, setModalContent] = useState<{
    title: string;
    textToShow: number;
  } | null>(null);

  const handleShowInfo = (title: string, textToShow: number) => {
    setModalContent({ title, textToShow });
  };

  const handleClose = () => setModalContent(null);

  return (
    <div className="container py-5">
      {/* Row 1: Hero Card */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-10">
          <ImageCard
            imageUrl="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/historia-demo.png"
            title="Imagen Principal"
            onMoreInfo={() =>
              handleShowInfo("Nuestra Historia Como Empresa", 1)
            }
          />
        </div>
      </div>

      {/* Row 2: Two Medium Cards */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/mision-demo.png`}
            title={`Misión`}
            onMoreInfo={() => handleShowInfo("Misión", 2)}
          />
        </div>
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/vision-demo.png`}
            title={`Visión`}
            onMoreInfo={() => handleShowInfo("Visión", 3)}
          />
        </div>
      </div>

      {/* Row 3: Five Small Cards */}
      <div className="row justify-content-center">
        <h5 className="text-center py-3">Nuestros Valores Clave</h5>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/valor-calidad.png`}
            title={`Valor Calidad`}
            onMoreInfo={() => handleShowInfo("Calidad", 4)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/valor-compromiso.png`}
            title={`Valor Compromiso`}
            onMoreInfo={() => handleShowInfo("Compromiso", 5)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/valor-innovacion.png`}
            title={`Valor Innovacion`}
            onMoreInfo={() => handleShowInfo("Innovación", 6)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/valor-originalidad.png`}
            title={`Valor Originalidad`}
            onMoreInfo={() => handleShowInfo("Originalidad", 7)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/valor-excelencia.png`}
            title={`Valor Excelencia`}
            onMoreInfo={() => handleShowInfo("Excelencia", 8)}
          />
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={!!modalContent}
        onHide={handleClose}
        centered
        dialogClassName="custom-scroll-modal">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scrollable-modal-body">
            <InfoText variant={modalContent?.textToShow} />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
