import { Component, OnInit } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  navList: Array<any>;
  routerPath: string;

  constructor(private planform: PlatformLocation) {}

  ngOnInit() {
    this.navList = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        omniTrack: 'Navigation | Dashboard Menu click',
        checked: false,
      },
      {
        name: 'Compare',
        path: '',
        checked: false,
        omniTrack: 'Navigation | Compare Menu click',
      },
      {
        name: 'Report',
        path: '/report',
        checked: false,
        omniTrack: 'Navigation | Report Menu click',
      },
      {
        name: 'Configuration',
        path: '',
        checked: false
      },
      {
        name: 'Basic Setting',
        path: '',
        checked: false
      }
    ];
    this.routerPath = this.planform.hash.substr(1);
    this.navList.map((obj, i) => {
      if ( obj.path === '/dashboard' && this.routerPath.indexOf('/system') !== -1) {
        obj.checked = true;
      } else if (obj.path === this.routerPath) {
        obj.checked = true;
      } else {
        obj.checked = false;
      }
    });
  }

  clickLink(key) {
    this.navList.map((obj, i) => {
      if (i === key) {
        obj.checked = true;
      } else {
        obj.checked = false;
      }
    });
  }
}
