import styled, { css } from 'styled-components';

export const MensagemContainer = styled.div`
  padding: 0.75rem 1rem;
  border-radius: var(--border-radius);
  margin: 1rem 0;
  text-align: center;
  
  ${props => props.tipo === 'erro' && css`
    background-color: rgba(255, 99, 71, 0.2);
    border-left: 4px solid var(--task-red);
    color: var(--task-red);
  `}
  
  ${props => props.tipo === 'sucesso' && css`
    background-color: rgba(50, 205, 50, 0.2);
    border-left: 4px solid var(--task-green);
    color: var(--task-green);
  `}
  
  ${props => props.tipo === 'aviso' && css`
    background-color: rgba(255, 165, 0, 0.2);
    border-left: 4px solid var(--task-orange);
    color: var(--task-orange);
  `}
  
  ${props => props.tipo === 'info' && css`
    background-color: rgba(30, 144, 255, 0.2);
    border-left: 4px solid var(--accent-blue);
    color: var(--accent-blue);
  `}
`;
