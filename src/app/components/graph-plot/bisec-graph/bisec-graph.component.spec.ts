import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BisecGraphComponent } from './bisec-graph.component';

describe('BisecGraphComponent', () => {
  let component: BisecGraphComponent;
  let fixture: ComponentFixture<BisecGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BisecGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BisecGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
