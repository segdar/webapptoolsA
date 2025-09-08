import { commonModel, UserCommonPermision } from "./Common";

export interface CompanyDto {
  id: number;
  name: string;
  address: string;
  contactInfo: string;
}
export type CompanyUserDto = UserCommonPermision 

export type RoleDto = commonModel;

