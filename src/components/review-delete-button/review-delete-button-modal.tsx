import { useEffect } from "react";
import ReviewDeleteButton from "./review-delete-button";
import "./review-delete-button.css"

type Props = {
  reviewId: number
  onClose: () => void;
};

export default function ReviewDeleteButtonModal({ reviewId, onClose }: Props) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <ReviewDeleteButton reviewId={reviewId} />
      </div>
    </div>
  );
}
