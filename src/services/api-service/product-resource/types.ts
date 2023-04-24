//Resource
import { IProduct } from '../product/types';

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

export enum IProductResourceType {
  CATALOG,
  MANUAL,
  SOFTWARE,
  DRAWING,
}
