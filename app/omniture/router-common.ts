import { BehaviorSubject,  Observable } from 'rxjs';
import { OmnitureSettings } from './settings'

export interface TrackNavigationEnd {
  url: string;
}

export class RouterTracking {

  trackLocation(settings: OmnitureSettings): Observable<TrackNavigationEnd> {
    return new BehaviorSubject<TrackNavigationEnd>({ url: '/' });
  }

  prepareExternalUrl(url: string): string {
    return url;
  }
}
