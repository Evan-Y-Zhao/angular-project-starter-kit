import { Component, OnChanges, Input } from '@angular/core';
import { ChartService } from '../../charts'
import * as _ from 'lodash'
import { specialColor } from './utils';
import update from 'immutability-helper';

@Component({
    selector: 'app-shared-donut-chart-label-line',
    template: `<div style="margin-left: 50px">
  <app-donut-chart
    *ngIf='data'
    [customDonutClass]='donutClass'
    [customTitle]='donutTitle'
    [customSeries]='donutSeries'
    ></app-donut-chart>
  </div>`
})
export class SharedDonutChartLabelLineComponent implements OnChanges {
    colors: Array<string>;
    series: Array<any>;
    title: string;
    donutTitle: any;
    donutData: Array<NameKeyPair>;
    donutSeries: Array<object>;
    @Input() donutClass: string = 'customer-donut';;
    @Input() data: Array<any>;
    @Input() average: any = '';
    option: any;
    colorSequence = 0;

    constructor (chartService: ChartService) {
        this.colors = chartService.donutChartcolors;
    }


    ngOnChanges() {
        let calculateColor = {
            currentValue: 0,
            next: () => {
                if (calculateColor.currentValue === this.colors.length - 1) {
                    calculateColor.currentValue = 0
                } else {
                    calculateColor.currentValue += 1;
                }
            }
        };

        const riches = {};

        const itemStyle = {
            normal: {},
        };
        this.data && _.isArray(this.data) && this.data.map((x, k) => {
            const sc = specialColor(x.name);
            if (sc) {
                x.itemStyle = update(itemStyle, { normal: { $merge: { color: sc } } });
            } else {
                x.itemStyle = itemStyle;
            }
            riches['rich' + k] = {
                color: sc ? sc : this.colors[calculateColor.currentValue]
            };
            calculateColor.next();
        });

        this.donutTitle = {
            show: true,
            x: 'center',
            y: 'center',
            text: `{a|Average}\n{b|${this.average}}{c|%}\n{a|Utilization}`,
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
        // To fulfill the look of label presiding both inside and outside of donut chart.
        // The only way so far is use two series in the same position with same radius.
        this.donutSeries = [
            {
                type: 'pie',
                radius: ['30%', '50%'],
                data: this.data,
                label: {
                    position: 'inside',
                    formatter: '{c}%',
                    color: '#fff',
                    align: 'center',
                    verticalAlign: 'middle',
                },
            },
            {
                type: 'pie',
                radius: ['30%', '50%'],
                data: this.data,
                label: {
                    normal: {
                        padding: [ -50, -50, 0, -50 ],
                        formatter: function( v ) {
                            const data = v.data
                            return `{a|${data.name}}\n{rich${v.dataIndex}|${data.value2}} {c|hrs/day}`;
                        },

                        rich: {
                            a: {
                                color: '#222',
                                lineHeight: 20
                            },
                            c: {
                                fontSize: 9,
                            },
                            ...riches
                        }
                    }
                },
                labelLine: {
                    normal: {
                        length: 20,
                        length2: 50,
                    }
                },
            }
        ];
    }
}
