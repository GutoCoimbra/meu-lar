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
    style={{ fontSize: "2rem", ...style }} // Aumenta o tamanho da fonte
    onClick={(event) => {
      event.stopPropagation(); // Previne a propagação do clique
      onClick && onClick(); // Verifica se onClick existe antes de chamar
    }}
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
    style={{ fontSize: "2rem", ...style }} // Aumenta o tamanho da fonte
    onClick={(event) => {
      event.stopPropagation(); // Previne a propagação do clique
      onClick && onClick(); // Verifica se onClick existe antes de chamar
    }}
  >
    &#10095; {/* Ou qualquer ícone que você queira usar */}
  </div>
);
