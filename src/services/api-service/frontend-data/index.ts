import APIClient from '../../client';
import IFrontendData from './types';

const getFrontendData = (): Promise<IFrontendData | null> => {
  return APIClient.get<IFrontendData>('/frontendData');
};

const FrontendDataService = {
  getFrontendData,
};

export default FrontendDataService;
