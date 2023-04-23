import APIClient from '../../client';
import { ICategoryImage } from './types';

const getCategoryImages = (): Promise<ICategoryImage[] | null> => {
  return APIClient.get<ICategoryImage[]>('/categoryImages');
};

const getCategoryImageById = (id: number): Promise<ICategoryImage | null> => {
  return APIClient.get<ICategoryImage>(`/categoryImages/${id}`);
};

const addCategoryImage = (data: ICategoryImage): Promise<ICategoryImage | null> => {
  return APIClient.post<ICategoryImage, { data: ICategoryImage }>(`/categoryImages`, { data });
};

const updateCategoryImage = (id: number, data: ICategoryImage): Promise<ICategoryImage | null> => {
  return APIClient.patch<ICategoryImage, { data: ICategoryImage }>(`/categoryImages/${id}`, { data });
};

const deleteCategoryImage = (id: number): Promise<ICategoryImage | null> => {
  return APIClient.delete<ICategoryImage>(`/categoryImages/${id}`);
};

const CategoryImageService = {
  getCategoryImages,
  getCategoryImageById,
  addCategoryImage,
  updateCategoryImage,
  deleteCategoryImage,
};
export default CategoryImageService;
