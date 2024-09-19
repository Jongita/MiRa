import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartItem } from '../../models/cartItem';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
// export class CartComponent {
// public cartItems: Product[] = [];


//   constructor(private cartService: CartService) {}

//   ngOnInit(): void {
//     this.cartService.cartItems$.subscribe(items => {
//       this.cartItems = items;
//     });
//   }


// }
export class CartComponent {
  public cartItems: { product: Product, quantity: number }[] = [];
  public selectedShipping: number = 5; // Default shipping cost
  public discountCode: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log(items);
    });
  }

  increaseQuantity(productId: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      this.cartService.updateQuantity(productId, item.quantity + 1);
    }
  }

  decreaseQuantity(productId: number): void {
  const item = this.cartItems.find(item => item.product.id === productId);
  if (item && item.quantity > 1) {
    this.cartService.updateQuantity(productId, item.quantity - 1);
  } else if (item) {
    this.cartService.updateQuantity(productId, 0); // Keep the item but set quantity to 0
    // Optionally, you can handle logic for items with zero quantity here if needed
  }
}

  // removeItem(productId: number): void {
  //   this.cartService.updateQuantity(productId, 0); // Remove the item from the cart
  // }

  removeItem(productId: number): void {
    this.cartService.removeItemFromCart(productId);
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  getTotalWithShipping(): number {
    return this.getTotalPrice() + this.selectedShipping;
  }

  checkout(): void {
    
  }
}