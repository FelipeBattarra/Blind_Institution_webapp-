import axios from 'axios';

const api = axios.create({
  baseURL: `https://sfitc-api.unifacef.com.br`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Tipagem para o agendamento
interface Agendamento {
  id: string;
  titulo: string;
  prestador: string;
  cliente: string;
  inicio: string;
  fim: string;
  descricao: string;
}
interface Cadastro {
  id: string;
  nome: string;
  'cpf-cnpj': string;
  rg: string;
  celular: string;
  email: string;
  endereco: string;
  'tipo-cadastro': string;
  observacoes: string;
}

// Função para obter todos os agendamentos
export const getAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    const response = await api.get('/agendamento');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter agendamentos:', error);
    throw error;
  }
};


export const getAgendamentoById = async (id: string): Promise<Agendamento> => {
  try {
    const response = await api.get(`/agendamento/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter agendamento com ID ${id}:`, error);
    throw error;
  }
};


export const createAgendamento = async (agendamento: Agendamento): Promise<Agendamento> => {
  try {
    const response = await api.post('/agendamento', agendamento);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    throw error;
  }
};


export const updateAgendamento = async (id: string, agendamento: Agendamento): Promise<Agendamento> => {
  try {
    const response = await api.put(`/agendamento/${id}`, agendamento);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar agendamento com ID ${id}:`, error);
    throw error;
  }
};


export const deleteAgendamento = async (id: string): Promise<void> => {
  try {
    await api.delete(`/agendamento/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar agendamento com ID ${id}:`, error);
    throw error;
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  
  // Opções para formatar a data
  const dateOptions: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  };

  // Opções para formatar a hora
  const timeOptions: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false 
  };

  const formattedDate = date.toLocaleDateString(undefined, dateOptions);
  const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

  return { date: formattedDate, time: formattedTime };
};

// Função para converter uma data no fuso horário local para UTC
const convertLocalToUTC = (dateString: string, timeString: string) => {
  // Cria a data com base no horário local
  const localDate = new Date(`${dateString}T${timeString}:00`);
  
  // Retorna o ISO string em UTC (automaticamente ajusta para UTC)
  return localDate.toISOString();
};

export const getAgendamentosByFilters = async (
  nome?: string,
  cliente?: string,
  prestador?: string,
  data?: string,
  hora?: string
): Promise<Agendamento[]> => {
  try {
    const response = await api.get('/agendamento');
    let agendamentos: Agendamento[] = response.data;


    if (nome) {
      agendamentos = agendamentos.filter(agendamento => agendamento.titulo.includes(nome));
    }
    if (cliente) {
      agendamentos = agendamentos.filter(agendamento => agendamento.cliente === cliente);
    }
    if (prestador) {
      agendamentos = agendamentos.filter(agendamento => agendamento.prestador === prestador);
    }


    if (data && hora) {
      const dateTimeUTC = convertLocalToUTC(data, hora);
      agendamentos = agendamentos.filter(agendamento => {
        const inicio = new Date(agendamento.inicio).toISOString();
        const fim = new Date(agendamento.fim).toISOString();
        return dateTimeUTC >= inicio && dateTimeUTC <= fim;
      });
    }

    return agendamentos;
  } catch (error) {
    console.error('Erro ao filtrar agendamentos:', error);
    throw error;
  }
};

// Função para obter todos os cadastros
export const getCadastros = async (): Promise<Cadastro[]> => {
  try {
    const response = await api.get('/pessoaPrestador');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter cadastros:', error);
    throw error;
  }
};

// Função para obter um cadastro por ID
export const getCadastroById = async (id: string): Promise<Cadastro> => {
  try {
    const response = await api.get(`/pessoaPrestador/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao obter cadastro com ID ${id}:`, error);
    throw error;
  }
};

// Função para obter um cadastro por tipo
export const getCadastroByType = async (tipoCadastro: string): Promise<Cadastro[]> => {
  try {
    const response = await api.get(`/pessoaPrestador`, { params: { 'tipo-cadastro': tipoCadastro } });
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Erro ao obter cadastros do tipo ${tipoCadastro}:`, error);
    throw error;
  }
};

// Função para criar um novo cadastro
export const createCadastro = async (cadastro: Cadastro): Promise<Cadastro> => {
  try {
    const response = await api.post('/pessoaPrestador', cadastro);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cadastro:', error);
    throw error;
  }
};

// Função para atualizar um cadastro existente
export const updateCadastro = async (id: string, cadastro: Cadastro): Promise<Cadastro> => {
  try {
    const response = await api.put(`/pessoaPrestador/${id}`, cadastro);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cadastro com ID ${id}:`, error);
    throw error;
  }
};


export const deleteCadastro = async (id: string): Promise<void> => {
  try {
    await api.delete(`/pessoaPrestador/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar cadastro com ID ${id}:`, error);
    throw error;
  }
};

// Função para buscar cadastros por campos específicos
export const searchCadastros = async (
  id?: string, 
  cpfCnpj?: string, 
  tipoCadastro?: string, 
  email?: string
): Promise<Cadastro[]> => {
  try {
    // Monta os parâmetros de consulta dinamicamente
    const params: Record<string, string> = {};
    if (id) params.id = id;
    if (cpfCnpj) params['cpf-cnpj'] = cpfCnpj;
    if (tipoCadastro) params['tipo-cadastro'] = tipoCadastro;
    if (email) params.email = email;

    // Faz a requisição passando os parâmetros de consulta
    const response = await api.get('/pessoaPrestador', { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cadastros pelos campos:', error);
    throw error;
  }
};

export const getCadastrosByFilters = async (
  id?: string,
  cliente?: string,
  prestador?: string,
  tipo?: string
): Promise<Cadastro[]> => {
  try {
    const response = await api.get('/pessoaPrestador');
    let cadastros: Cadastro[] = response.data;

    if (id) {
      cadastros = cadastros.filter(cadastro => cadastro.id === id);
    }
    if (tipo) {
      cadastros = cadastros.filter(cadastro => cadastro['tipo-cadastro'] === tipo);
    }

    if (cliente || prestador) {
      const agendamentosResponse = await api.get('/agendamento');
      const agendamentos: Agendamento[] = agendamentosResponse.data;

      if (cliente) {
        const idsPrestadores = agendamentos
          .filter(agendamento => agendamento.cliente === cliente)
          .map(agendamento => agendamento.prestador);
        cadastros = cadastros.filter(cadastro => idsPrestadores.includes(cadastro.id));
      }

      if (prestador) {
        const idsClientes = agendamentos
          .filter(agendamento => agendamento.prestador === prestador)
          .map(agendamento => agendamento.cliente);
        cadastros = cadastros.filter(cadastro => idsClientes.includes(cadastro.id));
      }
    }

    return cadastros;
  } catch (error) {
    console.error('Erro ao filtrar cadastros:', error);
    throw error;
  }
};