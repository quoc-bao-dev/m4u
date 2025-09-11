import React from "react";
import Image from "next/image";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  size = "md", 
  text = "Đang tải...", 
  className = "" 
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };
  const sizePx = { sm: 24, md: 32, lg: 48 } as const;

  return (
    <div className={`bg-white flex flex-col items-center justify-center gap-3 ${className}`}>
      {/* Spinner GIF */}
        <Image
          src="/image/loading.gif"
          alt="Đang tải"
          width={sizePx[size]}
          height={sizePx[size]}
          className="object-cover size-full"
          unoptimized
        />
    </div>
  );
};
