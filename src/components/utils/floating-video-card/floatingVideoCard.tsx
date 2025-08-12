import { useRef, useCallback } from 'react';
import FloatingMediaCard from '../floating-media-card/floatingMediaCard';
import './floating-video-card.css';

export default function FloatingVideoCard() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleShowChange = useCallback((isVisible: boolean) => {
    const video = videoRef.current;
    if (!video) return;

    if (isVisible) {
      video.playbackRate = 1.0;
      video.currentTime = 0;
      video.play().catch((err) => console.warn('Autoplay blocked:', err));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, []);

  const handleVideoEnd = () => {
    const clickEvent = new Event('click', { bubbles: true });
    document.querySelector('.FloatingMediaCard_icon-btn')?.dispatchEvent(clickEvent);
  };

  return (
    <FloatingMediaCard iconClass="bi bi-ban" onShowChange={handleShowChange}>
      <div className="video-wrapper">
        <video
          ref={videoRef}
          onEnded={handleVideoEnd}
        >
          <source
            src="https://xzjovoflnmqonwjjstch.supabase.co/storage/v1/object/public/ecommerce-demo-bucket/utils/spinning-cat-meme.mp4"
            type="video/mp4"
          />
          Tu navegador no soporta la reproducción de video.
        </video>
      </div>
    </FloatingMediaCard>
  );
}
