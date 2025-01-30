import { USER_ROLE } from "./user.constant";

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'de-active';
  phone?: string;
  address?: string;
  city?: string;
  image?:string
}

export interface ILoginUser {
  email: string;
  password: string;
}
export type TUserRole = keyof typeof USER_ROLE;
