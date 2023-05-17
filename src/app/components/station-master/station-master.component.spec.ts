import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationMasterComponent } from './station-master.component';

describe('StationMasterComponent', () => {
  let component: StationMasterComponent;
  let fixture: ComponentFixture<StationMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StationMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
