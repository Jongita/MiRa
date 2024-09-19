import { Component } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { ProductService } from '../../../services/product.service';
import { Order } from '../../../models/order';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-orders',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './list-orders.component.html',
  styleUrl: './list-orders.component.css'
})
export class ListOrdersComponent {
public orders:Order[]=[];
  // public products:Product[]=[];

  private loadRecords(){
    this.ordersService.getOrders().subscribe({
      next:(result)=>{
        this.orders=result;
      }
    });
  }

  constructor(private ordersService:OrderService, private productsService:ProductService){
  this.loadRecords();

  }

  public deleteOrder(id?:number){
    if(id!=null){
      this.ordersService.deleteOrder(id).subscribe({
      next:(result)=>{
        this.loadRecords();
      }
    })
    }
  }

}