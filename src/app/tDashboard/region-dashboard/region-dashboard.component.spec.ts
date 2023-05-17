import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDashboardComponent } from './region-dashboard.component';

describe('RegionDashboardComponent', () => {
  let component: RegionDashboardComponent;
  let fixture: ComponentFixture<RegionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
