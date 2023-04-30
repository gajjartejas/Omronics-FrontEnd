export interface IBaseCoverImage {
  title: string;
  description: string;
  url: string;
  active: boolean;
}

export interface ICoverImage extends IBaseCoverImage {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
