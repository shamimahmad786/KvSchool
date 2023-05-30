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
  selector: 'app-stafftype-post-mapping',
  templateUrl: './stafftype-post-mapping.component.html',
  styleUrls: ['./stafftype-post-mapping.component.css']
})
export class StafftypePostMappingComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'staffType', 'postCode', 'postName'];

  testData = { "sno": "", "staffType": "", "postCode": "", "postName": "" }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stafftypePostMappingList: any=[];
  permissionSave: any=false;
  
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
          if(element.masterName=='STAFF TYPE POST MAPPING' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
        });
      }
    })
  }
   redirectto(){
     this.router.navigate(['/teacher/stafftypePostMapping/add']);
   }
   getRegionList(){
    let req={};
    this.outSideService.fetchStaffTypePostMapping(req).subscribe((res)=>{
     if(res.content.length>0){
       let index=0;
       for (let i = 0; i < res.content.length; i++) {
       
    
         this.testData.sno = '' + (index++ +1) + '';
         this.testData.staffType = res.content[i].staffType;
         this.testData.postCode = res.content[i].postCode;
         this.testData.postName = res.content[i].postName;
   
         this.stafftypePostMappingList.push(this.testData);
         this.testData = { "sno": "", "staffType": "", "postCode": "", "postName": "" };
        


       }
    
     }
     setTimeout(() => {
       this.dataSource = new MatTableDataSource(this.stafftypePostMappingList);
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
   stafftypePostMappingPdf()
   {
    setTimeout(() => {
      this.pdfService.staffTypePostMappingList(this.stafftypePostMappingList);
    }, 1000);
   }
   downloadDocExcel(){
    let req={};
    let url='download-staff-type-post-mapping'
    this.outSideService.downloadExcel(req,url).subscribe((res)=>{
     saveAs(res,'staff-type-post-mapping-'+this.currentDate()+'.xlsx'); 
    }, error => {
      Swal.fire({
        'icon':'error',
        'text':'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf(){
    let req={};
    let url='staff-type-post-mapping'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
    saveAs(res,'staff-type-post-mapping-'+this.currentDate()+'.pdf');
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
