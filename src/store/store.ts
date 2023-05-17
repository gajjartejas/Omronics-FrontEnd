import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import FrontendDataService from '../services/api-service/frontend-data';
import IFrontendData from '../services/api-service/frontend-data/types';
import { IStaticPageData } from '../services/api-service/static-page-data/types';
import { ICategory } from '../services/api-service/category/types';
import { IProduct } from '../services/api-service/product/types';
import { IManufacturer } from '../services/api-service/manufacturer/types';

interface IStaticDataStore {
  staticPageData: IStaticPageData[];
  featuredCategories: ICategory[];
  featuredProducts: IProduct[];
  featuredManufacturer: IManufacturer[];
  fetch: () => void;
}

const useStaticDataStore = create<IStaticDataStore>()(
  devtools(
    persist(
      set => ({
        staticPageData: [],
        featuredCategories: [],
        featuredProducts: [],
        featuredManufacturer: [],
        fetch: async () => {
          const response = await FrontendDataService.getFrontendData();
          if (response) {
            set({
              ...response,
            });
          }
        },
      }),
      {
        name: 'static-data-storage',
      },
    ),
  ),
);

export default useStaticDataStore;
