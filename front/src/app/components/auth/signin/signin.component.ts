import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
public passwordsMatch: boolean = true;
    public password: string = ''; 
    public password2: string = ''; 

    constructor (private authService:AuthService, private router:Router){
  }
 
  public onRegister(f:NgForm){
  this.authService.registerUser(f.form.value).subscribe({
      next:(data)=>{
        console.log(data);
        this.router.navigate(['/'])
      }
    })
}
  

  public checkPasswords(password: string, password2: string) {
    this.passwordsMatch = (password === password2);
  }

}
