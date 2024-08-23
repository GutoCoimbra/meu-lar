// components/Arrow.tsx
import React from "react";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const ArrowPrev: React.FC<ArrowProps> = ({
  className = "",
  style = {},
  onClick,
}) => (
  <div
    className={`absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer ${className}`}
    style={style}
    onClick={onClick}
  >
    &#10094; {/* Ou qualquer ícone que você queira usar */}
  </div>
);

export const ArrowNext: React.FC<ArrowProps> = ({
  className = "",
  style = {},
  onClick,
}) => (
  <div
    className={`absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer ${className}`}
    style={style}
    onClick={onClick}
  >
    &#10095; {/* Ou qualquer ícone que você queira usar */}
  </div>
);
