import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlerManagementComponent } from './controler-management.component';

describe('ControlerManagementComponent', () => {
  let component: ControlerManagementComponent;
  let fixture: ComponentFixture<ControlerManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlerManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlerManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
