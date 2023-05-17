import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsSurplusListingComponent } from './kvs-surplus-listing.component';

describe('KvsSurplusListingComponent', () => {
  let component: KvsSurplusListingComponent;
  let fixture: ComponentFixture<KvsSurplusListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsSurplusListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsSurplusListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
