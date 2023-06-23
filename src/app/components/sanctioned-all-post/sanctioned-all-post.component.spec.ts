import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionedAllPostComponent } from './sanctioned-all-post.component';

describe('SanctionedAllPostComponent', () => {
  let component: SanctionedAllPostComponent;
  let fixture: ComponentFixture<SanctionedAllPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionedAllPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionedAllPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
