import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Header, 
  CategoriasContainer, 
  CategoriaItem, 
  CategoriaNome, 
  CategoriaAcoes,
  FormCategoria
} from './styles';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import { BuscarCategorias, CriarCategoria, AtualizarCategoria, ExcluirCategoria, ObterUsuarioAtual } from '../../services/ApiService';
import { usePopup } from '../../contexts/PopupContext';

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [novaCategoria, setNovaCategoria] = useState('');
  const [categoriaEditando, setCategoriaEditando] = useState(null);
  const [nomeEditado, setNomeEditado] = useState('');
  const { showPopup } = usePopup();

  useEffect(() => {
    carregarCategorias();
  }, []);

  const carregarCategorias = async () => {
    try {
      setCarregando(true);
      const data = await BuscarCategorias();
      setCategorias(data);
      setErro(null);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      if (error.response && error.response.status === 404) {
        setErro("Não foi possível encontrar suas categorias. Verifique sua conexão.");
      } else {
        setErro("Falha ao carregar categorias. Por favor, tente novamente.");
      }
    } finally {
      setCarregando(false);
    }
  };

  const handleAdicionarCategoria = async (e) => {
    e.preventDefault();
    
    if (!novaCategoria.trim()) return;
    
    try {
      // Obter o usuário autenticado
      const usuarioAtual = ObterUsuarioAtual();
      if (!usuarioAtual) {
        setErro("Você precisa estar autenticado para criar categorias.");
        return;
      }
      
      setCarregando(true);
      // Simplificar os dados enviados para apenas o nome da categoria
      // já que o modelo Categoria no backend não tem campo Usuario
      const categoriaData = {
        Nome_Categoria: novaCategoria
      };
      
      console.log('Tentando criar categoria:', categoriaData);
      await CriarCategoria(categoriaData);
      console.log('Categoria criada com sucesso');
      setNovaCategoria('');
      await carregarCategorias();
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      setErro("Falha ao adicionar categoria. Por favor, tente novamente.");
      setCarregando(false);
    }
  };

  const iniciarEdicao = (categoria) => {
    setCategoriaEditando(categoria.id);
    setNomeEditado(categoria.Nome_Categoria);
  };

  const cancelarEdicao = () => {
    setCategoriaEditando(null);
    setNomeEditado('');
  };

  const handleAtualizarCategoria = async (id) => {
    if (!nomeEditado.trim()) return;
    
    try {
      setCarregando(true);
      await AtualizarCategoria(id, { Nome_Categoria: nomeEditado });
      setCategoriaEditando(null);
      await carregarCategorias();
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      setErro("Falha ao atualizar categoria. Por favor, tente novamente.");
      setCarregando(false);
    }
  };

  const handleExcluirCategoria = async (id) => {
    showPopup(
      "Confirmar exclusão",
      "Tem certeza que deseja excluir esta categoria?",
      false,
      0,
      async (confirmed) => {
        if (confirmed) {
          try {
            setCarregando(true);
            await ExcluirCategoria(id);
            await carregarCategorias();
          } catch (error) {
            console.error("Erro ao excluir categoria:", error);
            setErro("Falha ao excluir categoria. Por favor, tente novamente.");
            setCarregando(false);
          }
        }
      }
    );
  };

  return (
    <Container>
      <Header>
        <h1>Minhas Categorias</h1>
      </Header>

      {erro && <p style={{ color: 'var(--task-red)', textAlign: 'center' }}>{erro}</p>}
      
      <CategoriasContainer>
        <Cartao titulo="Adicionar Nova Categoria">
          <FormCategoria onSubmit={handleAdicionarCategoria}>
            <input 
              type="text" 
              value={novaCategoria} 
              onChange={(e) => setNovaCategoria(e.target.value)}
              placeholder="Nome da categoria"
              required
            />
            <Botao 
              type="submit" 
              variante="primario"
              disabled={carregando || !novaCategoria.trim()}
            >
              Adicionar
            </Botao>
          </FormCategoria>
        </Cartao>
        
        <Cartao titulo={`Categorias (${categorias.length})`}>
          {carregando && <p>Carregando categorias...</p>}
          
          {!carregando && categorias.length === 0 && (
            <p>Nenhuma categoria encontrada.</p>
          )}
          
          {!carregando && categorias.length > 0 && (
            categorias.map(categoria => (
              <CategoriaItem key={categoria.id}>
                {categoriaEditando === categoria.id ? (
                  <FormCategoria onSubmit={(e) => {
                    e.preventDefault();
                    handleAtualizarCategoria(categoria.id);
                  }}>
                    <input 
                      type="text" 
                      value={nomeEditado} 
                      onChange={(e) => setNomeEditado(e.target.value)}
                      autoFocus
                    />
                    <div>
                      <Botao 
                        type="submit" 
                        variante="primario"
                        disabled={carregando || !nomeEditado.trim()}
                      >
                        Salvar
                      </Botao>
                      <Botao 
                        type="button" 
                        variante="secundario"
                        onClick={cancelarEdicao}
                      >
                        Cancelar
                      </Botao>
                    </div>
                  </FormCategoria>
                ) : (
                  <>
                    <CategoriaNome>{categoria.Nome_Categoria}</CategoriaNome>
                    
                    <CategoriaAcoes>
                      <Botao 
                        variante="texto" 
                        onClick={() => iniciarEdicao(categoria)}
                      >
                        Editar
                      </Botao>
                      
                      <Botao 
                        variante="texto" 
                        onClick={() => handleExcluirCategoria(categoria.id)}
                      >
                        Excluir
                      </Botao>
                    </CategoriaAcoes>
                  </>
                )}
              </CategoriaItem>
            ))
          )}
        </Cartao>
      </CategoriasContainer>
    </Container>
  );
};

export default ListaCategorias;
