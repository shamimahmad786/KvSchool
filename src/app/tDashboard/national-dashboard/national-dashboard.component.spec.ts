import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalDashboardComponent } from './national-dashboard.component';

describe('NationalDashboardComponent', () => {
  let component: NationalDashboardComponent;
  let fixture: ComponentFixture<NationalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
