import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSubjectMappingComponent } from './post-subject-mapping.component';

describe('PostSubjectMappingComponent', () => {
  let component: PostSubjectMappingComponent;
  let fixture: ComponentFixture<PostSubjectMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSubjectMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSubjectMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
