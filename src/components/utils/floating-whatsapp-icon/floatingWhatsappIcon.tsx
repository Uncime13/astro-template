import "./floating-whatsapp-icon.css"
import { useState } from 'react';

export default function FloatingWhatsAppIcon() {
  const [visible, setVisible] = useState(false);

  const toggleCard = () => setVisible((prev) => !prev);

  return (
    <div className="floating-icon-wrapper">
      <div className='FloatingIcon_icon-btn' onClick={toggleCard}>
        <i className="bi bi-whatsapp fs-1"></i>
        <div className={`hover-card shadow ${visible ? 'show' : ''}`}>
        <div className="card-body whatsapp-bubble">
          <h5 className="card-title">Contáctanos por WhatsApp</h5>
          <p className="card-text">Responderemos cualquier duda</p>
          <a href="#" className="btn btn-outline-success btn-sm">Mandar Mensaje</a>
        </div>
        </div>
      </div>
    </div>
  );
};
