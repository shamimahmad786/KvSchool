import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
const ELEMENT_DATA: any = [
  {sno: '', stationcode: '', stationname: '', status: ''}


];
@Component({
  selector: 'app-school-master',
  templateUrl: './school-master.component.html',
  styleUrls: ['./school-master.component.css']
})
export class SchoolMasterComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns:any = ['sno', 'schoolcode', 'schoolname', 'schooltype', 'status','shift','action'];
  testData = {sno: '', schoolcode: '', schoolname: '', status: '',schooltype:'',shift:'',id:''};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  schoolList: any=[];
 
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
   this.getSchoolMaterList();
  }
  redirectto(){
    this.router.navigate(['/teacher/schoolMaster/add']);
  }
  getSchoolMaterList(){
    let request={};
    this.outSideService.fetchSchoolList(request).subscribe((res)=>{
      if(res.length>0){
        for (let i = 0; i < res.length; i++) {
       
          this.testData.sno = '' + (i + 1) + '';
          this.testData.schoolcode = res[i].schoolCode;
          this.testData.schoolname = res[i].schoolName;
          this.testData.status = res[i].schoolStatus;
          this.testData.shift = res[i].shift;
          this.testData.id = res[i].id;
          this.testData.schooltype=res[i].schoolType;
          this.schoolList.push(this.testData);
          this.testData = {sno: '', schoolcode: '', schoolname: '',schooltype:'', status: '',shift:'',id:''};
        }
        console.log(this.schoolList);
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.schoolList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100)
      }
    })
  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  edit(data){
    sessionStorage.setItem("schoolEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/schoolMaster/edit'])
   }
   schoolMasterPdf()
   {
    setTimeout(() => {
      this.pdfService.schoolMasterList(this.schoolList);
    }, 1000);
   }
}
