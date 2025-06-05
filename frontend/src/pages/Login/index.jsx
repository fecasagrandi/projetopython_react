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

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-blue);
  letter-spacing: 1px;
`;

const LogoAccent = styled.span`
  color: var(--text-color);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-muted);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const StyledInput = styled(Input)`
  padding-left: 40px;
  width: 100%;
`;

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
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
  };

  return (
    <Container>
      <FormContainer>
        <Logo>
          Kaizen<LogoAccent>.</LogoAccent>
        </Logo>
        
        <Title>{isLogin ? 'Login' : 'Cadastro'}</Title>
        
        {erro && <ErrorMessage>{erro}</ErrorMessage>}
        {sucesso && <SuccessMessage>{sucesso}</SuccessMessage>}
        
        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputWrapper>
              <InputIcon>👤</InputIcon>
              <StyledInput
                type="text"
                placeholder="Nome de usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                disabled={carregando}
              />
            </InputWrapper>
          )}
          
          <InputWrapper>
            <InputIcon>✉️</InputIcon>
            <StyledInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={carregando}
            />
          </InputWrapper>
          
          <InputWrapper>
            <InputIcon>🔒</InputIcon>
            <StyledInput
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={carregando}
            />
          </InputWrapper>
          
          <Button type="submit" disabled={carregando}>
            {carregando ? 'Processando...' : isLogin ? 'Entrar' : 'Cadastrar'}
          </Button>
        </Form>
        
        <ToggleText onClick={toggleMode}>
          {isLogin 
            ? 'Não tem uma conta? Cadastre-se' 
            : 'Já tem uma conta? Faça login'}
        </ToggleText>
      </FormContainer>
    </Container>
  );
};

export default Login;
