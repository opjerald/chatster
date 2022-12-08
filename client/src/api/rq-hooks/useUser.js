import api from '../api';

export const signUp = async (data) => {
  return await api().post('/users', { user: data });
};

export const getUsers = async () => {
  const res = api().get('/users');
  return res.data;
};
