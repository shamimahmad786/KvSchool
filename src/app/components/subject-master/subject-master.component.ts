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
  selector: 'app-subject-master',
  templateUrl: './subject-master.component.html',
  styleUrls: ['./subject-master.component.css']
})
export class SubjectMasterComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'subjectCode', 'subjectName', 'status','action'];

  testData = { "sno": "", "subjectCode": "", "subjectName": "", "status": "","id":"" }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listDesignation: any=[];

  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getDesignationList();
   }
   redirectto(){
     this.router.navigate(['/teacher/subjectMaster/add']);
   }
   getDesignationList(){
     let req={}
     this.outSideService.fetchSubjectList(req).subscribe((res)=>{
       if(res.length>0){
           for (let i = 0; i < res.length; i++) {
        
             this.testData.sno = '' + (i + 1) + '';
             this.testData.subjectCode = res[i].subjectCode;
             this.testData.subjectName = res[i].subjectName;
             this.testData.status = res[i].status;
             this.testData.id = res[i].id;

             this.listDesignation.push(this.testData);
             this.testData = { "sno": "", "subjectCode": "", "subjectName": "", "status": "","id":"" };
    
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
    sessionStorage.setItem("subjectEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/subjectMaster/edit'])
   }
   subjectMasterpdf()
   {
    setTimeout(() => {
      this.pdfService.subjectMasterList(this.listDesignation);
    }, 1000);

   }

}
