import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMobileEmailComponent } from './update-mobile-email.component';

describe('UpdateMobileEmailComponent', () => {
  let component: UpdateMobileEmailComponent;
  let fixture: ComponentFixture<UpdateMobileEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMobileEmailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMobileEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
