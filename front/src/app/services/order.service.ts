import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { UserOrder } from '../models/userOrder';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
constructor(private http: HttpClient) { }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>('http://localhost:5998/orders/');
  }

  public getOrder(id: number): Observable<Order> {
    return this.http.get<Order>(`http://localhost:5998/orders/${id}`);
  }

  public getOrdersByUserId(userId: number): Observable<UserOrder[]> {
  return this.http.get<UserOrder[]>(`http://localhost:5998/orders/user/${userId}`);
}

  public addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>('http://localhost:5998/orders/', order);
  }

  public deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:5998/orders/${id}`);
  }

}