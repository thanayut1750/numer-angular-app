import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OnePoint } from 'src/app/schema';
import { NumerapiService } from 'src/app/service/numerapi.service';

@Component({
  selector: 'app-one-point-iteration',
  templateUrl: './one-point-iteration.component.html',
  styleUrls: ['./one-point-iteration.component.css'],
})
export class OnePointIterationComponent implements OnInit {
  //display Graph component
  displayGraph: boolean = false;
  graph() {
    this.displayGraph = !this.displayGraph;
  }
  constructor(private _service: NumerapiService) {}
  ngOnInit(): void {
    this._service.onepointCall().subscribe((equations)=>{
      console.log(equations);
      this.eq1 = equations.Onepoint.eq1;
      this.eq2 = equations.Onepoint.eq2;
      this.root = equations.Onepoint.ans;
    })
  }

  @ViewChild(MatTable)
  table!: MatTable<any>;

  EPSILON: number = 0.0000001;
  itr: number = 0;
  fx0: number = 0;
  fx1: number = 0;
  x0: number = 0;
  x1: number = 0;
  err: number = 0;

  DATA: OnePoint[] = [];
  fx0_data:number[] = [];
  fx1_data:number[] = [];

  UserEq1(eq1:string){
    // this.user_equation1 = eq;
    this.user_equation1 = eq1;

    this.buatifulEq1 = this.buatifulEq(eq1);
    // console.log(this.buatifulEq1)
    // console.log(this.user_equation1)
  }
  UserEq2(eq2:string){
    this.user_equation2 = eq2;
    this.buatifulEq2 = this.buatifulEq(eq2);
    console.log(this.buatifulEq2)
    // console.log(this.user_equation2)
    this.Ans = this.onePoint(this.x0, this.error, this.max_itr)
  }
  buatifulEq(eq:string){
    const node = math.parse(eq);
    var t = node.toTex();
    return t;
  }
  resetData() {
    this.user_equation1 = '';
    this.user_equation2 = '';
    this.buatifulEq1 = '';
    this.buatifulEq2 = '';
    this.user_ans = '';
    this.DATA = [];
  }


  funcF(x: number): number {
    // return 6 / (x + 1) - 8 * x;
    let scope = {
      x: x,
    };
    return math.evaluate(this.user_equation1, scope);
  }
  funcG(x: number): number {
    // return 6 / (8 * (x + 1));
    let scope = {
      x: x,
    };
    return math.evaluate(this.user_equation2, scope);
  }

  onePoint(x0: number, err: number, MAX_ITER: number): any {
    do {
      this.x1 = this.funcG(x0);
      this.err = Math.abs(((this.x1 - x0) / this.x1) * 100);
      // console.log(
      //   `itr:${this.itr}
      //   | x0:${x0}
      //   | f(x0):${this.funcF(x0)}
      //   | x1:${this.x1}
      //   | error:${this.err}`
      // );
      this.DATA.push({
        itr: this.itr,
        fx0: this.funcF(x0),
        fx1: this.funcF(this.x1),
        x0: x0,
        x1: this.x1,
        err: this.err,
      });
      this.fx0_data.push(this.funcF(x0));
      this.fx1_data.push(this.funcF(this.x1));

      this.itr++;

      if (this.itr > MAX_ITER) {
        console.log('Not Convergent.');
        break;
      }

      x0 = this.x1;
    } while (Math.abs(this.funcF(this.x1)) > err);
    this.table.renderRows(); //reset table
    return this.x1;
  }

  error = 0.000001;
  max_itr = 100;

  Ans: any;

  displayedColumns: string[] = ['itr', 'x0', 'fx0', 'x1', 'fx1', 'err'];
  dataSource = this.DATA;

  //f(x) 6 /  - 8 * x
  equation1: string = 'f(x)=(\\frac{6}{x + 1}) - 8x';
  //g(x) 6 / (8 * (x + 1))
  equation2: string = 'g(x)=\\frac{6}{8(x + 1)}';

  //EXAMPLE EQUATION
  eq1:string = '';
  eq2:string = '';
  root!: string;
  //USER INPUT
  user_equation1: string = '';
  user_equation2: string = '';
  buatifulEq1: string = '';
  buatifulEq2: string = '';
  user_ans!:string;
}
