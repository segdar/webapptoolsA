import { CompanyDto } from "./Company";

export interface Warehouse {
  id: number;    
  code: number;            
  name: string;              
  description?: string;     
  location?: string;         
  isActived: boolean;       
  companyId: number;         
  warehouseFatherId: number | null;
  warehouseFather?: Warehouse;   
  children: Warehouse[];        
  company: CompanyDto;              
}


