import {
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-one-p-plot',
  templateUrl: './one-p-plot.component.html',
  styleUrls: ['./one-p-plot.component.css']
})
export class OnePPlotComponent{
  @Input() fx0: number[] = [];
  @Input() fx1: number[] = [];
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
        name: 'fx0',
        data: [],
        type: 'line',
      },
      {
        name: 'fx1',
        data: [],
        type: 'line',
      }
    ],
  };

  ngOnChanges() {
    this.handleUpdate()
  }
  handleUpdate() {

    this.chartOptions.series![0] = {
      name: "fx0",
      type: 'line',
      data: this.fx0
    }
    this.chartOptions.series![1] = {
      name: "fx1",
      type: 'line',
      data: this.fx1
    }
    // console.log(this.fx1)
    this.updateFlag = true;
  }

}
