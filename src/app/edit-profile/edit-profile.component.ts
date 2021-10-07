import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../Users';
import { UserRegistrationComponent } from '../user-registration/user-registration.component';

export interface Fruit
{
  name: string;
}


interface State
{
  value: string;
  viewValue: string;
}

interface Country
{
  value: string;
  viewValue: string;
}

export interface DialogData
{
  animal: string;
  name: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
  providers: [SharedService]
})

export class EditProfileComponent implements OnInit {

  imageUrl: string = "/assets/img.jpg";
  form: any;
  ImageURL?: string;
  base64: string = "Base64...";
  fileSelected?: Blob;
  updatedUser: any;
  editProfile: any;
  users: Users[] = [];


  formatLabel(value: number)
  {
    if (value >= 60)
    {
      return Math.round(value / 360);
    }

    return value;
  }

  states: State[] =
  [
    { value: 'Maharashtra', viewValue: 'Maharashtra' },
    { value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh' },
    { value: 'Gujarat', viewValue: 'Gujarat' }
  ];

  Countries: Country[] =
  [
    { value: 'India', viewValue: 'India' },
    { value: 'UK', viewValue: 'UK' },
    { value: 'US', viewValue: 'US' }
  ];

  constructor(private dialogRef: MatDialogRef<UserRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient,
    private shared: SharedService,private sant: DomSanitizer,
    private router:Router) { }

  ngOnInit(): void
  {
    console.log(this.data.id);

    this.shared.postIdUserProfile(this.data.id).subscribe
    ((result: any) =>
    {
      this.updatedUser = result;

      this.editProfile = new FormGroup
      ({
        photo: new FormControl(result['photo']),
        firstname: new FormControl(result['firstname']),
        lastname: new FormControl(result['lastname']),
        email: new FormControl(result['email']),
        phone: new FormControl(result['phone']),
        age: new FormControl(result['age']),
        state: new FormControl(result['state']),
        country: new FormControl(result['country']),
        address: new FormControl(result['address']),
        tags: new FormControl(result['tags']),
        id: new FormControl(result['id'])
      });
      this.ImageURL = result.photo;
    });
  }

  updateUser()
  {
    // updating user by id...
    this.shared.updateUserData(this.data.id, this.editProfile.value)
    .subscribe
    ((result) =>
     {
      console.warn(result);
      }
    );
  }

  HandleFileInput(files: FileList): void
  {
    try {
      this.fileSelected = files[0];
      this.ImageURL = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
      let reader = new FileReader();
      reader.readAsDataURL(this.fileSelected as Blob);
      reader.onloadend = () =>
      {
        this.base64 = reader.result as string;
        this.editProfile.controls['photo'].setValue(this.base64);
      }
    } catch (exe)
    {
      console.log(exe);
    }
  }

  convertFileToBase64(): void
  {
    let reader = new FileReader();
    reader.readAsDataURL(this.fileSelected as Blob);
    reader.onloadend = () =>
    {
      this.base64 = reader.result as string;
    }
  }

  selectable = true;
  removable = true;
  addOnBlur = true;

  fruits: Fruit[] = [];

  add(event: MatChipInputEvent): void
  {
    const value = (event.value || '').trim();
    //adding tags
    if (value)
    {
      this.fruits.push({ name: value });
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: Fruit): void
  {
    const index = this.fruits.indexOf(fruit);
    if (index >= 0)
    {
      this.fruits.splice(index, 1);
    }
  }

  closeDialog(): void
  {
    this.dialogRef.close();
    this.router.navigate(['user-profile']);

  }

}

