import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRegionStationComponent } from './add-region-station.component';

describe('AddRegionStationComponent', () => {
  let component: AddRegionStationComponent;
  let fixture: ComponentFixture<AddRegionStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRegionStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRegionStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
