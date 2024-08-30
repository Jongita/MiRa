import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './update-users.component.html',
  styleUrl: './update-users.component.css'
})
export class UpdateUsersComponent {
// kintamieji kuriuos noresim redaguoti
  public id?:number;
  public name:String="";
  public email:String="";
  public password:String="";
  public type:number=0;

  constructor (private route:ActivatedRoute, private router:Router, private usersService:UsersService){
    // pasiimam id:
    this.id=this.route.snapshot.params['id'];

    // ! useris gali tureti arba netureti tipo ir id, del to sakom kad turesim visuomet tipa ir id 
    this.usersService.getUser(this.id!).subscribe({
      next:(user)=>{
        this.name=user.name!;
        this.email=user.email;
        this.type=user.type!;
      }
    })
  }

  public userSubmit(form:NgForm){
    this.usersService.updateUser({id:this.id, ...form.form.value}).subscribe({
      next:(data)=>{
        this.router.navigate(['users','list']);
      }
    })

  }

}
