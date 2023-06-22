import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
const ELEMENT_DATA: any = [
  {sno: '', stationcode: '', stationname: '', status: ''}


];
@Component({
  selector: 'app-station-master',
  templateUrl: './station-master.component.html',
  styleUrls: ['./station-master.component.css']
})
export class StationMasterComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns:any = ['sno', 'stationcode', 'stationname', 'status','action'];
  testData = {sno: '', stationcode: '', stationname: '', status: '',statusType: '',id:''};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  stationList: any=[];
  returnTypeSrvTime: any;
  freezeStatus = false;
  constructor(private pdfService: MasterReportPdfService, private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getFreezeStatus();
   this.getStationMaterList();
  }
  redirectto(){
    this.router.navigate(['/teacher/stationMaster/add']);
  }
  getFreezeStatus()
  {
    this.outSideService.fetchFreezeStatus(2).subscribe((res)=>{  
    this.freezeStatus=res['status'];
    })
  }
  getStationMaterList(){
    let request={};
    this.outSideService.fetchStationList(request).subscribe((res)=>{
      if(res.length>0){
        for (let i = 0; i < res.length; i++) {
       
          this.testData.sno = '' + (i + 1) + '';
          this.testData.stationcode = res[i].stationCode;
          this.testData.stationname = res[i].stationName;
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

          this.stationList.push(this.testData);
          this.testData = {sno: '', stationcode: '', stationname: '', status: '',statusType: '',id:''};
  
        }
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.stationList);
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
    console.log(data)
    sessionStorage.setItem("stationEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/stationMaster/edit']);
   }

   stationMasterPdf()
   {
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.stationMasterList(this.stationList,this.returnTypeSrvTime);
    }, 1000);

  }
  exportexcel(){
    console.log( this.stationList)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('StationMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'STATION MASTER', '']);
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
   const ws = workSheet.addRow(['Station Code', 'Station Name', 'Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.stationList.forEach((item) => {
      const row = workSheet.addRow([item.stationcode, item.stationname,item.statusType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'StationMaster.xlsx');
    });
 
  } 
}
