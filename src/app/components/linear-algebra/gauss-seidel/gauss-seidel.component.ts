import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import * as math from 'mathjs';
import { i } from 'mathjs';

@Component({
  selector: 'app-gauss-seidel',
  templateUrl: './gauss-seidel.component.html',
  styleUrls: ['./gauss-seidel.component.css'],
})
export class GaussSeidelComponent implements OnInit {
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
    // console.log(this.userValArr);
    // console.log(this.userValB)
    this.arrToMat(this.userValArr);
    // console.log(this.userValMat);
    this.seidel(this.userValMat, this.userValB, this.guess);

    const __print = (x: any) => JSON.stringify(x);

    const __getdata = (x: number) => {
      this.xi_dataArr.push(x);
    };

    this.xi_data.forEach((it: any) => {
      __getdata(it[0])
    });
    console.log(__print(this.xi_dataArr))
    this.DATA = [Object.assign({}, this.xi_dataArr)];
    console.log(this.DATA)
    this.dataSource = this.DATA
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
  xi_data!:math.MathArray | math.Matrix;
  xi_dataArr: number[] = [];
  N: number = 20;
  xerr: math.MathType[] = [];
  a: math.MathType = [];

  displayedColumns: string[] = [];
  dataColIndex: number = 1;
  dataSource: any = [];

  seidel(A: number[][], b: number[], x: math.MathType) {
    console.log(A);
    console.log(b);
    const x1 = math.lusolve(A, b);
    this.xi_data = x1;
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
    const vectorb = <HTMLElement>document.querySelector('.xcenterGauss');
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

    const vectorb = <HTMLElement>document.querySelector('.vector-bGauss');

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
      document.querySelector('.matrix-wrapperGauss')
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
