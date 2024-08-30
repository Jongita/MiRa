import { Component } from '@angular/core';
import { ListProductsComponent } from '../products/list-products/list-products.component';
import { FilterProductsComponent } from '../products/filter-products/filter-products.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ListProductsComponent, FilterProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
