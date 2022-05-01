import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { OnePoint } from 'src/app/schema';

@Component({
  selector: 'app-one-point-iteration',
  templateUrl: './one-point-iteration.component.html',
  styleUrls: ['./one-point-iteration.component.css'],
})
export class OnePointIterationComponent implements OnInit {
  ngOnInit(): void {}
  EPSILON: number = 0.0000001;

  itr: number = 0;
  fx0: number = 0;
  fx1: number = 0;
  x0: number = 0;
  x1: number = 0;
  err: number = 0;

  DATA: OnePoint[] = [];

  funcF(x: number): number {
    return 6 / (x + 1) - 8 * x;
  }
  funcG(x: number): number {
    return 6 / (8 * (x + 1));
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
        fx0: this.funcF(x0) ,
        fx1: this.funcF(this.x1),
        x0: x0,
        x1: this.x1,
        err:this.err
      });
      this.itr++;

      if (this.itr > MAX_ITER) {
        console.log('Not Convergent.');
        break;
      }

      x0 = this.x1;
    } while (Math.abs(this.funcF(this.x1)) > err);
    return this.x1;
  }

  error = 0.000001;
  max_itr = 100;

  Ans: any = this.onePoint(this.x0, this.error, this.max_itr);
  displayedColumns: string[] = ['itr', 'x0', 'fx0', 'x1', 'fx1', 'err'];
  dataSource = this.DATA;
  constructor() {
    // console.log(this.DATA);
  }
  //f(x) 6 /  - 8 * x
  equation1: string = 'f(x)=(\\frac{6}{x + 1}) - 8x';
  //g(x) 6 / (8 * (x + 1))
  equation2: string = 'g(x)=\\frac{6}{8(x + 1)}';
}
