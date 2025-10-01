import { Warehouse } from "./Warehouse";
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

export interface JwtPayload {
  id:number,
  username: string;
  idRole: string;
  role: string;      
      
}
export interface PermissionMap {
  [module: string]: string[]; 
}

export interface AccessCompanyDto {
  id: number;
  name: string;
  warehouses: Warehouse[];
}

export interface ModuleAccessDto {
  moduleName: string;
  actions: string[];
}

