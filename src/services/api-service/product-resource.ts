import APIClient from 'services/client';
import { IProductResource } from './types';

const getProductResources = (): Promise<IProductResource[] | null> => {
  let response = APIClient.get<IProductResource[]>('/productResources');
  return response;
};

const getProductResourceById = (id: number): Promise<IProductResource | null> => {
  let response = APIClient.get<IProductResource>(`/productResources/${id}`);
  return response;
};

const addProductResource = (data: IProductResource): Promise<IProductResource | null> => {
  let response = APIClient.post<IProductResource, { data: IProductResource }>(`/productResources`, { data });
  return response;
};

const updateProductResource = (id: number, data: IProductResource): Promise<IProductResource | null> => {
  let response = APIClient.patch<IProductResource, { data: IProductResource }>(`/productResources/${id}`, { data });
  return response;
};

const deleteProductResource = (id: number): Promise<IProductResource | null> => {
  let response = APIClient.delete<IProductResource>(`/productResources/${id}`);
  return response;
};

const ProductResourceService = { getProductResources, getProductResourceById, addProductResource, updateProductResource, deleteProductResource };
export default ProductResourceService;
