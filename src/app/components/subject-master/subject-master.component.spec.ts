import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMasterComponent } from './subject-master.component';

describe('SubjectMasterComponent', () => {
  let component: SubjectMasterComponent;
  let fixture: ComponentFixture<SubjectMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
