import { EventEmitter, Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user:User|null=null;
  public onLoginStatusChange=new EventEmitter<boolean>

   constructor(private httpClient: HttpClient) {
  if (typeof window !== 'undefined') {
    const user = localStorage.getItem('user');
    if (user !== null) {
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

  public canSeeUser(){
    return this.user!=null && (this.user.type==2 || this.user.type==1)
  }

  public canEditUsers(){
    return (this.user!=null && (this.user.type==0))
  }

  public canViewData(){
    return this.isLoggedin() && (this.user!.type==2)
  }


}



