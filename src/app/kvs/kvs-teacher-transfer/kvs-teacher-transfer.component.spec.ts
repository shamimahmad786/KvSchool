import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTeacherTransferComponent } from './kvs-teacher-transfer.component';

describe('KvsTeacherTransferComponent', () => {
  let component: KvsTeacherTransferComponent;
  let fixture: ComponentFixture<KvsTeacherTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTeacherTransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTeacherTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
