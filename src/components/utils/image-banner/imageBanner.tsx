import './image-banner.css'

interface Props {
  image: string;
  alt: string;
}

export default function ImageBanner({ image, alt }: Props) {
  return (
    <div className="" >
      <img src={image} alt={alt} className="img-fluid imageBanner-product-image" />
    </div>
  );
}
