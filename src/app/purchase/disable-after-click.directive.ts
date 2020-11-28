import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[DisableAfterClick]'
})
export class DisableAfterClickDirective {

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.disabled = true;
  }

}
