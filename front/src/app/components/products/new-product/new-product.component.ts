import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-new-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent {
  selectedFile: File | null = null;

  constructor(private productsService: ProductService, private router: Router, private errorService: ErrorService) {}

  // Handle file selection
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  public productSubmit(form: NgForm) {
    const formData = new FormData();
    formData.append('name', form.form.value.name);
    formData.append('price', form.form.value.price);
    formData.append('category', form.form.value.category);
    formData.append('description', form.form.value.description);
    formData.append('stock', form.form.value.stock);
    formData.append('specification', form.form.value.specification);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

   this.productsService.addProduct(formData).subscribe({
      next: (data) => {
        // this.errorService.errorEmitter.emit('Product successfully added!');
        this.router.navigate(['product', 'show']);
      },
      error: (error) => {
        this.errorService.errorEmitter.emit('Error adding product: ' + error.message);
      }
    });
  }
}