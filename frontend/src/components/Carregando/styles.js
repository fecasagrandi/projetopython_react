import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const CarregandoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

export const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: var(--accent-blue);
  animation: ${spin} 1s ease-in-out infinite;
  margin-bottom: 1rem;
`;

export const Texto = styled.p`
  color: var(--text-muted);
  font-size: 1rem;
  margin: 0;
`;
