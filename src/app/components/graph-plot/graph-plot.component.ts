import {
  Component,
  Input,
  OnChanges
} from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graph-plot',
  templateUrl: './graph-plot.component.html',
  styleUrls: ['./graph-plot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GraphPlotComponent implements OnChanges {
  @Input() x_data: string[] = [];
  @Input() y_data: number[] = [];
  @Input() displayedGraph!: boolean;
  constructor() {

  }


  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  chartOptions: Highcharts.Options = {
    chart: {
      marginRight: 80,
    },
    xAxis: {
      categories: [],
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
        data: [],
        type: 'line',
      },

    ],
  };

  ngOnChanges() {
    // create header using child_id
    // console.log(this.displayedGraph);
    // console.log(this.x_data);
    // console.log(this.y_data);
    this.handleUpdate()
  }
  handleUpdate() {
    this.chartOptions.xAxis =  {
      categories: this.x_data
    };

    this.chartOptions.series![0] = {
      name: "X",
      type: 'line',
      data: this.y_data
    }

    this.updateFlag = true;
  }

}
