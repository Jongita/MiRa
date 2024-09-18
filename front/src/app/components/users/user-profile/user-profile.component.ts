import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
public user:User|null;
  constructor (private authService:AuthService){
    this.user=authService.user;

  }

}
