import APIClient from '../../client';
import { IProductImage } from './types';

const getProductImages = (): Promise<IProductImage[] | null> => {
  return APIClient.get<IProductImage[]>('/productImages');
};

const getProductImageById = (id: number): Promise<IProductImage | null> => {
  return APIClient.get<IProductImage>(`/productImages/${id}`);
};

const addProductImage = (data: IProductImage): Promise<IProductImage | null> => {
  return APIClient.post<IProductImage, { data: IProductImage }>(`/productImages`, { data });
};

const updateProductImage = (id: number, data: IProductImage): Promise<IProductImage | null> => {
  return APIClient.patch<IProductImage, { data: IProductImage }>(`/productImages/${id}`, { data });
};

const deleteProductImage = (id: number): Promise<IProductImage | null> => {
  return APIClient.delete<IProductImage>(`/productImages/${id}`);
};

const ProductImageService = {
  getProductImages,
  getProductImageById,
  addProductImage,
  updateProductImage,
  deleteProductImage,
};

export default ProductImageService;
