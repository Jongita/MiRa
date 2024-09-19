import { Component } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  public id?: number;
  public name: string = "";
  public price: number = 0;
  public description: string = "";
  public imageUrl: string = "";
  public imgPreview: String | null = null;
  public category: string = "wood";  // Default category
  public stock?: number;
  public specification?: string;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private productsService: ProductService
  ) {
    this.productsService.getProduct(this.route.snapshot.params['id']).subscribe({
      next: (product) => {
        this.name = product.name;
        this.price = product.price;
        this.id = product.id;
        this.description = product.description;
        this.imageUrl = product.imageUrl;
        this.category = product.category || "wood";  // Assign default category if missing
        this.stock = product.stock;
        this.specification = product.specification;
      },
      error: (error) => {
        console.log(error.error.text);
      }
    });
  }

  public onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as String;
    };
    reader.readAsDataURL(file);
  }

  public productSubmit(form: NgForm) {
    this.productsService.updateProduct({ id: this.id, ...form.form.value }).subscribe({
      next: (data) => {
        this.router.navigate(['product', 'show']);
      },
      error: (error) => {
        console.log("Error updating product:", error);
      }
    });
  }
}
