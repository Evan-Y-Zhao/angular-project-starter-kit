import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ChartService } from './charts.service';
import { DonutChartComponent } from './donut-chart/donut-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxEchartsModule
  ],
  declarations: [
    LineChartComponent,
    BarChartComponent,
    DonutChartComponent,
  ],
  exports: [
    LineChartComponent,
    BarChartComponent,
    DonutChartComponent,
  ],
})
export class ChartsModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: ChartsModule,
        providers: [
          ChartService,
        ],
    };
}
}
