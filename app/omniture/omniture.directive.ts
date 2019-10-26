import {
    AfterContentInit,
    Directive,
    ElementRef,
    Input,
    NgModule,
    Renderer2,
    HostListener
} from '@angular/core';
import { OmnitureAnalytics } from './omniture.service';

@Directive({ selector: '[omnitureOn]' })
export class OmnitureDirective implements AfterContentInit {
    @Input() omniEvent: string;

    constructor(private omnitureAnalytics: OmnitureAnalytics) {
    }
    
    ngAfterContentInit(): void {
       if (!this.omniEvent) {
        // throw new Error('The property of eventName is required!')
       }
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        event.preventDefault();
        event.stopPropagation();
        if (this.omniEvent)
            this.omnitureAnalytics.eventTrack.next({
                desc: this.omniEvent
            })
    }

}


@NgModule({
    declarations: [OmnitureDirective],
    exports: [OmnitureDirective],
})
export class OmnitureDirectiveModule { }