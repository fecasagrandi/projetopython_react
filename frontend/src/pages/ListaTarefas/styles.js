import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
  }
`;

export const TarefasContainer = styled.div`
  margin-top: 1.5rem;
`;

export const Filtros = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const FiltroItem = styled.button`
  background-color: ${props => props.active ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.active ? 'white' : 'var(--text-color)'};
  border: none;
  border-radius: var(--border-radius);
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-blue)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;
