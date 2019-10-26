import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { MatSliderContent, _MatSliderContentBase } from './slider-content';
import { MatTabLabelWrapper } from './content-wrapper';
import { MatPaginatedSliderContent } from './paginated-slider-content';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [

        MatSliderContent,
        _MatSliderContentBase as any,
        MatTabLabelWrapper,
        MatPaginatedSliderContent,

    ],
    exports: [
        MatSliderContent
    ],
})
export class SliderModule {
}
