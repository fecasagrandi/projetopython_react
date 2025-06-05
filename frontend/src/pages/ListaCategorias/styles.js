import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin-bottom: 1.5rem;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-color);
    margin: 0;
    text-align: center;
  }
`;

export const CategoriasContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CategoriaItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const CategoriaNome = styled.h3`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 500;
  color: var(--text-color);
`;

export const CategoriaAcoes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FormCategoria = styled.form`
  display: flex;
  gap: 1rem;
  width: 100%;
  align-items: center;
  
  input {
    flex: 1;
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius);
    color: var(--text-color);
    font-size: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--accent-blue);
    }
  }
  
  div {
    display: flex;
    gap: 0.5rem;
  }
`;
