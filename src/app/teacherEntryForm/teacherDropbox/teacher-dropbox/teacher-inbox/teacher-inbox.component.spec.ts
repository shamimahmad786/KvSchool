import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInboxComponent } from './teacher-inbox.component';

describe('TeacherInboxComponent', () => {
  let component: TeacherInboxComponent;
  let fixture: ComponentFixture<TeacherInboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherInboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
