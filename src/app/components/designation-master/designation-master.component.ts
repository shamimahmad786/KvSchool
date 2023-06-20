import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
@Component({
  selector: 'app-designation-master',
  templateUrl: './designation-master.component.html',
  styleUrls: ['./designation-master.component.css']
})
export class DesignationMasterComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'postCode', 'postName', 'status','action'];

  testData = { "sno": "", "postCode": "", "postName": "", "status": "" ,"statusType": "" ,"id":""}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listDesignation: any=[];
  returnTypeSrvTime: any;
  freezeStatus:false
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getFreezeStatus();
    this.getDesignationList();
   }
   redirectto(){
     this.router.navigate(['/teacher/designationMaster/add']);
   }
   getFreezeStatus()
   {
     this.outSideService.fetchFreezeStatus(6).subscribe((res)=>{  
     this.freezeStatus=res['status'];
     })
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
             if(res[i].status ==true )
             {
             this.testData.statusType = 'Active';
             }
            if(res[i].status ==false )
             {
             this.testData.statusType ='InActive';
             } 
             this.testData.id = res[i].id;
       
             this.listDesignation.push(this.testData);
             this.testData = { "sno": "", "postCode": "", "postName": "", "status": "","statusType": "","id":"" };
    
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
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.designationMasterList(this.listDesignation,this.returnTypeSrvTime);
    }, 1000);
   }
   exportexcel(){
    console.log(this.listDesignation)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('DesignationMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'DESIGNATION MASTER', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 30;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 4; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['Designation Code', 'Designation Name', 'Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listDesignation.forEach((item) => {
      const row = workSheet.addRow([item.postCode, item.postName,item.statusType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'DesignationMaster.xlsx');
    });
 
  }
}
