import { Injectable } from '@angular/core';
import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from './Users';
import{map}from 'rxjs/operators'

@NgModule({
  imports: [],
  exports: []
})

@Injectable({
  providedIn: 'root'
})

export class SharedService
{

  constructor(private http:HttpClient) { }

  url:string = "http://localhost:3000/posts";

  getUsers()
  {
    return this.http.get<Users[]>(this.url);
  }

  postData(data:any)
  {
    return this.http.post<any>(this.url,data)
    .pipe(map((res:any)=>{
    return res;
     }))
   }

  postIdUserProfile(id:any)
  {
    return this.http.get(`${this.url}/${id}`);
  }

  getUserById(id:any)
  {
    return this.http.get(`${this.url}/${id}`);
  }

  updateUserData(id:any,data:any)
  {
    return this.http.put(`${this.url}/${id}`,data);
  }

}




