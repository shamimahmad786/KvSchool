import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'postCode', 'postName', 'status','action'];

  testData = { "sno": "", "postCode": "", "postName": "", "status": "" ,"id":""}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listDesignation: any=[];

  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getDesignationList();
   }
   redirectto(){
     this.router.navigate(['/teacher/designationMaster/add']);
   }
   getDesignationList(){
     let req={}
     this.outSideService.fetchDesignationList(req).subscribe((res)=>{
       if(res.length>0){
           for (let i = 0; i < res.length; i++) {
        
             this.testData.sno = '' + (i + 1) + '';
             this.testData.postCode = res[i].postCode;
             this.testData.postName = res[i].postName;
             this.testData.status = res[i].status;
             this.testData.id = res[i].id;
       
             this.listDesignation.push(this.testData);
             this.testData = { "sno": "", "postCode": "", "postName": "", "status": "","id":"" };
    
           }
     console.log(this.listDesignation)
       }
       setTimeout(() => {
         this.dataSource = new MatTableDataSource(this.listDesignation);
         // this.dataSource.paginator = this.paginator;
         // this.dataSource.sort = this.sort;
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
    sessionStorage.setItem("designationEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/designationMaster/edit'])
   }
   
   designationMasterpdf()
   {
    setTimeout(() => {
      this.pdfService.designationMasterList(this.listDesignation);
    }, 1000);
   }
}
