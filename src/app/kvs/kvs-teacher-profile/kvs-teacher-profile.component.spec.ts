import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTeacherProfileComponent } from './kvs-teacher-profile.component';

describe('KvsTeacherProfileComponent', () => {
  let component: KvsTeacherProfileComponent;
  let fixture: ComponentFixture<KvsTeacherProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTeacherProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTeacherProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
