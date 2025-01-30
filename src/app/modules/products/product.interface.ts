import { Types } from 'mongoose';

export type TProduct = {
  title: string;
  author: Types.ObjectId;
  price: number;
  category: 'Fiction' | 'Science' | 'Poetry' ;
  description: string;
  quantity: number;
  inStock: boolean;
  image?:string
};

export type TOrder = {
  email: string;
  product: string;
  quantity: number;
  totalPrice: number;
};
