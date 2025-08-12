import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./faq-page.css";

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
            Sí, contamos con 3, 6 y hasta 12 meses sin intereses, sin embargo,
            estos se activan solo para ciertas campañas o promociones; para más
            información, por favor, envíanos un mensaje directo.
          </p>
        </>
      );
      break;
    case 2:
      content = (
        <p>No, nuestra venta es únicamente por medio de nuestra web y app.</p>
      );
      break;
    case 3:
      content = (
        <p>
          Contamos con un programa de cliente frecuente, contactanos para mas
          detalles
        </p>
      );
      break;
    case 4:
      content = (
        <p>
          Comprar en Ecommerce Demo es muy sencillo, solo debes buscar tu
          perfume favorito, agregarlo al carrito y proceder con los datos de
          facturación y envío, si tienes alguna complicación durante el proceso,
          contactanos por whatsapp.
        </p>
      );
      break;
    case 5:
      content = (
        <p>
          En Ecommerce Demo utilizamos diferentes empresas de paquetería que
          trabajan a nivel nacional como DHL, Fedex, Estafeta, Paqueteexpress,
          Redpack, entre otras. Nuestro sistema asigna el transportista y genera
          la guía automáticamente al momento de hacer la compra, basándose en
          que paquetería ofrece el mejor tiempo de entrega para determinada
          ubicación, siempre buscando dar el mejor servicio para el cliente.
        </p>
      );
      break;
    case 6:
      content = (
        <>
          <h5>Estándar</h5>
          <p>
            Este será GRATIS a tu domicilio en cualquier parte de la república
            en pedidos mayores a $1,299.00 MXN. En caso de que tu pedido sea
            menor, el costo del envío es de $129.00MXN que se cobrarán al
            realizar tu pago. *El monto mínimo para obtener envío gratis
            $1,299.00 se toma en cuenta después de cualquier promoción o cupón
            de descuento que se utilice al realizar la compra.
          </p>
          <h5>Envío Express</h5>
          <p>
            El envío Express tiene un costo de $189.00 MXN. Este tiene un tiempo
            de entrega más rápido y no entra en la promoción de envíos gratis.
            *Si tu CP se encuentra en zona fronteriza o zona extendida el tiempo
            de entrega puede variar debido a que las paqueterías no cuentan con
            frecuencia de entrega diaria.
          </p>
        </>
      );
      break;
    case 7:
      content = (
        <>
          <h5>Estándar</h5>
          <p>
            Nuestra prioridad es entregar tu pedido lo antes posible.
            Regularmente el envío estándar los pedidos tardan de 3 a 7 días
            hábiles, dependiendo del lugar de la república a donde es
            enviado,(Nuestro sistema elige de forma inteligente la mejor
            paquetería dependiendo de tu Código Postal).
          </p>
          <h5>Envío Express</h5>
          <p>
            El tiempo de entrega de nuestros envíos express es de 2 a 4 días
            hábiles en cualquier parte de la república mexicana. Tan pronto tu
            pedido sea recolectado por la paquetería de nuestro almacén,
            recibirás una notificación vía WhatsApp, sms y/o un correo
            electrónico con tu número de guía para que puedas rastrear tu pedido
            en cada paso de tu proceso de entrega y estar pendiente de su
            llegada. Durante temporadas altas (San Valentín, Hot Sale, Buen Fin,
            Navidad, etc) Los pedidos con envío estándar pueden tardar hasta 15
            días en llegar; en estos casos, te recomendamos estar atento a
            nuestras redes sociales donde estaremos avisando los tiempos de
            entrega.
          </p>
        </>
      );
      break;
    case 8:
      content = (
        <p>
          Puedes incluir detalles especiales para tu entrega, como horario para
          entrega de paquete, entrega en centro de distribución (si la
          paquetería ofrece la opción), nuestro equipo siempre tratara de
          acordar la entrega a tu gusto.
        </p>
      );
      break;
    case 9:
      content = (
        <>
          <p>
            En Ecommerce Demo nuestro compromiso es que todos los clientes
            tengan la mejor experiencia de compra! Si tuviste algún problema con
            tu pedido, el proceso de devolución es realmente simple y sin costo
            que a continuación te explicaremos:
          </p>
          <p>
            Ser Devuelto en un plazo de 5 días a partir de que recibas el
            paquete. Se debe encontrar en la misma condición en el que lo
            recibiste. No estar usado y contar sus etiquetas y nota de compra.
            La devolucion deberá ser aprobada por nuestro equipo de Customer
            service basado en las evidencias presentadas.
          </p>
          <p>
            En caso de recibir tu producto con algún daño es necesario
            reportarlo en un plazo no mayor a 48hrs, en caso contrario no
            podremos aplicar la garantía o seguro. Si tu paquete figura como
            entregado pero no lo has recibido es necesario reportarlo con
            nuestro equipo en un plazo no mayor a 48hrs
          </p>
          <p>
            Para iniciar el proceso de devolución en línea, por favor
            contáctanos vía WhatsApp para abrir un ticket de soporte y generar
            una guía de devolución.
          </p>
          <p>
            *Una vez que hayas completado el anterior proceso te haremos llegar
            la guía en un lapso de 1-3 días hábiles. Si el producto cumple con
            todos los requisitos que te mencionamos anteriormente, se aprobara
            por nuestro departamento de customer service tu devolución y te
            enviaremos la guía vía correo electrónico.
          </p>
          <p>
            *En caso de recibir tu compra incompleta se te solicitará evidencia
            fotográfica, es indispensable compartirla COMPLETA y en un plazo no
            mayor a 48hrs, en caso contrario no podremos aplicar la garantía o
            seguro.
          </p>
        </>
      );
      break;
    case 10:
      content = (
        <>
          <p>
            A continuación te detallamos los motivos cuando una compra NO aplica
            para ser reembolsada o para realizar un cambio de producto:
          </p>
          <p>
            Si el empaque del producto llega dañado (caja golpeada y/o rota, el
            celofán que envuelve al producto viene desprendido o roto entre
            otros) pero el producto en si viene en perfectas condiciones (sin
            daños visibles, con derrames o fugas, el atomizador en buen estado y
            funcionando). Esto debido a que aunque el envío va asegurado las
            paqueterías no se hacen responsables por el manejo del paquete
            durante su trayecto por lo que si el producto no tiene ningún daño
            el seguro no aplica.
          </p>
          <p>
            * Entiéndase "Empaque" por la caja original de fabrica con la que
            viene el perfume.
          </p>
          <p>
            Si al momento de realizar tu pedido los datos del domicilio los
            ingresaste de manera incorrecta y tu producto fue entregado en otra
            dirección.
          </p>
          <p>
            Si al realizar tu pedido seleccionaste un producto o versión
            diferente al que buscabas.
          </p>
          <p>
            Si existiera alguna anomalía con la entrega y no es reportado dentro
            de las primeras 48hrs el seguro del envío no se podrá hacer válido.
          </p>
          <p>
            Si tienes alguna duda sobre estas condiciones, por favor contáctanos
            vía WhatsApp y con gusto te asesoraremos.
          </p>
          <p>
            *En caso de recibir tu compra incompleta se te solicitará evidencia
            fotográfica, es indispensable compartirla COMPLETA y en un plazo no
            mayor a 48hrs, en caso contrario no podremos aplicar la garantía o
            seguro.
          </p>
        </>
      );
      break;
    case 11:
      content = (
        <>
          <p>
            Una vez que recibas la guía para realizar la devolución, debes
            seguir los siguientes pasos:
          </p>
          <p>
            Empacar el producto que vas a devolver en una caja completamente
            sellada y bien protegida.
          </p>
          <p>Pegar la guía impresa que te mandamos en la caja.</p>
          <p>
            Entregar tu paquete a la sucursal que mas te convenga de la
            mensajería de la guía o solicitar la recolección a tu domicilio por
            teléfono a la paquetería.
          </p>
          <p>
            Tan pronto recibamos tu devolución y nuestro equipo de calidad
            corrobore que cumpla con las condiciones que mencionamos
            anteriormente, te daremos un CUPON DE DESCUENTO por el monto
            acordado aplicable para tu siguiente compra. Este cupón no tiene
            vencimiento. El cupón NO es acumulable y NO aplica con otras
            promociones.
          </p>
          <p>
            En cuanto recibas la guía para devolución en tu correo electrónico,
            tendrás 3 días para entregar el paquete en la sucursal de la
            mensajería correspondiente o pedir la recolección. De lo contrario,
            la guía caducara automáticamente y deberás pagar el costo de la
            próxima guía si deseas continuar el proceso de devolución.
          </p>
        </>
      );
      break;
    case 12:
      content = (
        <>
          <p>
            Una vez cumpliendo todas las condiciones y pasos que te mencionamos
            anteriormente, Te reembolsaremos a tu cuenta a por medio de un CUPON
            DE DESCUENTO el total del valor del producto menos los gastos del
            primer envío. Nosotros cubriremos los gastos de envío de la
            devolución.
          </p>
          <p>
            Si el producto que recibiste viene defectuoso o dañado, también te
            reembolsaremos los gastos del primer envío. El único requisito es
            que dichos defectos sean detectados y aprobados por nuestro equipo
            de customer service al momento de llegar a nuestras instalaciones.
          </p>
          <p>
            Cuando recibamos tu paquete de devolución, éste pasa por un proceso
            administrativo/calidad que tarda 2-5 días hábiles, después de ese
            lapso de tiempo automáticamente te enviaremos el cupón de descuento
            y hacer uso de el en nuestro sitio web. Recuerda que, al usar tu
            CUPON DE DESCUENTO en tu siguiente compra, se cobrará el costo del
            envío si el total de tu pedido es menor a $1,299.00. Si el total es
            mayor a $1,299.00, el envío será GRATIS.
          </p>
        </>
      );
      break;
    case 13:
      content = (
        <p>
          Paga de forma muy simple y segura con tarjetas de Crédito y Débito
          Visa, Mastercard y American Express directamente desde la pagina, no
          es necesario crear una cuenta y la acreditación es inmediata.
        </p>
      );
      break;
    case 14:
      content = (
        <p>
          Paga de forma muy simple y segura con tarjetas de Crédito y Debito
          Visa, Mastercard y American Express con opción hasta 12 meses o con el
          saldo en tu cuenta Mercadopago. Es necesario terner o crear una cuenta
          Mercadopago para utilizar este método de pago.
        </p>
      );
      break;
    case 15:
      content = (
        <p>
          Paga de forma muy simple y segura con tarjetas de Crédito y Debito
          Visa, Mastercard y American Express con opción hasta 12 meses o con el
          saldo en tu cuenta Paypal. Es necesario terner o crear una cuenta
          Paypal para utilizar este método de pago.
        </p>
      );
      break;
    case 16:
      content = (
        <p>
          Compra sin Tarjeta de Credito a plazos: Puedes hacer tus compras y
          pagar hasta en 12 quincenas desde tu celular. ¡Lo mejor es que no
          necesitas una tarjeta!. Haz todas tus compras hoy, pruébalas,
          disfrútalas y comienza a pagarlas después. Nosotros nos encargamos de
          todo el proceso en el comercio que elegiste mientras tú disfrutas de
          las ventajas de pagar a quincenas con Kueski Pay. ¡Tan sencillo como
          eso!
        </p>
      );
      break;
    case 17:
      content = (
        <p>
          Aplazo es una plataforma de financiamiento para compras en línea que
          te permite dividir el pago de tus compras en 5 plazos quincenales.
          Ademas la aprobación de tu crédito es inmediata antes de realizar la
          compra y lo mejor de todo es que no necesitas una tarjeta de crédito.
          Puedes recibir tu compra inmediatamente sin tener que pagar todo de
          una vez. Los pagos se pueden realizar de manera automática con cargo a
          tu tarjeta de débito o crédito, también es posible realizar depósito
          en Oxxo o transferencia vía SPEI, lo que sea más cómodo para ti.
        </p>
      );
      break;
    case 18:
      content = (
        <p>
          Paga en efectivo directamente en el banco o con transferencia
          bancaria. Los datos bancarios te los haremos llegar al realizar tu
          pedido, una vez que realices el pago este inmediatamente se acreditara
          y empezaremos a procesar tu pedido. No es necesario enviar ningún tipo
          de comprobante ya que el pago es referenciado y el proceso es
          completamente automático.
        </p>
      );
      break;
    default:
      content = <p>Información no disponible.</p>;
  }

  return <div>{content}</div>;
};

