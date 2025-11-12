import React, { useEffect, useRef } from 'react';

export default function AutoplayVideo({ webmSrc, mp4Src, ...props }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
        .catch(error => {
          // Autoplay was prevented.
          console.warn("Autoplay prevented: ", error);
        });
    }
  }, []);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsinline
      controls
      width="100%"
      {...props}
    >
      {webmSrc && <source src={webmSrc} type="video/webm" />}
      Sorry, your browser doesn't support embedded videos.
    </video>
  );
}