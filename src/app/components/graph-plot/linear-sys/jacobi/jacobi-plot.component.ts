import { Component, Input, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-jacobi-plot',
  templateUrl: './jacobi-plot.component.html',
  styleUrls: ['./jacobi-plot.component.css'],
})
export class JacobiPlotComponent {
  @Input() x1: number[] = [];
  @Input() x2: number[] = [];
  @Input() x3: number[] = [];
  @Input() x4: number[] = [];
  @Input() displayedGraph!: boolean;

  constructor() {}

  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Highcharts.Options = {
    chart: {
      marginRight: 80,
    },
    yAxis: [
      {
        title: {
          text: 'Y',
        },
      },
    ],
    series: [
      {
        name: 'x1',
        data: [],
        type: 'line',
      },
      {
        name: 'x2',
        data: [],
        type: 'line',
      },
      {
        name: 'x3',
        data: [],
        type: 'line',
      },
      {
        name: 'x4',
        data: [],
        type: 'line',
      },
    ],
  };

  ngOnChanges() {
    this.handleUpdate();
  }
  handleUpdate() {
    this.chartOptions.series![0] = {
      name: 'x1',
      type: 'line',
      data: this.x1,
    };
    this.chartOptions.series![1] = {
      name: 'x2',
      type: 'line',
      data: this.x2,
    };
    this.chartOptions.series![2] = {
      name: 'x3',
      type: 'line',
      data: this.x3,
    };
    this.chartOptions.series![3] = {
      name: 'x4',
      type: 'line',
      data: this.x4,
    };

    // console.log(this.fx1)
    this.updateFlag = true;
  }
}
