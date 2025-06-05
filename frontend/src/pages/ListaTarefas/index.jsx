import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, TarefasContainer, Filtros, FiltroItem } from './styles';
import Cartao from '../../components/Cartao';
import ItemTarefa from '../../components/ItemTarefa';
import Botao from '../../components/Botao';
import { BuscarTarefas, AtualizarTarefa, ExcluirTarefa } from '../../services/ApiService';
import { usePopup } from '../../contexts/PopupContext';

const ListaTarefas = () => {
  const [tarefas, setTarefas] = useState([]);
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtroAtivo, setFiltroAtivo] = useState('todas');
  const { showPopup } = usePopup();

  useEffect(() => {
    const carregarTarefas = async () => {
      try {
        setCarregando(true);
        const data = await BuscarTarefas();
        setTarefas(data);
        setTarefasFiltradas(data);
        setErro(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErro("Não foi possível encontrar suas tarefas. Verifique sua conexão.");
        } else {
          setErro("Falha ao carregar tarefas. Por favor, tente novamente.");
        }
      } finally {
        setCarregando(false);
      }
    };
    
    carregarTarefas();
  }, []);

  useEffect(() => {
    aplicarFiltro(filtroAtivo);
  }, [tarefas, filtroAtivo]);

  const aplicarFiltro = (filtro) => {
    switch (filtro) {
      case 'pendentes':
        setTarefasFiltradas(tarefas.filter(tarefa => tarefa.Status_Tarefa === 'pendente'));
        break;
      case 'concluidas':
        setTarefasFiltradas(tarefas.filter(tarefa => tarefa.Status_Tarefa === 'concluida'));
        break;
      case 'alta':
        setTarefasFiltradas(tarefas.filter(tarefa => tarefa.Prioridade === 'alta'));
        break;
      case 'media':
        setTarefasFiltradas(tarefas.filter(tarefa => tarefa.Prioridade === 'media'));
        break;
      case 'baixa':
        setTarefasFiltradas(tarefas.filter(tarefa => tarefa.Prioridade === 'baixa'));
        break;
      default:
        setTarefasFiltradas(tarefas);
    }
  };

  const handleStatusChange = async (id, tarefaAtualizada) => {
    try {
      const tarefaExistente = tarefas.find(t => t.id === id);
      const categoriasIds = tarefaExistente.Categorias?.map(cat => cat.id) || [];
      
      const dadosAtualizados = {
        ...tarefaAtualizada,
        categorias_ids: categoriasIds
      };
      
      await AtualizarTarefa(id, dadosAtualizados);
      
      setTarefas(tarefas.map(tarefa => 
        tarefa.id === id ? {
          ...tarefaAtualizada,
          Categorias: tarefaExistente.Categorias
        } : tarefa
      ));
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      setErro("Falha ao atualizar tarefa. Por favor, tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    showPopup(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      false,
      0,
      async (confirmed) => {
        if (confirmed) {
          try {
            await ExcluirTarefa(id);
            setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
          } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
            setErro("Falha ao excluir tarefa. Por favor, tente novamente.");
          }
        }
      }
    );
  };

  return (
    <Container>
      <Header>
        <h1>Minhas Tarefas</h1>
        <Link to="/tarefas/nova">
          <Botao variante="primario">Nova Tarefa</Botao>
        </Link>
      </Header>

      <Filtros>
        <FiltroItem 
          active={filtroAtivo === 'todas'} 
          onClick={() => setFiltroAtivo('todas')}
        >
          Todas
        </FiltroItem>
        <FiltroItem 
          active={filtroAtivo === 'pendentes'} 
          onClick={() => setFiltroAtivo('pendentes')}
        >
          Pendentes
        </FiltroItem>
        <FiltroItem 
          active={filtroAtivo === 'concluidas'} 
          onClick={() => setFiltroAtivo('concluidas')}
        >
          Concluídas
        </FiltroItem>
        <FiltroItem 
          active={filtroAtivo === 'alta'} 
          onClick={() => setFiltroAtivo('alta')}
        >
          Prioridade Alta
        </FiltroItem>
        <FiltroItem 
          active={filtroAtivo === 'media'} 
          onClick={() => setFiltroAtivo('media')}
        >
          Prioridade Média
        </FiltroItem>
        <FiltroItem 
          active={filtroAtivo === 'baixa'} 
          onClick={() => setFiltroAtivo('baixa')}
        >
          Prioridade Baixa
        </FiltroItem>
      </Filtros>

      {erro && <p style={{ color: 'var(--task-red)', textAlign: 'center' }}>{erro}</p>}
      
      {carregando ? (
        <p>Carregando tarefas...</p>
      ) : (
        <TarefasContainer>
          <Cartao titulo={`Tarefas (${tarefasFiltradas.length})`}>
            {tarefasFiltradas.length > 0 ? (
              tarefasFiltradas.map(tarefa => (
                <ItemTarefa 
                  key={tarefa.id} 
                  tarefa={tarefa} 
                  onStatusChange={handleStatusChange}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>Nenhuma tarefa encontrada com os filtros atuais.</p>
            )}
          </Cartao>
        </TarefasContainer>
      )}
    </Container>
  );
};

export default ListaTarefas;
