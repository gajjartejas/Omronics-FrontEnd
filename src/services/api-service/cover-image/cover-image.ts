import APIClient from '../../client';
import { IBaseCoverImage, ICoverImage } from './types';

const getCoverImages = (): Promise<ICoverImage[] | null> => {
  return APIClient.get<ICoverImage[]>('/coverImages');
};

const getCoverImageById = (id: number): Promise<ICoverImage | null> => {
  return APIClient.get<ICoverImage>(`/coverImages/${id}`);
};

const addCoverImage = (data: IBaseCoverImage): Promise<ICoverImage | null> => {
  return APIClient.post<ICoverImage, { data: IBaseCoverImage }>(`/coverImages`, { data });
};

const updateCoverImage = (id: number, data: IBaseCoverImage): Promise<ICoverImage | null> => {
  return APIClient.patch<ICoverImage, { data: IBaseCoverImage }>(`/coverImages/${id}`, { data });
};

const deleteCoverImage = (id: number): Promise<ICoverImage | null> => {
  return APIClient.delete<ICoverImage>(`/coverImages/${id}`);
};

const deleteCoverImages = (data: number[]): Promise<ICoverImage | null> => {
  return APIClient.post<ICoverImage, { data: number[] }>(`/coverImages/deleteCoverImages`, { data });
};

const CoverImageService = {
  getCoverImages,
  getCoverImageById,
  addCoverImage,
  updateCoverImage,
  deleteCoverImage,
  deleteCoverImages,
};

export default CoverImageService;
