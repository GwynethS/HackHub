import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeadlineDirective } from './directives/headline.directive';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    FullNamePipe,
    HeadlineDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule,
    FullNamePipe
  ]
})
export class SharedModule { }
