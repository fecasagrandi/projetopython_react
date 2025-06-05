import React, { useState, useEffect } from 'react';
import { 
  PopupContainer, 
  PopupContent, 
  PopupTitle, 
  PopupMessage, 
  CloseButton,
  ButtonsContainer,
  ActionButton,
  SuccessIcon
} from './styles';

const Popup = ({ 
  id,
  title, 
  message, 
  isSuccess = true, 
  duration = 3000, 
  hasCallback = false,
  onClose, 
  onConfirm 
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Se tiver duração e não for um popup de confirmação (com callback)
    if (duration > 0 && !hasCallback) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); // Aguarda a animação de saída terminar
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, hasCallback]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); // Aguarda a animação de saída terminar
    }
  };
  
  const handleConfirm = () => {
    setIsVisible(false);
    if (onConfirm) {
      setTimeout(onConfirm, 300); // Aguarda a animação de saída terminar
    }
  };

  return (
    <PopupContainer isVisible={isVisible} isSuccess={isSuccess}>
      <PopupContent>
        {isSuccess && !hasCallback && <SuccessIcon />}
        <PopupTitle>{title}</PopupTitle>
        <PopupMessage>{message}</PopupMessage>
        
        {hasCallback ? (
          <ButtonsContainer>
            <ActionButton onClick={handleConfirm} primary>
              Confirmar
            </ActionButton>
            <ActionButton onClick={handleClose}>
              Cancelar
            </ActionButton>
          </ButtonsContainer>
        ) : (
          <CloseButton onClick={handleClose}>×</CloseButton>
        )}
      </PopupContent>
    </PopupContainer>
  );
};

export default Popup;
