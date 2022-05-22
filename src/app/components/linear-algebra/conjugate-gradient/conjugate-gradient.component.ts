import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';

@Component({
  selector: 'app-conjugate-gradient',
  templateUrl: './conjugate-gradient.component.html',
  styleUrls: ['./conjugate-gradient.component.css'],
})
export class ConjugateGradientComponent implements OnInit {
  ngOnInit(): void {}

  //display Graph component
  displayGraph: boolean = false;
  graph() {
    this.displayGraph = !this.displayGraph;
  }

  guess!: math.MathType;

  @ViewChild(MatTable)
  table!: MatTable<any>;

  UserM(m: string) {
    this.nRows = Number(m);
    this.nCols = Number(m);
    this.guess = math.zeros(this.nRows);
    this.creatXiLabelsTable(m);
    this.matrixGenA();
    this.matrixGenB();
    this.addXn();
  }

  creatXiLabelsTable(xi: string) {
    for (let i = 0; i < Number(xi); i++) {
      this.displayedColumns.push(String(i));
    }
  }

  xd: number[] = [];

  calculate() {
    let listUserInputA = [
      document.querySelectorAll<HTMLElement>('[id^="input"]'),
    ];
    listUserInputA[0].forEach((it) => {
      this.userValArr.push(
        Number((document.getElementById(it.id) as HTMLInputElement).value)
      );
    });

    let listUserInputB = [
      document.querySelectorAll<HTMLElement>('[id^="vectorB"]'),
    ];
    listUserInputB[0].forEach((it) => {
      this.userValB.push(
        Number((document.getElementById(it.id) as HTMLInputElement).value)
      );
    });
    this.arrToMat(this.userValArr);
    console.log(this.userValB);
    console.log(this.userValMat);
    this.conjugateGradient(this.userValMat, this.userValB, this.guess);

    const __print = (x: any) => JSON.stringify(x);

    const __getdata = (x: number) => {
      this.xi_dataArr.push(x);
    };

    // this.xi_data.forEach((it: any) => {
    //   __getdata(it[0]);
    // });
    // console.log(__print(this.xi_dataArr));
    // this.DATA = [Object.assign({}, this.xi_dataArr)];
    // console.log(this.DATA);
    this.dataSource = this.DATA;
    this.table.renderRows(); //reset table
  }

  arrToMat(arr: number[]) {
    let index = 0;
    let row = this.nRows;
    let column = this.nCols;
    for (let i = 0; i < row; i++) {
      this.userValMat[i] = [];
      for (let j = 0; j < column; j++) {
        this.userValMat[i][j] = this.userValArr[index];
        index++;
      }
    }
  }
  UserErr(err: string) {
    this.user_e = Number(err);
  }

  resetData() {
    this.user_M = 0;
    this.DATA = [];
    this.table.renderRows(); //reset table
  }

  userValArr: number[] = [];
  userValMat: number[][] = [];
  userValB: number[] = [];
  user_M!: number;
  user_e: number = 0;

  nRows: number = 0;

  nCols!: number;
  itr: number = 0;
  itr2: number = 0;
  itr3: number = 0;

  DATA: any[] = [];
  xi_data!: math.MathArray | math.Matrix;
  xi_dataArr: number[] = [];
  N: number = 20;
  xerr: math.MathType[] = [];
  a: math.MathType = [];

  displayedColumns: string[] = [];
  dataColIndex: number = 1;
  dataSource: any = [];

