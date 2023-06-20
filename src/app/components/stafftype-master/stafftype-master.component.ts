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
const ELEMENT_DATA: any = [];
@Component({
  selector: 'app-stafftype-master',
  templateUrl: './stafftype-master.component.html',
  styleUrls: ['./stafftype-master.component.css']
})
export class StafftypeMasterComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'stafftype','status','action'];

  testData = { "sno": "", "stafftype": "", "status": "" ,"statusType": "" ,"id":''}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listStaffType: any=[];
  returnTypeSrvTime: any;
  freezeStatus:false;
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getFreezeStatus();
    this.getRegionList();
   }
   redirectto(){
     this.router.navigate(['/teacher/stafftypeMaster/add']);
   }
   getFreezeStatus()
   {
     this.outSideService.fetchFreezeStatus(5).subscribe((res)=>{  
     this.freezeStatus=res['status'];
     })
   }
   getRegionList(){
     let req={};
     this.outSideService.fetchStaffTypeList(req).subscribe((res)=>{
       console.log(res)
       if(res.length>0){
           for (let i = 0; i < res.length; i++) {
        
             this.testData.sno = '' + (i + 1) + '';
             this.testData.stafftype = res[i].staffType;
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
       
             this.listStaffType.push(this.testData);
             this.testData = { "sno": "", "stafftype": "", "status": "" ,"statusType": "" ,"id":''};
    
           }
             console.log(this.listStaffType)
       }
       setTimeout(() => {
         this.dataSource = new MatTableDataSource(this.listStaffType);
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
    sessionStorage.setItem("staffTypeEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/stafftypeMaster/edit'])
   }
  staffTypeMasterpdf()
   {
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.staffTypemasterList(this.listStaffType,this.returnTypeSrvTime);
    }, 1000);
   }
   exportexcel(){
    console.log( this.listStaffType)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('StaffTypeMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'STAFF TYPE MASTER', '']);
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
   const ws = workSheet.addRow(['Staff Type Name', 'Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listStaffType.forEach((item) => {
      const row = workSheet.addRow([item.stafftype,item.statusType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'StaffTypeMaster.xlsx');
    });
 
  }
}
