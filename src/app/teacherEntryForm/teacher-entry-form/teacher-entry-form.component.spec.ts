import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEntryFormComponent } from './teacher-entry-form.component';

describe('TeacherEntryFormComponent', () => {
  let component: TeacherEntryFormComponent;
  let fixture: ComponentFixture<TeacherEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherEntryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
