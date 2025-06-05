import React from 'react';
import { CarregandoContainer, Spinner, Texto } from './styles';

const Carregando = ({ texto = 'Carregando...' }) => {
  return (
    <CarregandoContainer>
      <Spinner />
      {texto && <Texto>{texto}</Texto>}
    </CarregandoContainer>
  );
};

export default Carregando;
