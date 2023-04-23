//Manufacturer
import { IProduct } from '../product/types';

export interface IBaseManufacturer {
  name: string;
  description: string | null;
  products?: IProduct[] | null;
  featured: boolean;
  active: boolean;
}

export interface IManufacturer extends IBaseManufacturer {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
