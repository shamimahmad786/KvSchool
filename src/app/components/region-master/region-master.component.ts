import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
const ELEMENT_DATA: any = [];

@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})

export class RegionMasterComponent implements OnInit,AfterViewInit {
  
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'regioncode', 'regionname', 'status','action'];

  testData = { "sno": "", "regioncode": "", "regionname": "", "status": "","statusType": "","id":"" }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  listRegion: any=[];
  returnTypeSrvTime: any;
  freezeStatus = false;
 

  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getFreezeStatus();
   this.getRegionList();
  }
  
  redirectto(){
    this.router.navigate(['/teacher/regionMaster/add']);
  }
  getFreezeStatus()
  {
    this.outSideService.fetchFreezeStatus(1).subscribe((res)=>{  
    this.freezeStatus=res['status'];
    })
  }
  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
            this.testData.sno = '' + (i + 1) + '';
            this.testData.regioncode = res[i].regionCode;
            this.testData.regionname = res[i].regionName;
            this.testData.status = res[i].isActive;
            if(res[i].isActive ==true )
            {
            this.testData.statusType = 'Active';
            }
           if(res[i].isActive ==false )
            {
            this.testData.statusType ='InActive';
            }      
          this.testData.id = res[i].id;
          this.listRegion.push(this.testData);
          this.testData = { "sno": "", "regioncode": "", "regionname": "", "status": "","statusType": "","id":"" };
   
          }
    console.log( this.listRegion)
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.listRegion);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100)
    })
  }

  regionMasterPdf() { 
   this.returnTypeSrvTime = srvTime();
    console.log("data time")
    console.log(this.returnTypeSrvTime)
  setTimeout(() => {
       this.pdfService.regionMasterList(this.listRegion,this.returnTypeSrvTime);
     }, 1000);
 
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
   sessionStorage.setItem("regionEdit",JSON.stringify(data));
   this.router.navigate(['/teacher/regionMaster/edit'])
  }
  exportexcel(){
    console.log(this.listRegion)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('RegionMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'REGION MASTER', '']);
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
   const ws = workSheet.addRow(['Region Code', 'Region Name', 'Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listRegion.forEach((item) => {
      const row = workSheet.addRow([item.regioncode, item.regionname,item.statusType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'RegionMaster.xlsx');
    });
 
  }
}
