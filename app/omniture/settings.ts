import { InjectionToken } from '@angular/core';

interface RouteMapping {
    key: string;
    pair: string;
}

export interface PageTrackingSettings {
    autoTrackVirtualPages: boolean;
    basePath: string;
    routesMapping: (RouteMapping)[];
    excludedRoutes: (string | RegExp)[];
    /** drop ids from url `/sections/123/pages/456` -> `/sections/pages` */
    clearIds: boolean;
    /** drop contents of url after hash marker `/callback#authcode=1234` -> `/callback` */
    clearHash: boolean;
    /** drop query params from url `/sections/123/pages?param=456&param2=789` -> `/sections/123/pages` */
    clearQueryParams: boolean;
    /** used with clearIds, define the matcher to clear url parts */
    idsRegExp: RegExp;
}
export interface OmnitureSettings {
    pageTracking: Partial<PageTrackingSettings>;
    /** Disable page tracking */
    developerMode: boolean;
}

export interface MandatoryFields {
    serverName: string;
    userName: string;
}


export class DefaultConfig implements OmnitureSettings {
    pageTracking = {
        autoTrackVirtualPages: true,
        basePath: '',
        excludedRoutes: [],
        clearIds: false,
        clearHash: false,
        clearQueryParams: false,
        idsRegExp: /^\d+$|^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    };
    developerMode = false;
}

export interface OmnitureAnalyticsToken {
  settings: Partial<OmnitureSettings>;
}

export const OMNITUREANALYTICS_TOKEN = new InjectionToken<OmnitureAnalyticsToken>('omniture-analytics');
