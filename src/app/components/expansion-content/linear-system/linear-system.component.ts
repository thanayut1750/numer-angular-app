import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
@Component({
  selector: 'app-linear-system',
  templateUrl: './linear-system.component.html',
  styleUrls: ['./linear-system.component.css']
})
export class LinearSystemComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  constructor() { }

  ngOnInit(): void {
  }

}
