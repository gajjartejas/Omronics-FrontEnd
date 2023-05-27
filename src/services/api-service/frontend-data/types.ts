//IFrontendData

import { IStaticPageData } from '../static-page-data/types';
import { ICategory } from '../category/types';
import { IProduct } from '../product/types';
import { IManufacturer } from '../manufacturer/types';

interface IFrontendData {
  staticPageData: IStaticPageData[];
  featuredCategories: ICategory[];
  featuredProducts: IProduct[];
  featuredManufacturer: IManufacturer[];
}

export default IFrontendData;
