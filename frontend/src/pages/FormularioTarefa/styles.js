import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
  margin: 0 auto;
  
  h1 {
    font-size: 1.75rem;
    font-weight: 600;
    color: var(--text-color);
    margin-bottom: 1.5rem;
    text-align: center;
  }
`;

export const FormContainer = styled.div`
  margin-bottom: 2rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.25rem;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color);
`;

export const Input = styled.input`
  width: 100%;
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
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  color: var(--text-color);
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  
  &:focus {
    outline: none;
    border-color: var(--accent-blue);
  }
`;

export const Select = styled.select`
  width: 100%;
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
  
  option {
    background-color: var(--primary-bg);
  }
`;

export const CategoriasContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const CategoriaItem = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: var(--border-radius);
  padding: 0.5rem 0.75rem;
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  input[type="checkbox"] {
    margin-right: 0.5rem;
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1px solid var(--accent-blue);
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    position: relative;
    
    &:checked {
      background-color: var(--accent-blue);
      
      &:after {
        content: '✓';
        position: absolute;
        color: white;
        font-size: 0.75rem;
        top: -1px;
        left: 1px;
      }
    }
  }
  
  label {
    cursor: pointer;
    font-size: 0.9rem;
    color: var(--text-color);
  }
`;

export const BotoesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;
