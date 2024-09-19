import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { FilterProductsComponent } from './components/products/filter-products/filter-products.component';
import { ListProductsComponent } from './components/products/list-products/list-products.component';
import { ErrorBlockComponent } from './components/helper/error-block/error-block.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, FooterComponent, FilterProductsComponent, ListProductsComponent, ErrorBlockComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
