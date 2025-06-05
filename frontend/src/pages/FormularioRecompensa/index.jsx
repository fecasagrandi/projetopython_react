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
import { BuscarRecompensas, CriarRecompensa, AtualizarRecompensa, ObterUsuarioAtual, DesconquistarRecompensa } from '../../services/ApiService';

const FormularioRecompensa = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Titulo_Recompensa: '',
    Descricao: '',
    Pontos: 10,
    Status: 'disponivel'
  });
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const carregarRecompensa = async () => {
      if (!id) return;
      
      setCarregando(true);
      try {
        const recompensas = await BuscarRecompensas();
        const recompensa = recompensas.find(r => r.id === parseInt(id));
        
        if (recompensa) {
          setFormData({
            Titulo_Recompensa: recompensa.Titulo_Recompensa,
            Descricao: recompensa.Descricao || '',
            Pontos: recompensa.Pontos,
            Status: recompensa.Status || 'disponivel',
            Usuario: recompensa.Usuario
          });
        } else {
          setErro("Recompensa não encontrada");
        }
      } catch (error) {
        setErro("Falha ao carregar recompensa. Por favor, tente novamente.");
      } finally {
        setCarregando(false);
      }
    };
    
    carregarRecompensa();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: name === 'Pontos' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro(null);
    
    try {
      const usuarioAtual = ObterUsuarioAtual();
      if (!usuarioAtual) {
        setErro("Você precisa estar autenticado para criar ou editar recompensas.");
        navigate('/login');
        return;
      }
      
      const dadosCompletos = {
        ...formData,
        Usuario: usuarioAtual.id
      };
      
      if (id) {
        const recompensas = await BuscarRecompensas();
        const recompensaAtual = recompensas.find(r => r.id === parseInt(id));
        
        if (recompensaAtual && recompensaAtual.Status === 'conquistada' && formData.Status === 'disponivel') {
          try {
            await DesconquistarRecompensa(id);
          } catch (desconquistarError) {

          }
        }
        
        await AtualizarRecompensa(id, dadosCompletos);
      } else {
        await CriarRecompensa(dadosCompletos);
      }
      
      navigate('/recompensas');
    } catch (error) {
      setErro("Falha ao salvar recompensa. Por favor, tente novamente.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <Container>
      <h1>{id ? 'Editar Recompensa' : 'Nova Recompensa'}</h1>
      
      {erro && <p style={{ color: 'var(--task-red)', textAlign: 'center' }}>{erro}</p>}
      
      <FormContainer>
        <Cartao titulo="Detalhes da Recompensa">
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="Titulo_Recompensa">Título*</Label>
              <Input
                type="text"
                id="Titulo_Recompensa"
                name="Titulo_Recompensa"
                value={formData.Titulo_Recompensa}
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
              <Label htmlFor="Pontos">Pontos Necessários*</Label>
              <Input
                type="number"
                id="Pontos"
                name="Pontos"
                value={formData.Pontos}
                onChange={handleChange}
                min="1"
                required
              />
            </FormGroup>
            
            {id && (
              <FormGroup>
                <Label htmlFor="Status">Status</Label>
                <Select
                  id="Status"
                  name="Status"
                  value={formData.Status}
                  onChange={handleChange}
                >
                  <option value="disponivel">Disponível</option>
                  <option value="conquistada">Conquistada</option>
                </Select>
              </FormGroup>
            )}
            
            <BotoesContainer>
              <Botao 
                type="button" 
                variante="secundario" 
                onClick={() => navigate('/recompensas')}
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

export default FormularioRecompensa;
