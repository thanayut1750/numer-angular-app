import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-expansion-content',
  templateUrl: './expansion-content.component.html',
  styleUrls: ['./expansion-content.component.css'],
})
export class ExpansionContentComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor() {}
  ngOnInit(): void {}


}
