import React from "react";

interface VisitButtonProps {
  onClick?: () => void; // Função a ser executada ao clicar no botão
  label?: string; // Texto do botão, por padrão será "Agendar Visita"
  className?: string; // Classe personalizada para estilização
}

const VisitButton: React.FC<VisitButtonProps> = ({
  onClick,
  label = "Agendar Visita",
  className = "",
}) => {
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default VisitButton;
