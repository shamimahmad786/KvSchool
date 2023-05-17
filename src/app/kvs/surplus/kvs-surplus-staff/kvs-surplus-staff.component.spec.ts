import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsSurplusStaffComponent } from './kvs-surplus-staff.component';

describe('KvsSurplusStaffComponent', () => {
  let component: KvsSurplusStaffComponent;
  let fixture: ComponentFixture<KvsSurplusStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsSurplusStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsSurplusStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
