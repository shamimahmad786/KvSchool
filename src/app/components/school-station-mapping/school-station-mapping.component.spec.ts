import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolStationMappingComponent } from './school-station-mapping.component';

describe('SchoolStationMappingComponent', () => {
  let component: SchoolStationMappingComponent;
  let fixture: ComponentFixture<SchoolStationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolStationMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolStationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
