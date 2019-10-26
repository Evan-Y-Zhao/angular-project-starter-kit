import { Inject, Injectable } from '@angular/core';

import { MonoTypeOperatorFunction, ReplaySubject, throwError } from 'rxjs';
import { EventTrack, PageTrack } from './omniture.interface';
import { RouterTracking, TrackNavigationEnd } from './router-common';
import { OMNITUREANALYTICS_TOKEN, OmnitureAnalyticsToken, OmnitureSettings, DefaultConfig, MandatoryFields } from './settings'
import { filter } from 'rxjs/operators';

declare const s: any;

@Injectable({ providedIn: 'root' })
export class OmnitureAnalytics {
    pageTrack = new ReplaySubject<Partial<PageTrack>>(10);
    eventTrack = new ReplaySubject<Partial<EventTrack>>(10);

    settings: OmnitureSettings;

    constructor(
        private tracker: RouterTracking,
        @Inject(OMNITUREANALYTICS_TOKEN) setup: OmnitureAnalyticsToken,
    ) {
        const defaultConfig = new DefaultConfig();
        this.settings = { ...defaultConfig, ...setup.settings };
        this.settings.pageTracking = {
            ...defaultConfig.pageTracking,
            ...setup.settings.pageTracking,
        };
        this.tracker
            .trackLocation(this.settings)
            .subscribe((event: TrackNavigationEnd) =>
                this.trackUrlChange(event.url),
            );
    }
    protected trackUrlChange(url: string) {
        const path = this.routesMapping(url);
        this.pageTrack.next({ path });
    }

    routesMapping(url) {
        const routesMapping = this.settings.pageTracking.routesMapping;
        if (routesMapping && routesMapping.length > 0) {
            const value = routesMapping.find((e) => {
                if (url.indexOf(e.key) !== -1) {
                    return true;
                }
                return false;
            })
            return value && value.pair;
        } else {
            return url
        }
    }

    filterDeveloperMode<T>(): MonoTypeOperatorFunction<T> {
        return filter((value, index) => !this.settings.developerMode);
    }

    startTracking(fields: MandatoryFields): void {
        this.pageTrack
            .subscribe((x) => this.pageTrackFunc(fields, x));
        this.eventTrack
            .subscribe((x) => this.eventTrackFunc(fields, x));
    }

    pageTrackFunc(fields, properties: any) {
        if (typeof s !== 'undefined' && s) {
            s.pageName = properties.path;
            s.server = fields.serverName;
            s.prop25 = fields.userName;
            s.tl();
            delete s.pageName;
        }
    }

    eventTrackFunc(fields, properties: any) {
        if (typeof s !== 'undefined' && s) {
            s.server = fields.serverName;
            s.prop25 = fields.userName;
            s.prop66 = properties.desc;
            s.prop67 = properties.desc;
            s.tl();
            delete s.events;
        }
    }
}
