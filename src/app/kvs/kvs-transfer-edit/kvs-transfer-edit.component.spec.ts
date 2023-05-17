import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTransferEditComponent } from './kvs-transfer-edit.component';

describe('KvsTransferEditComponent', () => {
  let component: KvsTransferEditComponent;
  let fixture: ComponentFixture<KvsTransferEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTransferEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTransferEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
