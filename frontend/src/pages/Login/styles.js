import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #111827;
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: #111827;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  font-weight: 600;
  font-size: 1.5rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: #1e293b;
  color: #ffffff;
  transition: all 0.2s ease;
  width: 100%;
  margin-bottom: 0.75rem;
  
  &::placeholder {
    color: #94a3b8;
  }
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &:disabled {
    background-color: rgba(30, 41, 59, 0.7);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  width: 100%;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #2563eb;
  }
  
  &:active {
    background-color: #1d4ed8;
  }
  
  &:disabled {
    background-color: #60a5fa;
    cursor: not-allowed;
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #3b82f6;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  width: 100%;
  
  &:before, &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  span {
    padding: 0 1rem;
    color: #94a3b8;
    font-size: 0.8rem;
  }
`;
