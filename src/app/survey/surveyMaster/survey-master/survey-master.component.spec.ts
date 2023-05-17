import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMasterComponent } from './survey-master.component';

describe('SurveyMasterComponent', () => {
  let component: SurveyMasterComponent;
  let fixture: ComponentFixture<SurveyMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
