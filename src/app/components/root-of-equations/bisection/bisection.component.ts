import { Component,  OnInit,  ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { Dataschema } from '../../../schema';
import { NumerapiService } from '../../../service/numerapi.service'

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css'],
})
export class BisectionComponent implements OnInit {
  displayGraph:boolean = false;
  graph(){
    this.displayGraph = !this.displayGraph;
  }

  constructor(private _service: NumerapiService) {

  }

  ngOnInit(): void {
    this._service.bisectionCall().subscribe((equations)=>{
      console.log(equations);
      this.equation = equations.Bisection.eq;
      this.exl = equations.Bisection.xl;
      this.exr = equations.Bisection.xr;
      this.root = equations.Bisection.ans;
    })

  }

  @ViewChild(MatTable)
  table!: MatTable<any>;

  EPSILON: number = 0.0000001;

  xm: number = 0; // x: middle point
  err: number = 0;
  fx: number = 0;
  itr: number = 1;
  xl: number = 0;
  xr: number = 0;
  root!: any;

  DATA: Dataschema[] = [];
  x_data:string[] = [];
  y_data:number[] = [];


  //GET DATA FROM USER
  getUserEq(ueq: string) {
    this.user_equation = ueq;

    const node = math.parse(ueq)
    var t = node.toTex()

    this.buatifulEq = t
  }
  getUserXl(ueq: number) {
    this.user_xl = ueq;
  }
  getUserXr(ueq: number) {
    this.user_xr = ueq;
    this.user_ans = this.bisection(this.user_xl,this.user_xr);
  }
  resetData() {
    this.user_equation = '';
    this.user_xl = 0;
    this.user_xr = 0;
    this.buatifulEq = '';
    this.user_ans = '';
    this.DATA = [];
  }

  // DRIVING BISECTION FUNCTIONS
  func(xm: number): number {
    let scope = {
      x: xm,
    };
    return math.evaluate(this.user_equation, scope);
  }

  bisection(a: number, b: number): any {
    if (this.user_equation == '') {
      alert('Please enter equation');
      return;
    }
    if (this.func(a) * this.func(b) >= 0) {
      document.write('You have not assumed' + ' right a and b');
      return;
    }

    let c = a;
    while (b - a >= this.EPSILON) {
      // Find middle point
      this.xl = a;
      this.xr = b;
      c = (a + b) / 2;

      this.xm = c;
      const e = ((b - a) / b) * 100;
      this.err = e; //error
      const y = this.func(c);
      this.fx = y;

      // Check if middle point is root
      if (this.func(c) == 0.0) break;
      // Decide the side to repeat the steps
      else if (this.func(c) * this.func(a) < 0) b = c;
      else a = c;

      this.DATA.push({
        itr: this.itr++,
        xl: this.xl,
        xr: this.xr,
        xm: this.xm,
        fx: this.fx,
        err: this.err,
      });

      this.x_data.push(String(this.xm))
      this.y_data.push(this.fx)
    }
    this.table.renderRows(); //reset table
    return (this.root = c.toFixed(4));
  }

  //EXAMPLE EQUATION
  equation: string = '';
  exl = 0;
  exr = 0;

  //Table Data source
  displayedColumns: string[] = ['itr', 'xl', 'xr', 'xm', 'fx', 'err'];
  // dataSource = this.DATA;

  //USER INPUT
  user_equation: string = '';
  user_xl!:number;
  user_xr!:number;
  buatifulEq: string = '';
  user_ans!:string;

}
