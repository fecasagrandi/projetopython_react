# Frontend React do Kaizen

Este é o frontend React para o aplicativo Kaizen, um gerenciador de tarefas gamificado.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- `src/components`: Componentes reutilizáveis
- `src/pages`: Páginas da aplicação
- `src/services`: Serviços para comunicação com a API
- `src/styles`: Estilos globais
- `public`: Arquivos estáticos

## Funcionalidades

- Gerenciamento de tarefas (listar, criar, editar, excluir)
- Gerenciamento de hábitos (listar, criar, editar, excluir)
- Gerenciamento de recompensas (listar, criar, editar, excluir)
- Gerenciamento de categorias (listar, criar, editar, excluir)

## Tecnologias Utilizadas

- React
- React Router
- Styled Components
- Axios

## Como Acessar
Depois de instalar as dependências, realizar o migrate e iniciar o frontend com npm start e o back com python manage.py runserver

1. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## Observações

- Este frontend consome a API Django REST Framework do Kaizen
- O proxy está configurado para apontar para `localhost:8000` onde o backend deve estar rodando
