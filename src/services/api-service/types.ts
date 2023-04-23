import { IBaseManufacturer } from './manufacturer/types';
import {IBaseProduct, IBaseProductImage} from "./product/types";
import {IBaseProductResource} from "./product-resource/types";
import {IBaseCategory} from "./category/types";

export interface IBaseConnect {
  connect: IBaseConnectId[] | IBaseConnectId;
}

export interface IBaseCreate {
  create:
    | IBaseCategory[]
    | IBaseCategory
    | IBaseManufacturer[]
    | IBaseManufacturer
    | IBaseProduct[]
    | IBaseProduct
    | IBaseProductResource[]
    | IBaseProductResource
    | IBaseProductImage[]
    | IBaseProductImage;
}

export interface IBaseSet {
  set: IBaseConnectId | IBaseConnectId[];
}

export interface IBaseCreateOrConnect {
  connectOrCreate: IBaseConnectId | IBaseConnectId[];
}

export interface IBaseConnectId {
  id: number;
}
