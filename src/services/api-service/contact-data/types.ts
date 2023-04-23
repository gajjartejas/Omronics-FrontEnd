//ContactData
export interface IBaseContactData {
  name: string;
  phoneNo: string | null;
  email: string;
  requirements: string;
}

export interface IContactData extends IBaseContactData {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
