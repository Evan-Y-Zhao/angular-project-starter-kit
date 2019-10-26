import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { ShowAuthedDirective } from './show-authed.directive';
import { InlineSVGModule } from 'ng-inline-svg';
import { LockerComponent } from './locker.component';
import { ChartsModule } from '../charts';
import { OmnitureModule } from '../omniture/omniture.module';
import { SliderModule } from './slider/slider.mobule'

import {
  SharedLineChartComponent,
  SharedDonutChartComponent,
  SharedBarChartComponent,
  SharedDonutChartLabelLineComponent,
  SharedGroupDonutChartComponent
} from '../shared/charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InlineSVGModule,
    ChartsModule,
    OmnitureModule,
    SliderModule
  ],
  declarations: [
    ShowAuthedDirective,
    LockerComponent,
    SharedLineChartComponent,
    SharedDonutChartComponent,
    SharedBarChartComponent,
    SharedDonutChartLabelLineComponent,
    SharedGroupDonutChartComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShowAuthedDirective,
    LockerComponent,
    SharedLineChartComponent,
    SharedDonutChartComponent,
    SharedBarChartComponent,
    SharedDonutChartLabelLineComponent,
    SharedGroupDonutChartComponent,
    InlineSVGModule,
    OmnitureModule,
    SliderModule
  ]
})
export class SharedModule {}
