import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: '<p>{{message}}</p>'
})
export class LoadingComponent {
  @Input() message: string;
}
