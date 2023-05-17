import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostSubjectComponent } from './add-post-subject.component';

describe('AddPostSubjectComponent', () => {
  let component: AddPostSubjectComponent;
  let fixture: ComponentFixture<AddPostSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
