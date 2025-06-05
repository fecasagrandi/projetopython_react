import styled from 'styled-components';

export const CartaoContainer = styled.div`
  background-color: var(--secondary-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  overflow: hidden;
`;

export const CartaoCabecalho = styled.div`
  padding: 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartaoTitulo = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
`;

export const CartaoPontos = styled.span`
  background-color: var(--accent-blue);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CartaoConteudo = styled.div`
  padding: 1.25rem;
`;
