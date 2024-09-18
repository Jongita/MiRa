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

  constructor() {
    // Load the cart from localStorage when the service is initialized
    this.loadCartFromLocalStorage();
  }

  addToCart(product: Product) {
    const currentItems = [...this.cartItems.value];
    const itemIndex = currentItems.findIndex(item => item.product.id === product.id);
    if (itemIndex > -1) {
      currentItems[itemIndex].quantity += 1;
    } else {
      currentItems.push({ product, quantity: 1 });
    }
    this.cartItems.next([...currentItems]);
    this.saveCartToLocalStorage();
  }

  addProductToCart(product: Product, quantity: number) {
    const currentItems = [...this.cartItems.value];
    const itemIndex = currentItems.findIndex(item => item.product.id === product.id);
    if (itemIndex > -1) {
      currentItems[itemIndex].quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this.cartItems.next([...currentItems]);
    this.saveCartToLocalStorage();
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = [...this.cartItems.value];
    const itemIndex = currentItems.findIndex(item => item.product.id === productId);
    if (itemIndex > -1) {
      if (quantity >= 0) {
        currentItems[itemIndex].quantity = quantity;
      }
      this.cartItems.next([...currentItems]);
      this.saveCartToLocalStorage();
    }
  }

  removeItemFromCart(productId: number): void {
    const currentItems = [...this.cartItems.value];
    const filteredItems = currentItems.filter(item => item.product.id !== productId);
    if (filteredItems.length !== currentItems.length) {
      this.cartItems.next(filteredItems);
      this.saveCartToLocalStorage();
    }
  }

  private saveCartToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems.value));
    }
  }

  // private loadCartFromLocalStorage(): void {
  //   if (typeof window !== 'undefined' && window.localStorage) {
  //     const savedCart = localStorage.getItem('cartItems');
  //     if (savedCart) {
  //       this.cartItems.next(JSON.parse(savedCart));
  //     }
  //   }
  // }

  private loadCartFromLocalStorage(): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart) || []);
    } else {
      this.cartItems.next([]); // Handle empty cart scenario
    }
  }
}

  clearCart(): void {
  this.cartItems.next([]); // Clear the BehaviorSubject
  this.saveCartToLocalStorage(); // Update local storage
}
}