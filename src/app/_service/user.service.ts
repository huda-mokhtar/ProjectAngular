import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loginUser(){
    return JSON.parse(localStorage.getItem('user'));
  }
  constructor(public http:HttpClient) {
   }
  register(user:User){
    return this.http.post<User>(" http://localhost:3000/users",user);
  } 
  login(user:User){
    return this.http.post<User>("http://localhost:3000/users/login",user);
  }
  follow(id: number) {
    return this.http.post('http://localhost:3000/users/follow/' + id,{},{ headers: { authorization: this.loginUser().token } });
  }
  unfollow(id: number) {
    return this.http.post('http://localhost:3000/users/unfollow/' + id, {},{ headers: { authorization: this.loginUser().token } });
  }
  Followers() {
    return this.http.get<User[]>('http://localhost:3000/users/followers/' + this.loginUser()._id,{ headers: { authorization: this.loginUser().token } } );
  }
  Followings() {
    return this.http.get<User[]>('http://localhost:3000/users/followings/' + this.loginUser()._id,{ headers: { authorization: this.loginUser().token } } );
  }
  getAll() {
    return this.http.get<User[]>('http://localhost:3000/users/', { headers: { authorization: this.loginUser().token } } );
  }
  update(user:User){
    console.log("service",user);
    return this.http.patch<User>('http://localhost:3000/users',user,{ headers: { authorization: this.loginUser().token } });
  }
}
