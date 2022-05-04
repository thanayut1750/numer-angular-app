import { Component, Input, OnChanges } from '@angular/core';

import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-newraph-plot',
  templateUrl: './newraph-plot.component.html',
  styleUrls: ['./newraph-plot.component.css'],
})
export class NewraphPlotComponent{
  @Input() x0_data: number[] = [];

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
        name: 'x0',
        data: [],
        type: 'line',
      }
    ],
  };

  ngOnChanges() {
    this.handleUpdate();
  }
  handleUpdate() {
    this.chartOptions.series![0] = {
      name: 'x0',
      type: 'line',
      data: this.x0_data,
    };

    // console.log(this.fx1)
    this.updateFlag = true;
  }
}
