//Product Image

export enum IStaticPageType {
  ABOUT,
  CONTACT_US,
  SERVICE,
  BANNER,
  FOOTER,
}

export enum IStaticPageSubDataType {
  HEAD_QUARTER,
  GET_IN_TOUCH_1,
  GET_IN_TOUCH_2,
  MAP,
  BODY,
  SOCIAL,
}

export enum IStaticPageDataType {
  HTML_TEXT,
  TWITTER,
  FACEBOOK,
  INSTAGRAM,
  YOUTUBE,
  NAME,
  ADDRESS,
  EMAIL,
  PHONE,
  LINK,
  OTHER,
}

export interface IStaticPageDataTypes {
  [key: number]: [IStaticPageType, IStaticPageSubDataType, IStaticPageDataType];
}

export const STATIC_PAGE_DATA_TYPES: IStaticPageDataTypes = {
  1: [IStaticPageType.ABOUT, IStaticPageSubDataType.BODY, IStaticPageDataType.HTML_TEXT],
  2: [IStaticPageType.SERVICE, IStaticPageSubDataType.BODY, IStaticPageDataType.HTML_TEXT],

  3: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.HEAD_QUARTER, IStaticPageDataType.ADDRESS],
  4: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.HEAD_QUARTER, IStaticPageDataType.EMAIL],

  5: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.NAME],
  6: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.PHONE],
  7: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.PHONE],
  8: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.EMAIL],

  9: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_2, IStaticPageDataType.NAME],
  10: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_2, IStaticPageDataType.PHONE],
  11: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.GET_IN_TOUCH_2, IStaticPageDataType.EMAIL],

  12: [IStaticPageType.CONTACT_US, IStaticPageSubDataType.MAP, IStaticPageDataType.LINK],

  13: [IStaticPageType.FOOTER, IStaticPageSubDataType.SOCIAL, IStaticPageDataType.FACEBOOK],
  14: [IStaticPageType.FOOTER, IStaticPageSubDataType.SOCIAL, IStaticPageDataType.TWITTER],
  15: [IStaticPageType.FOOTER, IStaticPageSubDataType.SOCIAL, IStaticPageDataType.INSTAGRAM],
  16: [IStaticPageType.FOOTER, IStaticPageSubDataType.SOCIAL, IStaticPageDataType.YOUTUBE],

  17: [IStaticPageType.FOOTER, IStaticPageSubDataType.HEAD_QUARTER, IStaticPageDataType.ADDRESS],

  18: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.NAME],
  19: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.PHONE],
  20: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.PHONE],
  21: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_1, IStaticPageDataType.EMAIL],
  22: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_2, IStaticPageDataType.NAME],
  23: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_2, IStaticPageDataType.PHONE],
  24: [IStaticPageType.FOOTER, IStaticPageSubDataType.GET_IN_TOUCH_2, IStaticPageDataType.EMAIL],
};

//For update data
export interface IStaticPageDataUpdate {
  id: number;
  data: string;
}

//Static Page Data
export interface IBaseStaticPageData {
  data: string;
  type: IStaticPageType;
  subType: IStaticPageSubDataType;
  dataType: IStaticPageDataType;
  active: boolean;
}

export interface IStaticPageData extends IBaseStaticPageData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
