import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[highligth]',
  standalone: true
})
export class HighligthDirective {

  element = inject(ElementRef);
  constructor() { }

  ngOnInit() {
    this.element.nativeElement.style.backgroundColor = 'red';
    this.element.nativeElement.style.color = 'white';
  }
}
