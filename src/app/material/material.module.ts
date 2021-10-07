import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

const Material = [
  MatDialogModule,
  MatToolbarModule,
  MatFormFieldModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule
];

@NgModule({
  imports: [Material],
  exports: [Material]
})
export class MaterialModule { }
