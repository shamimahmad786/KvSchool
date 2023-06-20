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
  selector: 'app-post-subject-mapping',
  templateUrl: './post-subject-mapping.component.html',
  styleUrls: ['./post-subject-mapping.component.css']
})
export class PostSubjectMappingComponent implements OnInit,AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'postCode', 'postName', 'subjectCode','subjectName'];

  testData = { "sno": "", "postCode": "", "postName": "", "subjectCode": "" ,"subjectName":""};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stafftypePostMappingList: any=[];
  returnTypeSrvTime: any;
  freezeStatus:false
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }
  
  ngOnInit(): void {
    this.getFreezeStatus();
    this.getRegionList();
   }
   redirectto(){
     this.router.navigate(['/teacher/postSubjectMapping/add']);
   }
   getFreezeStatus()
   {
     this.outSideService.fetchFreezeStatus(12).subscribe((res)=>{  
     this.freezeStatus=res['status'];
     })
   }
   getRegionList(){
     let req={};
     this.outSideService.fetchSubjectPostMapping(req).subscribe((res)=>{
      if(res.content.length>0){
        for (let i = 0; i < res.content.length; i++) {
          this.testData.sno = '' + (i + 1) + '';
          this.testData.postCode = res.content[i].postCode;
          this.testData.postName = res.content[i].postName;
          this.testData.subjectCode = res.content[i].subjectCode;
          this.testData.subjectName = res.content[i].subjectName;
    
          this.stafftypePostMappingList.push(this.testData);
          this.testData = { "sno": "", "postCode": "", "postName": "", "subjectCode": "" ,"subjectName":""};
        }
        console.log(this.stafftypePostMappingList)
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
   postSubjectMapping()
   {
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.postSubjectMappingList(this.stafftypePostMappingList,this.returnTypeSrvTime);
    }, 1000);
   }
   exportexcel(){
    console.log( this.stafftypePostMappingList)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('PostSubjectMapping');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'POST SUBJECT MAPPING', '']);
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
   const ws = workSheet.addRow(['Post Code', 'Post name', 'Subject Code','Subject Name']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.stafftypePostMappingList.forEach((item) => {
      const row = workSheet.addRow([item.postCode, item.postName,item.subjectCode,item.subjectName]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'PostSubjectMapping.xlsx');
    });
 
  }
}
