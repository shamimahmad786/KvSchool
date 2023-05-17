import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationCategoryMappingComponent } from './station-category-mapping.component';

describe('StationCategoryMappingComponent', () => {
  let component: StationCategoryMappingComponent;
  let fixture: ComponentFixture<StationCategoryMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationCategoryMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationCategoryMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
