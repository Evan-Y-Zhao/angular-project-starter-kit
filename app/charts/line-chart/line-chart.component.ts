import { Component, OnInit, OnChanges, Input, EventEmitter, Output } from '@angular/core';
import * as _ from 'lodash';
import { ChartService } from '../charts.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: '../chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnChanges {

  initOpts: any;
  options: any;
  detectEventChanges = true;
  colors: Array<string>;
  defaultColor = '#222';
  legend: any = {
    data: [],
    inactiveColor: this.defaultColor,
    align: 'center',
    textStyle: {
      padding: [10, 15],
      borderWidth: 1,
      borderRadius: 18,
    }
  };
  class: string;
  series: Array<any> = [];
  textStyle: object = {
    color: '#9B9B9B',
  };
  title: object = {};
  grid: object = {
  };
  tooltip: object = {};
  graphic: object = {};

  @Input() xAxisData: Array<string> = [];
  @Input() xAxisName: string;
  @Input() yAxisName: string;

  @Input()
  set customLineChartClass(name: string) {
    this.class = name;
  }

  @Input() customOptions: any;
  @Input()
  set customTextStyle(value: object) {
    this.textStyle = value;
  }

  @Input()
  set customTitle(value: object) {
    this.title = value;
  }

  @Input()
  set customColors(value: Array<string>) {
    this.colors = value;
  }

  @Input()
  set customLegend(value: object) {
    this.legend = value;
  }

  @Input()
  set customSeries(value: Array<object>) {
    this.series = value;
  }

  @Input()
  set customGrid(value: Array<object>) {
    this.grid = value;
  }

  @Input()
  set customToolTip(value: Array<object>) {
    this.tooltip = value;
  }

  @Input()
  set customInitOpts(value: Array<object>) {
    this.initOpts = value;
  }

  @Output() onChartInitFromParent = new EventEmitter();


  constructor(private chartService: ChartService) {
    
  }

  @Input() getSelectedTextStyle: Function;

  setOption() {
    
    this.options = this.customOptions || {
      color: this.colors,
      legend: this.legend,
      tooltip: this.tooltip,
      title: this.title,
      grid: this.grid,
      textStyle: this.textStyle,
      
      xAxis: {
        data: this.xAxisData,
        name: this.xAxisName,
        nameLocation: 'center',
        nameTextStyle: {
          color: this.defaultColor
        },
        nameGap: 40,
        silent: false,
        splitLine: {
          show: false
        },
        axisLabel: {
          interval: 0,
          fontFamily: 'HelveticaNeue'
        },
        axisLine: {
          lineStyle: {
            color: '#9B9B9B',
          },
          width: 2,
        },
        axisTick: {
          show: false,
        }
      },
      yAxis: {
        name: this.yAxisName,
        nameLocation: 'center',
        nameTextStyle: {
          color: this.defaultColor
        },
        nameGap: 30,
        axisLine: {
          lineStyle: {
            color: '#9B9B9B',
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false,
        }
      },
      series: this.series,
    };
    
    if (this.series && this.series.length === 0) {
      this.options.graphic = this.chartService.getGraphic()
    }
  }

  ngOnInit() {
    this.setOption();
  }

  ngOnChanges() {
    this.setOption();
  }

  onChartEvent() {
  }

  onChartInit(echartsInstance: any) {
    echartsInstance.on('legendselectchanged', (e: LegendCallback) => {
      this.onChartInitFromParent && this.onChartInitFromParent.emit({ echartsInstance, options: this.options, e})
    })
  }
}
