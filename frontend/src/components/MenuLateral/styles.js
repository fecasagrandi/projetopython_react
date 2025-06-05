import styled from 'styled-components';

export const MenuContainer = styled.nav`
  width: 240px;
  background-color: var(--secondary-bg);
  padding: 1.5rem 0;
  height: calc(100vh - 64px);
  position: fixed;
  left: 0;
  top: 64px; /* Altura do cabeçalho */
  overflow-y: auto;
  z-index: 100;
`;

export const MenuItem = styled.div`
  padding: 0.75rem 1.5rem;
  margin-bottom: 0.5rem;
  border-left: 4px solid ${props => props.active ? 'var(--accent-blue)' : 'transparent'};
  background-color: ${props => props.active ? 'rgba(30, 144, 255, 0.1)' : 'transparent'};
  
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${props => props.active ? 'var(--accent-blue)' : 'var(--text-color)'};
  }
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const MenuIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.active ? 'var(--accent-blue)' : 'var(--text-color)'};
`;

export const MenuText = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;