  ak!: any;
  xk_1!: any;
  rk_1!: any;
  Bk!: any;
  Pk_1!: any;
  itrtest: any[] = [];
  conjugateGradient(A: number[][], b: number[], x: math.MathType) {
    //initial conditions
    const __print = (x: any) => JSON.parse(x);
    let xVector = __print(x);

    let x0: number | any[] | math.Matrix | math.BigNumber | math.Fraction | math.Complex | math.Unit = [];
    let r0: number | any[] | math.Matrix | math.BigNumber | math.Fraction | math.Complex | math.Unit = [];
    let r0bar: number | any[] | math.Unit | math.BigNumber | math.Fraction | math.Complex | math.Matrix = [];
    let P0: number | any[] | math.Matrix | math.BigNumber | math.Fraction | math.Complex | math.Unit = [];
    let P0bar: number | any[] | math.Matrix | math.BigNumber | math.Fraction | math.Complex | math.Unit = [];
    let alpha : number | any[] | math.Matrix | math.BigNumber | math.Fraction | math.Complex | math.Unit = [];

    for (let k = 0; k < this.nRows; k++) {
      x0[k] = xVector[k];
      r0[k] = math.subtract(b, math.multiply(A, x0[k])) as math.MathArray;
      r0bar[k] = r0[k];
      P0[k] =  r0[k];
      P0bar[k] = r0bar[k];
      alpha[k] = math.divide(
        math.multiply(math.transpose(r0[k]), r0bar[k]),
        math.multiply(math.transpose(P0[k]), math.multiply(A, P0bar[k]))
      );
      x0[k+1] = math.add(x0[k], math.multiply(alpha[k],  P0[k])) as math.MathArray;

      r0[k+1] = math.subtract(
        r0[k],
        math.multiply(alpha[k], math.multiply(A, P0[k]))
      ) as unknown as math.MathArray;

      r0bar = math.subtract(
        r0bar[k],
        math.multiply(alpha[k], math.multiply(math.transpose(A), P0bar[k]))
      ) as unknown as math.MathArray;

      let B = math.divide(
        math.multiply(math.transpose(r0[k + 1]), r0bar[k + 1]),
        math.multiply(math.transpose(r0[k]), r0bar[k])
      ) as unknown as math.MathArray;

      P0[k+1] = math.add(r0[k+1], math.multiply(B[k], P0[k])) as math.MathArray;
      P0bar[k+1] = math.add(r0bar[k+1], math.multiply(B[k], P0bar[k])) as math.MathArray;
    }
    console.log(x0);
  }

  generateCell(): any {
    let cellTemplate = document.createElement('template');
    const cellHtmlString = `<input #userInputVal
                            id="input${this.itr}"
                            class="matrix-cell"
                            type="text"
                            value="" >`;
    cellTemplate.innerHTML = cellHtmlString;
    return cellTemplate.content.firstChild;
  }
  generateCellB(): any {
    let cellTemplate = document.createElement('template');
    const cellHtmlString = `<input #userInputVal
                            id="vectorB${this.itr2}"
                            class="b"
                            type="text"
                            value="" >`;
    cellTemplate.innerHTML = cellHtmlString;
    return cellTemplate.content.firstChild;
  }
  generateXn(): any {
    let cellTemplate = document.createElement('template');
    const cellHtmlString = `<h1>X${this.itr3 + 1}</h1>`;
    cellTemplate.innerHTML = cellHtmlString;
    return cellTemplate.content.firstChild;
  }

  addXn(): any {
    const vectorb = <HTMLElement>document.querySelector('.xcenterCon');
    for (let idx = 1; idx <= this.nRows; idx++) {
      let cellElement = this.generateXn();
      vectorb.appendChild(cellElement);
      this.itr3 = idx;
    }
  }
  matrixGenB(): any {
    // Some modifiable constants
    const cellPadding = '1em';
    const cellSize = '5em';

    const vectorb = <HTMLElement>document.querySelector('.vector-bCon');

    for (let idx = 1; idx <= this.nRows; idx++) {
      let cellElement = this.generateCellB();
      cellElement.style.height = cellSize;
      cellElement.style.width = cellSize;
      cellElement.style.margin = cellPadding;
      vectorb.appendChild(cellElement);
      this.itr2 = idx;
    }
  }
  matrixGenA(): any {
    // Some modifiable constants
    const cellPadding = '1em';
    const cellSize = '5em';

    let wrapWidth = `calc(${this.nCols} * (${cellSize} + 2.25 * ${cellPadding}))`;
    let wrapHeight = `calc(${this.nRows} * (${cellSize} + 2 * ${cellPadding}))`;

    const matrixWrapper = <HTMLElement>(
      document.querySelector('.matrix-wrapperCon')
    );
    matrixWrapper!.style.width = wrapWidth;
    matrixWrapper!.style.height = wrapHeight;

    for (let idx = 1; idx <= this.nRows * this.nRows; idx++) {
      let cellElement = this.generateCell();
      cellElement.style.height = cellSize;
      cellElement.style.width = cellSize;
      cellElement.style.margin = cellPadding;
      matrixWrapper.appendChild(cellElement);
      this.itr = idx;
    }
  }
}
