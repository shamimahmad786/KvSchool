import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
const ELEMENT_DATA: any = [];
@Component({
  selector: 'app-stafftype-post-mapping',
  templateUrl: './stafftype-post-mapping.component.html',
  styleUrls: ['./stafftype-post-mapping.component.css']
})
export class StafftypePostMappingComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'staffType', 'postCode', 'postName'];

  testData = { "sno": "", "staffType": "", "postCode": "", "postName": "" }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  stafftypePostMappingList: any=[];

  
  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }
  
  ngOnInit(): void {
    this.getRegionList();
   }
   redirectto(){
     this.router.navigate(['/teacher/stafftypePostMapping/add']);
   }
   getRegionList(){
     let req={};
     this.outSideService.fetchStaffTypePostMapping(req).subscribe((res)=>{
      if(res.content.length>0){
        let index=0;
        for (let i = 0; i < res.content.length; i++) {
        
     
          this.testData.sno = '' + (index++ +1) + '';
          this.testData.staffType = res.content[i].staffType;
          this.testData.postCode = res.content[i].postCode;
          this.testData.postName = res.content[i].postName;
    
          this.stafftypePostMappingList.push(this.testData);
          this.testData = { "sno": "", "staffType": "", "postCode": "", "postName": "" };
         

 
        }
        console.log(this.testData)
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
