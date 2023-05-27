import APIClient from '../../client';
import { IBaseStaticPageData, IStaticPageData, IStaticPageDataUpdate } from './types';

const getStaticPageDatum = (): Promise<IStaticPageData[] | null> => {
  return APIClient.get<IStaticPageData[]>('/staticPageDatum');
};

const getStaticPageDataById = (id: number): Promise<IStaticPageData | null> => {
  return APIClient.get<IStaticPageData>(`/staticPageDatum/${id}`);
};

const addStaticPageData = (data: IBaseStaticPageData): Promise<IStaticPageData | null> => {
  return APIClient.post<IStaticPageData, { data: IBaseStaticPageData }>(`/staticPageDatum`, { data });
};

const updateStaticPageData = (id: number, data: string): Promise<IStaticPageData | null> => {
  return APIClient.patch<IStaticPageData, { data: string }>(`/staticPageDatum/${id}`, { data });
};

const deleteStaticPageData = (id: number): Promise<IStaticPageData | null> => {
  return APIClient.delete<IStaticPageData>(`/staticPageDatum/${id}`);
};

const deleteStaticPageDatum = (data: number[]): Promise<IStaticPageData | null> => {
  return APIClient.post<IStaticPageData, { data: number[] }>(`/staticPageDatum/deleteStaticPageDatum`, { data });
};

const getStaticPageDatumByIds = (data: number[]): Promise<IStaticPageData[] | null> => {
  return APIClient.post<IStaticPageData[], { data: number[] }>(`/staticPageDatum/getStaticPageDatumByIds`, { data });
};

const updateStaticPageDatum = (data: IStaticPageDataUpdate[]): Promise<IStaticPageData[] | null> => {
  return APIClient.post<IStaticPageData[], { data: IStaticPageDataUpdate[] }>(
    `/staticPageDatum/updateStaticPageDatum`,
    { data },
  );
};

const StaticPageDataService = {
  getStaticPageDatum,
  getStaticPageDataById,
  addStaticPageData,
  updateStaticPageData,
  deleteStaticPageData,
  deleteStaticPageDatum,
  getStaticPageDatumByIds,
  updateStaticPageDatum,
};

export default StaticPageDataService;
