import { Component } from '@angular/core';
import {MatDialog } from '@angular/material/dialog';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

export interface DialogData
{
  animal: string;
}

interface Locations
{
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent
{
  constructor(public dialog:MatDialog) { }

  openDialog(): void
  {
    const dialogRef = this.dialog.open
    (UserRegistrationComponent,
      {
        width: '500px',height:"100%"
      }
    );

    dialogRef.afterClosed().subscribe
    (result =>
      {
        console.log('The dialog was closed');
      }
    );
  }

  Location: Locations[] =
  [
    {value: 'Mumbai', viewValue: 'Mumbai'},
    {value: 'Thane', viewValue: 'Thane'},
    {value: 'Pune', viewValue: 'Pune'}
  ];
}
