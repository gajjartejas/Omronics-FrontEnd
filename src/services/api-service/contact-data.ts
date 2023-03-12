import APIClient from 'services/client';
import { IBaseContactData, ICategory, IContactData } from './types';

const getContactDatum = (): Promise<IContactData[] | null> => {
  let response = APIClient.get<IContactData[]>('/contactDatum');
  return response;
};

const getContactDataById = (id: number): Promise<IContactData | null> => {
  let response = APIClient.get<IContactData>(`/contactDatum/${id}`);
  return response;
};

const addContactData = (data: IBaseContactData): Promise<IContactData | null> => {
  let response = APIClient.post<IContactData, { data: IBaseContactData }>(`/contactDatum`, { data });
  return response;
};

const updateContactData = (id: number, data: IBaseContactData): Promise<IContactData | null> => {
  let response = APIClient.patch<IContactData, { data: IBaseContactData }>(`/contactDatum/${id}`, { data });
  return response;
};

const deleteContactData = (id: number): Promise<IContactData | null> => {
  let response = APIClient.delete<IContactData>(`/contactDatum/${id}`);
  return response;
};

const deleteContactDatum = (data: number[]): Promise<IContactData | null> => {
  let response = APIClient.post<IContactData, { data: number[] }>(`/contactDatum/deleteContactDatum`, { data });
  return response;
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
