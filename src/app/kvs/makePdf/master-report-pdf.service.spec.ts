import { TestBed } from '@angular/core/testing';

import { MasterReportPdfService } from './master-report-pdf.service';

describe('MasterReportPdfService', () => {
  let service: MasterReportPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterReportPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
