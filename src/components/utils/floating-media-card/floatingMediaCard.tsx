import { useState, useEffect } from "react";
import "./floating-media-card.css";

interface Props {
  iconClass: string;
  children: React.ReactNode;
  onShowChange?: (visible: boolean) => void;
}

export default function FloatingMediaCard({ iconClass, children, onShowChange }: Props) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (onShowChange) onShowChange(visible);
    }, [visible, onShowChange]);
  return (
    <div className="FloatingMediaCard_floating-icon-wrapper d-flex flex-column justify-content-center">
      <div className="FloatingMediaCard_icon-btn text-center" onClick={() => setVisible((prev) => !prev)}>
      <p className="text-danger m-0">NO TOCAR</p>
        <i className={`${iconClass} fs-2`}></i>
        <div className={`FloatingMediaCard_hover-card shadow ${visible ? "show" : ""}`}>
            {children}
        </div>
      </div>
    </div>
  );
}
