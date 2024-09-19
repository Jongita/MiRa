import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Product } from '../../../models/product';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-cart-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-checkout.component.html',
  styleUrl: './cart-checkout.component.css'
})
export class CartCheckoutComponent implements OnInit, OnDestroy{
   cartItems: { product: Product, quantity: number }[] = [];
  private cartSubscription: Subscription;
  totalPrice: number = 0;
  shippingCost: number = 5;
  user: User | null = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private errorService: ErrorService,
    private router: Router,
    private orderService: OrderService // Inject OrdersService
  ) {
    this.cartSubscription = new Subscription();
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
    this.user = this.authService.user; 
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }

  // Method to submit the order
  submitOrder(): void {
  if (this.user) {
    const order: Order = {
      name: this.user.name!,
      email: this.user.email,
      id: this.user.id,
      order_date: new Date(),
      products: this.cartItems.map(item => ({
        productId: item.product.id,
        count: item.quantity,
        name: item.product.name,
        price: item.product.price
      }))
    };

    console.log('Order object:', order); // Log order object

    this.orderService.addOrder(order).subscribe(response => {
      console.log('Order submitted successfully', response);
      console.log(order);
      this.cartService.clearCart(); // Clear the cart after successful order submission
      this.router.navigate(['orders', 'success']);
    }, error => {
      console.error('Error submitting order', error);
    });
  } else {
    console.error('User not logged in');
  }
}
}

// this.orderService.addOrder(order).subscribe(response => {
//       console.log('Order submitted successfully', response);
//       this.cartService.clearCart(); // Clear the cart after successful order submission
      
//       // Emit a success message using ErrorService
//       this.errorService.errorEmitter.emit("Order placed successfully!"); 
      
//     }, error => {
//       console.error('Error submitting order', error);
//       // Emit an error message in case of failure
//       this.errorService.errorEmitter.emit("Error placing the order. Please try again.");
//     });
//   } else {
//     console.error('User not logged in');
//   }
// }
// }