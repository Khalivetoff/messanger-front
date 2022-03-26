import client from '@/api/client';

export const registerUser = async (userData: {name: string, login: string, password: string}): Promise<void> => (
  await client.post('/user/register', userData)
)

export const loginUser = async (login: string, password: string): Promise<void> => (
  await client.get('/user/login', {
    params: { login, password }
  })
)
