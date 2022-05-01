import { Component, Input, OnInit, ViewChild,ElementRef, ViewContainerRef} from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-bisec-graph',
  templateUrl: './bisec-graph.component.html',
  styleUrls: ['./bisec-graph.component.css'],
})
export class BisecGraphComponent implements OnInit {
  @Input() x_plot_data: string[]=[];
  @Input() y_plot_data: number[]=[];
  @Input() displayGraph!: boolean;

  x!:string[];
  y!:number[];

  graph:boolean = false;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '1 - x / 13^(1 / 4)',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor() {
  }

  show(){
    console.log(this.displayGraph)
    if(this.displayGraph) {
      this.x = this.x_plot_data;
      this.y= this.y_plot_data;
      console.log(this.x)
      console.log(this.y)
      this.lineChartData.labels = this.x
      this.lineChartData.datasets[0].data =this.y
      this.graph = this.displayGraph;
    }
  }
  resetData(){
    this.y_plot_data = [];
    this.x_plot_data = [];
    console.log(this.x)
    console.log(this.y)
    this.lineChartData.labels = []
    this.lineChartData.datasets[0].data =[]
    this.graph = !this.displayGraph;
  }

  ngOnInit() {}
}
