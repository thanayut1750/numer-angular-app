import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { NumerapiService } from 'src/app/service/numerapi.service';
import { NewtonRaphson } from '../../../schema';

@Component({
  selector: 'app-newton-raphson',
  templateUrl: './newton-raphson.component.html',
  styleUrls: ['./newton-raphson.component.css'],
})
export class NewtonRaphsonComponent implements OnInit {
  displayGraph: boolean = false;
  graph() {
    this.displayGraph = !this.displayGraph;
  }
  constructor(private _service: NumerapiService) {}
  ngOnInit(): void {
    this._service.newraphCall().subscribe((equations)=>{
      console.log(equations);
      this.equation = equations.Newraph.eq;
      this.ex0 = equations.Newraph.x0;
      this.root = equations.Newraph.ans;
    })
  }
  root!:string;

  EPSILON = 0.000001;
  itr: number = 1;
  DATA: NewtonRaphson[] = [];
  e: number = 0;
  xp: number = 0;


  user_equation:string = '';
  user_x0: string = '';
  user_ans:string = '';
  Ans: any;

  @ViewChild(MatTable)
  table!: MatTable<any>;
  // An example function whose solution
  // is determined using Bisection Method.
  UserEq(eq1: string) {
    this.user_equation = eq1;
    this.buatifulEq1 = this.buatifulEq(eq1);
    console.log(this.buatifulEq1)
  }
  UserX0(eq2: string) {
    this.user_x0 = eq2;
    this.Ans = this.newtonRaphson(Number(this.user_x0));
    // console.log(this.DATA)
  }
  buatifulEq(eq: string) {
    const node = math.parse(eq);
    var t = node.toTex();
    return t;
  }
  resetData() {
    this.user_equation = '';
    this.buatifulEq1 = '';
    this.user_ans = '';
    this.DATA = [];
  }

  func(x: number) {
    let scope = {
      x: x,
    };
    return math.evaluate(this.user_equation, scope);
  }
  // Derivative of the above function
  derivFunc(x: number) {
    return math.derivative(this.user_equation, 'x').evaluate({ x: x });
  }
  // Function to find the root
  newtonRaphson(x: number) {
    let h = this.func(x) / this.derivFunc(x);
    while (Math.abs(h) >= this.EPSILON) {
      h = this.func(x) / this.derivFunc(x);
      // x(i+1) = x(i) - f(x) / f'(x)
      x = x - h;
      this.e = Math.abs(((x - this.xp) / x) * 100);
      this.xp = x;
      this.DATA.push({ itr: this.itr++, xi: x, err: this.e });
      this.x0_data.push(x)
    }
    this.table.renderRows(); //reset table
    this.ans = this.xp
    return this.xp;
  }

  ans: any;
  displayedColumns: string[] = ['itr', 'xi', 'err'];
  dataSource = this.DATA;
  ex0!:string;
  equation: string = '';
  buatifulEq1: string = '';
  x0_data: number[] = [];
}
