import styled from 'styled-components';

export const HabitoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const HabitoInfo = styled.div`
  flex: 1;
`;

export const HabitoTitulo = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
`;

export const HabitoDescricao = styled.p`
  margin: 0 0 0.75rem;
  color: var(--text-muted);
  font-size: 0.9rem;
`;

export const HabitoFrequencia = styled.div`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
`;

export const HabitoPontos = styled.div`
  display: inline-block;
  background-color: rgba(30, 144, 255, 0.2);
  color: var(--accent-blue);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  margin-bottom: 0.75rem;
`;



export const HabitoAcoes = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  
  @media (max-width: 767px) {
    justify-content: flex-end;
  }
`;
