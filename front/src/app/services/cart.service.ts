import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cartItems = new BehaviorSubject<Product[]>([]);
cartItems$ = this.cartItems.asObservable();



  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product]);
  }

  getCartItems(): Product[] {
    return this.cartItems.value;
  }

  getCartItemCount(): number {
    return this.cartItems.value.length;

  }
}
