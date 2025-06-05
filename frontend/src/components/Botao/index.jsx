import React from 'react';
import { BotaoEstilizado } from './styles';

const Botao = ({ children, variante = 'primario', ...props }) => {
  return (
    <BotaoEstilizado 
      variante={variante} 
      {...props}
    >
      {children}
    </BotaoEstilizado>
  );
};

export default Botao;
