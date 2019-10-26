import { Component } from '@angular/core';
import { OmnitureAnalytics } from './omniture/omniture.service'
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private omnitureAnalytics: OmnitureAnalytics, private cookieService: CookieService) {
    const userName: string = cookieService.get('AMP_USER_NAME');
    const serverName: string = document.domain
    omnitureAnalytics.startTracking({
      userName,
      serverName
    })
  }
}
