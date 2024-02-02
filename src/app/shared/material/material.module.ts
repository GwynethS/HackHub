import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import { MatListModule } from '@angular/material/list';

const materialModules = [
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatTableModule,
  MatListModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules
  ],
  exports:[
    materialModules
  ]
})
export class MaterialModule { }
