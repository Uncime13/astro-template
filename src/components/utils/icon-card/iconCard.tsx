import type { IconType } from 'react-icons';
import './icon-card.css';

interface Props {
  icon: IconType;
  title: string;
  description: string;
  href: string;
}

export default function IconCard({ icon: Icon, title, description, href }: Props) {
  return (
    <a href={href} className="text-decoration-none text-dark w-100">
      <div className="d-flex align-items-center gap-2 icon-card">
        <div className="fs-1 text-white flex-shrink-0">
          <Icon />
        </div>
        <div className="text-white">
          <p className="mb-0 pb-2 fw-semibold icon-title">{title}</p>
          <p className="mb-0 icon-description">{description}</p>
        </div>
      </div>
    </a>
  );
}
