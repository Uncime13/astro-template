import './marquee-text.css'

const MarqueeText = () => {
  return (
    <div className="marquee-container d-flex align-items-center overflow-hidden">
      <div className="marquee">
          <span className="set-margin-between-phrases"><b>25% DE DESCUENTO</b> EN SETS</span>
          <span className="set-margin-between-phrases">3 Y 6 <b>MESES SIN INTERESES</b></span>
          <span className="set-margin-between-phrases">ACEPTAMOS TODAS LAS TARJETAS</span>
          <span className="set-margin-between-phrases">ENVIOS A TODA LA REPUBLICA</span>
          <span className="set-margin-between-phrases">CONTAMOS CON ATENCION POR WHATSAPP</span>
      </div>
    </div>
  );
};

export default MarqueeText;
