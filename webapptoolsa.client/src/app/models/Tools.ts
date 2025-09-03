interface commonTools {
  id: number | null;
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

export type ToolsDto = Omit<Tools,'objcategory'|'statustools'> & { category: number,
  status_tool: number}