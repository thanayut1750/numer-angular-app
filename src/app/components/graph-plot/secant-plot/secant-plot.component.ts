import { Component, Input, OnChanges } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-secant-plot',
  templateUrl: './secant-plot.component.html',
  styleUrls: ['./secant-plot.component.css'],
})
export class SecantPlotComponent{
  @Input() x1_data: number[] = [];
  @Input() x2_data: number[] = [];
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
      }
    ],
  };

  ngOnChanges() {
    // create header using child_id
    // console.log(this.displayedGraph);
    // console.log(this.x_data);
    // console.log(this.y_data);
    this.handleUpdate();
  }
  handleUpdate() {
    this.chartOptions.series![0] = {
      name: 'x1',
      type: 'line',
      data: this.x1_data,
    };
    this.chartOptions.series![1] = {
      name: 'x2',
      type: 'line',
      data: this.x2_data,
    };

    this.updateFlag = true;
  }
}
