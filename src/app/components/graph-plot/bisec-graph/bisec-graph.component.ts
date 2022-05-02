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
  @Input() gtitle:string = '';
  @Input() displayGraph!: boolean;

  x!:string[];
  y!:number[];

  graph:boolean = false;

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };
  public lineChartLegend = true;
  public lineChartPlugins = [];

  constructor() {
  }

  show(){
    console.log(this.displayGraph)
    console.log(this.gtitle)
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


  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: this.gtitle,
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)',
      },
    ],
  };
  
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
