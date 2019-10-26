import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { delay, filter, map } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { RouterTracking, TrackNavigationEnd } from './router-common';

/**
 * Track Route changes for applications using Angular's
 * default router
 *
 * @link https://angular.io/api/router/Router
 */
@Injectable({ providedIn: 'root' })
export class OmnitureRouter implements RouterTracking {
  constructor(
    private router: Router,
    private location: Location,
  ) {}

  trackLocation(): Observable<TrackNavigationEnd> {
    return this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((e: NavigationEnd) => {
        return { url: e.urlAfterRedirects };
      }),
      delay(0),
    );
  }

  prepareExternalUrl(url: string): string {
    return this.location.prepareExternalUrl(url);
  }
}
