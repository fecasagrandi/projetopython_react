import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Header, 
  Title, 
  Subtitle,
  CardsContainer,
  SectionTitle,
  VerTodosLink
} from './styles';
import Cartao from '../../components/Cartao';
import ItemTarefa from '../../components/ItemTarefa';
import Botao from '../../components/Botao';
import { BuscarTarefas, BuscarHabitos, BuscarRecompensas, AtualizarTarefa, ExcluirTarefa } from '../../services/ApiService';

const PaginaInicial = () => {
  const [tarefas, setTarefas] = useState([]);
  const [habitos, setHabitos] = useState([]);
  const [recompensas, setRecompensas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setCarregando(true);
        
        const tarefasData = await BuscarTarefas();
        setTarefas(tarefasData.slice(0, 3));
        
        const habitosData = await BuscarHabitos();
        setHabitos(habitosData.slice(0, 3));
        
        const recompensasData = await BuscarRecompensas();
        setRecompensas(recompensasData.slice(0, 3));
        
        setErro(null);
      } catch (error) {
        setErro("Falha ao carregar dados. Por favor, tente novamente.");
      } finally {
        setCarregando(false);
      }
    };
    
    carregarDados();
  }, []);

  const handleStatusChange = async (id, tarefaAtualizada) => {
    try {
      await AtualizarTarefa(id, tarefaAtualizada);
      setTarefas(tarefas.map(tarefa => 
        tarefa.id === id ? tarefaAtualizada : tarefa
      ));
    } catch (error) {
      console.error("Erro ao atualizar status da tarefa:", error);
      setErro("Falha ao atualizar tarefa. Por favor, tente novamente.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await ExcluirTarefa(id);
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
      setErro("Falha ao excluir tarefa. Por favor, tente novamente.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>Bem-vindo ao Kaizen</Title>
        <Subtitle>Transforme seus hábitos em resultados</Subtitle>
      </Header>

      {erro && <p style={{ color: 'var(--task-red)', textAlign: 'center' }}>{erro}</p>}
      
      {carregando ? (
        <p>Carregando...</p>
      ) : (
        <>
          <SectionTitle>
            <h2>Tarefas Recentes</h2>
            <VerTodosLink>
              <Link to="/tarefas">Ver todas</Link>
            </VerTodosLink>
          </SectionTitle>
          
          <CardsContainer>
            <Cartao titulo="Minhas Tarefas">
              {tarefas.length > 0 ? (
                tarefas.map(tarefa => (
                  <ItemTarefa 
                    key={tarefa.id} 
                    tarefa={tarefa} 
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p>Nenhuma tarefa encontrada.</p>
              )}
              <Link to="/tarefas/nova">
                <Botao variante="primario" larguraTotal>Nova Tarefa</Botao>
              </Link>
            </Cartao>
          </CardsContainer>
          
          <SectionTitle>
            <h2>Hábitos</h2>
            <VerTodosLink>
              <Link to="/habitos">Ver todos</Link>
            </VerTodosLink>
          </SectionTitle>
          
          <CardsContainer>
            <Cartao titulo="Meus Hábitos">
              {habitos.length > 0 ? (
                <ul>
                  {habitos.map(habito => (
                    <li key={habito.id}>
                      <Link to={`/habitos/editar/${habito.id}`}>
                        {habito.Nome_Habito}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum hábito encontrado.</p>
              )}
              <Link to="/habitos/novo">
                <Botao variante="primario" larguraTotal>Novo Hábito</Botao>
              </Link>
            </Cartao>
          </CardsContainer>
          
          <SectionTitle>
            <h2>Recompensas</h2>
            <VerTodosLink>
              <Link to="/recompensas">Ver todas</Link>
            </VerTodosLink>
          </SectionTitle>
          
          <CardsContainer>
            <Cartao titulo="Minhas Recompensas">
              {recompensas.length > 0 ? (
                <ul>
                  {recompensas.map(recompensa => (
                    <li key={recompensa.id}>
                      <Link to={`/recompensas/editar/${recompensa.id}`}>
                        {recompensa.Titulo_Recompensa} - {recompensa.Pontos} pontos
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma recompensa encontrada.</p>
              )}
              <Link to="/recompensas/nova">
                <Botao variante="primario" larguraTotal>Nova Recompensa</Botao>
              </Link>
            </Cartao>
          </CardsContainer>
        </>
      )}
    </Container>
  );
};

export default PaginaInicial;
