import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  public passwordsMatch: boolean = false;
  public password: string = ''; 
  public password2: string = ''; 

  constructor (private authService:AuthService, private errorService:ErrorService, private router: Router){

  }

  public onRegister(f:NgForm){
    if (f.valid && this.passwordsMatch) {
    this.authService.registerUser(f.form.value).subscribe({
      next:(data)=>{
        console.log(data);
        f.resetForm();
        this.router.navigate(['auth', 'login'])
      },
      error:(error)=>{
        this.errorService.errorEmitter.emit(error.error.text);
      }
    })
  }
  }

  public checkPasswords(password: string, password2: string) {
    this.passwordsMatch = (password === password2);
  }
}
