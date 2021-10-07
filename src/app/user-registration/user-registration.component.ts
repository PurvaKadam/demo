import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../Users';

export interface Fruit
{//tags...
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
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  providers: [SharedService]
})
export class UserRegistrationComponent implements OnInit
{

  registration : any;
  imageUrl: string = "/assets/img.jpg";
  form: any;
  users : Users[] = [];
  ImageURL?:string;
  base64:string = "Base64...";
  fileSelected?:Blob;

  formatLabel(value: number)
    {
      if (value >= 60)
      {
        return Math.round(value / 60);
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
    @Inject(MAT_DIALOG_DATA) data: DialogData, private formbuilder: FormBuilder, private http: HttpClient,
    private router: Router,private sant:DomSanitizer,private shared:SharedService) { }


  ngOnInit(): void
    {
      this.registration = this.formbuilder.group
      ({
        photo: ['',Validators.required],
        firstname: ['', [Validators.required,Validators.maxLength(20)]],
        lastname: ['',Validators.required,],
        email: ['',Validators.email],
        phone: ['',[Validators.required,Validators.maxLength(20),Validators.pattern("^[0-9]*$"),
                    Validators.minLength(10)]],
        age: ['',Validators.required],
        state: ['',Validators.required],
        country: ['',Validators.required],
        address: ['',Validators.required],
        tags: ['',Validators.required]
      });
    }

    registerUser()
    {
      //register and post data to server...
      this.shared.postData(this.registration.value)
      .subscribe(res =>
        {
          alert("register successfully");
          this.registration.reset();
          this.router.navigate(['user-profile']);
        }, err =>
        {
          alert("something went wrong")
        });
    }

    HandleFileInput(files:FileList):void
    {
      //image url to base64code...
      this.fileSelected = files[0];
      this.ImageURL = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
      let reader = new FileReader();
      reader.readAsDataURL(this.fileSelected as Blob);
      reader.onloadend = () =>
      {
        this.base64 = reader.result as string;
        console.warn('base64 res :',this.base64);
        this.registration.controls['photo'].setValue(this.base64);
        console.log(this.registration.value);
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
  }
}



