


import { Component, OnChanges, Input } from '@angular/core';
import * as _ from 'lodash';
import { specialColor } from './utils';
import update from 'immutability-helper';

@Component({
    selector: 'app-shared-bar-chart',
    template: `<div>
  <app-bar-chart
  [customLineChartClass]="stackedBarClass"
  [customSeries]='series'
  [xAxisName]='xAxisName'
  [yAxisName]='yAxisName'
  [xAxisData]='xAxisData'
  [customGrid]='grid'
  ></app-bar-chart>
  </div>`
})
export class SharedBarChartComponent implements OnChanges {

    series: Array<any>;
    xAxisName: string;
    yAxisName: string;
    xAxisData: Array<string> = [];
    grid: any = {
        left: '8%'
    }

    @Input() data: any;
    @Input() stackedBarClass: string = 'customer-bar';

    ngOnChanges() {
        const itemStyle = {
            normal: {},
            emphasis: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
            }
        };
        if (this.data && this.data.yaxis && this.data.yaxis.data.length > 0) {
            this.series = this.data.yaxis.data.map((v) => {
                const sc = specialColor(v.name);
                return {
                    name: v.name,
                    data: v.data,
                    type: 'bar',
                    stack: 'one',
                    itemStyle: sc ? update(itemStyle, { normal: { $merge: { color: sc } } }) : itemStyle,
                    barCategoryGap: '0%',
                };
            });
            this.yAxisName = this.data.yaxis.unit;
        } else {
            this.series = [];
            this.yAxisName = `KPI's Unit`;
        }
        if (this.data && this.data.xaxis) {
            this.xAxisData = this.data.xaxis.data;
            this.xAxisName = this.data.xaxis.unit;
        } else {
            this.xAxisData = [];
            this.xAxisName = 'Day'
        }
    }
}
