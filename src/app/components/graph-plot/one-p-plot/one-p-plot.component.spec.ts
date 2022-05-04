import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnePPlotComponent } from './one-p-plot.component';

describe('OnePPlotComponent', () => {
  let component: OnePPlotComponent;
  let fixture: ComponentFixture<OnePPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnePPlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnePPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
