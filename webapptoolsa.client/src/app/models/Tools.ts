interface commonTools {
  id: number;
  name: string;
  isActived: boolean;
}

export type Category = commonTools;  
export type ConditionalTools = commonTools;

export interface Tools {
  id: number;
  name: string;
  description?: string;
  location: string;
  provider?: string;
  barcode?: string;
  qr?: string;
  cost: number;
  isActived: boolean;
  objcategory: Category;
  statustools: ConditionalTools;
}