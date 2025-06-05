import React from 'react';
import { Link } from 'react-router-dom';
import {
  HabitoContainer,
  HabitoInfo,
  HabitoTitulo,
  HabitoDescricao,
  HabitoFrequencia,
  HabitoPontos,
  HabitoAcoes
} from './styles';
import Botao from '../Botao';

const ItemHabito = ({ 
  habito, 
  onCompletar, 
  onExcluir,
  disabled = false
}) => {

  const formatarFrequencia = (frequencia) => {
    switch(frequencia) {
      case 'diario':
        return 'Diário';
      case 'semanal':
        return 'Semanal';
      case 'mensal':
        return 'Mensal';
      default:
        return frequencia;
    }
  };

  return (
    <HabitoContainer>
      <HabitoInfo>
        <HabitoTitulo>{habito.Nome_Habito}</HabitoTitulo>
        {habito.Descricao && <HabitoDescricao>{habito.Descricao}</HabitoDescricao>}
        
        <HabitoFrequencia>
          Frequência: {formatarFrequencia(habito.Frequencia)}
        </HabitoFrequencia>
        
        <HabitoPontos>
          {habito.Pontos_Conclusao} pontos por conclusão
        </HabitoPontos>
      </HabitoInfo>
      
      <HabitoAcoes>
        <Botao 
          variante="primario"
          onClick={() => onCompletar(habito.id)}
          disabled={disabled}
        >
          Completar
        </Botao>
        
        <Link to={`/habitos/editar/${habito.id}`}>
          <Botao variante="texto">Editar</Botao>
        </Link>
        
        <Botao 
          variante="texto"
          onClick={() => onExcluir(habito.id)}
          disabled={disabled}
        >
          Excluir
        </Botao>
      </HabitoAcoes>
    </HabitoContainer>
  );
};

export default ItemHabito;
