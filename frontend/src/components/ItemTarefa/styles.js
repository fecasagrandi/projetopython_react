import styled, { css } from 'styled-components';

export const TarefaContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

export const TarefaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const TarefaStatus = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 2px solid ${props => props.concluida ? 'var(--accent-blue)' : 'var(--text-muted)'};
  background-color: ${props => props.concluida ? 'var(--accent-blue)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    border-color: var(--accent-blue);
    transform: scale(1.05);
  }
  
  ${props => props.concluida && css`
    &:after {
      content: '';
      position: absolute;
      top: 45%;
      left: 50%;
      width: 6px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: translate(-50%, -50%) rotate(45deg);
    }
  `}
`;

export const TarefaConteudo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const TarefaTitulo = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  color: var(--text-color);
  text-decoration: ${props => props.concluida ? 'line-through' : 'none'};
  opacity: ${props => props.concluida ? 0.7 : 1};
`;

export const TarefaDescricao = styled.p`
  font-size: 0.875rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
`;

export const TarefaMetadata = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
`;

export const TarefaPrioridade = styled.span`
  padding: 0.25rem 0.625rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  
  ${props => props.prioridade === 'alta' && css`
    background-color: var(--task-red);
    color: white;
  `}
  
  ${props => props.prioridade === 'media' && css`
    background-color: var(--task-orange);
    color: white;
  `}
  
  ${props => props.prioridade === 'baixa' && css`
    background-color: var(--task-blue);
    color: white;
  `}
`;

export const TarefaAcoes = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const TarefaCategorias = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

export const CategoriaTag = styled.span`
  background-color: var(--accent-blue);
  color: white;
  font-size: 0.7rem;
  padding: 0.15rem 0.5rem;
  border-radius: 10px;
  display: inline-block;
`;
