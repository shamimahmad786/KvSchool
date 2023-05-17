import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsIdentifySurplusComponent } from './kvs-identify-surplus.component';

describe('KvsIdentifySurplusComponent', () => {
  let component: KvsIdentifySurplusComponent;
  let fixture: ComponentFixture<KvsIdentifySurplusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsIdentifySurplusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsIdentifySurplusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
