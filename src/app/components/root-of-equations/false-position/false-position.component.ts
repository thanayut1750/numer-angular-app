import { Component, OnInit } from '@angular/core';
import { Dataschema } from 'src/app/schema';

@Component({
  selector: 'app-false-position',
  templateUrl: './false-position.component.html',
  styleUrls: ['./false-position.component.css'],
})
export class FalsePositionComponent implements OnInit {


  ngOnInit(): void {}

  MAX_ITER = 1000000000;
  xm: number = 0; // x: middle point
  err: number = 0;
  fx: number = 0;
  itr: number = 1;
  xl: number = 0;
  xr: number = 0;

  DATA: Dataschema[] = [];

  func(x: number): number {
    return (1/43)**2 - x**2;
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
      c = (
        (a * this.func(b) - b * this.func(a)) / (this.func(b) - this.func(a))
      );

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
    }
    return { 'x': c };
  }

  // Initial values assumed
  a = 0.02;
  b = 0.03;
  ans = this.regulaFalsi(this.a, this.b);
  equation: string = '(\\frac{1}{43})^2 - x^2';

  constructor() {
    // console.log(this.ans);
    // console.log(this.DATA);
  }
  displayedColumns: string[] = ['itr', 'xl', 'xr', 'xm', 'fx', 'err'];
  dataSource = this.DATA;
}
