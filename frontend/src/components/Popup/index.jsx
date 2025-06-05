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
    if (duration > 0 && !hasCallback) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          setTimeout(onClose, 300); 
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose, hasCallback]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      setTimeout(onClose, 300); 
    }
  };
  
  const handleConfirm = () => {
    setIsVisible(false);
    if (onConfirm) {
      setTimeout(onConfirm, 300); 
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
