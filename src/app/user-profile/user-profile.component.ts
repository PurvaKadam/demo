import { Component, OnInit} from '@angular/core';
import { Users } from '../Users';
import { SharedService } from '../shared.service';
import { NgForm } from '@angular/forms';
import {MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

export interface DialogData
{
  animal: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [SharedService]
})

export class UserProfileComponent implements OnInit
{

  imageUrl : string = "/assets/img.jpg";
  base64:string = "Base64...";
  fileSelected?:Blob;
  ImageURL?:string;
  imageToShow:any;
  myURL:any
  http: any;

  constructor(private shared:SharedService,public dialog:MatDialog) { }

    latestUser :any;
    users : Users[] = [];
    registration !: NgForm;
    ngOnInit() : void
    {

      this.shared.getUsers().subscribe
      ((response)=>
        {
          //console.warn(response);
          //console.warn(response[response.length-1]);
          this.latestUser = response[response.length-1];
          console.warn('id particular',this.latestUser);
        },(error)=>
        {
          console.log("error",+error);
        }
      );
    }

    editProfile(id:any)
    {
      const dialogRef = this.dialog.open
      (EditProfileComponent,
        {
          width: '525px',height:"100%",
          disableClose: true,
          data :{'id': id}
        }
      );
    }
}


