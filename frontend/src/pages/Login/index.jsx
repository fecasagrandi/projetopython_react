import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  FormContainer, 
  Title, 
  Input, 
  Button, 
  ToggleText,
  ErrorMessage,
  SuccessMessage
} from './styles';
import { FazerLogin, FazerRegistro } from '../../services/ApiService';
import styled from 'styled-components';
import { FaExclamationCircle, FaCheckCircle, FaTimes } from 'react-icons/fa';

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  
  &:hover {
    color: #ffffff;
  }
`;







const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');
  const [carregando, setCarregando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setSucesso('');
    setCarregando(true);

    try {
      if (isLogin) {
        const response = await FazerLogin(email, senha);
        setSucesso(response.message || 'Login realizado com sucesso!');
        setTimeout(() => {
          navigate('/tarefas');
        }, 1500);
      } else {
        if (!nome || !email || !senha) {
          setErro('Todos os campos são obrigatórios');
          setCarregando(false);
          return;
        }
        
        if (senha !== confirmarSenha) {
          setErro('As senhas não coincidem');
          setCarregando(false);
          return;
        }
        
        const response = await FazerRegistro(nome, email, senha);
        setSucesso(response.message || 'Registro realizado com sucesso!');
        setTimeout(() => {
          navigate('/tarefas');
        }, 1500);
      }
    } catch (error) {
      setErro(error.error || 'Ocorreu um erro. Por favor, tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErro('');
    setSucesso('');
    setNome('');
    setEmail('');
    setSenha('');
    setConfirmarSenha('');
  };
  
  const handleCloseClick = () => {
    toggleMode();
  };

  return (
    <Container>
      <FormContainer>
        <CloseButton onClick={handleCloseClick}>
          <FaTimes />
        </CloseButton>
        
        <Title>{isLogin ? 'Entrar' : 'Criar conta'}</Title>
        
        {erro && <ErrorMessage><FaExclamationCircle size={16} />{erro}</ErrorMessage>}
        {sucesso && <SuccessMessage><FaCheckCircle size={16} />{sucesso}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <StyledInput
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
              />
              <StyledInput
                type="text"
                placeholder="Nome de usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={carregando}
              />
              <StyledInput
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
              />
              <StyledInput
                type="password"
                placeholder="Confirmar senha"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                disabled={carregando}
              />
            </>
          )}
          
          {isLogin && (
            <>
              <StyledInput
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={carregando}
              />
              <StyledInput
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                disabled={carregando}
              />
            </>
          )}
          
          <Button type="submit" disabled={carregando}>
            {carregando ? 'Processando...' : isLogin ? 'ENTRAR' : 'CADASTRAR-SE'}
          </Button>
        </Form>
        
        <ToggleText onClick={toggleMode}>
          {isLogin 
            ? 'Não tem uma conta? Criar conta' 
            : 'Já tem uma conta? Entrar'}
        </ToggleText>
      </FormContainer>
    </Container>
  );
};

export default Login;
