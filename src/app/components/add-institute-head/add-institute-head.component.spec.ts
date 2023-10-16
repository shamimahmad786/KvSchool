import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInstituteHeadComponent } from './add-institute-head.component';

describe('AddInstituteHeadComponent', () => {
  let component: AddInstituteHeadComponent;
  let fixture: ComponentFixture<AddInstituteHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddInstituteHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInstituteHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
