import { Component, OnChanges, Input } from '@angular/core';
import _ from 'lodash';
import { specialColor } from './utils';
import update from 'immutability-helper';


@Component({
    selector: 'app-shared-donut-chart',
    template: `<div>
  <app-donut-chart
    [customDonutClass]='donutClass'
    [customTitle]='donutTitle'
    [customSeries]='donutSeries'
    [customTooltip]='donutTooltip'
    ></app-donut-chart>
  </div>`
})
export class SharedDonutChartComponent implements OnChanges {

    series: Array<any>;
    title: string;
    donutTitle: any;
    donutData: Array<NameKeyPair>;
    donutSeries: Array<object>;
    donutTooltip: object = {
        trigger: 'item',
        formatter: '{b0}: {c0}%',
    };
    @Input() donutClass: string = 'customer-donut';
    @Input() data: Array<NameKeyPair>;
    @Input() average: any;

    ngOnChanges() { 
        if (this.data) {
            this.donutTitle = {
                show: true,
                left: '60%',
                y: 'center',
                text: `{a|Average}\n{b|${this.average}}{c|%}\n{a|Utilization}`,
                textAlign: 'center',
                textStyle: {
                    backgroundColor: '#984455',
                    padding: [3, 10, 10, 5],
                    lineHeight: 20,
                    rich: {
                        a: {
                            color: '#9B9B9B',
                            lineHeight: 25,
                            fontSize: 11,
                        },
                        b: {
                            color: '#1F5DAE',
                            fontSize: 24,
                        },
                        c: {
                            color: '#9B9B9B',
                            fontSize: 10,
                            padding: [0, 0, 0, 2],
                            verticalAlign: 'bottom'
                        }
                    }
                }
            };
            const itemStyle = {
                normal: {},
            };
            this.data && _.isArray(this.data) && this.data.map(x => {
                const sc = specialColor(x.name);
                if (sc) {
                    x.itemStyle = update(itemStyle, { normal: { $merge: { color: sc } } })
                } else {
                    x.itemStyle = itemStyle;
                }
                return x
            });
            this.donutSeries = [
                {
                    type: 'pie',
                    radius: ['40%', '65%'],
                    center: ['60%', '50%'],
                    data: this.data,
                    label: {
                        position: 'inside',
                        formatter: '{c}%',
                        color: '#fff',
                        align: 'center',
                        verticalAlign: 'middle',
                    },
                    // hoverOffset: 0,
                }
            ];
        } else {
            this.donutSeries = [];
            this.donutTitle = {}
        }
        
    }
}
