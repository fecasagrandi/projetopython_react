import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const circleFill = keyframes`
  0% {
    stroke-dashoffset: 180;
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
`;

const checkDraw = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

export const PopupContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  animation: ${props => props.isVisible ? fadeIn : fadeOut} 0.3s ease-in-out forwards;
  max-width: 350px;
  width: 100%;
`;

export const PopupContent = styled.div`
  background-color: #1e2a3a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 4px solid ${props => props.isSuccess ? '#4caf50' : '#f44336'};
`;

export const PopupTitle = styled.h3`
  margin: 0 0 10px;
  color: ${props => props.isSuccess ? '#4caf50' : '#f44336'};
  font-size: 18px;
  font-weight: 600;
`;

export const PopupMessage = styled.p`
  margin: 0;
  color: #ffffff;
  font-size: 14px;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #ffffff;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #2c3e50;
  
  ${props => props.primary ? css`
    background-color: #4caf50;
    color: white;
    border-color: #4caf50;
    &:hover {
      background-color: #3d8b40;
    }
  ` : css`
    background-color: #2c3e50;
    color: #ffffff;
    &:hover {
      background-color: #1a2530;
    }
  `}
`;

// Componente de ícone de sucesso com animações CSS
export const SuccessIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 15px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    width: 56px;
    height: 56px;
    top: 2px;
    left: 2px;
    border-radius: 50%;
    border: 3px solid #4caf50;
    animation: ${circleFill} 0.6s ease-in-out forwards;
  }

  &:after {
    content: '';
    position: absolute;
    top: 30px;
    left: 18px;
    width: 25px;
    height: 13px;
    border-bottom: 4px solid #4caf50;
    border-left: 4px solid #4caf50;
    transform: rotate(-45deg);
    opacity: 0;
    animation: ${checkDraw} 0.4s 0.4s ease-in-out forwards;
  }
`;

