import { Injectable } from '@angular/core';

@Injectable()
export class ChartService {
    public lineChartcolors: Array<string>;
    public donutChartcolors: Array<string>;

    constructor() {
        this.lineChartcolors = ['#04BBA7', '#5323B2', '#F7941D', '#BA249C', '#CD9600', '#0067DB', '#8BCD31', '#B55DDE', '#0F76AC', '#FB5785', '#522D6D', '#4DA75E', '#F3B40A', '#008DE4', '#D10F22', '#02CEF4', '#CE4E16', '#322866', '#0BADE9', '#F44B00', '#267F5A', '#AD142A', '#008DE4', '#B67A44'];
        this.donutChartcolors = ['#005DAA', '#1E8AE7', '#7474C1', '#B8D2FF', '#148039', '#E8FCBC', '#522D6D', '#EE1314', '#ED7700', '##DCDCDC'];
    }

    setDonutChartColors (colors: Array<string>) {
        this.donutChartcolors = colors;
    }

    setLineChartColors (colors: Array<string>) {
        this.lineChartcolors = colors;
    }

    getGraphic () {
        return [{
            type: 'text',
            left: 'center', 
            top: '40%', 
            style: {
                stroke: '#54545C',
                text: 'There is no data to show',
                font: '900 17px HelveticaNeue'
            }
          }, {
            type: 'text',
            left: 'center', 
            top: '50%', 
            style: {
                stroke: '#54545C',
                text: 'Try reselecting or reloading the page',
                font: '14px HelveticaNeue'
            }
          }]
    }
}
