//Third Party
import axios, { AxiosInstance } from 'axios';

const baseUrl = `${process.env.REACT_APP_API_URL}`;
//const authHeader = `${process.env.REACT_APP_API_HEADER}`;

export const appApiClient = axios.create({
  baseURL: baseUrl,
  responseType: 'json',

  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
  timeout: 60000,
  withCredentials: true,
});

interface IAPIBase {}

const get = async <Type>(path: string, apiClient: AxiosInstance = appApiClient): Promise<Type | null> => {
  //Const
  console.log('---API CALL---');
  console.log('URL:', path);
  console.log('METHOD:GET');
  const config = {};
  let rawResponse = await apiClient.get<IAPIBase>(path, config);
  console.log('API RESPONSE:', path, rawResponse.data);
  return rawResponse.data as Type;
};

const post = async <Type, DataType>(
  path: string,
  formData: DataType,
  apiClient: AxiosInstance = appApiClient,
): Promise<Type | null> => {
  console.log('---API CALL---');
  console.log('URL:', path);
  console.log('METHOD:POST');
  console.log('FORM DATA:', formData);
  const config = {};
  let rawResponse = await apiClient.post<IAPIBase>(path, formData, config);
  console.log('API RESPONSE:', path, rawResponse.data);
  return rawResponse.data as Type;
};

const patch = async <Type, DataType>(
  path: string,
  formData: DataType,
  apiClient: AxiosInstance = appApiClient,
): Promise<Type | null> => {
  console.log('---API CALL---');
  console.log('URL:', path);
  console.log('METHOD:PATCH');
  console.log('FORM DATA:', formData);
  const config = {};
  let rawResponse = await apiClient.patch<IAPIBase>(path, formData, config);
  console.log('API RESPONSE:', path, rawResponse.data);
  return rawResponse as Type;
};

const deleteMethod = async <Type>(path: string, apiClient: AxiosInstance = appApiClient): Promise<Type | null> => {
  console.log('---API CALL---');
  console.log('URL:', path);
  console.log('METHOD:DELETE');

  try {
    const config = {};
    let rawResponse = await apiClient.delete<IAPIBase>(path, config);
    console.log('API RESPONSE:', path, rawResponse.data);

    return rawResponse as Type;
  } catch (err: any) {
    console.log('ERROR:', err);

    return null;
  }
};

const APIClient = { get, post, patch, delete: deleteMethod };

export default APIClient;
