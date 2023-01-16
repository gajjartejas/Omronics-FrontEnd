import APIClient from 'services/client';
import { IProductImage } from './types';

const getProductImages = (): Promise<IProductImage[] | null> => {
  let response = APIClient.get<IProductImage[]>('/productImages');
  return response;
};

const getProductImageById = (id: number): Promise<IProductImage | null> => {
  let response = APIClient.get<IProductImage>(`/productImages/${id}`);
  return response;
};

const addProductImage = (data: IProductImage): Promise<IProductImage | null> => {
  let response = APIClient.post<IProductImage, { data: IProductImage }>(`/productImages`, { data });
  return response;
};

const updateProductImage = (id: number, data: IProductImage): Promise<IProductImage | null> => {
  let response = APIClient.patch<IProductImage, { data: IProductImage }>(`/productImages/${id}`, { data });
  return response;
};

const deleteProductImage = (id: number): Promise<IProductImage | null> => {
  let response = APIClient.delete<IProductImage>(`/productImages/${id}`);
  return response;
};

const ProductImageService = {
  getProductImages,
  getProductImageById,
  addProductImage,
  updateProductImage,
  deleteProductImage,
};
export default ProductImageService;
