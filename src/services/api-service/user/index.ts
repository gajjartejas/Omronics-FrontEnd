import APIClient from '../../client';
import { IUser, IUserCredentials } from './types';

const getUsers = (): Promise<IUser[] | null> => {
  return APIClient.get<IUser[]>('/users');
};

const getUserById = (id: number): Promise<IUser | null> => {
  return APIClient.get<IUser>(`/users/${id}`);
};

const addUser = (data: IUser): Promise<IUser | null> => {
  return APIClient.post<IUser, { data: IUser }>(`/users`, { data });
};

const updateUser = (id: number, data: IUser): Promise<IUser | null> => {
  return APIClient.patch<IUser, { data: IUser }>(`/users/${id}`, { data });
};

const deleteUser = (id: number): Promise<IUser | null> => {
  return APIClient.delete<IUser>(`/users/${id}`);
};

const loginUser = (data: IUserCredentials): Promise<IUser | null> => {
  return APIClient.post<IUser, { data: IUserCredentials }>(`/users/login`, { data });
};

const UserService = { getUsers, getUserById, addUser, updateUser, deleteUser, loginUser };
export default UserService;
