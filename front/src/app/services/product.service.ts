import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient, private authServise:AuthService) { }

  public getProducts(){
    return this.http.get<Product[]>('http://localhost:5998/products/');
  }

  public getProduct(id:number) {
    return this.http.get<Product>('http://localhost:5998/products/'+id);
  }

  public addProduct(product:Product){
    return this.http.post('http://localhost:5998/products/', product );
  }

  public updateProduct(product:Product){
    return this.http.put('http://localhost:5998/products/', product);
  }

  public deleteProduct(id:number){
    return this.http.delete('http://localhost:5998/products/'+id);
  }


}
