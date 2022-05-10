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
    // console.log(this.userValArr);
    // console.log(this.userValB)
    this.arrToMat(this.userValArr);
    // console.log(this.userValMat);
    this.jacobi(this.userValMat, this.userValB, this.guess);

    const __print = (x: any) => JSON.stringify(x);

    const __getdata = (x: any) => {
      this.xi_dataArr.push(x._data);
    };

    this.xi_data.forEach((it) => {
      __print(__getdata(it));
    });

    console.log(this.xi_dataArr);
    this.DATA = this.xi_dataArr.map((x) => Object.assign({}, x));
    this.dataSource = this.DATA;
    this.table.renderRows(); //reset table
    console.log(this.DATA);
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

  DATA: any[] = [];
  xi_data: math.MathType[] = [];
  xi_dataArr: number[] = [];
  N: number = 20;
  xerr: math.MathType[] = [];
  a: math.MathType = [];

  displayedColumns: string[] = [];
  dataColIndex: number = 1;
  dataSource: any = [];

  jacobi(A: number[][], b: number[], x: math.MathType) {
    // # Create a vector of the diagonal elements of A
    // # and subtract them from A
    const ad: number[][] = A;
    let D = math.diag(ad);
    let R = math.subtract(A, math.diag(D));

    // # Iterate for N times
    // console.log(x);
    // console.log(R);
    for (let index = 0; index < this.N; index++) {
      x = math.multiply(R, x);
      // console.log(x);
      let g = math.subtract(b, x);
      // console.log(g);
      // console.log(D);
      let k = math.dotDivide(g, D);
      // console.log(k);
      x = k;
      this.xi_data.push(x);
      let err = math.subtract(math.multiply(ad, x), b);
      this.xerr.push(err);
    }
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
    const vectorb = <HTMLElement>document.querySelector('.xcenter');
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

    const vectorb = <HTMLElement>document.querySelector('.vector-b');

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
      document.querySelector('.matrix-wrapper')
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

  nRows: number = 0;

  nCols!: number;
  itr: number = 0;
  itr2: number = 0;
  itr3: number = 0;
}
