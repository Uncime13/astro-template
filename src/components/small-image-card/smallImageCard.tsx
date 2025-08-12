import './small-image-card.css'

interface Props {
  image: string;
  alt: string;
  href: string;
}

export default function SmallImageCard({ image, alt, href }: Props) {
  return (
    <a href={href} className="text-decoration-none text-dark text-center">
      <div className="" >
        <img src={image} alt={alt} className="img-fluid smallImageCard-product-image" />
      </div>
    </a>
  );
}
