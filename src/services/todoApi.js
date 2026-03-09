import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/todos',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchAllTodos = async () => {
  const response = await api.get('/');
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post('/', todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await api.put(`/${id}`, todoData);
  return response.data;
};

export const toggleTodo = async (id) => {
  const response = await api.patch(`/${id}/toggle`);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};