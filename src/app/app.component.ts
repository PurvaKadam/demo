import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from './shared.service';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { Users } from './Users';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'DemoApp';
  constructor(public dialog: MatDialog,private shared : SharedService) { }

  onCreate(){
    this.dialog.open(UserRegistrationComponent);
  }
  columns = ["username","age"];
  index = ["firstname","age"];

users : Users[] = [];

ngOnInit() : void{

  this.shared.getUsers().subscribe((response)=>{
    this.users = response;
  },
  (error)=>
  {
    console.log("error",+error);
  })
}}

