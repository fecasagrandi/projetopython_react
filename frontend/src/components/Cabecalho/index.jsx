import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CabecalhoContainer, 
  Logo, 
  UserSection, 
  UserInfo, 
  UserName, 
  UserPoints, 
  LogoutButton 
} from './styles';
import { ObterUsuarioAtual, FazerLogout, EVENTO_PONTOS_ATUALIZADOS } from '../../services/ApiService';

const Cabecalho = () => {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioAtual = ObterUsuarioAtual();
    setUsuario(usuarioAtual);
    
    const handlePontosAtualizados = (evento) => {
      const usuarioAtualizado = ObterUsuarioAtual();
      if (usuarioAtualizado) {
        setUsuario(usuarioAtualizado);
      }
    };
    
    window.addEventListener(EVENTO_PONTOS_ATUALIZADOS, handlePontosAtualizados);
    
    return () => {
      window.removeEventListener(EVENTO_PONTOS_ATUALIZADOS, handlePontosAtualizados);
    };
  }, []);

  const handleLogout = () => {
    FazerLogout();
    setUsuario(null);
    navigate('/login');
  };

  return (
    <CabecalhoContainer>
      <Logo>
        <Link to="/">Kaizen</Link>
      </Logo>
      
      {usuario && (
        <UserSection>
          <UserInfo>
            <UserName>{usuario.Nome_Usuario}</UserName>
            <UserPoints>{usuario.Pontos || 0} pontos</UserPoints>
          </UserInfo>
          <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
        </UserSection>
      )}
    </CabecalhoContainer>
  );
};

export default Cabecalho;
