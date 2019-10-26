import { Component, OnChanges, Input } from '@angular/core';
import _ from 'lodash';
import { ChartService } from '../../charts/charts.service';

import { from } from 'rxjs'
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-shared-line-chart',
  template: `<div>
  <app-line-chart
  [customLineChartClass]="lineClass"
  [customSeries]='series'
  [customLegend]='legend'
  [customColors]='colors'
  (onChartInitFromParent)="onChartInit($event)"
  [xAxisName]='xAxisName'
  [yAxisName]='yAxisName'
  [xAxisData]='xAxisData'
  [customGrid]='grid'
  ></app-line-chart>
  </div>`
})
export class SharedLineChartComponent implements OnChanges {

  colors: Array<string>;
  series: Array<any> = [];
  xAxisName: string;
  yAxisName: string;
  xAxisData: Array<string>;
  defaultColor = '#222';
  grid: any = {
    left: '8%'
  }
  legend: any = {
    type: 'scroll',
    data: [],
    inactiveColor: this.defaultColor,
    align: 'center',
    textStyle: {
      padding: [10, 15],
      borderWidth: 1,
      borderRadius: 18,
    }
  };

  constructor(private chartService: ChartService) {
    this.colors = chartService.lineChartcolors;
  }

  @Input() data: any;
  @Input() lineClass: string = 'customer-bar';
  @Input() difference: boolean = false;
  unitNamePair = {};
  currentYUnit: string = ''

  getSelectedTextStyle = (index) => ({ borderColor: this.colors[index], backgroundColor: this.colors[index], color: '#fff' });
  getUnSelectedTextStyle = (index) => ({ borderColor: this.colors[index] });

  onChartInit = ({ echartsInstance, options, e }) => {
      // Reflect the styles to the status quo selected box.
      if (_.isObject(e) && _.isObject(e.selected)) {
        if (this.difference) {
          const currentClickedName = e.name;
          this.yAxisName = this.unitNamePair[currentClickedName];
          from(options.legend.data).pipe(filter((t: any) => t.unit !== this.unitNamePair[currentClickedName])).subscribe((x) => {
            e.selected[x.name] = false;
          });
        }
        options.legend.selected = e.selected;
        for (const k of Object.keys(e.selected)) {
          const index = _.findIndex(options.legend.data, { name: k });
          if (e.selected[k]) {
            options.legend.data[index].textStyle = this.getSelectedTextStyle(index);
          } else {
            options.legend.data[index].textStyle = this.getUnSelectedTextStyle(index);
          }
        }

      }
      echartsInstance.setOption(options);
  }

  ngOnChanges() {
    if (this.data && this.data.yaxis && this.data.yaxis.data && this.data.yaxis.data.length > 0) {
      this.legend.selected = {};
      this.series = [];

      this.legend.data = this.data.yaxis.data.map((s, k) => {
        
        // Form the series for line chart
        this.series.push({
          name: s.name,
          data: s.data,
          type: 'line',
          smooth: true
        })

        // Make a object in which key is name;
        this.unitNamePair[s.name] = s.unit

        // Form the data for legend to comply with global standard.
        if (this.data.yaxis.unit === s.unit || !this.difference) {
          this.legend.selected[s.name] = true;
          return {
            name: s.name,
            unit: s.unit,
            icon: 'none', textStyle: this.getSelectedTextStyle(k)
          };
        } else {
          this.legend.selected[s.name] = false;
          return {
            name: s.name,
            unit: s.unit,
            icon: 'none', textStyle: this.getUnSelectedTextStyle(k)
          };
        }
      });
      this.currentYUnit = this.data.yaxis.unit
      this.yAxisName = this.data.yaxis.unit;
    } else {
      this.series = [];
      this.yAxisName = `KPI's Unit`;
    }
    if (this.data && this.data.xaxis) {
      this.xAxisData = this.data.xaxis.data;
      this.xAxisName = this.data.xaxis.unit;
    } else {
      this.xAxisName = 'Day';
      // this.xAxisData = [];
    }
  }
}
