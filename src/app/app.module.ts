import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes} from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedService } from './shared.service';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSliderModule} from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EditProfileComponent } from './edit-profile/edit-profile.component';


const routes: Routes = [
      {path: '',redirectTo: 'home-page',pathMatch: 'full'},
      {path: 'home-page',component: HomePageComponent},
      {path: 'user-registration',component: UserRegistrationComponent},
      {path: 'user-profile',component: UserProfileComponent},
      {path: 'edit-profile',component: EditProfileComponent}

];
@NgModule
(
  {
    declarations:
    [
      AppComponent,
      HomePageComponent,
      UserRegistrationComponent,
      UserProfileComponent,
      EditProfileComponent
    ],
    imports:
    [
      RouterModule.forRoot(routes),
      RouterModule,
      BrowserModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      HttpClientModule,
      MaterialModule,
      MatDialogModule,
      MatSliderModule,
      SharedService,
      MatButtonModule,
      MatCheckboxModule,
      MatInputModule,
      MatToolbarModule,
      MatChipsModule,
      MatIconModule,
      MatSelectModule,
      MatFormFieldModule
    ],
    exports:[],
    providers: [SharedService],
    bootstrap: [AppComponent],
  }
)
export class AppModule { }
