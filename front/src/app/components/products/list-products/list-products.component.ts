import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css'
})
export class ListProductsComponent {
public products:Product[]=[];


private loadProducts(){
    this.productsService.getProducts().subscribe((data)=>{
      this.products=data;
    });
  }

  constructor (private productsService:ProductService, public authService:AuthService){
    this.loadProducts();
  }

  }



