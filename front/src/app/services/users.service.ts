import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }

    // kreipiames i back pasiimti visus vartotojus
  public getUsers(){
    return this.http.get<User[]>('http://localhost:5998/users/').pipe(map((users)=>{
      const usersO:User[]=[];
      users.forEach((user)=>{
        usersO.push( new User(user.email, user.id, user.name, user.surname, user.password, user.type, user.phone, user.token, user.img) );
      });
      return usersO;
    }));
  }

  public getUser(id:number){
    return this.http.get<User>('http://localhost:5998/users/'+id).pipe(
      map(
        (user)=>{
          return new User(user.email, user.id, user.name, user.surname, user.password, user.type, user.phone, user.token, user.img);
        })
      );
  }

  public updateUser(user:User){
    return this.http.put('http://localhost:5998/users/'+user.id, user);
  }
    
  public updateUserAndPhoto(user:User, file:any){
    const postUser=new FormData();
    postUser.append('name', user.name!);
    postUser.append('surname', user.surname!);
    postUser.append('email', user.email!);
    postUser.append('password', user.password!);
    postUser.append('phone', user.phone!);
    postUser.append('image',file);
    return this.http.post('http://localhost:5998/users/'+user.id, postUser);

  }

  public deleteUser(id:number){
    return this.http.delete('http://localhost:5998/users/'+id);
  }
}
