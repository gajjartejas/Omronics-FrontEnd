import APIClient from 'services/client';
import { IUser } from './types';

const getUsers = (): Promise<IUser[] | null> => {
  let response = APIClient.get<IUser[]>('/users');
  return response;
};

const getUserById = (id: number): Promise<IUser | null> => {
  let response = APIClient.get<IUser>(`/users/${id}`);
  return response;
};

const addUser = (data: IUser): Promise<IUser | null> => {
  let response = APIClient.post<IUser, { data: IUser }>(`/users`, { data });
  return response;
};

const updateUser = (id: number, data: IUser): Promise<IUser | null> => {
  let response = APIClient.patch<IUser, { data: IUser }>(`/users/${id}`, { data });
  return response;
};

const deleteUser = (id: number): Promise<IUser | null> => {
  let response = APIClient.delete<IUser>(`/users/${id}`);
  return response;
};

const UserService = { getUsers, getUserById, addUser, updateUser, deleteUser };
export default UserService;
