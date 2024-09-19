import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css'
})
export class CartCheckoutComponent implements OnInit, OnDestroy {
  cartItems: { product: Product, quantity: number }[] = [];
  private cartSubscription: Subscription;
  totalPrice: number = 0;
  shippingCost: number = 5;
  user: User | null = null; // Store user data

  constructor(
    private cartService: CartService,
    private authService: AuthService // Inject AuthService to get user details
  ) {
    this.cartSubscription = new Subscription();
  }

  ngOnInit(): void {
    // Fetch cart items
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });

    // Fetch user details from AuthService
    this.user = this.authService.user; 
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  // Calculate the total price of items in the cart
  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }
}