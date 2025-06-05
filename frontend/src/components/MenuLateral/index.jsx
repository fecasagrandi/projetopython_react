import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuContainer, MenuItem, MenuIcon, MenuText } from './styles';
import { MdTask, MdLoop, MdEmojiEvents, MdCategory, MdBarChart } from 'react-icons/md';

const MenuLateral = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };
  
  return (
    <MenuContainer>
      <MenuItem active={isActive('/tarefas')}>
        <Link to="/tarefas">
          <MenuIcon active={isActive('/tarefas')}>
            <MdTask size={24} />
          </MenuIcon>
          <MenuText>Tarefas</MenuText>
        </Link>
      </MenuItem>
      
      <MenuItem active={isActive('/habitos')}>
        <Link to="/habitos">
          <MenuIcon active={isActive('/habitos')}>
            <MdLoop size={24} />
          </MenuIcon>
          <MenuText>Hábitos</MenuText>
        </Link>
      </MenuItem>
      
      <MenuItem active={isActive('/recompensas')}>
        <Link to="/recompensas">
          <MenuIcon active={isActive('/recompensas')}>
            <MdEmojiEvents size={24} />
          </MenuIcon>
          <MenuText>Recompensas</MenuText>
        </Link>
      </MenuItem>
      
      <MenuItem active={isActive('/categorias')}>
        <Link to="/categorias">
          <MenuIcon active={isActive('/categorias')}>
            <MdCategory size={24} />
          </MenuIcon>
          <MenuText>Categorias</MenuText>
        </Link>
      </MenuItem>
      
      <MenuItem active={isActive('/estatisticas')}>
        <Link to="/estatisticas">
          <MenuIcon active={isActive('/estatisticas')}>
            <MdBarChart size={24} />
          </MenuIcon>
          <MenuText>Estatísticas</MenuText>
        </Link>
      </MenuItem>
    </MenuContainer>
  );
};

export default MenuLateral;
