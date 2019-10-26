import { Directive, Input, TemplateRef, ViewContainerRef, HostListener } from '@angular/core';

@Directive({
    selector: '[myCustom1If]'
})

export class MyCustomIfDirective {

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef) { 
        }

    @Input() set myCustom1If(condition: boolean) {
        if (condition) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
} 

