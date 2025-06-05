import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import EstilosGlobais from './styles/EstilosGlobais';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <EstilosGlobais />
    <App />
  </React.StrictMode>
);
