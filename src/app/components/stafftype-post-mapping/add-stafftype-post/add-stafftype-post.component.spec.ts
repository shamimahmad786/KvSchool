import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStafftypePostComponent } from './add-stafftype-post.component';

describe('AddStafftypePostComponent', () => {
  let component: AddStafftypePostComponent;
  let fixture: ComponentFixture<AddStafftypePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStafftypePostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStafftypePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
