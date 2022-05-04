import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { Jacobi } from 'src/app/schema';
@Component({
  selector: 'app-jacobi',
  templateUrl: './jacobi.component.html',
  styleUrls: ['./jacobi.component.css'],
})
export class JacobiComponent implements OnInit {
  //display Graph component
  displayGraph: boolean = false;
  graph() {
    this.displayGraph = !this.displayGraph;
  }

  ngOnInit(): void {
    // this.jacobi();
  }

  /* In this example we are solving
   3x + 20y - z = -18
   2x - 3y + 20z = 25
   20x + y - 2z = 17
*/
  /* Arranging given system of linear
   equations in diagonally dominant
   form:
   20x + y - 2z = 17
   3x + 20y -z = -18
   2x - 3y + 20z = 25
*/
  /* Equations:
   x1 = (12 - 2y)/5
   x2 = (17-2x-2z)/5
   x3 = (14-2w-2y)/5
   x4 = (7-2z)/5
*/
  @ViewChild(MatTable)
  table!: MatTable<any>;

  equation: string = 'abc';

  UserEq1(eq1: string) {
    // this.user_equation1 = eq;
    this.user_equation1 = eq1;
    this.beq1 = this.buatifulEq(eq1);
  }
  UserEq2(eq2: string) {
    this.user_equation2 = eq2;
    this.beq2 = this.buatifulEq(eq2);
  }
  UserEq3(eq3: string) {
    // this.user_equation1 = eq;
    this.user_equation3 = eq3;
    this.beq3 = this.buatifulEq(eq3);
  }
  UserEq4(eq4: string) {
    this.user_equation4 = eq4;
    this.beq4 = this.buatifulEq(eq4);
  }
  UserErr(err: string) {
    this.user_e = Number(err);
    this.jacobi();
  }

  buatifulEq(eq: string) {
    const node = math.parse(eq);
    var t = node.toTex();
    return t;
  }
  resetData() {
    this.user_equation1 = '';
    this.user_equation2 = '';
    this.user_equation3 = '';
    this.user_equation4 = '';
    this.beq1 = '';
    this.beq2 = '';
    this.beq3 = '';
    this.beq4 = '';
    this.DATA = [];
    this.table.renderRows(); //reset table
  }
  /* Defining function */
  f1(x: number, y: number, z: number, w: number): any {
    // x1 = (12 - 2y)/5
    // return (12 - 2*y) / 5;
    let scope = {
      x: x,
      y: y,
      z: z,
      w: w,
    };
    return math.evaluate(this.user_equation1, scope);
  }
  f2(x: number, y: number, z: number, w: number): any {
    // (17-2x-2z)/5
    // return (17 - 2 * x - 2 * z) / 5;
    let scope = {
      x: x,
      y: y,
      z: z,
      w: w,
    };
    return math.evaluate(this.user_equation2, scope);
  }
  f3(x: number, y: number, z: number, w: number): any {
    // (14-2w-2y)/5
    // return (14 - 2 * w - 2 * y) / 5;
    let scope = {
      x: x,
      y: y,
      z: z,
      w: w,
    };
    return math.evaluate(this.user_equation3, scope);
  }

  f4(x: number, y: number, z: number, w: number): any {
    // x4 = (7-2z)/5
    // return (7 - 2 * z ) / 5;
    let scope = {
      x: x,
      y: y,
      z: z,
      w: w,
    };
    return math.evaluate(this.user_equation4, scope);
  }
  user_equation1: string = '';
  user_equation2: string = '';
  user_equation3: string = '';
  user_equation4: string = '';

  ex_eq1: string = '(12 - 2y)/5';
  beq1: string = '';
  ex_eq2: string = '(17-2x-2z)/5';
  beq2: string = '';
  ex_eq3: string = '(14-2w-2y)/5';
  beq3: string = '';
  ex_eq4: string = '(7-2z)/5';
  beq4: string = '';

  /* Main function */

  x0: number = 0;
  y0: number = 0;
  z0: number = 0;
  w0: number = 0;

  x1: number = 0;
  x2: number = 0;
  x3: number = 0;
  x4: number = 0;

  e1: number = 0;
  e2: number = 0;
  e3: number = 0;
  e4: number = 0;

  user_e: number = 0;
  e: number = 0.0001;
  count: number = 0;

  DATA: Jacobi[] = [];
  x1_data: number[] = [];
  x2_data: number[] = [];
  x3_data: number[] = [];
  x4_data: number[] = [];

  jacobi(): any {
    do {
      /* Calculation */
      this.x1 = this.f1(this.x0, this.y0, this.z0, this.w0);
      this.x2 = this.f2(this.x0, this.y0, this.z0, this.w0);
      this.x3 = this.f3(this.x0, this.y0, this.z0, this.w0);
      this.x4 = this.f4(this.x0, this.y0, this.z0, this.w0);

      console.log(this.count, this.x1, this.x2, this.x3, this.x4);

      /* Error */
      this.e1 = Math.abs(this.x0 - this.x1);
      this.e2 = Math.abs(this.y0 - this.x2);
      this.e3 = Math.abs(this.z0 - this.x3);
      this.e4 = Math.abs(this.w0 - this.x4);

      this.count++;

      /* Set value for next iteration */
      this.x0 = this.x1;
      this.y0 = this.x2;
      this.z0 = this.x3;
      this.w0 = this.x4;

      this.DATA.push({
        itr: this.count,
        x1: this.x1,
        x2: this.x2,
        x3: this.x3,
        x4: this.x4,
      });
      this.x1_data.push(this.x1);
      this.x2_data.push(this.x2);
      this.x3_data.push(this.x3);
      this.x4_data.push(this.x4);
    } while (
      this.e1 > this.user_e &&
      this.e2 > this.user_e &&
      this.e3 > this.user_e &&
      this.e4 > this.user_e
    );
    this.table.renderRows(); //reset table
    console.log(
      'Solution: ' +
        this.x1 +
        ' y= ' +
        this.x2 +
        ' z = ' +
        this.x3 +
        ' w = ' +
        this.x4
    );
  }

  displayedColumns: string[] = ['itr', 'x1', 'x2', 'x3', 'x4'];
  dataSource = this.DATA;
}
