import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobiPlotComponent } from './jacobi-plot.component';

describe('JacobiPlotComponent', () => {
  let component: JacobiPlotComponent;
  let fixture: ComponentFixture<JacobiPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JacobiPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobiPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
