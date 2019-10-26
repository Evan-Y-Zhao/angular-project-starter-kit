import { Component, OnChanges, Input } from '@angular/core';

@Component({
    selector: 'app-shared-group-donut-chart',
    template: `<div>
  <app-donut-chart
    *ngIf='data'
    [customDonutClass]='donutClass'
    [customTitle]='donutTitle'
    [customSeries]='donutSeries'></app-donut-chart>
  </div>`
})
export class SharedGroupDonutChartComponent implements OnChanges {

    series: Array<any>;
    title: string;
    donutTitle: any;
    donutData: Array<NameKeyPair>;
    donutSeries: Array<object>;
    @Input() donutClass: string;
    @Input() data: Array<NameKeyPair>;
    @Input() average: any;

    ngOnChanges() {
        this.donutTitle = {
            show: true,
            x: 'center',
            y: 'center',
            // left: '50%',
            text: `{b|${this.average}}\n{a|hrs/day}`,
            textStyle: {
                backgroundColor: '#984455',
                padding: [3, 10, 10, 5],
                lineHeight: 20,
                rich: {
                    a: {
                        color: '#9B9B9B',
                        lineHeight: 20,
                        fontSize: 10,
                    },
                    b: {
                        color: '#1F5DAE',
                        fontSize: 16,
                    }
                }
            }
        };

        this.donutSeries = [
            {
                type: 'pie',
                center: ['50%', '50%'],
                radius: ['55%', '85%'],
                data: this.data,
                label: {
                    position: 'inside',
                    formatter: '{c}%',
                    fontSize: 10,
                    color: '#fff',
                    align: 'center',
                    verticalAlign: 'middle',
                },
            }
        ];
    }
}
