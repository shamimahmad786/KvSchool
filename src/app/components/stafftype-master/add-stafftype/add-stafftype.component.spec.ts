import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStafftypeComponent } from './add-stafftype.component';

describe('AddStafftypeComponent', () => {
  let component: AddStafftypeComponent;
  let fixture: ComponentFixture<AddStafftypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStafftypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStafftypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
