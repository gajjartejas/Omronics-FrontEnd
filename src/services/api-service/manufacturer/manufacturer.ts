import APIClient from '../../client';
import { IBaseManufacturer, IManufacturer } from './types';

const getManufacturers = (): Promise<IManufacturer[] | null> => {
  return APIClient.get<IManufacturer[]>('/manufacturers');
};

const getManufactureById = (id: number): Promise<IManufacturer | null> => {
  return APIClient.get<IManufacturer>(`/manufacturers/${id}`);
};

const addManufacture = (data: IBaseManufacturer): Promise<IManufacturer | null> => {
  return APIClient.post<IManufacturer, { data: IBaseManufacturer }>(`/manufacturers`, { data });
};

const updateManufacture = (id: number, data: IBaseManufacturer): Promise<IManufacturer | null> => {
  return APIClient.patch<IManufacturer, { data: IBaseManufacturer }>(`/manufacturers/${id}`, { data });
};

const deleteManufacturer = (id: number): Promise<IManufacturer | null> => {
  return APIClient.delete<IManufacturer>(`/manufacturers/${id}`);
};

const deleteManufacturers = (data: number[]): Promise<IManufacturer | null> => {
  return APIClient.post<IManufacturer, { data: number[] }>(`/manufacturers/deleteManufacturers`, { data });
};

const addFeaturedManufacturers = (data: number[]): Promise<IManufacturer | null> => {
  return APIClient.post<IManufacturer, { data: number[] }>(`/manufacturers/addFeaturedManufacturers`, { data });
};

const removeFeaturedManufacturers = (data: number[]): Promise<IManufacturer | null> => {
  return APIClient.post<IManufacturer, { data: number[] }>(`/manufacturers/removeFeaturedManufacturers`, { data });
};

const ManufacturerService = {
  getManufacturers,
  getManufactureById,
  addManufacture,
  updateManufacture,
  deleteManufacturer,
  deleteManufacturers,
  addFeaturedManufacturers,
  removeFeaturedManufacturers
};

export default ManufacturerService;
