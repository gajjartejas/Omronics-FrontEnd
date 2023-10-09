import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import FrontendDataService from '../services/api-service/frontend-data';
import { IStaticPageData } from '../services/api-service/static-page-data/types';
import { ICategory } from '../services/api-service/category/types';
import { IProduct } from '../services/api-service/product/types';
import { IManufacturer } from '../services/api-service/manufacturer/types';
import { ICoverImage } from '../services/api-service/cover-image/types';

interface IStaticDataStore {
  staticPageData: IStaticPageData[];
  featuredCategories: ICategory[];
  featuredProducts: IProduct[];
  featuredManufacturer: IManufacturer[];
  coverImages: ICoverImage[];
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
        coverImages: [],
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
