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
`;

export const HabitosContainer = styled.div`
  margin-top: 1rem;
`;
