import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafftypeMasterComponent } from './stafftype-master.component';

describe('StafftypeMasterComponent', () => {
  let component: StafftypeMasterComponent;
  let fixture: ComponentFixture<StafftypeMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StafftypeMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StafftypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
