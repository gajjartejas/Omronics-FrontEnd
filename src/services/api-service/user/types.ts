export interface IBaseUser {
  username: string;
  profilePicture: string | null;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  isAdmin: boolean;
}

export interface IUser extends IBaseUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
