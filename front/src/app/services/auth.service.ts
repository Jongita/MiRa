import { EventEmitter, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:User|null=null;
  public onLoginStatusChange=new EventEmitter<boolean>

  constructor(private httpClient:HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 
    // Only execute if we're in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      const user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    }
  }

  public registerUser(user:User){
    console.log("registruojame nauja vartotoja");
    console.log(user);
    return this.httpClient.post("http://localhost:5998/auth/signin", user);
  }

  public loginUser(user:User){
    return this.httpClient.post<User>("http://localhost:5998/auth/login", user).pipe(tap( (response)=>{
      this.user=response;
      localStorage.setItem("user", JSON.stringify(this.user))
      this.onLoginStatusChange.emit(true)
    }))
}

  public logOut(){
    this.user=null;
    localStorage.removeItem("user");
    this.onLoginStatusChange.emit(false)
  }

  public isLoggedin(){
    return (this.user!=null && this.user.token!=null);
  }

  public canEdit(){
    return this.user!=null && (this.user.type==0 || this.user.type==1)
  }

  public canEditUsers(){
    return (this.user!=null && (this.user.type==0))
  }

  public canViewData(){
    return this.isLoggedin();
  }

}



