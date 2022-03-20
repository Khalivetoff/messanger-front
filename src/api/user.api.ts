import client from '@/api/client';
// import { getHashedPassword } from '@/utils/argon.util';

export const registerUser = async (userData: {name: string, login: string, password: string}) => (
  await client.post('/user/register', userData)
)

export const loginUser = async (login: string, password: string) => (
  await client.get('/user/login', {
    params: { login, password }
  })
)
