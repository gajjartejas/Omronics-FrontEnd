
export interface IBaseConnect {
  connect: IBaseConnectId[] | IBaseConnectId
}

export interface IBaseConnectId {
  id: string
}

//////
export interface ICategory extends IBaseCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBaseCategory {
  name: string;
  description: string | null;
  parentId: number | null;
}

export interface IUser {
  id: number;
  username: string;
  profilePicture: string | null;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IManufacturer extends IBaseManufacturer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IBaseManufacturer {
  name: string;
  description: string | null;
  products?: IProduct[] | null;
}

export interface IProductResource {
  id: number;
  title: string | null;
  link: string | null;
  description: string | null;
  type: IProductResourceType;
  createdAt: Date;
  products: IProduct[];
}

export enum IProductResourceType {
  CATALOG,
  MANUAL,
  SOFTWARE,
  DRAWING,
}

export interface IProductImage {
  id: number;
  url: string | null;
  createdAt: Date;
  updatedAt: Date;
  products: IProduct[] | null;
}

export interface IBaseProduct {
  name: string;
  description: string | null;
  partNumber: string | null;
  modelNumber: string | null;
  categories: ICategory[] | IBaseConnect;
  images: IProductImage[] | IBaseConnect;
  resourcees: IProductResource[] | IBaseConnect;
  manufacturer: IManufacturer | null | IBaseConnect;
  manufacturerId?: number | null;
}

export interface IProduct extends IBaseProduct {
  id: number;
  name: string;
  description: string | null;
  partNumber: string | null;
  modelNumber: string | null;
  categories: ICategory[];
  images: IProductImage[];
  resourcees: IProductResource[];
  manufacturer: IManufacturer | null;
  createdAt: Date;
  updatedAt: Date;
  manufacturerId: number | null;
}
