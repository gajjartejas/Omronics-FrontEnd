import APIClient from 'services/client';
import {IBaseManufacturer, ICategory, IManufacturer} from './types';

const getManufacturers = (): Promise<IManufacturer[] | null> => {
  let response = APIClient.get<IManufacturer[]>('/manufacturers');
  return response;
};

const getManufactureById = (id: number): Promise<IManufacturer | null> => {
  let response = APIClient.get<IManufacturer>(`/manufacturers/${id}`);
  return response;
};

const addManufacture = (data: IBaseManufacturer): Promise<IManufacturer | null> => {
  let response = APIClient.post<IManufacturer, { data: IBaseManufacturer }>(`/manufacturers`, { data });
  return response;
};

const updateManufacture = (id: number, data: IBaseManufacturer): Promise<IManufacturer | null> => {
  let response = APIClient.patch<IManufacturer, { data: IBaseManufacturer }>(`/manufacturers/${id}`, { data });
  return response;
};

const deleteManufacturer = (id: number): Promise<IManufacturer | null> => {
  let response = APIClient.delete<IManufacturer>(`/manufacturers/${id}`);
  return response;
};

const deleteManufacturers = (data: number[]): Promise<IManufacturer | null> => {
  let response = APIClient.post<IManufacturer, { data:  number[] }>(`/manufacturers/deleteManufacturers`, { data });
  return response;
};

const ManufacturerService = {
  getManufacturers,
  getManufactureById,
  addManufacture,
  updateManufacture,
  deleteManufacturer,
  deleteManufacturers
};
export default ManufacturerService;
