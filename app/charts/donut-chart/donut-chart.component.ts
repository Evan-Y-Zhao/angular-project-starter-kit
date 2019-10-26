import { Component, OnInit, OnChanges, Input } from '@angular/core';
import * as _ from 'lodash';
import { ChartService } from '../charts.service';

@Component({
  selector: 'app-donut-chart',
  templateUrl: '../chart.component.html',
  styleUrls: ['./donut-chart.component.scss']
})
export class DonutChartComponent implements OnInit, OnChanges {
  initOpts: any;
  options: any;
  detectEventChanges = true;
  colors: Array<string>;
  defaultColor: string;
  class = 'donut-chart';
  textStyle: object = {
    color: '#9B9B9B',
  };
  tooltip: object = {};
  title: object;
  legend: object = {
    show: false,
  };
  grid: object = {
  };
  series: Array<object>;

  @Input() private data: Array<NameKeyPair>;

  @Input()
  set customDonutClass(name: string) {
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
  set customLegend(value: object) {
    this.legend = value;
  }

  @Input()
  set customSeries(value: Array<object>) {
    this.series = value;
  }

  @Input()
  set customTooltip(value: Array<object>) {
    this.tooltip = value;
  }

  @Input()
  set customInitOpts(value: Array<object>) {
    this.initOpts = value;
  }

  constructor(
    private chartService: ChartService
  ) {
    this.colors = chartService.donutChartcolors;
    this.defaultColor = '#222';
    
  }

  setOption() {
    this.options = this.customOptions || {
      color: this.colors,
      textStyle: this.textStyle,
      title: this.title,
      legend: this.legend,
      tooltip: this.tooltip,
      series: this.series,
      grid: this.grid,
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
  }
}
