export interface TypeTransaction {
  id: number | null;
  code: string;
  name: string;
  type: string;
  isActived: boolean;
}

export interface Project {
  id: number | null;
  name: string;
  description: string | null;
  location: string | null;
  userId: number;
  createdAt: Date | null;
  username: string | null;
}


export interface TransactionHeaderBase {
  id: number | null;
  userId: number;
  dateStart: Date | null;
  dateEnd: Date | null;
  days: number | null;
  idType: number;
  notes: string | null;
  userRecipt: number;
  idProject: number | null;
  idWarehouseOrigin: number;
  idWarehouseDestination: number;
  createdAt: Date | null;  
  status: number;
}

export interface TransactionHeaderDto extends TransactionHeaderBase {
  usernameRegister: string;
  usernameRecipt: string;
  warehouseOrigin: string;
  warehouseDestination: string;
  nameTypeTransaction: string;
  nameProject: string;
}


