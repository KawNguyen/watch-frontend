import React, { useState } from "react";

interface HoverZoomProps {
  src: string;
  alt?: string;
  scale?: number;
  clickZoom?: boolean;
}

const HoverZoom: React.FC<HoverZoomProps> = ({
  src,
  alt = "",
  scale = 2.5,
  clickZoom = false,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed && !isClicked) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  const handleClick = () => {
    if (clickZoom) {
      setIsClicked(!isClicked);
    }
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden cursor-zoom-in"
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => setIsZoomed(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform"
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          transform: isClicked || isZoomed ? `scale(${scale})` : "scale(1)",
          transition:
            isClicked || isZoomed ? "none" : "transform 0.2s ease-out",
        }}
      />
    </div>
  );
};

export default HoverZoom;
