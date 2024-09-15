import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cartItem';


@Injectable({
  providedIn: 'root'
})

// export class CartService {
// private cartItems = new BehaviorSubject<Product[]>([]);
// cartItems$ = this.cartItems.asObservable();

//   addToCart(product: Product) {
//     const currentItems = this.cartItems.value;
//     this.cartItems.next([...currentItems, product]);
//   }

//   // getCartItems(): Product[] {
//   //   return this.cartItems.value;
//   // }

//   // getCartItemCount(): number {
//   //   return this.cartItems.value.length;
//   // }

// }


export class CartService {
  private cartItems = new BehaviorSubject<{ product: Product, quantity: number }[]>([]);
  cartItems$ = this.cartItems.asObservable();

  addToCart(product: Product) {
    const currentItems = [...this.cartItems.value]; // Clone the array
    const itemIndex = currentItems.findIndex(item => item.product.id === product.id);

    if (itemIndex > -1) {
      // If the product already exists, increase the quantity
      currentItems[itemIndex].quantity += 1;
    } else {
      // If the product is new, add it to the cart with quantity 1
      currentItems.push({ product: product, quantity: 1 });
    }

    // Emit the updated cart items
    this.cartItems.next([...currentItems]);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = [...this.cartItems.value]; // Clone the array
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);

    if (itemIndex > -1) {
      if (quantity >= 0) {
        // Update the quantity, even if it's 0
        currentItems[itemIndex].quantity = quantity;
      }

      // Emit the updated cart items
      this.cartItems.next([...currentItems]);
    }
  }

  removeItemFromCart(productId: number): void {
    const currentItems = [...this.cartItems.value]; // Create a clone of the array to avoid direct mutations
    const filteredItems = currentItems.filter(item => item.product.id !== productId);

    console.log('Before:', currentItems);
    console.log('After:', filteredItems);

    // Emit the updated cart items only if something was actually removed
    if (filteredItems.length !== currentItems.length) {
      this.cartItems.next(filteredItems);
    }
  }
}