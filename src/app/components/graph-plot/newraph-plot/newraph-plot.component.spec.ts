import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewraphPlotComponent } from './newraph-plot.component';

describe('NewraphPlotComponent', () => {
  let component: NewraphPlotComponent;
  let fixture: ComponentFixture<NewraphPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewraphPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewraphPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
