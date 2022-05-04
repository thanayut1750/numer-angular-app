import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BisecPlotComponent } from './graph-plot.component';

describe('BisecPlotComponent', () => {
  let component: BisecPlotComponent;
  let fixture: ComponentFixture<BisecPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BisecPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BisecPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
