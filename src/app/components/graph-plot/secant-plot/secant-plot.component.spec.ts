import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecantPlotComponent } from './secant-plot.component';

describe('SecantPlotComponent', () => {
  let component: SecantPlotComponent;
  let fixture: ComponentFixture<SecantPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecantPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecantPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
