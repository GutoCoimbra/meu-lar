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
  <button
    className={`absolute top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full flex items-center justify-center ${className}`}
    style={{
      fontSize: "1.5rem",
      width: "36px",
      height: "36px",
      left: "8px", // Posiciona a seta esquerda mais para dentro
      zIndex: 50,
      cursor: "pointer",
      ...style,
    }}
    onClick={onClick}
    aria-label="Previous Slide"
  >
    &#10094;
  </button>
);

export const ArrowNext: React.FC<ArrowProps> = ({
  className = "",
  style = {},
  onClick,
}) => (
  <button
    className={`absolute top-1/2 transform -translate-y-1/2 bg-black/60 text-white rounded-full flex items-center justify-center ${className}`}
    style={{
      fontSize: "1.5rem",
      width: "36px",
      height: "36px",
      right: "8px", // Posiciona a seta direita mais para dentro
      zIndex: 50,
      cursor: "pointer",
      ...style,
    }}
    onClick={onClick}
    aria-label="Next Slide"
  >
    &#10095;
  </button>
);
