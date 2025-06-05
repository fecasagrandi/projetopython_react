import styled from 'styled-components';

export const CabecalhoContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--secondary-bg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 200;
`;

export const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  
  a {
    color: var(--accent-blue);
    text-decoration: none;
  }
`;

export const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
`;

export const NavItem = styled.li`
  a {
    color: var(--text-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    
    &:hover {
      color: var(--accent-blue);
    }
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const UserName = styled.span`
  font-weight: 600;
  color: var(--text-color);
`;

export const UserPoints = styled.span`
  font-size: 0.8rem;
  color: var(--accent-blue);
  font-weight: 500;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid var(--accent-blue);
  color: var(--accent-blue);
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: var(--accent-blue);
    color: white;
  }
`;
