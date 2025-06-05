import React from 'react';
import { Link } from 'react-router-dom';
import {
  RecompensaContainer,
  RecompensaInfo,
  RecompensaTitulo,
  RecompensaDescricao,
  RecompensaPontos,
  RecompensaStatus,
  RecompensaAcoes
} from './styles';
import Botao from '../Botao';

const ItemRecompensa = ({ 
  recompensa, 
  onConquistar, 
  onDesconquistar,
  onExcluir,
  pontosUsuario = 0,
  disabled = false
}) => {
  const conquistada = recompensa.Status === 'conquistada';
  const pontosInsuficientes = pontosUsuario < recompensa.Pontos;

  return (
    <RecompensaContainer conquistada={conquistada}>
      <RecompensaInfo>
        <RecompensaTitulo conquistada={conquistada}>
          {recompensa.Titulo_Recompensa}
        </RecompensaTitulo>
        
        {recompensa.Descricao && (
          <RecompensaDescricao>
            {recompensa.Descricao}
          </RecompensaDescricao>
        )}
        
        <RecompensaPontos>
          {recompensa.Pontos} pontos
        </RecompensaPontos>
        
        {conquistada && (
          <RecompensaStatus>
            Conquistada
          </RecompensaStatus>
        )}
      </RecompensaInfo>
      
      <RecompensaAcoes>
        {!conquistada ? (
          <Botao 
            variante="primario" 
            onClick={() => onConquistar(recompensa.id)}
            disabled={disabled || pontosInsuficientes}
            title={pontosInsuficientes ? "Pontos insuficientes" : ""}
          >
            Conquistar
          </Botao>
        ) : (
          <Botao 
            variante="secundario" 
            onClick={() => onDesconquistar && onDesconquistar(recompensa.id)}
            disabled={disabled}
          >
            Desconquistar
          </Botao>
        )}
        
        <Link to={`/recompensas/editar/${recompensa.id}`}>
          <Botao variante="texto">
            Editar
          </Botao>
        </Link>
        
        <Botao 
          variante="texto" 
          onClick={() => onExcluir(recompensa.id)}
          disabled={disabled}
        >
          Excluir
        </Botao>
      </RecompensaAcoes>
    </RecompensaContainer>
  );
};

export default ItemRecompensa;
