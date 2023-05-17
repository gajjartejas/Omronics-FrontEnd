import APIClient from '../../client';
import { IBaseContactData, IContactData } from './types';

const getContactDatum = (): Promise<IContactData[] | null> => {
  return APIClient.get<IContactData[]>('/contactDatum');
};

const getContactDataById = (id: number): Promise<IContactData | null> => {
  return APIClient.get<IContactData>(`/contactDatum/${id}`);
};

const addContactData = (data: IBaseContactData): Promise<IContactData | null> => {
  return APIClient.post<IContactData, { data: IBaseContactData }>(`/contactDatum`, { data });
};

const updateContactData = (id: number, data: IBaseContactData): Promise<IContactData | null> => {
  return APIClient.patch<IContactData, { data: IBaseContactData }>(`/contactDatum/${id}`, { data });
};

const deleteContactData = (id: number): Promise<IContactData | null> => {
  return APIClient.delete<IContactData>(`/contactDatum/${id}`);
};

const deleteContactDatum = (data: number[]): Promise<IContactData | null> => {
  return APIClient.post<IContactData, { data: number[] }>(`/contactDatum/deleteContactDatum`, { data });
};

const ContactDataService = {
  getContactDatum,
  getContactDataById,
  addContactData,
  updateContactData,
  deleteContactData,
  deleteContactDatum,
};
export default ContactDataService;
