import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeadlineDirective } from './directives/headline.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HeadlineDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
