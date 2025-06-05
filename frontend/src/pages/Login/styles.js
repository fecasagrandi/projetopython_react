import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--primary-bg);
  background-image: linear-gradient(135deg, var(--primary-bg) 0%, var(--secondary-bg) 100%);
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  background-color: var(--secondary-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--text-color);
  font-weight: 600;
  position: relative;
  padding-bottom: 0.75rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: var(--accent-blue);
    border-radius: 3px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  color: var(--text-color);
  transition: all 0.2s ease;
  
  &::placeholder {
    color: var(--text-muted);
  }
  
  &:focus {
    outline: none;
    border-color: var(--accent-blue);
    box-shadow: 0 0 0 2px rgba(30, 144, 255, 0.2);
  }
  
  &:disabled {
    background-color: rgba(255, 255, 255, 0.02);
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const Button = styled.button`
  padding: 0.85rem;
  background-color: var(--accent-blue);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  letter-spacing: 0.5px;
  width: 100%;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #1a7ade;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(30, 144, 255, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    background-color: rgba(30, 144, 255, 0.5);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ToggleText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: var(--accent-blue);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    color: #1a7ade;
    transform: translateY(-1px);
  }
`;

export const ErrorMessage = styled.div`
  padding: 0.75rem;
  background-color: rgba(244, 67, 54, 0.1);
  color: var(--task-red);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  border-left: 3px solid var(--task-red);
  font-size: 0.9rem;
`;

export const SuccessMessage = styled.div`
  padding: 0.75rem;
  background-color: rgba(40, 200, 64, 0.1);
  color: var(--dot-color-3);
  border-radius: var(--border-radius);
  margin-bottom: 1rem;
  border-left: 3px solid var(--dot-color-3);
  font-size: 0.9rem;
`;
