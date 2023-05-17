import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanctionedPostComponent } from './sanctioned-post.component';

describe('SanctionedPostComponent', () => {
  let component: SanctionedPostComponent;
  let fixture: ComponentFixture<SanctionedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanctionedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanctionedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
