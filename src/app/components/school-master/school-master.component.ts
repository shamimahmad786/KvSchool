import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
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
  displayedColumns: any = ['sno', 'schoolcode', 'schoolname', 'status', 'shift', 'action'];
  testData = { sno: '', schoolcode: '', schoolname: '', status: '', shift: '', id: '' };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  schoolList: any = [];
  permissionSave: any = false;
  permissionEdit: any = false;
  constructor(private pdfService: MasterReportPdfService,private datePipe: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
   this.getSchoolMaterList();
   this.getAuthPermission();
  }
  getAuthPermission() {
    let req = {};
    this.outSideService.getMasterDetail(req).subscribe((res) => {
      if (res.length > 0) {
        res.forEach(element => {
          if (element.masterName == 'SCHOOL MASTER' && element.operation == 'SAVE') {
            this.permissionSave = element.editAllowed;
          }
          if (element.masterName == 'SCHOOL MASTER' && element.operation == 'EDIT') {
            this.permissionEdit = element.editAllowed
          }
        });
      }
    })
  }
  redirectto(){
    this.router.navigate(['/teacher/schoolMaster/add']);
  }
  getSchoolMaterList() {
    let request = {};
    this.outSideService.fetchSchoolList(request).subscribe((res) => {
      if (res.length > 0) {
        for (let i = 0; i < res.length; i++) {

          this.testData.sno = '' + (i + 1) + '';
          this.testData.schoolcode = res[i].schoolCode;
          this.testData.schoolname = res[i].schoolName;
          this.testData.status = res[i].schoolStatus;
          this.testData.shift = res[i].shift;
          this.testData.id = res[i].id;

          this.schoolList.push(this.testData);
          this.testData = { sno: '', schoolcode: '', schoolname: '', status: '', shift: '', id: '' };

        }
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
   downloadDocExcel() {
    let req = {};
    let url = 'download-school-master'
    this.outSideService.downloadExcel(req, url).subscribe((res) => {
      saveAs(res, 'school-master'+this.currentDate()+'.xlsx');
    }, error => {
      Swal.fire({
        'icon': 'error',
        'text': 'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf() {
    let req = {};
    let url = 'school-master'
    this.outSideService.downloadPdf(req, url).subscribe((res) => {
      saveAs(res, 'school-master'+this.currentDate()+'.pdf');
    }, error => {
      Swal.fire({
        'icon': 'error',
        'text': 'Something Went Wrong!'
      })
    })
  }
  currentDate(){
    let currentDate= this.datePipe.transform(new Date(),'dd-MM-yyyy_(hh/mm/ss)');
    return currentDate;
  }

}
