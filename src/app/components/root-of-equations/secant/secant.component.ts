import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { NumerapiService } from 'src/app/service/numerapi.service';
import { Secant } from '../../../schema';

@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.css'],
})
export class SecantComponent {
  //display Graph component
  displayGraph: boolean = false;
  graph() {
    this.displayGraph = !this.displayGraph;
  }
  constructor(private _service: NumerapiService) {}
  ngOnInit(): void {
    this._service.secantCall().subscribe((equations)=>{
      console.log(equations);
      this.equation = equations.Secant.eq;
      this.ex1 = equations.Secant.x1;
      this.ex2 = equations.Secant.x2;
      this.root = equations.Secant.ans;
    })
  }

  @ViewChild(MatTable)
  table!: MatTable<any>;

  EPSILON: number = 0.0000001;
  itr: number = 0;
  x0: number = 0;
  x1: number = 0;
  xm: number = 0;
  fx: number = 0;
  err: number = 0;

  // initializing the values
  ix1: number = 0;
  ix2: number = 1;
  iE: number = 0.000001;

  DATA: Secant[] = [];
  x0_data: number[] = [];
  x1_data: number[] = [];

  UserEq(eq: string) {
    // this.user_equation1 = eq;
    this.user_equation = eq;
    this.buatifulEq = this.buaEq(eq);
    // console.log(this.buatifulEq);
  }
  Userx1(x1: string) {
    this.user_x1 = x1;
  }
  Userx2(x2: string) {
    this.user_x2 = x2;
    this.secant(Number(this.user_x1), Number(this.user_x2), this.iE);
    this.user_ans = this.Ans
  }

  buaEq(eq: string) {
    const node = math.parse(eq);
    var t = node.toTex();
    return t;
  }

  resetData() {
    this.user_equation = '';
    this.user_x1 = '';
    this.user_x2 = '';
    this.buatifulEq = '';
    this.user_ans = '';
    this.DATA = [];
  }

  // Driver code
  f(x: number): any {
    // we are taking equation as x^3+x-1
    let f = Math.pow(x, 3) + x - 1;
    return f;
  }

  secant(x1: number, x2: number, E: number): any {
    let n = 0
    let xm = 0
    let  x0 = 0
    let  c= 0
    if (this.f(x1) * this.f(x2) < 0) {
      do {
        // calculate the intermediate value
        x0 = (x1 * this.f(x2) - x2 * this.f(x1)) / (this.f(x2) - this.f(x1));

        // check if x0 is root of equation or not
        c = this.f(x1) * this.f(x0);


        // update the value of interval
        x1 = x2;
        x2 = x0;

        // update number of iteration
        n++;


        // if x0 is the root of equation then break the loop
        if (c == 0) break;
        xm = (x1 * this.f(x2) - x2 * this.f(x1)) / (this.f(x2) - this.f(x1));
        let er = Math.abs(xm - x0)
        this.DATA.push({
          itr: n,
          x0: x0,
          x1: x1,
          xm: c,
          fx: this.f(x0),
          err: Number(er.toFixed(6))
        })
        this.x0_data.push(x0);
        this.x1_data.push(x1);
      } while (Math.abs(xm - x0) >= E); // repeat the loop
      // until the convergence

      this.Ans =  x0.toFixed(6);
      // console.log(this.Ans);

    } else alert('Can not find a root in the given interval');
    this.table.renderRows(); //reset table
    return;
  }

  Ans: any;

  displayedColumns: string[] = ['itr', 'x0', 'x1', 'xm', 'fx', 'err'];
  dataSource = this.DATA;

  //EXAMPLE EQUATION
  equation: string = '';
  ex1 = 0;
  ex2 = 0;
  root!:string;

  //USER INPUT
  user_equation: string = '';
  user_x1: string = '';
  user_x2: string = '';
  buatifulEq: string = '';
  user_ans!: string;
}
