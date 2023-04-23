import APIClient from '../../client';
import { IProductResource } from './types';

const getProductResources = (): Promise<IProductResource[] | null> => {
  return APIClient.get<IProductResource[]>('/productResources');
};

const getProductResourceById = (id: number): Promise<IProductResource | null> => {
  return APIClient.get<IProductResource>(`/productResources/${id}`);
};

const addProductResource = (data: IProductResource): Promise<IProductResource | null> => {
  return APIClient.post<IProductResource, { data: IProductResource }>(`/productResources`, { data });
};

const updateProductResource = (id: number, data: IProductResource): Promise<IProductResource | null> => {
  return APIClient.patch<IProductResource, { data: IProductResource }>(`/productResources/${id}`, { data });
};

const deleteProductResource = (id: number): Promise<IProductResource | null> => {
  return APIClient.delete<IProductResource>(`/productResources/${id}`);
};

const ProductResourceService = {
  getProductResources,
  getProductResourceById,
  addProductResource,
  updateProductResource,
  deleteProductResource,
};
export default ProductResourceService;
