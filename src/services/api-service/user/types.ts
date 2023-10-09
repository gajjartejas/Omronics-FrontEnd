export interface IBaseUser extends IUserCredentials {
  profilePicture: string | null;
  email: string;
  lastname: string;
  firstname: string;
  isAdmin: boolean;
}

export interface IUser extends IBaseUser {
  id: number;
  token: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCredentials {
  username: string;
  password: string;
}
