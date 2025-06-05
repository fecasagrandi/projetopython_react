import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TarefaContainer, 
  TarefaInfo, 
  TarefaStatus, 
  TarefaConteudo, 
  TarefaTitulo, 
  TarefaDescricao,
  TarefaMetadata,
  TarefaPrioridade,
  TarefaAcoes,
  TarefaCategorias,
  CategoriaTag
} from './styles';
import Botao from '../Botao';

const ItemTarefa = ({ tarefa, onStatusChange, onDelete }) => {
  const getPrioridadeClasse = () => {
    switch (tarefa.Prioridade) {
      case 'alta':
        return 'alta';
      case 'media':
        return 'media';
      case 'baixa':
        return 'baixa';
      default:
        return 'media';
    }
  };

  const handleStatusToggle = () => {
    const novoStatus = tarefa.Status_Tarefa === 'concluida' ? 'pendente' : 'concluida';
    onStatusChange(tarefa.id, { ...tarefa, Status_Tarefa: novoStatus });
  };

  const formatarData = (dataString) => {
    if (!dataString) return '';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <TarefaContainer>
      <TarefaInfo>
        <TarefaStatus 
          concluida={tarefa.Status_Tarefa === 'concluida'} 
          onClick={handleStatusToggle}
        />
        <TarefaConteudo>
          <TarefaTitulo concluida={tarefa.Status_Tarefa === 'concluida'}>
            {tarefa.Titulo_Tarefa}
          </TarefaTitulo>
          <TarefaDescricao>
            {tarefa.Descricao && tarefa.Descricao.length > 100 
              ? `${tarefa.Descricao.substring(0, 100)}...` 
              : tarefa.Descricao
            }
          </TarefaDescricao>
          <TarefaMetadata>
            {tarefa.Data_Limite && (
              <span>Data Limite: {formatarData(tarefa.Data_Limite)}</span>
            )}
            
            {/* Exibir categorias da tarefa */}
            {tarefa.Categorias && tarefa.Categorias.length > 0 && (
              <TarefaCategorias>
                {tarefa.Categorias.map(categoria => (
                  <CategoriaTag key={categoria.id}>
                    {categoria.Nome_Categoria}
                  </CategoriaTag>
                ))}
              </TarefaCategorias>
            )}
          </TarefaMetadata>
        </TarefaConteudo>
      </TarefaInfo>
      
      <TarefaAcoes>
        <TarefaPrioridade prioridade={getPrioridadeClasse()}>
          {tarefa.Prioridade === 'alta' ? 'Alta' : tarefa.Prioridade === 'media' ? 'Média' : 'Baixa'}
        </TarefaPrioridade>
        
        <Link to={`/tarefas/editar/${tarefa.id}`}>
          <Botao variante="texto">Editar</Botao>
        </Link>
        
        <Botao variante="texto" onClick={() => onDelete(tarefa.id)}>
          Excluir
        </Botao>
      </TarefaAcoes>
    </TarefaContainer>
  );
};

export default ItemTarefa;
