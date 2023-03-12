//Third Party
import axios, { AxiosInstance } from 'axios';

const fileUploadURL = `${process.env.REACT_APP_API_FILE_UPLOAD}`;

export interface FileUploaderBaseResponse {
  status: string;
  info: string;
  name: string;
}

export interface FileUploaderResult {
  data?: FileUploaderBaseResponse;
  index: number;
  error?: any;
}

export const appApiClient = axios.create({
  baseURL: fileUploadURL,
  responseType: 'json',
  headers: {
    'Content-Type': 'multipart/form-data'
  },
  timeout: 1000 * 60 * 5,
});

const upload = async <Type>(
  path: string,
  formData: FormData,
  params: any,
  index: number,
  apiClient: AxiosInstance = appApiClient,
): Promise<Type> => {
  try {
    const config = {
      params: params,
      headers: {},
    };
    let rawResponse = await apiClient.post<FileUploaderBaseResponse>(path, formData, config);
    return { data: rawResponse.data, index } as Type;
  } catch (error: any) {
    return { index, error } as Type;
  }
};

const deleteFile = async <Type>(
  path: string,
  formData: FormData,
  params: any,
  apiClient: AxiosInstance = appApiClient,
): Promise<Type> => {
  try {
    const config = {
      params: params,
      headers: {},
    };
    let rawResponse = await apiClient.post<FileUploaderBaseResponse>(path, formData, config);
    console.log('rawResponse', rawResponse);
    return { data: rawResponse.data } as Type;
  } catch (error: any) {
    return { error } as Type;
  }
};

const FileUploader = { upload, deleteFile };

export default FileUploader;
