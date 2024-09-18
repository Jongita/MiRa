import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-show-products',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './show-products.component.html',
  styleUrl: './show-products.component.css'
})
export class ShowProductsComponent {
public products:Product[]=[];
  
  private loadProducts(){
  this.productsService.getProducts().subscribe((data)=>{
  this.products=data;
      });
    }
  

  constructor (private productsService:ProductService, public authService:AuthService){
    this.loadProducts();
  }
 

  public deleteProduct(id:number){
    this.productsService.deleteProduct(id).subscribe((data)=>{
      this.loadProducts();
    });

  }
}
