import API from './api';

export const login = async (credentials) => {
  const res = await API.post('/auth/login', credentials);
  localStorage.setItem('token', res.data.token);
};

export const register = async (credentials) => {
  await API.post('/auth/register', credentials);
};
