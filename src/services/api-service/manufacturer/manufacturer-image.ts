import APIClient from '../../client';
import { IManufacturerImage } from './types';

const getManufacturerImages = (): Promise<IManufacturerImage[] | null> => {
  return APIClient.get<IManufacturerImage[]>('/manufacturerImages');
};

const getManufacturerImageById = (id: number): Promise<IManufacturerImage | null> => {
  return APIClient.get<IManufacturerImage>(`/manufacturerImages/${id}`);
};

const addManufacturerImage = (data: IManufacturerImage): Promise<IManufacturerImage | null> => {
  return APIClient.post<IManufacturerImage, { data: IManufacturerImage }>(`/manufacturerImages`, { data });
};

const updateManufacturerImage = (id: number, data: IManufacturerImage): Promise<IManufacturerImage | null> => {
  return APIClient.patch<IManufacturerImage, { data: IManufacturerImage }>(`/manufacturerImages/${id}`, { data });
};

const deleteManufacturerImage = (id: number): Promise<IManufacturerImage | null> => {
  return APIClient.delete<IManufacturerImage>(`/manufacturerImages/${id}`);
};

const ManufacturerImageService = {
  getManufacturerImages,
  getManufacturerImageById,
  addManufacturerImage,
  updateManufacturerImage,
  deleteManufacturerImage,
};

export default ManufacturerImageService;
