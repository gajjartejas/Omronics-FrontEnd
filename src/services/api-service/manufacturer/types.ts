//Manufacturer
import { IProduct } from '../product/types';
import { IBaseConnect, IBaseCreate, IBaseCreateOrConnect, IBaseSet } from '../types';
import { ICategoryImage } from '../category/types';

export interface IBaseManufacturer {
  name: string;
  description: string | null;
  products?: IProduct[] | null;
  images: IBaseManufacturerImage[] | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
  featured: boolean;
  active: boolean;
}

export interface IManufacturer extends IBaseManufacturer {
  id: number;
  images: IManufacturerImage[];
  createdAt: Date;
  updatedAt: Date;
}

//Image
export interface IBaseManufacturerImage {
  url: string | null;
}

export interface IManufacturerImage extends IBaseManufacturerImage {
  id: number;
  manufacturers: IManufacturer[] | null;
  createdAt: Date;
  updatedAt: Date;
}
