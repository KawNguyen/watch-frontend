import React, { useState } from "react";

interface HoverZoomProps {
  src: string;
  alt?: string;
  scale?: number;
}

const HoverZoom: React.FC<HoverZoomProps> = ({ src, alt = "", scale = 2 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setMousePosition({ x, y });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-200"
        style={{
          transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
          transform: isHovered ? `scale(${scale})` : "scale(1)",
        }}
      />
    </div>
  );
};

export default HoverZoom;