export default function FAQPage() {
  const [modalContent, setModalContent] = useState<{
    title: string;
    textToShow: number;
  } | null>(null);

  const handleShowInfo = (title: string, textToShow: number) => {
    setModalContent({ title, textToShow });
  };

  const handleClose = () => setModalContent(null);

  return (
    <div className="container">
      {/* Row 1: Hero Card */}
      <h1 className="text-center mb-4">Preguntas Frecuentes</h1>
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-10">
          <ImageCard
            imageUrl="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/MSI.png"
            title="Meses sin intereses"
            onMoreInfo={() => handleShowInfo("Meses sin intereses", 1)}
          />
        </div>
      </div>
      {/* Row 2: Two Medium Cards */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/pregunta-tienda-fisica.png`}
            title={`Tienda Física`}
            onMoreInfo={() =>
              handleShowInfo("¿Cuentan con venta en mayoreo?", 2)
            }
          />
        </div>
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/pregunta-venta-mayoreo.png`}
            title={`Visión`}
            onMoreInfo={() => handleShowInfo("Visión", 3)}
          />
        </div>
      </div>

      {/* Row 3: 1 medium height card */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-10">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/pregunta-como-comprar.png`}
            title={`¿Cómo puedo comprar en su tienda?`}
            onMoreInfo={() =>
              handleShowInfo("¿Cómo puedo comprar en su tienda?", 4)
            }
          />
        </div>
      </div>

      {/* Row 4: Four Small Cards */}
      <div className="row justify-content-center" id="formas-de-envio">
        <h1 className="text-center py-3">
          FORMAS DE ENVÍO Y TIEMPOS DE ENTREGA
        </h1>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-envio.png`}
            title={`Métodos de envío`}
            onMoreInfo={() => handleShowInfo("Métodos de envío", 5)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-costo.png`}
            title={`Costos de envío`}
            onMoreInfo={() => handleShowInfo("Costos de envío", 6)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-tiempo.png`}
            title={`Tiempo de entrega`}
            onMoreInfo={() => handleShowInfo("Tiempo de entrega", 7)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-2 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-detalles.png`}
            title={`Detalles de Entrega`}
            onMoreInfo={() => handleShowInfo("Detalles de Entrega", 8)}
          />
        </div>
        <h5 className="text-center">
          Es importante estar al pendiente de la guía que te compartimos para el
          seguimiento por si existe alguna anomalía lo puedas reportar con
          nuestro equipo lo antes posible* en caso de que exista alguna
          incidencia con la entrega por "dirección incorrecta o falta de
          referencias" y esto no es reportado; paquetería retornará a origen de
          manera automática tu paquete. Una vez generada la guía ya no es
          posible hacer ningún tipo de cambio.
        </h5>
      </div>

      {/* Row 5: three medium Cards */}
      <div className="row justify-content-center" id="devoluciones">
        <h1 className="text-center py-3">Devoluciones</h1>
        <div className="col-6 col-md-4 col-lg-3 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-devoluciones.png`}
            title={`Devoluciones`}
            onMoreInfo={() => handleShowInfo("Devoluciones", 9)}
          />
        </div>
        <div className="col-6 col-md-4 col-lg-3 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-excepciones.png`}
            title={`Excepciones`}
            onMoreInfo={() =>
              handleShowInfo(
                "Casos en que no aplica el rembolso o devolución",
                10
              )
            }
          />
        </div>
        <div className="col-6 col-md-4 col-lg-3 mb-3">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-procedimiento.png`}
            title={`Procedimiento para enviar una devolución`}
            onMoreInfo={() =>
              handleShowInfo("Procedimiento para enviar una devolución", 11)
            }
          />
        </div>
      </div>

      {/* Row 6: 1 medium height card */}
      <div className="row mb-4 justify-content-center">
        <h1 className="text-center py-3">Reembolsos</h1>
        <div className="col-12 col-md-10">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/pregunta-como-reembolsos.png`}
            title={`¿Cómo funcionan los reembolsos?`}
            onMoreInfo={() =>
              handleShowInfo("¿Cómo funcionan los reembolsos?", 12)
            }
          />
        </div>
        <h5 className="text-center mx-2">
          Nuestras políticas de rembolso, devolución y envío pueden cambiar sin
          previo aviso; mantente atento a nuestras redes sociales, mail y sitio
          web para más información.
        </h5>
      </div>

      {/* Row 7: 1 medium height card */}
      <div className="row mb-4 justify-content-center" id="formas-de-pago">
        <h1 className="text-center py-3">Métodos de pago</h1>
        <div className="col-12 col-md-10">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-pago-con-tarjetas.png`}
            title={`Tarjeta de Crédito o Débito`}
            onMoreInfo={() => handleShowInfo("Tarjeta de Crédito o Débito", 13)}
          />
        </div>
      </div>

      {/* Row 8: 2 medium height card */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-mercado-pago.png`}
            title={`Mercado Pago`}
            onMoreInfo={() => handleShowInfo("Mercado Pago", 14)}
          />
        </div>
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-paypal.png`}
            title={`Paypal`}
            onMoreInfo={() => handleShowInfo("Paypal", 15)}
          />
        </div>
      </div>

      {/* Row 8: 2 medium height card */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-kueski.png`}
            title={`Kueski Pay`}
            onMoreInfo={() => handleShowInfo("Kueski Pay", 16)}
          />
        </div>
        <div className="col-md-5 mb-3 mb-md-0">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-aplazo.png`}
            title={`Aplazo`}
            onMoreInfo={() => handleShowInfo("Aplazo", 17)}
          />
        </div>
      </div>

      {/* Row 9: 1 medium height card */}
      <div className="row mb-4 justify-content-center">
        <div className="col-12 col-md-10">
          <ImageCard
            imageUrl={`https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/faq-deposito-transferencia.png`}
            title={`Deposito o Transferencia Bancaria`}
            onMoreInfo={() =>
              handleShowInfo("Deposito o Transferencia Bancaria", 18)
            }
          />
        </div>
        <h1 className="text-center">Pagos 100% Seguros Garantizado</h1>
        <p className="text-center">
          Ecommerce Demo utiliza los más sofisticados sistemas de seguridad y
          prevención de fraudes con certificado SSL (Secure Socket Layer), que
          es el más completo algoritmo de encriptación de datos de hasta 256
          bits que usa el estándar del e-commerce a nivel global. Este es el
          mismo nivel de encriptación que usan las grandes empresas y bancos
          para garantizar que tu información esta segura. Esto quiere decir que
          los datos ingresados se transmitirán encriptados de punta a punta para
          que nadie pueda acceder a ellos. Comprar en Ecommerce Demo es super
          fácil, rápido y seguro. Puedes realizar tus compras las 24 horas del
          día, los 7 días de la semana, durante todo el año en nuestra tienda en
          línea.
        </p>
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
