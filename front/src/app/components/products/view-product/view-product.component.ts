import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { CartService } from '../../../services/cart.service';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-view-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css'
})
export class ViewProductComponent {
  product: Product | null = null;
  quantity: number = 1; // Default quantity

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private errorService: ErrorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProduct(id).subscribe((data: Product) => {
        this.product = data;
        console.log(data);
      });
    }
  }

  addProductToCart(product: Product): void {
    if (this.isLoggedIn()) {
    this.cartService.addProductToCart(product, this.quantity);
    } else {
      this.errorService.errorEmitter.emit('Please log in to add items to your cart.'); // Emit error message
    }
  }

  buyNow(product: Product): void {
    if (this.isLoggedIn()) {
    this.cartService.addProductToCart(product, this.quantity);
    this.router.navigate(['cart']);
    } else {
      this.errorService.errorEmitter.emit('Please log in to add items to your cart.'); // Emit error message
    }
  }

  isLoggedIn(): boolean {
    
    // Implement your logic to check if the user is logged in
    // This might involve checking a service or local storage
    return !!this.authService.user; // Example
}
}




