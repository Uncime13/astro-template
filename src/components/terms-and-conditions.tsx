const TermsAndConditions: React.FC = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-4">Términos y Condiciones de Ecommerce Demo</h1>

          <h2 className="h5 mt-4">1. INFORMACIÓN GENERAL</h2>
          <p>
            Este sitio web es operado por <strong>Ecommerce Demo</strong>. En todo el sitio, los términos "nosotros", "nos" y "nuestro" se refieren a Ecommerce Demo.
          </p>
          <ul>
            <li><strong>Sitio web:</strong> ecommercedemo.com</li>
            <li><strong>Email de contacto:</strong> contacto@ecommercedemo.com</li>
            <li><strong>Dirección:</strong> Algun Lugar de Mexico #123, 44444</li>
          </ul>

          <h2 className="h5 mt-4">2. PRODUCTOS Y SERVICIOS</h2>
          <p>
            Nos esforzamos por mostrar con la mayor precisión los colores y las imágenes de nuestros productos que aparecen en la tienda. 
            No podemos garantizar que la visualización de cualquier color en su monitor sea exacta.
          </p>

          <h2 className="h5 mt-4">3. PRECIOS Y PAGOS</h2>
          <p>
            Todos los precios están sujetos a cambios sin previo aviso. Los precios mostrados incluyen IVA cuando corresponda.
          </p>

          <h2 className="h5 mt-4">4. ENVÍOS</h2>
          <p>
            El tiempo estimado de envío es de 3-5 días hábiles. Los tiempos de entrega son estimados y no podemos garantizar entregas en fechas específicas.
          </p>

          <h2 className="h5 mt-4">5. POLÍTICA DE DEVOLUCIONES</h2>
          <p>Aceptamos devoluciones dentro de los 14 días posteriores a la recepción del producto.</p>

          <h3 className="h6 mt-3">5.1 PROCEDIMIENTO DE DEVOLUCIÓN</h3>
          <ol>
            <li>
              <strong>Devolución del dinero</strong> (solo aplica para casos de garantía y ley de retracto):
              <ul>
                <li>Cupón para realizar una nueva compra (Este cupón tiene validez por seis meses a partir de la fecha de creación).</li>
              </ul>
            </li>
            <li>
              <strong>Cambio del producto</strong> (Sujeto a disponibilidad de inventario en el momento del cambio).
              <p>
                Sólo se podrán realizar cambios por productos con valor igual o inferior al original y la diferencia, en caso de aplicar, 
                se entregará en un cupón para una nueva compra en la tienda online. 
                En caso de no contar con disponibilidad para el cambio, se entregará el valor del producto(s) en un cupón para una nueva compra.
              </p>
            </li>
            <li>
              <strong>Cupón para realizar una nueva compra</strong> (Este cupón tiene validez por seis meses a partir de la fecha de creación).
            </li>
          </ol>

          <h3 className="h6 mt-3">5.2 CONDICIONES DEL PRODUCTO PARA DEVOLUCIÓN</h3>
          <p>
            El producto deberá devolverse en óptimas condiciones, sin rastros de haber sido utilizado, con las etiquetas originales o en su defecto, 
            si ya fueron retiradas, debes introducirlas en el empaque. 
            Una vez recibido el producto en nuestra bodega, verificaremos las condiciones del mismo y, de acuerdo con los resultados, 
            se te enviará un producto nuevo o se te entregará un cupón para una nueva compra.
          </p>

          <h2 className="h5 mt-4">6. PRIVACIDAD Y PROTECCIÓN DE DATOS</h2>
          <p>
            Nos comprometemos a proteger su privacidad. 
            La información personal que nos proporcione se utilizará únicamente para procesar su pedido y mejorar su experiencia de compra.
          </p>

          <h2 className="h5 mt-4">7. MODIFICACIONES DE LOS TÉRMINOS</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. 
            Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
          </p>

          <p className="text-muted mt-4">Última actualización: 4/28/2025</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
