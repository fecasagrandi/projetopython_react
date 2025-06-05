import styled from 'styled-components';

export const Container = styled.div`
  padding: 1rem;
  max-width: 800px;
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
  
  p {
    margin: 0.5rem 0 0;
    color: var(--text-muted);
  }
`;

export const RecompensasContainer = styled.div`
  margin-top: 1rem;
`;
