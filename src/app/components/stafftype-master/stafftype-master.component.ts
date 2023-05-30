import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
const ELEMENT_DATA: any = [];
@Component({
  selector: 'app-stafftype-master',
  templateUrl: './stafftype-master.component.html',
  styleUrls: ['./stafftype-master.component.css']
})
export class StafftypeMasterComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'stafftype','status','action'];

  testData = { "sno": "", "stafftype": "", "status": "" ,"id":''}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listStaffType: any=[];
  permissionSave: any=false;
  permissionEdit: any=false;
  constructor(private pdfService: MasterReportPdfService,private datePipe: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getRegionList();
    this.getAuthPermission();
   }
   getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='STAFF TYPE MASTER' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
          if(element.masterName=='STAFF TYPE MASTER' && element.operation=='EDIT'){
            this.permissionEdit=element.editAllowed
          }
        });
      }
    })
  }
   redirectto(){
     this.router.navigate(['/teacher/stafftypeMaster/add']);
   }
   getRegionList(){
    let req={};
    this.outSideService.fetchStaffTypeList(req).subscribe((res)=>{
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.stafftype = res[i].staffType;
            this.testData.status = res[i].status;
            this.testData.id = res[i].id;
      
            this.listStaffType.push(this.testData);
            this.testData = { "sno": "", "stafftype": "", "status": "" ,"id":''};
   
          }
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.listStaffType);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100)
    })
  }
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
   }
   applyFilter(filterValue: string) {
     filterValue = filterValue.trim();
     filterValue = filterValue.toLowerCase(); 
     this.dataSource.filter = filterValue;
   }
   edit(data){
    sessionStorage.setItem("staffTypeEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/stafftypeMaster/edit'])
   }
  staffTypeMasterpdf()
   {
    setTimeout(() => {
      this.pdfService.staffTypemasterList(this.listStaffType);
    }, 1000);
   }
   downloadDocExcel(){
    let req={};
    let url='download-staff-type-master'
    this.outSideService.downloadExcel(req,url).subscribe((res)=>{
     saveAs(res,'staff-type-master-'+this.currentDate()+'.xlsx');
      
    }, error => {
      Swal.fire({
        'icon':'error',
         'text':'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf(){
    let req={};
    let url='staff-type-master'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
    saveAs(res,'staff-type-master-'+this.currentDate()+'.pdf');  
    }, error => {
      Swal.fire({
        'icon':'error',
        'text':'Something Went Wrong!'
      })
    })
  }
  currentDate(){
    let currentDate= this.datePipe.transform(new Date(),'dd-MM-yyyy_(hh/mm/ss)');
    return currentDate;
  }
}
