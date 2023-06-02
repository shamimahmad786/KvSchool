import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-station-category-master',
  templateUrl: './station-category-master.component.html',
  styleUrls: ['./station-category-master.component.css']
})

export class StationCategoryMasterComponent implements OnInit {
  stationCategoryList: any=[];
  testData = {sno: '', categoryname: '', status: '',id:''};

  ngOnInit(): void {
    this.getListStationCategory();
  }
  displayedColumns: string[] = ['sno','categoryname', 'status','action'];
  dataSource: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) {

  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  getListStationCategory(){
    let request={}
    this.outSideService.fetchStationCategoryList(request).subscribe((res)=>{
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            // this.testData.categoryid = res[i].id;
            this.testData.categoryname = res[i].category;
            this.testData.status = res[i].isActive;
            this.testData.id=res[i].id;
      
            this.stationCategoryList.push(this.testData);
            this.testData =  {sno: '', categoryname: '', status: '',id:''};
          }  
          console.log(this.stationCategoryList)
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.stationCategoryList);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 100)
      }
    })
  }
  redirectto(){
    this.router.navigate(['/teacher/stationCategoryMaster/add']);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  edit(data){
    console.log(data)
    sessionStorage.setItem("stationCategoryEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/stationCategoryMaster/edit'])
   }
   stationCategoryMasterList
   stationCategoryMasterpdf()
   {
    setTimeout(() => {
      this.pdfService.stationCategoryMasterList(this.stationCategoryList);
    }, 1000);
   }
   exportexcel(){
    console.log(this.stationCategoryList)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('StationCategoryMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'STATION CATEGORY MASTER', '']);
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
   const ws = workSheet.addRow(['Category Name','Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.stationCategoryList.forEach((item) => {
      const row = workSheet.addRow([item.categoryname,item.status]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'StationCategoryMaster.xlsx');
    });
 
  }
}


