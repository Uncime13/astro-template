const PrivacyNotice: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-4">AVISO DE PRIVACIDAD</h1>

          <p>
            <strong>Nombre Completo</strong>, comercialmente conocido como <strong>Ecommerce Demo</strong>, 
            con domicilio en Algun Lugar de Mexico #123, 44444, es el responsable del uso y protección de sus datos personales.
          </p>

          <h2 className="h5 mt-4">FINALIDADES PRIMARIAS</h2>
          <p>Los datos personales que recabamos de usted, los utilizaremos para las siguientes finalidades que son necesarias para el servicio que solicita:</p>
          <ul>
            <li>Respuesta a mensajes del formulario de contacto</li>
            <li>Prestación de cualquier servicio solicitado</li>
            <li>Envío de productos adquiridos en esta tienda en línea</li>
          </ul>

          <h2 className="h5 mt-4">DATOS PERSONALES RECABADOS</h2>
          <p>Para las finalidades señaladas en el presente aviso de privacidad, podemos recabar sus datos de identificación y contacto.</p>

          <h2 className="h5 mt-4">DERECHOS ARCO</h2>
          <p>
            Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (<strong>Acceso</strong>). 
            Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (<strong>Rectificación</strong>); 
            que la eliminemos de nuestros registros o bases de datos cuando considere que la misma no está siendo utilizada adecuadamente (<strong>Cancelación</strong>); 
            así como oponerse al uso de sus datos personales para fines específicos (<strong>Oposición</strong>). 
            Estos derechos se conocen como derechos ARCO.
          </p>
          <p>
            Para el ejercicio de cualquiera de los derechos ARCO, usted deberá presentar la solicitud respectiva a través de 
            el mismo correo electrónico por el que se hizo la solicitud. La respuesta a su solicitud será atendida en un plazo máximo de 10 días hábiles.
          </p>

          <h2 className="h5 mt-4">DATOS RECABADOS POR EL SITIO WEB</h2>
          <p>Nuestro sitio web recaba automáticamente los siguientes datos:</p>
          <ul>
            <li>Identificadores, nombre de usuario y contraseñas de sesión</li>
            <li>Fecha y hora del inicio y final de una sesión de un usuario</li>
          </ul>

          <h2 className="h5 mt-4">CONTACTO</h2>
          <p>Para más información sobre este aviso de privacidad, puede contactarnos en:</p>
          <ul>
            <li><strong>Correo electrónico:</strong> contacto@ecommercedemo.com</li>
            <li><strong>Sitio web:</strong> ecommercedemo.com</li>
          </ul>

          <p className="text-muted mt-4">Última actualización: 4/28/2025</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;
