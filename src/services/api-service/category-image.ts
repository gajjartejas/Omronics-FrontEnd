import APIClient from 'services/client';
import { ICategoryImage } from './types';

const getCategoryImages = (): Promise<ICategoryImage[] | null> => {
  let response = APIClient.get<ICategoryImage[]>('/categoryImages');
  return response;
};

const getCategoryImageById = (id: number): Promise<ICategoryImage | null> => {
  let response = APIClient.get<ICategoryImage>(`/categoryImages/${id}`);
  return response;
};

const addCategoryImage = (data: ICategoryImage): Promise<ICategoryImage | null> => {
  let response = APIClient.post<ICategoryImage, { data: ICategoryImage }>(`/categoryImages`, { data });
  return response;
};

const updateCategoryImage = (id: number, data: ICategoryImage): Promise<ICategoryImage | null> => {
  let response = APIClient.patch<ICategoryImage, { data: ICategoryImage }>(`/categoryImages/${id}`, { data });
  return response;
};

const deleteCategoryImage = (id: number): Promise<ICategoryImage | null> => {
  let response = APIClient.delete<ICategoryImage>(`/categoryImages/${id}`);
  return response;
};

const CategoryImageService = {
  getCategoryImages,
  getCategoryImageById,
  addCategoryImage,
  updateCategoryImage,
  deleteCategoryImage,
};
export default CategoryImageService;
