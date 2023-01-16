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

const addCategory = (data: IBaseCategory): Promise<ICategory | null> => {
  let response = APIClient.post<ICategory, { data: IBaseCategory }>(`/categories`, { data });
  return response;
};

const updateCategory = (id: number, data: ICategory): Promise<ICategory | null> => {
  let response = APIClient.patch<ICategory, { data: ICategory }>(`/categories/${id}`, { data });
  return response;
};

const deleteCategory = (id: number): Promise<ICategory | null> => {
  let response = APIClient.delete<ICategory>(`/categories/${id}`);
  return response;
};

const CategoryService = { getCategories, getCategoryById, addCategory, updateCategory, deleteCategory };
export default CategoryService;
