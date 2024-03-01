import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeadlineDirective } from './directives/headline.directive';
import { MaterialModule } from './material/material.module';
import { ErrorsFeedbackPipe } from './pipes/errors-feedback.pipe';


@NgModule({
  declarations: [
    FullNamePipe,
    HeadlineDirective,
    ErrorsFeedbackPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    MaterialModule,
    FullNamePipe,
    ErrorsFeedbackPipe,
    HeadlineDirective
  ]
})
export class SharedModule { }
