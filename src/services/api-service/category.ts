import APIClient from 'services/client';
import { IBaseCategory, ICategory } from './types';

const getCategories = (): Promise<ICategory[] | null> => {
  let response = APIClient.get<ICategory[]>('/categories');
  return response;
};

const getCategoryById = (id: number): Promise<ICategory | null> => {
  let response = APIClient.get<ICategory>(`/categories/${id}`);
  return response;
};

const getChildCategoriesById = (id: number): Promise<ICategory[] | null> => {
  let response = APIClient.get<ICategory[]>(`/categories/children/${id}`);
  return response;
};

const getProductsByCategoryId = (id: number): Promise<ICategory | null> => {
  let response = APIClient.get<ICategory>(`/categories/${id}/products`);
  return response;
};

const addCategory = (data: IBaseCategory): Promise<ICategory | null> => {
  let response = APIClient.post<ICategory, { data: IBaseCategory }>(`/categories`, { data });
  return response;
};

const updateCategory = (id: number, data: IBaseCategory): Promise<ICategory | null> => {
  let response = APIClient.patch<ICategory, { data: IBaseCategory }>(`/categories/${id}`, { data });
  return response;
};

const deleteCategory = (id: number): Promise<ICategory | null> => {
  let response = APIClient.delete<ICategory>(`/categories/${id}`);
  return response;
};

const deleteCategories = (data: number[]): Promise<ICategory | null> => {
  let response = APIClient.post<ICategory, { data: number[] }>(`/categories/deleteCategories`, { data });
  return response;
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
