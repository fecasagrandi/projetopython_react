import styled, { css } from 'styled-components';

export const BotaoEstilizado = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border: none;
  outline: none;
  
  ${props => props.variante === 'primario' && css`
    background-color: var(--accent-blue);
    color: var(--text-color);
    
    &:hover {
      background-color: #1a7ddd;
    }
    
    &:active {
      transform: translateY(1px);
    }
  `}
  
  ${props => props.variante === 'secundario' && css`
    background-color: transparent;
    border: 1px solid var(--accent-blue);
    color: var(--text-color);
    
    &:hover {
      background-color: rgba(30, 144, 255, 0.1);
    }
    
    &:active {
      transform: translateY(1px);
    }
  `}
  
  ${props => props.variante === 'texto' && css`
    background-color: transparent;
    color: var(--text-color);
    padding: 0.5rem 1rem;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  `}
  
  ${props => props.larguraTotal && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
