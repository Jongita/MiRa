import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public isError = false;
  public errorText="";

  constructor (
    private authService:AuthService, 
    private router:Router, 
    private errorService:ErrorService
  ){

  }
  public onLogin(f:NgForm){
    this.authService.loginUser(f.form.value).subscribe({
      next: (data)=>{
        // console.log(data);
        this.router.navigate(['/'])
      },
      error: (error)=>{
      this.errorService.errorEmitter.emit(error.error.text)
      console.log(error.error.text);
      this.isError=true;
      this.errorText=error.error.text
      }
    })
  }
}


