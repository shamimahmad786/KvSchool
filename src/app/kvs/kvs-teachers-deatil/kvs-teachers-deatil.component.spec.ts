import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KvsTeachersDeatilComponent } from './kvs-teachers-deatil.component';

describe('KvsTeachersDeatilComponent', () => {
  let component: KvsTeachersDeatilComponent;
  let fixture: ComponentFixture<KvsTeachersDeatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KvsTeachersDeatilComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KvsTeachersDeatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
