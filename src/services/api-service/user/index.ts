import APIClient from '../../client';
import {IUser} from './types';

const getUsers = (): Promise<IUser[] | null> => {
  return APIClient.get<IUser[]>('/users');
};

const getUserById = (id: number): Promise<IUser | null> => {
  return APIClient.get<IUser>(`/users/${id}`);
};

const addUser = (data: IUser): Promise<IUser | null> => {
  return APIClient.post<IUser, { data: IUser }>(`/users`, {data});
};

const updateUser = (id: number, data: IUser): Promise<IUser | null> => {
  return APIClient.patch<IUser, { data: IUser }>(`/users/${id}`, {data});
};

const deleteUser = (id: number): Promise<IUser | null> => {
  return APIClient.delete<IUser>(`/users/${id}`);
};

const UserService = { getUsers, getUserById, addUser, updateUser, deleteUser };
export default UserService;
