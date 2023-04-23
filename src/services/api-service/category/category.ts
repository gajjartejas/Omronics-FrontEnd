import APIClient from '../../client';
import { IBaseCategory, ICategory } from './types';

const getCategories = (): Promise<ICategory[] | null> => {
  return APIClient.get<ICategory[]>('/categories');
};

const getCategoryById = (id: number): Promise<ICategory | null> => {
  return APIClient.get<ICategory>(`/categories/${id}`);
};

const getChildCategoriesById = (id: number): Promise<ICategory[] | null> => {
  return APIClient.get<ICategory[]>(`/categories/children/${id}`);
};

const getProductsByCategoryId = (id: number): Promise<ICategory | null> => {
  return APIClient.get<ICategory>(`/categories/${id}/products`);
};

const addCategory = (data: IBaseCategory): Promise<ICategory | null> => {
  return APIClient.post<ICategory, { data: IBaseCategory }>(`/categories`, { data });
};

const updateCategory = (id: number, data: IBaseCategory): Promise<ICategory | null> => {
  return APIClient.patch<ICategory, { data: IBaseCategory }>(`/categories/${id}`, { data });
};

const deleteCategory = (id: number): Promise<ICategory | null> => {
  return APIClient.delete<ICategory>(`/categories/${id}`);
};

const deleteCategories = (data: number[]): Promise<ICategory | null> => {
  return APIClient.post<ICategory, { data: number[] }>(`/categories/deleteCategories`, { data });
};

const CategoryService = {
  getCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteCategories,
  getChildCategoriesById,
  getProductsByCategoryId,
};
export default CategoryService;
