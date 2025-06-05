import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, RecompensasContainer } from './styles';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import Carregando from '../../components/Carregando';
import Mensagem from '../../components/Mensagem';
import ItemRecompensa from '../../components/ItemRecompensa';
import { usePopup } from '../../contexts/PopupContext';
import { 
  ObterUsuarioAtual, 
  BuscarRecompensas, 
  ExcluirRecompensa, 
  ConquistarRecompensa, 
  DesconquistarRecompensa,
  BuscarDadosUsuarioAtual, 
  EVENTO_PONTOS_ATUALIZADOS 
} from '../../services/ApiService';

const ListaRecompensas = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [pontosUsuario, setPontosUsuario] = useState(0);
  const { showPopup } = usePopup(); 

  useEffect(() => {
    const carregarRecompensas = async () => {
      try {
        setCarregando(true);
        const data = await BuscarRecompensas();
        setRecompensas(data);
        setErro(null);
      } catch (error) {
        console.error("Erro ao carregar recompensas:", error);
        if (error.response && error.response.status === 404) {
          setErro("Não foi possível encontrar suas recompensas. Verifique sua conexão.");
        } else {
          setErro("Falha ao carregar recompensas. Por favor, tente novamente.");
        }
      } finally {
        setCarregando(false);
      }
    };
    
    carregarRecompensas();
  }, []);
  
  useEffect(() => {
    const carregarPontosUsuario = async () => {
      try {
        const usuario = ObterUsuarioAtual();
        if (usuario) {
          setPontosUsuario(usuario.Pontos || 0);          
          try {
            const dadosAtualizados = await BuscarDadosUsuarioAtual();
            if (dadosAtualizados && dadosAtualizados.Pontos !== undefined) {
              setPontosUsuario(dadosAtualizados.Pontos);
            }
          } catch (apiError) {
            console.error("Erro ao atualizar dados do usuário da API:", apiError);
          }
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error("Erro ao carregar pontos do usuário:", error);
      }
    };
    
    const handlePontosAtualizados = (evento) => {
      setPontosUsuario(evento.detail.pontos);
    };
    
    window.addEventListener(EVENTO_PONTOS_ATUALIZADOS, handlePontosAtualizados);
    
    carregarPontosUsuario();
    
    return () => {
      window.removeEventListener(EVENTO_PONTOS_ATUALIZADOS, handlePontosAtualizados);
    };
  }, []);

  const handleDelete = async (id) => {
    const recompensa = recompensas.find(r => r.id === id);
    if (!recompensa) {
      showPopup('Erro', 'Recompensa não encontrada.', false, 3000);
      return;
    }
    
    // Aqui usamos o popup para confirmação
    showPopup(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a recompensa: ${recompensa.Titulo_Recompensa}?`,
      false,
      0,
      async (confirmado) => {
        if (confirmado) {
          try {
            await ExcluirRecompensa(id);
            setRecompensas(recompensas.filter(recompensa => recompensa.id !== id));
            showPopup('Sucesso', 'Recompensa excluída com sucesso!', true, 3000);
          } catch (error) {
            setErro("Falha ao excluir recompensa. Por favor, tente novamente.");
            showPopup('Erro', 'Falha ao excluir recompensa. Por favor, tente novamente.', false, 3000);
          }
        }
      }
    );
  };

  const handleConquistarRecompensa = async (id) => {
    try {
      const recompensa = recompensas.find(r => r.id === id);
      
      if (!recompensa) {
        showPopup('Erro', 'Recompensa não encontrada.', false, 3000);
        return;
      }
      
      if (pontosUsuario < recompensa.Pontos) {
        showPopup(
          'Pontos Insuficientes', 
          `Você tem ${pontosUsuario} pontos, mas precisa de ${recompensa.Pontos}.`,
          false,
          3000
        );
        return;
      }
      
      const pontosPrevisto = pontosUsuario - recompensa.Pontos;
      setPontosUsuario(pontosPrevisto);
      
      const resultado = await ConquistarRecompensa(id);
      
      if (resultado.pontos_restantes !== undefined) {
        setPontosUsuario(resultado.pontos_restantes);
      }
      
      setRecompensas(recompensas.map(r => 
        r.id === id ? { ...r, Status: 'conquistada' } : r
      ));
      
      showPopup(
        'Recompensa Conquistada!',
        `Parabéns! Você conquistou: ${recompensa.Titulo_Recompensa}`,
        true,
        3000
      );
      
      const usuarioAtual = ObterUsuarioAtual();
      if (usuarioAtual && resultado.pontos_restantes !== undefined) {
        const usuarioAtualizado = { ...usuarioAtual, Pontos: resultado.pontos_restantes };
        localStorage.setItem('usuarioKaizen', JSON.stringify(usuarioAtualizado));
      }
    } catch (error) {
      const usuarioAtual = ObterUsuarioAtual();
      if (usuarioAtual) {
        setPontosUsuario(usuarioAtual.Pontos || 0);
      }
      
      if (error.status === 'pontos insuficientes') {
        showPopup(
          'Pontos Insuficientes',
          `Você tem ${error.pontos_usuario} pontos, mas precisa de ${error.pontos_necessarios}.`,
          false,
          3000
        );
      } 
      else if (error.status === 'recompensa já conquistada') {
        showPopup(
          'Recompensa Já Conquistada',
          'Você já conquistou esta recompensa!',
          false,
          3000
        );
        setRecompensas(recompensas.map(r => 
          r.id === id ? { ...r, Status: 'conquistada' } : r
        ));
      } else {
        showPopup(
          'Erro',
          'Falha ao conquistar recompensa. Por favor, tente novamente.',
          false,
          3000
        );
        setErro("Falha ao conquistar recompensa. Por favor, tente novamente.");
      }
    }
  };
  
  const handleDesconquistarRecompensa = async (id) => {
    try {
      const recompensa = recompensas.find(r => r.id === id);
      
      if (!recompensa) {
        showPopup('Erro', 'Recompensa não encontrada.', false, 3000);
        return;
      }
      
      const resultado = await DesconquistarRecompensa(id);
      
      if (resultado.pontos_restantes !== undefined) {
        setPontosUsuario(resultado.pontos_restantes);
      }
      
      setRecompensas(recompensas.map(r => 
        r.id === id ? { ...r, Status: 'disponivel' } : r
      ));
      
      showPopup(
        'Recompensa Desconquistada',
        `Você desconquistou: ${recompensa.Titulo_Recompensa} e recuperou ${recompensa.Pontos} pontos!`,
        true,
        3000
      );
      
      const usuarioAtual = ObterUsuarioAtual();
      if (usuarioAtual && resultado.pontos_restantes !== undefined) {
        const usuarioAtualizado = { ...usuarioAtual, Pontos: resultado.pontos_restantes };
        localStorage.setItem('usuarioKaizen', JSON.stringify(usuarioAtualizado));
      }
    } catch (error) {
      showPopup(
        'Erro',
        'Falha ao desconquistar recompensa. Por favor, tente novamente.',
        false,
        3000
      );
      setErro("Falha ao desconquistar recompensa. Por favor, tente novamente.");
    }
  };

  return (
    <Container>
      <Header>
        <div>
          <h1>Minhas Recompensas</h1>
          <p>Pontos disponíveis: <strong>{pontosUsuario}</strong></p>
        </div>
        <Link to="/recompensas/nova">
          <Botao variante="primario">Nova Recompensa</Botao>
        </Link>
      </Header>

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      
      {carregando ? (
        <Carregando texto="Carregando recompensas..." />
      ) : (
        <RecompensasContainer>
          <Cartao titulo={`Recompensas (${recompensas.length})`}>
            {recompensas.length > 0 ? (
              recompensas.map(recompensa => (
                <ItemRecompensa
                  key={recompensa.id}
                  recompensa={recompensa}
                  pontosUsuario={pontosUsuario}
                  onConquistar={handleConquistarRecompensa}
                  onDesconquistar={handleDesconquistarRecompensa}
                  onExcluir={handleDelete}
                  disabled={carregando}
                />
              ))
            ) : (
              <p>Nenhuma recompensa encontrada.</p>
            )}
          </Cartao>
        </RecompensasContainer>
      )}
    </Container>
  );
};

export default ListaRecompensas;
