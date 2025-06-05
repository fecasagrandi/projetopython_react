import React from 'react';
import { MensagemContainer } from './styles';

const Mensagem = ({ tipo = 'info', children }) => {
  return (
    <MensagemContainer tipo={tipo}>
      {children}
    </MensagemContainer>
  );
};

export default Mensagem;
