import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalReportComponent } from './national-report.component';

describe('NationalReportComponent', () => {
  let component: NationalReportComponent;
  let fixture: ComponentFixture<NationalReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
