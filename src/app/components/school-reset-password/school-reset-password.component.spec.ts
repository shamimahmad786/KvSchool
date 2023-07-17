import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolResetPasswordComponent } from './school-reset-password.component';

describe('SchoolResetPasswordComponent', () => {
  let component: SchoolResetPasswordComponent;
  let fixture: ComponentFixture<SchoolResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchoolResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
