import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvTchSanctionedPostComponent } from './kv-tch-sanctioned-post.component';

describe('KvTchSanctionedPostComponent', () => {
  let component: KvTchSanctionedPostComponent;
  let fixture: ComponentFixture<KvTchSanctionedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvTchSanctionedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvTchSanctionedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
