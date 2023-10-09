import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { IUser } from '../services/api-service/user/types';

interface IUserDataStore {
  profilePicture: string | null;
  email: string | null;
  lastname: string | null;
  firstname: string | null;
  isAdmin: boolean | null;
  id: number | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  token: string | null;

  setData: (user: IUser) => void;
  clear: () => void;
}

const useUserDataStore = create<IUserDataStore>()(
  devtools(
    persist(
      set => ({
        profilePicture: null,
        email: null,
        lastname: null,
        firstname: null,
        isAdmin: null,
        id: null,
        createdAt: null,
        updatedAt: null,
        token: null,
        setData: (user: IUser) =>
          set(state => {
            return { ...state, ...user };
          }),
        clear: () =>
          set(state => {
            return {
              profilePicture: null,
              email: null,
              lastname: null,
              firstname: null,
              isAdmin: null,
              id: null,
              createdAt: null,
              updatedAt: null,
              token: null,
            };
          }),
      }),
      {
        name: 'user-data-storage',
      },
    ),
  ),
);

export default useUserDataStore;
