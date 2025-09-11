export interface UserBase {
  username: string;
  password: string;
}

export interface User extends UserBase {
  id?: number;
  role: number;
  isActived: boolean;
  barcode?: string;
  qr?: string;
}

