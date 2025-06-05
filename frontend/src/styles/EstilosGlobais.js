import { createGlobalStyle } from 'styled-components';

const EstilosGlobais = createGlobalStyle`
  :root {
    --primary-bg: #121930;  /* Fundo azul escuro */
    --secondary-bg: #1a2440;  /* Fundo azul um pouco mais claro para cards */
    --accent-blue: #1e90ff;  /* Azul vibrante para destaques */
    --text-color: #ffffff;  /* Texto branco */
    --text-muted: #8c96a8;  /* Texto cinza para elementos menos importantes */
    --border-radius: 8px;  /* Cantos arredondados como visto nos cards */
    --dot-color-1: #ff5f57;  /* Cor do primeiro círculo na UI */
    --dot-color-2: #febc2e;  /* Cor do segundo círculo na UI */
    --dot-color-3: #28c840;  /* Cor do terceiro círculo na UI */
    --task-blue: #387ff3;  /* Azul para tarefas */
    --task-orange: #ff9800;  /* Laranja para tarefas */
    --task-red: #f44336;  /* Vermelho para prioridades altas */
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--primary-bg);
    color: var(--text-color);
    font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default EstilosGlobais;
