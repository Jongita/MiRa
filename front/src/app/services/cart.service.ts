import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cartItems: Product[] = [];

  constructor() {}

  addToCart(product: Product): void {
    this.cartItems.push(product);
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  removeFromCart(product: Product): void {
    const index = this.cartItems.indexOf(product);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, product) => total + product.price, 0);
  }
}