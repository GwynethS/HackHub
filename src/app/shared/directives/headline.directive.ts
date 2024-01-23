import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHeadline]'
})
export class HeadlineDirective {

  constructor(elementRef: ElementRef, renderer: Renderer2) { 
    renderer.setStyle(elementRef.nativeElement, "font-size", "20px");
  }

}
