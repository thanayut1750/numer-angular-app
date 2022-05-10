import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { Dataschema } from '../../../schema';
import { NumerapiService } from '../../../service/numerapi.service'
@Component({
  selector: 'app-false-position',
  templateUrl: './false-position.component.html',
  styleUrls: ['./false-position.component.css'],
})
export class FalsePositionComponent implements OnInit {
  displayGraph: boolean = false;
  graph() {
    this.displayGraph = !this.displayGraph;
  }

  constructor(private _service: NumerapiService) {}
  ngOnInit(): void {
    this._service.falsepotionCall().subscribe((equations)=>{
      console.log(equations);
      this.equation = equations.Falsepotion.eq;
      this.exl = equations.Falsepotion.xl;
      this.exr = equations.Falsepotion.xr;
      this.root = equations.Falsepotion.ans;
    })
  }

  @ViewChild(MatTable)
  table!: MatTable<any>;

  MAX_ITER = 100;
  xm: number = 0; // x: middle point
  err: number = 0;
  fx: number = 0;
  itr: number = 1;
  xl: number = 0;
  xr: number = 0;

  DATA: Dataschema[] = [];
  x_data: string[] = [];
  y_data: number[] = [];

  //GET DATA FROM USER
  getUserEq(ueq: string) {
    this.user_equation = ueq;
    const node = math.parse(ueq);
    var t = node.toTex();
    // console.log(t);
    this.buatifulEq = t;
  }
  getUserXl(ueq: number) {
    this.user_xl = ueq;
  }
  getUserXr(ueq: number) {
    this.user_xr = ueq;
    this.user_ans = this.regulaFalsi(this.user_xl, this.user_xr);

  }
  resetData() {
    this.user_equation = '';
    this.user_xl = 0;
    this.user_xr = 0;
    this.buatifulEq = '';
    this.user_ans = '';
    this.DATA = [];
  }
  // DRIVING FlasePo FUNCTIONS
  func(x: number): number {
    let scope = {
      x: x,
    };
    return math.evaluate(this.user_equation, scope);
  }

  // Prints root of func(x) in interval [a, b]
  regulaFalsi(a: number, b: number): any {
    if (this.func(a) * this.func(b) >= 0) {
      document.write('You have not assumed right a and b\n');
      return;
    }
    // Initialize result
    let c = a;

    for (let i = 0; i < this.MAX_ITER; i++) {
      // Find the point that touches x axis
      this.xl = a;
      this.xr = b;
      c = (a * this.func(b) - b * this.func(a)) / (this.func(b) - this.func(a));

      this.xm = c;

      const e = ((c - a) / c) * 100;
      this.err = e; //error

      const y = this.func(c);
      this.fx = y;
      // Check if the above found point is root
      if (this.err <= 0.000001) {
        break;
      }
      // Decide the side to repeat the steps
      else if (this.func(c) * this.func(a) < 0) {
        b = c;
      } else {
        a = c;
      }
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
    return c;
  }

  //EXAMPLE EQUATION
  equation: string = '';
  exl = 0;
  exr = 0;
  root!: any;

  //Table Data source
  displayedColumns: string[] = ['itr', 'xl', 'xr', 'xm', 'fx', 'err'];

  //USER INPUT
  user_equation: string = '';
  user_xl!:number;
  user_xr!:number;
  buatifulEq: string = '';
  user_ans!:string;
}
