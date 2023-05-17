import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StafftypePostMappingComponent } from './stafftype-post-mapping.component';

describe('StafftypePostMappingComponent', () => {
  let component: StafftypePostMappingComponent;
  let fixture: ComponentFixture<StafftypePostMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StafftypePostMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StafftypePostMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
