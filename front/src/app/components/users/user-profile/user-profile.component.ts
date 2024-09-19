import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { OrderUsersComponent } from '../../orders/order-users/order-users.component';
import { Order } from '../../../models/order';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserOrder } from '../../../models/userOrder';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, OrderUsersComponent, CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
public user: User | null = null;
  public orders: UserOrder[] = [];

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;

    if (this.user) {
      // Fetch orders by user ID
      this.orderService.getOrdersByUserId(this.user.id!).subscribe(
        (orders: UserOrder[]) => {
          this.orders = orders;
        },
        (error) => {
          console.error('Error fetching orders', error);
        }
      );
    }
  }
}