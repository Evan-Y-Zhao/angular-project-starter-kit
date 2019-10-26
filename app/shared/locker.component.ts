import { Component, Input } from '@angular/core';
declare var require;

@Component({
  selector: 'app-locker',
  template: `<div class="fake-locker"><div class="fake-locker-child"><img width="100%" height="90%" [src]="locker" /></div><div class="fake-locker-subtitle">{{name}}</div></div>`
})
export class LockerComponent {
  locker = require("./locker.svg");
  @Input() name: string;
}
