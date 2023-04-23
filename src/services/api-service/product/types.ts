//Product Image
import { ICategory } from '../category/types';
import { IBaseConnect, IBaseCreate, IBaseCreateOrConnect, IBaseSet } from '../types';
import { IProductResource } from '../product-resource/types';
import { IManufacturer } from '../manufacturer/types';

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
  featured: boolean;
  active: boolean;
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
