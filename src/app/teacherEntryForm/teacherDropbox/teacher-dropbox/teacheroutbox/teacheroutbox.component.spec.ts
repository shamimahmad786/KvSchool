import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacheroutboxComponent } from './teacheroutbox.component';

describe('TeacheroutboxComponent', () => {
  let component: TeacheroutboxComponent;
  let fixture: ComponentFixture<TeacheroutboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacheroutboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacheroutboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
