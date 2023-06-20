import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  displayedColumns:any = ['sno', 'schoolcode', 'schoolname', 'schooltype', 'status','shift','action'];
  testData = {sno: '', schoolcode: '', schoolname: '', status: '', statusType: '',schooltype:'',shiftType:'',shift:'',id:''};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  schoolList: any=[];
  returnTypeSrvTime: any;
  freezeStatus = false;
 
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getFreezeStatus();
   this.getSchoolMaterList();
  }
  redirectto(){
    this.router.navigate(['/teacher/schoolMaster/add']);
  }
  getFreezeStatus()
  {
    this.outSideService.fetchFreezeStatus(3).subscribe((res)=>{  
    this.freezeStatus=res['status'];
    })
  }
  getSchoolMaterList(){
    let request={};
    this.outSideService.fetchSchoolList(request).subscribe((res)=>{
      if(res.length>0){
        for (let i = 0; i < res.length; i++) {
       
          this.testData.sno = '' + (i + 1) + '';
          this.testData.schoolcode = res[i].schoolCode;
          this.testData.schoolname = res[i].schoolName;
          this.testData.status = res[i].schoolStatus;
          if(res[i].shift =='0' || res[i].shift ==0 )
          {
            this.testData.shiftType = 'Not Applicable';
          }
          if(res[i].shift =='1' || res[i].shift ==1 )
          {
            this.testData.shiftType ='First Shift';
          }
          if(res[i].shift =='2' || res[i].shift ==2 )
          {
            this.testData.shiftType ='Second Shift';
          }
         // this.testData.shift = res[i].shift;
          if(res[i].schoolStatus ==true )
          {
          this.testData.statusType = 'Active';
          }
         if(res[i].schoolStatus ==false )
          {
          this.testData.statusType ='InActive';
          } 
          this.testData.id = res[i].id;
          this.testData.schooltype=res[i].schoolType;
          this.schoolList.push(this.testData);
          this.testData = {sno: '', schoolcode: '', schoolname: '',schooltype:'', status:'',statusType:'',shiftType:'',shift:'',id:''};
        }
        console.log(this.schoolList);
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

    // alert("on edit click--->"+JSON.stringify(data));

    sessionStorage.setItem("schoolEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/schoolMaster/edit'])
   }
   schoolMasterPdf()
   {
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.schoolMasterList(this.schoolList,this.returnTypeSrvTime);
    }, 1000);
   }
   exportexcel(){
    console.log(this.schoolList)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('SchoolMaster');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'SCHOOL MASTER', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 40;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 10;
    const dobCol3 = workSheet.getColumn(4);
    dobCol3.width = 12;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 5; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['School Code', 'School Name','Status','Shift Type']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 5; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.schoolList.forEach((item) => {
      const row = workSheet.addRow([item.schoolcode, item.schoolname,item.statusType,item.shiftType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'SchoolMaster.xlsx');
    });
 
  }
}
