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