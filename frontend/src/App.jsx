import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import EstilosGlobais from './styles/EstilosGlobais';
import { ObterUsuarioAtual } from './services/ApiService';
import { PopupProvider } from './contexts/PopupContext';

import Login from './pages/Login';
import ListaTarefas from './pages/ListaTarefas';
import FormularioTarefa from './pages/FormularioTarefa';
import ListaHabitos from './pages/ListaHabitos';
import FormularioHabito from './pages/FormularioHabito';
import ListaRecompensas from './pages/ListaRecompensas';
import FormularioRecompensa from './pages/FormularioRecompensa';
import ListaCategorias from './pages/ListaCategorias';
import Estatisticas from './pages/Estatisticas';
import Cabecalho from './components/Cabecalho';
import MenuLateral from './components/MenuLateral';

const RotaProtegida = ({ children }) => {
  const usuario = ObterUsuarioAtual();
  const location = useLocation();
  
  if (!usuario) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return children;
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 64px; /* Altura do cabeçalho fixo */
`;

const ConteudoPrincipal = styled.div`
  display: flex;
  flex: 1;
  height: calc(100vh - 64px);
  position: relative;
`;

const AreaConteudo = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  margin-left: 240px; /* Mesma largura do menu lateral */
  width: calc(100% - 240px);
  height: 100%;
`;

const LayoutProtegido = ({ children }) => {
  return (
    <AppContainer className="app">
      <Cabecalho />
      <ConteudoPrincipal className="conteudo">
        <MenuLateral />
        <AreaConteudo className="principal">
          {children}
        </AreaConteudo>
      </ConteudoPrincipal>
    </AppContainer>
  );
};

function App() {
  const [usuario, setUsuario] = useState(ObterUsuarioAtual());
  
  useEffect(() => {
    setUsuario(ObterUsuarioAtual());
  }, []);

  return (
    <Router>
      <PopupProvider>
        <EstilosGlobais />
        <Routes>
        {/* Rota pública de login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota raiz redireciona para tarefas ou login */}
        <Route path="/" element={
          usuario ? <Navigate to="/tarefas" replace /> : <Navigate to="/login" replace />
        } />
        
        {/* Rotas protegidas */}
        <Route path="/tarefas" element={
          <RotaProtegida>
            <LayoutProtegido>
              <ListaTarefas />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/tarefas/nova" element={
          <RotaProtegida>
            <LayoutProtegido>
              <FormularioTarefa />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/tarefas/editar/:id" element={
          <RotaProtegida>
            <LayoutProtegido>
              <FormularioTarefa />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/habitos" element={
          <RotaProtegida>
            <LayoutProtegido>
              <ListaHabitos />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/habitos/novo" element={
          <RotaProtegida>
            <LayoutProtegido>
              <FormularioHabito />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/habitos/editar/:id" element={
          <RotaProtegida>
            <LayoutProtegido>
              <FormularioHabito />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/recompensas" element={
          <RotaProtegida>
            <LayoutProtegido>
              <ListaRecompensas />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/recompensas/nova" element={
          <RotaProtegida>
            <LayoutProtegido>
              <FormularioRecompensa />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/recompensas/editar/:id" element={
          <RotaProtegida>
            <LayoutProtegido>
              <FormularioRecompensa />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/categorias" element={
          <RotaProtegida>
            <LayoutProtegido>
              <ListaCategorias />
            </LayoutProtegido>
          </RotaProtegida>
        } />
        <Route path="/estatisticas" element={
          <RotaProtegida>
            <LayoutProtegido>
              <Estatisticas />
            </LayoutProtegido>
          </RotaProtegida>
        } />
      </Routes>
      </PopupProvider>
    </Router>
  );
}

export default App;
