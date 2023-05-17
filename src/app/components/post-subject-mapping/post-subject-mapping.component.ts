import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

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

  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }
  
  ngOnInit(): void {
    this.getRegionList();
   }
   redirectto(){
     this.router.navigate(['/teacher/postSubjectMapping/add']);
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

}
