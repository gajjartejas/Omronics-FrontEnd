import APIClient from '../../client';
import { IBaseProduct, IProduct } from './types';

const getProducts = (): Promise<IProduct[] | null> => {
  return APIClient.get<IProduct[]>('/products');
};

const getProductById = (id: number): Promise<IProduct | null> => {
  return APIClient.get<IProduct>(`/products/${id}`);
};

const addProduct = (data: IBaseProduct): Promise<IProduct | null> => {
  return APIClient.post<IProduct, { data: IBaseProduct }>(`/products`, { data });
};

const updateProduct = (id: number, data: IBaseProduct): Promise<IProduct | null> => {
  return APIClient.patch<IProduct, { data: IBaseProduct }>(`/products/${id}`, { data });
};

const deleteProduct = (id: number): Promise<IProduct | null> => {
  return APIClient.delete<IProduct>(`/products/${id}`);
};

const deleteProducts = (data: number[]): Promise<IProduct | null> => {
  return APIClient.post<IProduct, { data: number[] }>(`/products/deleteProducts`, { data });
};

const addFeaturedProducts = (data: number[]): Promise<IProduct | null> => {
  return APIClient.post<IProduct, { data: number[] }>(`/products/addFeaturedProducts`, { data });
};

const removeFeaturedProducts = (data: number[]): Promise<IProduct | null> => {
  return APIClient.post<IProduct, { data: number[] }>(`/products/removeFeaturedProducts`, { data });
};

const ProductService = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteProducts,
  addFeaturedProducts,
  removeFeaturedProducts,
};
export default ProductService;
