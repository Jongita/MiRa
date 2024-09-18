import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
 selectedFile: File | null = null;

  constructor(private productsService: ProductService, private router: Router) {}

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public productSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('name', form.form.value.name);
    formData.append('price', form.form.value.price);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    this.productsService.addProduct(formData).subscribe({
      next: (data) => {
        this.router.navigate(['product', 'show']);
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }
}