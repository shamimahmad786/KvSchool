import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsJoiningComponent } from './kvs-joining.component';

describe('KvsJoiningComponent', () => {
  let component: KvsJoiningComponent;
  let fixture: ComponentFixture<KvsJoiningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsJoiningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsJoiningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
