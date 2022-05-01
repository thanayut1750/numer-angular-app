import { Component, OnInit } from '@angular/core';
import { NewtonRaphson } from 'src/app/schema';

@Component({
  selector: 'app-newton-raphson',
  templateUrl: './newton-raphson.component.html',
  styleUrls: ['./newton-raphson.component.css'],
})
export class NewtonRaphsonComponent implements OnInit {


  ngOnInit(): void {}

  EPSILON = 0.000001;
  itr: number = 1;
  xi: NewtonRaphson[] = [];
  e:number = 0;
  xp: number = 0;
  // An example function whose solution
  // is determined using Bisection Method.
  func(x: number) {
    return x ** 2 - 7;
  }
  // Derivative of the above function
  derivFunc(x: number) {
    return 2 * x;
  }
  // Function to find the root
  newtonRaphson(x: number) {
    let h = this.func(x) / this.derivFunc(x);
    while (Math.abs(h) >= this.EPSILON) {
      h = this.func(x) / this.derivFunc(x);
      // x(i+1) = x(i) - f(x) / f'(x)
      x = x - h;
      this.e = ((x - this.xp)/x)*100;
      this.xp = x;
      this.xi.push({'itr':this.itr++,'xi':x, 'err':this.e})
    }
    return this.xp;
  }
  // Driver program
  x0 = 2;
  ans: any = this.newtonRaphson(this.x0);
  constructor() {
    // console.log(this.xi)
  }
  displayedColumns: string[] = ['itr', 'xi', 'err'];
  dataSource = this.xi;
  equation1: string = 'f(x)= x^2 - 7';
  equation2: string = 'f\'(x)= 2x';
}
