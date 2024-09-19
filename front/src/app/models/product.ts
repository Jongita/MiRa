export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock:number;
  category?:string;
  specification?:string;
}