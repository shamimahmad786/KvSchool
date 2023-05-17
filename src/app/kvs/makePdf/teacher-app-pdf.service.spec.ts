import { TestBed } from '@angular/core/testing';

import { TeacherAppPdfService } from './teacher-app-pdf.service';

describe('TeacherAppPdfService', () => {
  let service: TeacherAppPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherAppPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
