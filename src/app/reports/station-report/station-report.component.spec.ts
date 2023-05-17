import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationReportComponent } from './station-report.component';

describe('StationReportComponent', () => {
  let component: StationReportComponent;
  let fixture: ComponentFixture<StationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
