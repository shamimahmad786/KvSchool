import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStationCategoryComponent } from './add-station-category.component';

describe('AddStationCategoryComponent', () => {
  let component: AddStationCategoryComponent;
  let fixture: ComponentFixture<AddStationCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStationCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStationCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
