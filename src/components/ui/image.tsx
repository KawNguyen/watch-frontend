import React, { useState } from "react";

interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  objectFit?: "cover" | "contain";
  fallbackSrc?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  className = "",
  objectFit = "cover",
  fallbackSrc = "/fallback.jpg", // bạn có thể thay đổi ảnh mặc định
}) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? fallbackSrc : src}
      alt={alt}
      onError={() => setError(true)}
      style={{
        objectFit,
      }}
      className={`${className}`}
    />
  );
};

export default Image;
