import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSchoolStationComponent } from './add-school-station.component';

describe('AddSchoolStationComponent', () => {
  let component: AddSchoolStationComponent;
  let fixture: ComponentFixture<AddSchoolStationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSchoolStationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSchoolStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
