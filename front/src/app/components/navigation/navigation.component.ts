import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  public isLoggedin:boolean=false;
  public cartItemCount:number=0;

  constructor (public authService:AuthService, private router:Router, private cartService: CartService ){
    if (authService.isLoggedin()){
      this.isLoggedin=true;
    }else{
      this.isLoggedin=false;
    }
    this.authService.onLoginStatusChange.subscribe((isLoggedin)=>{
      this.isLoggedin=isLoggedin;
    })
    
  }
// gauname kiek itemu yra krepselyje
  ngOnInit(): void {
    // Subscribe to the cartItems$ observable
    this.cartService.cartItems$.subscribe((items) => {
      // Sum the quantities of all items to get the total count
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
      console.log(this.cartItemCount);
    });
  }
  
  public logoutClick(){
    this.authService.logOut();
    this.isLoggedin=false;
    this.router.navigate(["/"]);
  }

}
