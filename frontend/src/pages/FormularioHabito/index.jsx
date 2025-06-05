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
  BotoesContainer
} from './styles';
import Cartao from '../../components/Cartao';
import Botao from '../../components/Botao';
import { BuscarHabitos, CriarHabito, AtualizarHabito, ObterUsuarioAtual } from '../../services/ApiService';

const FormularioHabito = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Nome_Habito: '',
    Descricao: '',
    Frequencia: 'diaria',
    Pontos_Conclusao: 10
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarHabito = async () => {
      if (!id) return;
      
      setCarregando(true);
      try {
        const habitos = await BuscarHabitos();
        const habito = habitos.find(h => h.id === parseInt(id));
        
        if (habito) {
          setFormData({
            Nome_Habito: habito.Nome_Habito,
            Descricao: habito.Descricao || '',
            Frequencia: habito.Frequencia,
            Pontos_Conclusao: habito.Pontos_Conclusao || 10,
            Usuario: habito.Usuario
          });
        } else {
          setErro("Hábito não encontrado");
        }
      } catch (error) {
        setErro("Falha ao carregar hábito. Por favor, tente novamente.");
      } finally {
        setCarregando(false);
      }
    };
    
    carregarHabito();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'Pontos_Conclusao' 
        ? parseInt(value) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    
    try {
      const usuarioAtual = ObterUsuarioAtual();
      if (!usuarioAtual) {
        setErro("Você precisa estar autenticado para criar ou editar hábitos.");
        navigate('/login');
        return;
      }
      
      const dadosCompletos = {
        ...formData,
        Usuario: usuarioAtual.id
      };
      
      if (id) {
        await AtualizarHabito(id, dadosCompletos);
      } else {
        await CriarHabito(dadosCompletos);
      }
      
      navigate('/habitos');
    } catch (error) {
      console.error("Erro ao salvar hábito:", error);
      setErro("Falha ao salvar hábito. Por favor, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container>
      <h1>{id ? 'Editar Hábito' : 'Novo Hábito'}</h1>
      
      {erro && <p style={{ color: 'var(--task-red)', textAlign: 'center' }}>{erro}</p>}
      
      <FormContainer>
        <Cartao titulo="Detalhes do Hábito">
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="Nome_Habito">Nome*</Label>
              <Input
                type="text"
                id="Nome_Habito"
                name="Nome_Habito"
                value={formData.Nome_Habito}
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
              <Label htmlFor="Frequencia">Frequência</Label>
              <Select
                id="Frequencia"
                name="Frequencia"
                value={formData.Frequencia}
                onChange={handleChange}
              >
                <option value="diaria">Diária</option>
                <option value="semanal">Semanal</option>
                <option value="mensal">Mensal</option>
              </Select>
            </FormGroup>
            

            
            <FormGroup>
              <Label htmlFor="Pontos_Conclusao">Pontos por Conclusão</Label>
              <Input
                type="number"
                id="Pontos_Conclusao"
                name="Pontos_Conclusao"
                value={formData.Pontos_Conclusao}
                onChange={handleChange}
                min="1"
                required
              />
            </FormGroup>
            
            <BotoesContainer>
              <Botao 
                type="button" 
                variante="secundario" 
                onClick={() => navigate('/habitos')}
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

export default FormularioHabito;
