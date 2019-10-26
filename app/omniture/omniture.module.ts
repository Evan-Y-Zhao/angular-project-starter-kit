import { ModuleWithProviders, NgModule } from '@angular/core';

import { OmnitureRouter } from './omniture-router';
import { OmnitureAnalytics } from './omniture.service';
import { RouterTracking } from './router-common'
import { OmnitureDirectiveModule, OmnitureDirective } from './omniture.directive'
import { OMNITUREANALYTICS_TOKEN } from './settings'
import { OmnitureSettings } from './settings'

@NgModule({
    imports: [OmnitureDirectiveModule],
    exports: [OmnitureDirective],
})
export class OmnitureModule {
    static forRoot(
        settings: Partial<OmnitureSettings> = {},
    ): ModuleWithProviders {
        return {
            ngModule: OmnitureModule,
            providers: [
                { provide: OMNITUREANALYTICS_TOKEN, useValue: { settings } },
                { provide: RouterTracking, useClass: OmnitureRouter },
                OmnitureAnalytics,
            ],
        };
    }
}
