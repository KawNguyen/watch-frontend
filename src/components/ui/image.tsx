import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
import { AspectRatio } from "./aspect-ratio";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  ratio?: number;
}

const Image = ({
  src,
  alt,
  className,
  fallback = "https://via.placeholder.com/400",
  ratio,
  ...props
}: ImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const ImageContent = (
    <>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <img
        src={error ? fallback : src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </>
  );

  return ratio ? (
    <AspectRatio ratio={ratio} className="relative overflow-hidden">
      {ImageContent}
    </AspectRatio>
  ) : (
    <div className="relative overflow-hidden">
      {ImageContent}
    </div>
  );
};

export { Image };