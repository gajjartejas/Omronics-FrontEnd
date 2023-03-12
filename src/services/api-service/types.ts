export interface IBaseConnect {
  connect: IBaseConnectId[] | IBaseConnectId;
}

export interface IBaseCreate {
  create:
    | IBaseCategory[]
    | IBaseCategory
    | IBaseManufacturer[]
    | IBaseManufacturer
    | IBaseProduct[]
    | IBaseProduct
    | IBaseProductResource[]
    | IBaseProductResource
    | IBaseProductImage[]
    | IBaseProductImage;
}

export interface IBaseSet {
  set: IBaseConnectId | IBaseConnectId[];
}

export interface IBaseCreateOrConnect {
  connectOrCreate: IBaseConnectId | IBaseConnectId[];
}

export interface IBaseConnectId {
  id: number;
}

//Category Image
export interface IBaseCategoryImage {
  url: string | null;
}

export interface ICategoryImage extends IBaseCategoryImage {
  id: number;
  categories: ICategory[] | null;
  createdAt: Date;
  updatedAt: Date;
}

//Category
export interface ICategory extends IBaseCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  images: ICategoryImage[]
  product?: IProduct[]
}

export interface IBaseCategory {
  name: string;
  description: string | null;
  parentId: number | null;
  images: ICategoryImage[] | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
}

//User
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

//Manufacturer
export interface IBaseManufacturer {
  name: string;
  description: string | null;
  products?: IProduct[] | null;
}

export interface IManufacturer extends IBaseManufacturer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

//Resource
export interface IBaseProductResource {
  title: string | null;
  link: string | null;
  description: string | null;
  type: IProductResourceType;
}

export interface IProductResource extends IBaseProductResource {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  products: IProduct[];
}

//Product Image
export interface IBaseProductImage {
  url: string | null;
}

export interface IProductImage extends IBaseProductImage {
  id: number;
  products: IProduct[] | null;
  createdAt: Date;
  updatedAt: Date;
}

//Product
export interface IBaseProduct {
  name: string;
  description: string | null;
  partNumber: string | null;
  modelNumber: string | null;
  categories: ICategory[] | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
  images: IProductImage[] | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
  resourcees: IProductResource[] | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
  manufacturer: IManufacturer | null | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
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

export enum IProductResourceType {
  CATALOG,
  MANUAL,
  SOFTWARE,
  DRAWING,
}

//ContactData
export interface IBaseContactData {
  name: string;
  phoneNo: string | null;
  email: string;
  requirements: string;
}

export interface IContactData extends IBaseContactData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
