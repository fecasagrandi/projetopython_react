import axios from 'axios';

const Api = axios.create({
  baseURL: '/api/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const FazerLogin = async (email, password) => {
  try {
    const response = await Api.post('/login/', { email, password });
    if (response.data.user) {
      localStorage.setItem('usuarioKaizen', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao fazer login' };
  }
};

export const FazerRegistro = async (nome, email, password) => {
  try {
    const response = await Api.post('/register/', { 
      Nome_Usuario: nome, 
      Email: email, 
      password: password 
    });
    if (response.data.user) {
      localStorage.setItem('usuarioKaizen', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao registrar usuário' };
  }
};

export const EVENTO_PONTOS_ATUALIZADOS = 'pontosUsuarioAtualizados';

export const notificarPontosAtualizados = (pontos) => {
  const evento = new CustomEvent(EVENTO_PONTOS_ATUALIZADOS, { detail: { pontos } });
  window.dispatchEvent(evento);
};

export const ObterUsuarioAtual = () => {
  try {
    const usuarioString = localStorage.getItem('usuarioKaizen');
    if (usuarioString) {
      return JSON.parse(usuarioString);
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const FazerLogout = () => {
  localStorage.removeItem('usuarioKaizen');
};

// Serviços de Tarefas
export const BuscarTarefas = async () => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.get(`/usuarios/${usuario.id}/tarefas/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao buscar tarefas' };
  }
};

export const CriarTarefa = async (tarefaData) => {
  try {
    const response = await Api.post('/tarefas/', tarefaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao criar tarefa' };
  }
};

export const AtualizarTarefa = async (id, tarefaData) => {
  try {
    const response = await Api.put(`/tarefas/${id}/`, tarefaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao atualizar tarefa' };
  }
};

export const ExcluirTarefa = async (id) => {
  try {
    await Api.delete(`/tarefas/${id}/`);
    return true;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao excluir tarefa' };
  }
};

export const AdicionarCategoriaTarefa = async (tarefaId, categoriaId) => {
  try {
    const tarefa = parseInt(tarefaId);
    const categoria = parseInt(categoriaId);
    
    const response = await Api.post(`/tarefas/${tarefa}/adicionar_categoria/`, { categoria_id: categoria });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error.response || error);
    throw error.response?.data || { error: 'Erro ao adicionar categoria à tarefa' };
  }
};

export const RemoverCategoriaTarefa = async (tarefaId, categoriaId) => {
  try {
    const response = await Api.post(`/tarefas/${tarefaId}/remover_categoria/`, { categoria_id: categoriaId });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao remover categoria da tarefa' };
  }
};

// Serviços de Hábitos
export const BuscarHabitos = async () => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.get(`/usuarios/${usuario.id}/habitos/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao buscar hábitos' };
  }
};

export const CriarHabito = async (habitoData) => {
  try {
    const response = await Api.post('/habitos/', habitoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao criar hábito' };
  }
};

export const AtualizarHabito = async (id, habitoData) => {
  try {
    const response = await Api.put(`/habitos/${id}/`, habitoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao atualizar hábito' };
  }
};

export const CompletarHabito = async (id) => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.post(`/habitos/${id}/completar/`);
    
    if (response.data && response.data.pontos_totais !== undefined) {
      const novosPontos = response.data.pontos_totais;
      const usuarioAtualizado = { ...usuario, Pontos: novosPontos };
      localStorage.setItem('usuarioKaizen', JSON.stringify(usuarioAtualizado));
      notificarPontosAtualizados(novosPontos);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao completar hábito' };
  }
};

export const ExcluirHabito = async (id) => {
  try {
    await Api.delete(`/habitos/${id}/`);
    return true;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao excluir hábito' };
  }
};

// Serviços de Recompensas
export const BuscarRecompensas = async () => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const todasRecompensasResponse = await Api.get('/recompensas/');
    const todasRecompensas = todasRecompensasResponse.data;
    
    const recompensasUsuarioResponse = await Api.get(`/usuarios/${usuario.id}/recompensas/`);
    const recompensasUsuario = recompensasUsuarioResponse.data;
    
    const idsRecompensasConquistadas = new Set(
      recompensasUsuario.map(recompensa => recompensa.id)
    );
    
    const recompensasProcessadas = todasRecompensas.map(recompensa => ({
      ...recompensa,
      Status: idsRecompensasConquistadas.has(recompensa.id) ? 'conquistada' : 'disponivel'
    }));
    
    return recompensasProcessadas;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao buscar recompensas' };
  }
};

export const CriarRecompensa = async (recompensaData) => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const { Usuario, ...dadosRecompensa } = recompensaData;
    
    const response = await Api.post('/recompensas/', dadosRecompensa);
    
    return response.data;
  } catch (error) {
    console.error('Erro detalhado ao criar recompensa:', error);
    throw error.response?.data || { error: 'Erro ao criar recompensa' };
  }
};

export const ConquistarRecompensa = async (id) => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.post(`/recompensas/${id}/conquistar/`, { usuario_id: usuario.id });
    
    if (response.data.pontos_restantes !== undefined) {
      const novosPontos = response.data.pontos_restantes;
      const usuarioAtualizado = { ...usuario, Pontos: novosPontos };
      localStorage.setItem('usuarioKaizen', JSON.stringify(usuarioAtualizado));
      notificarPontosAtualizados(novosPontos);
    }
    
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else if (error.status) {
      throw error;
    } else {
      throw { error: 'Erro ao conquistar recompensa' };
    }
  }
};

export const DesconquistarRecompensa = async (id) => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.delete(`/recompensas/${id}/desconquistar/`, { 
      data: { usuario_id: usuario.id } 
    });
    
    if (response.data && response.data.pontos_restantes !== undefined) {
      const novosPontos = response.data.pontos_restantes;
      const usuarioAtualizado = { ...usuario, Pontos: novosPontos };
      localStorage.setItem('usuarioKaizen', JSON.stringify(usuarioAtualizado));
      notificarPontosAtualizados(novosPontos);
    }
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao desconquistar recompensa' };
  }
};

