import React from 'react';
import { CartaoContainer, CartaoCabecalho, CartaoTitulo, CartaoPontos, CartaoConteudo } from './styles';

const Cartao = ({ titulo, children, pontos }) => {
  return (
    <CartaoContainer>
      <CartaoCabecalho>
        <CartaoTitulo>{titulo}</CartaoTitulo>
        {pontos && <CartaoPontos>{pontos} pontos</CartaoPontos>}
      </CartaoCabecalho>
      <CartaoConteudo>
        {children}
      </CartaoConteudo>
    </CartaoContainer>
  );
};

export default Cartao;
