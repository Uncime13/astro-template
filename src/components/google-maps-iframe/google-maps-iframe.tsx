export default function GoogleMapsIframe() {
  return (
      <div className="row p-3">
        <div className="col-12">
          <h5 className="mb-3">Nuestra Ubicación</h5>
          <div className="ratio ratio-16x9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.8167264701133!2d-103.34955892516157!3d20.677033980885675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428b1faa928f63f%3A0x25dcb2cdab10691a!2sCatedral%20de%20Guadalajara%20(Catedral%20Bas%C3%ADlica%20de%20la%20Asunci%C3%B3n%20de%20Mar%C3%ADa%20Sant%C3%ADsima)!5e0!3m2!1ses-419!2smx!4v1745680705177!5m2!1ses-419!2smx"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación"></iframe>
          </div>
        </div>
      </div>
  );
}
