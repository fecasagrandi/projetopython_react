import styled, { css } from 'styled-components';

export const RecompensaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  ${props => props.conquistada && css`
    background-color: rgba(50, 205, 50, 0.05);
  `}
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const RecompensaInfo = styled.div`
  flex: 1;
`;

export const RecompensaTitulo = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
  
  ${props => props.conquistada && css`
    text-decoration: line-through;
    color: var(--text-muted);
  `}
`;

export const RecompensaDescricao = styled.p`
  margin: 0 0 0.75rem;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

export const RecompensaPontos = styled.div`
  display: inline-block;
  background-color: rgba(255, 165, 0, 0.2);
  color: var(--task-orange);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  margin-bottom: 0.5rem;
`;

export const RecompensaStatus = styled.div`
  display: inline-block;
  background-color: rgba(50, 205, 50, 0.2);
  color: var(--task-green);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  margin-left: 0.5rem;
`;

export const RecompensaAcoes = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  @media (max-width: 767px) {
    justify-content: flex-end;
  }
`;
