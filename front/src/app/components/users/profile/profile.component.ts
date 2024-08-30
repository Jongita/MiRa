import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public profileForm:FormGroup;
  public imgPreview:String|null=null;

  constructor (private userService:UsersService, private authService:AuthService, private router:Router){
    this.profileForm=new FormGroup({
      'name':new FormControl(null),
      'email':new FormControl(null),
      'password':new FormControl(null),
      'image':new FormControl(null)
    });
  
    if (authService.user!=null && authService.user.id!=null){
      userService.getUser(authService.user.id).subscribe((user)=>{
       
        this.profileForm.setValue({
          name:user.name,
          email:user.email,
          password:"",
          image:null
        });
        this.profileForm.updateValueAndValidity();;
      });
    }
  }

  public onSubmitForm(){
    const values=this.profileForm.value;
    console.log(values);
    // user servise atnaujinam vartotoja:


    // this.userService.updateUser(new User(values.email, this.authService.user!.id, values.name, values.password )).subscribe((result)=>{
    this.userService.updateUserAndPhoto(new User(values.email, this.authService.user!.id, values.name, values.password ), values.image).subscribe((result)=>{
      this.router.navigate(["/"]);
    });

  }
  
  // funkcija kuri atvaizduoja paveiksliuka 
  public onProfileImageChange(event:Event){
    const file= (event.target as HTMLInputElement).files![0];

    const reader=new FileReader();
    reader.onload=()=>{
      this.imgPreview=reader.result as String;
    }
    reader.readAsDataURL(file);

    this.profileForm.patchValue({
      image:file
    });
    this.profileForm.get("image")?.updateValueAndValidity();

  }
}

