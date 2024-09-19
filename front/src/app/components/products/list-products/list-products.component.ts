import { Component } from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';
import { AuthService } from '../../../services/auth.service';
import { FilterProductsComponent } from '../filter-products/filter-products.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, FilterProductsComponent, RouterLink],
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

  filteredProducts: Product[] = [];
  searchTerm: string = '';



  constructor(
    private productsService: ProductService,
    public authService: AuthService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.loadProducts();
  }

  private loadProducts() {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
       this.filterProducts();
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.loadProducts();
    });
  }

  filterProducts() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  // addToCart(product: Product): void {
  //   this.cartService.addToCart(product);
  // }

   addToCart(product: Product): void {
    if (this.isLoggedIn()) {
      this.cartService.addToCart(product);
    } else {
      this.errorService.errorEmitter.emit('Please log in to add items to your cart.'); // Emit error message
    }
  }

isLoggedIn(): boolean {
    // Implement your logic to check if the user is logged in
    // This might involve checking a service or local storage
    return !!this.authService.user; // Example
}

showLoginMessage(): void {
    // Implement your logic to display a login message
    alert("Please log in to add items to your cart.");

  
}

 

  }

