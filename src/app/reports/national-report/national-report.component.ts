import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/service/report-service';
@Component({
  selector: 'app-national-report',
  templateUrl: './national-report.component.html',
  styleUrls: ['./national-report.component.css']
})
export class NationalReportComponent implements OnInit {

  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
  }

  reportData(data){
    const data1={"reportId":data};
    this.reportService.pushReportBasicData(data1);
  }

}
