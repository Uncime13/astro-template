import "./card-image-zoom.css"

interface Props {
  bg_img: string;
  href: string
  alt: string
}

export default function CardImageZoom({
  bg_img,
  href,
  alt
}: Props) {
  return (
    <a href={href} className="text-decoration-none text-dark">
      <div className="card zoom-card shadow-sm" style={{ cursor: 'pointer' }}>
        <div className="zoom-image-wrapper">
          <img src={bg_img} alt={alt} />
        </div>
      </div>
    </a>
  );
}
