import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';



@NgModule({
  declarations: [
    FullNamePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
