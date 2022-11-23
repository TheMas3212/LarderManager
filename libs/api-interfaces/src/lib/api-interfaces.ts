export interface CreateItemRequest {
  name: string;
  category: string;
  stock: number;
  target: number;
}
export interface CreateItemResponse {
  id: string;
}

export interface RetrieveItemRequest {}
export interface RetrieveItemResponse {
  item: Item
}

export interface UpdateItemRequest {
  name?: string;
  category?: string;
  stock?: number;
  target?: number;
}
export interface UpdateItemResponse {}

export interface DeleteItemRequest {}
export interface DeleteItemResponse {}

export interface APIErrorResponse {
  error: string;
}

export interface Item {
  id: string;
  name: string;
  category: string;
  stock: number;
  target: number;
  units: string;
}