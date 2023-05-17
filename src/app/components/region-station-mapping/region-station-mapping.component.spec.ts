import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionStationMappingComponent } from './region-station-mapping.component';

describe('RegionStationMappingComponent', () => {
  let component: RegionStationMappingComponent;
  let fixture: ComponentFixture<RegionStationMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionStationMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionStationMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
