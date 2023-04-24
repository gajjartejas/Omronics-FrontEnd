import { ICategory } from '../category/types';

export interface IBaseCategoryImage {
  url: string | null;
}

export interface ICategoryImage extends IBaseCategoryImage {
  id: number;
  categories: ICategory[] | null;
  createdAt: Date;
  updatedAt: Date;
}
