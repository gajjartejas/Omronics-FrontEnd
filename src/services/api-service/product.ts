import APIClient from 'services/client';
import { IBaseProduct, IProduct } from './types';

const getProducts = (): Promise<IProduct[] | null> => {
  let response = APIClient.get<IProduct[]>('/products');
  return response;
};

const getProductById = (id: number): Promise<IProduct | null> => {
  let response = APIClient.get<IProduct>(`/products/${id}`);
  return response;
};

const addProduct = (data: IBaseProduct): Promise<IProduct | null> => {
  let response = APIClient.post<IProduct, { data: IBaseProduct }>(`/products`, { data });
  return response;
};

const updateProduct = (id: number, data: IProduct): Promise<IProduct | null> => {
  let response = APIClient.patch<IProduct, { data: IProduct }>(`/products/${id}`, { data });
  return response;
};

const deleteProduct = (id: number): Promise<IProduct | null> => {
  let response = APIClient.delete<IProduct>(`/products/${id}`);
  return response;
};

const ProductService = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
export default ProductService;
