import APIClient from 'services/client';
import { IBaseManufacturer, IManufacturer } from './types';

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

const updateManufacture = (id: number, data: IManufacturer): Promise<IManufacturer | null> => {
  let response = APIClient.patch<IManufacturer, { data: IManufacturer }>(`/manufacturers/${id}`, { data });
  return response;
};

const deleteManufacture = (id: number): Promise<IManufacturer | null> => {
  let response = APIClient.delete<IManufacturer>(`/manufacturers/${id}`);
  return response;
};

const ManufacturerService = {
  getManufacturers,
  getManufactureById,
  addManufacture,
  updateManufacture,
  deleteManufacture,
};
export default ManufacturerService;
