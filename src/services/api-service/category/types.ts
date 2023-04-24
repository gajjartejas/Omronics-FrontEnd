//Category Image
import { IBaseConnect, IBaseCreate, IBaseCreateOrConnect, IBaseSet } from '../types';
import { IProduct } from '../product/types';
import { ICategoryImage } from '../category-image.ts/types';

//Category
export interface IBaseCategory {
  name: string;
  description: string | null;
  parentId: number | null;
  images: ICategoryImage[] | IBaseConnect | IBaseCreate | IBaseSet | IBaseCreateOrConnect;
  featured: boolean;
  active: boolean;
}

export interface ICategory extends IBaseCategory {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  images: ICategoryImage[];
  product?: IProduct[];
}