export const AtualizarRecompensa = async (id, recompensaData) => {
  try {
    const response = await Api.put(`/recompensas/${id}/`, recompensaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao atualizar recompensa' };
  }
};

export const ExcluirRecompensa = async (id) => {
  try {
    await Api.delete(`/recompensas/${id}/`);
    return true;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao excluir recompensa' };
  }
};

// Serviços de Usuários
export const BuscarUsuarios = async () => {
  try {
    const response = await Api.get('/usuarios/');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao buscar usuários' };
  }
};

export const BuscarDadosUsuarioAtual = async () => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.get(`/usuarios/${usuario.id}/`);

    if (response.data) {
      localStorage.setItem('usuarioKaizen', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    throw error.response?.data || { error: 'Erro ao buscar usuário atual' };
  }
};

// Serviços de Categorias
export const BuscarCategorias = async () => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.get('/categorias/');
    
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao buscar categorias' };
  }
};

export const CriarCategoria = async (categoriaData) => {
  try {
    const { Usuario, ...dadosCategoria } = categoriaData;
    const response = await Api.post('/categorias/', dadosCategoria);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao criar categoria' };
  }
};

export const AtualizarCategoria = async (id, categoriaData) => {
  try {
    const response = await Api.put(`/categorias/${id}/`, categoriaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao atualizar categoria' };
  }
};

export const ExcluirCategoria = async (id) => {
  try {
    await Api.delete(`/categorias/${id}/`);
    return true;
  } catch (error) {
    throw error.response?.data || { error: 'Erro ao excluir categoria' };
  }
};

// Serviços de Estatísticas
export const BuscarEstatisticas = async (periodo = 'semana') => {
  try {
    const usuario = ObterUsuarioAtual();
    if (!usuario) throw { error: 'Usuário não autenticado' };
    
    const response = await Api.get(`/usuarios/${usuario.id}/estatisticas/?periodo=${periodo}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error.response?.data || { error: 'Erro ao buscar estatísticas' };
  }
};

export default Api;