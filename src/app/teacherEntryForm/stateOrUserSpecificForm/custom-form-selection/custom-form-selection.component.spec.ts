import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFormSelectionComponent } from './custom-form-selection.component';

describe('CustomFormSelectionComponent', () => {
  let component: CustomFormSelectionComponent;
  let fixture: ComponentFixture<CustomFormSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomFormSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFormSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
