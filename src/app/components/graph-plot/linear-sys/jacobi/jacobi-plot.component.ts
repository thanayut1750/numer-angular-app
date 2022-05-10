import { Component, Input, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-jacobi-plot',
  templateUrl: './jacobi-plot.component.html',
  styleUrls: ['./jacobi-plot.component.css'],
})
export class JacobiPlotComponent {
  @Input() xi: math.MathType[] = [];

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
      data:[this.xi],
    };

    // console.log(this.fx1)
    this.updateFlag = true;
  }
}
