import axios, { AxiosError } from "axios";

// LINK do Codespace no backend, ex.:
const baseURL = "http://localhost:5000/api";

const api = axios.create({ baseURL });

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Interface para respostas da API
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
}

// Autenticação
export async function loginUser(email: string, password: string): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>("/auth/login", { email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login");
    }
    throw error;
  }
}

export async function registerUser(email: string, password: string): Promise<ApiResponse> {
  try {
    const { data } = await api.post<ApiResponse>("/auth/register", { email, password });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao registrar usuário");
    }
    throw error;
  }
}

// Plano de aula
export async function gerarPlanoAula(formData: any): Promise<string> {
  try {
    const { data } = await api.post<ApiResponse<string>>("/plano_aula", formData);
    return data.data || "";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao gerar plano de aula");
    }
    throw error;
  }
}

// Questões
export async function gerarQuestoes(formData: any): Promise<string> {
  try {
    const { data } = await api.post<ApiResponse<string>>("/questoes", formData);
    return data.data || "";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao gerar questões");
    }
    throw error;
  }
}

// Assunto Contextualizado
export async function gerarAssuntoContextualizado(formData: any): Promise<string> {
  try {
    const { data } = await api.post<ApiResponse<string>>("/assunto_contextualizado", formData);
    return data.data || "";
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao gerar assunto contextualizado");
    }
    throw error;
  }
}

export default api;
