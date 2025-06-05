import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Container, 
  FormContainer, 
  FormGroup, 
  Label, 
  Input, 
  TextArea, 
  Select,
  BotoesContainer,
  CategoriasContainer,
  CategoriaItem
} from './styles';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import { 
  BuscarTarefas, 
  CriarTarefa, 
  AtualizarTarefa, 
  BuscarCategorias, 
  AdicionarCategoriaTarefa,
  ObterUsuarioAtual
} from '../../services/ApiService';

const FormularioTarefa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Titulo_Tarefa: '',
    Descricao: '',
    Data_Limite: '',
    Status_Tarefa: 'pendente',
    Prioridade: 'media'
  });
  const [categorias, setCategorias] = useState([]);
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        const categoriasData = await BuscarCategorias();
        setCategorias(categoriasData);
 
        if (id) {
          const tarefasData = await BuscarTarefas();
          const tarefa = tarefasData.find(t => t.id === parseInt(id));
          
          if (tarefa) {
            setFormData({
              Titulo_Tarefa: tarefa.Titulo_Tarefa,
              Descricao: tarefa.Descricao || '',
              Data_Limite: tarefa.Data_Limite ? new Date(tarefa.Data_Limite).toISOString().split('T')[0] : '',
              Status_Tarefa: tarefa.Status_Tarefa,
              Prioridade: tarefa.Prioridade,
              Usuario: tarefa.Usuario
            });
            
            if (tarefa.Categorias) {
              setCategoriasSelecionadas(tarefa.Categorias.map(c => c.id));
            }
          } else {
            setErro("Tarefa não encontrada");
          }
        }
      } catch (error) {
        setErro("Falha ao carregar dados. Por favor, tente novamente.");
      } finally {
        setCarregando(false);
      }
    };
    
    carregarDados();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleCategoriaChange = (e) => {
    const id = parseInt(e.target.value);
    
    if (categoriasSelecionadas.includes(id)) {
      setCategoriasSelecionadas(categoriasSelecionadas.filter(catId => catId !== id));
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    
    try {
      const usuarioAtual = ObterUsuarioAtual();
      if (!usuarioAtual) {
        setErro("Você precisa estar autenticado para criar ou editar tarefas.");
        navigate('/login');
        return;
      }
      
      const categoriasValidas = categoriasSelecionadas
        .filter(catId => catId !== undefined && !isNaN(catId));
      
      const dadosCompletos = {
        ...formData,
        categorias_ids: categoriasValidas,
        Usuario: usuarioAtual.id
      };
      
      if (id) {
        await AtualizarTarefa(id, dadosCompletos);
      } else {
        await CriarTarefa(dadosCompletos);
      }
      
      navigate('/tarefas');
    } catch (error) {
      setErro("Falha ao salvar tarefa. Por favor, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container>
      <h1>{id ? 'Editar Tarefa' : 'Nova Tarefa'}</h1>
      
      {erro && <p style={{ color: 'var(--task-red)', textAlign: 'center' }}>{erro}</p>}
      
      <FormContainer>
        <Cartao titulo="Detalhes da Tarefa">
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="Titulo_Tarefa">Título*</Label>
              <Input
                type="text"
                id="Titulo_Tarefa"
                name="Titulo_Tarefa"
                value={formData.Titulo_Tarefa}
                onChange={handleChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Descricao">Descrição</Label>
              <TextArea
                id="Descricao"
                name="Descricao"
                value={formData.Descricao}
                onChange={handleChange}
                rows={4}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Data_Limite">Data Limite</Label>
              <Input
                type="date"
                id="Data_Limite"
                name="Data_Limite"
                value={formData.Data_Limite}
                onChange={handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Status_Tarefa">Status</Label>
              <Select
                id="Status_Tarefa"
                name="Status_Tarefa"
                value={formData.Status_Tarefa}
                onChange={handleChange}
              >
                <option value="pendente">Pendente</option>
                <option value="concluida">Concluída</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="Prioridade">Prioridade</Label>
              <Select
                id="Prioridade"
                name="Prioridade"
                value={formData.Prioridade}
                onChange={handleChange}
              >
                <option value="baixa">Baixa</option>
                <option value="media">Média</option>
                <option value="alta">Alta</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>Categorias</Label>
              <CategoriasContainer>
                {categorias.map(categoria => (
                  <CategoriaItem key={categoria.id}>
                    <input
                      type="checkbox"
                      id={`categoria-${categoria.id}`}
                      value={categoria.id}
                      checked={categoriasSelecionadas.includes(categoria.id)}
                      onChange={handleCategoriaChange}
                    />
                    <label htmlFor={`categoria-${categoria.id}`}>
                      {categoria.Nome_Categoria}
                    </label>
                  </CategoriaItem>
                ))}
              </CategoriasContainer>
            </FormGroup>
            
            <BotoesContainer>
              <Botao 
                type="button" 
                variante="secundario" 
                onClick={() => navigate('/tarefas')}
              >
                Cancelar
              </Botao>
              <Botao 
                type="submit" 
                variante="primario"
                disabled={carregando}
              >
                {carregando ? 'Salvando...' : 'Salvar'}
              </Botao>
            </BotoesContainer>
          </form>
        </Cartao>
      </FormContainer>
    </Container>
  );
};

export default FormularioTarefa;
