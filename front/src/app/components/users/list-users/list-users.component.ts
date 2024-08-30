import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
    public users:User[]=[];

  private loadData(){
    this.usersService.getUsers().subscribe({
      next:(users)=>{
        this.users=users;
        console.log(this.users[0]);
      }
    });
  }
  constructor (private usersService:UsersService){
    this.loadData();
  }
  
  public onDeleteClick(id:number){
    this.usersService.deleteUser(id).subscribe({
      next:(result)=>{
        this.loadData();
      }
    })
  }

}