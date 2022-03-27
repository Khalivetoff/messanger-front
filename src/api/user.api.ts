import client from '@/api/client';
import { IUserPublic } from '@/models/user';

export const registerUser = async (userData: { name: string, login: string, password: string }): Promise<IUserPublic> => (
  (await client.post('/user/register', userData))?.data
);

export const loginUser = async (login: string, password: string): Promise<IUserPublic> => (
  (await client.get('/user/login', {
    params: {
      login,
      password
    }
  }))?.data
);

export const logoutUser = async (): Promise<void> => {
  await client.get('/user/logout');
}

export const getUserData = async (): Promise<IUserPublic> => (
  (await client.get('/user'))?.data
)

export const getUserList = async (): Promise<IUserPublic[]> => (
  (await client.get('/user/user-list'))?.data
)
