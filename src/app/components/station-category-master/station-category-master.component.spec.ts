import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCategoryMasterComponent } from './station-category-master.component';

describe('StationCategoryMasterComponent', () => {
  let component: StationCategoryMasterComponent;
  let fixture: ComponentFixture<StationCategoryMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationCategoryMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationCategoryMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
