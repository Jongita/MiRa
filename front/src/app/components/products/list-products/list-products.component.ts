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
// export class ListProductsComponent {
// public products:Product[]=[];


// private loadProducts(){
//     this.productsService.getProducts().subscribe((data)=>{
//       this.products=data;
//     });
//   }

//   constructor (private productsService:ProductService, public authService:AuthService, private cartService: CartService){
//     this.loadProducts();
//   }

//   addToCart(product: Product): void {
//     console.log(product);
//     this.cartService.addToCart(product);
//   }
// }

  export class ListProductsComponent {
  public products: Product[] = [];

  constructor(
    private productsService: ProductService,
    public authService: AuthService,
    private cartService: CartService
  ) {
    this.loadProducts();
  }

  private loadProducts() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  
}



