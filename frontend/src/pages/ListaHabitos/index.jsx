import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, HabitosContainer } from './styles';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import Carregando from '../../components/Carregando';
import Mensagem from '../../components/Mensagem';
import ItemHabito from '../../components/ItemHabito';
import { BuscarHabitos, CompletarHabito, ExcluirHabito } from '../../services/ApiService';
import { usePopup } from '../../contexts/PopupContext';

const ListaHabitos = () => {
  const [habitos, setHabitos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const { showPopup } = usePopup();

  useEffect(() => {
    const carregarHabitos = async () => {
      try {
        setCarregando(true);
        const data = await BuscarHabitos();
        setHabitos(data);
        setErro(null);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setErro("Não foi possível encontrar seus hábitos. Verifique sua conexão.");
        } else {
          setErro("Falha ao carregar hábitos. Por favor, tente novamente.");
        }
      } finally {
        setCarregando(false);
      }
    };
    
    carregarHabitos();
  }, []);

  const handleDelete = async (id) => {
    showPopup(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir este hábito?",
      false,
      0,
      async (confirmed) => {
        if (confirmed) {
          try {
            await ExcluirHabito(id);
            setHabitos(habitos.filter(habito => habito.id !== id));
          } catch (error) {
            console.error("Erro ao excluir hábito:", error);
            setErro("Falha ao excluir hábito. Por favor, tente novamente.");
          }
        }
      }
    );
  };

  const handleCompletarHabito = async (id) => {
    try {
      const habito = habitos.find(h => h.id === id);
      if (habito) {
        const resultado = await CompletarHabito(id);
        
        showPopup(
          "Hábito Completado!", 
          `Você ganhou ${resultado.pontos_ganhos} pontos!`, 
          true, 
          3000
        );
        
        const data = await BuscarHabitos();
        setHabitos(data);
      }
    } catch (error) {
      setErro("Falha ao completar hábito. Por favor, tente novamente.");
    }
  };

  return (
    <Container>
      <Header>
        <h1>Meus Hábitos</h1>
        <Link to="/habitos/novo">
          <Botao variante="primario">Novo Hábito</Botao>
        </Link>
      </Header>

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}
      
      {carregando ? (
        <Carregando texto="Carregando hábitos..." />
      ) : (
        <HabitosContainer>
          <Cartao titulo={`Hábitos (${habitos.length})`}>
            {habitos.length > 0 ? (
              habitos.map(habito => (
                <ItemHabito
                  key={habito.id}
                  habito={habito}
                  onCompletar={handleCompletarHabito}
                  onExcluir={handleDelete}
                  disabled={carregando}
                />
              ))
            ) : (
              <p>Nenhum hábito encontrado.</p>
            )}
          </Cartao>
        </HabitosContainer>
      )}
    </Container>
  );
};

export default ListaHabitos;
