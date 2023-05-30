import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

const ELEMENT_DATA: any = [];
@Component({
  selector: 'app-stafftype-master',
  templateUrl: './stafftype-master.component.html',
  styleUrls: ['./stafftype-master.component.css']
})
export class StafftypeMasterComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'stafftype','status','action'];

  testData = { "sno": "", "stafftype": "", "status": "" ,"id":''}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listStaffType: any=[];

  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
    this.getRegionList();
   }
   redirectto(){
     this.router.navigate(['/teacher/stafftypeMaster/add']);
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
             this.testData.id = res[i].id;
       
             this.listStaffType.push(this.testData);
             this.testData = { "sno": "", "stafftype": "", "status": "" ,"id":''};
    
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
    setTimeout(() => {
      this.pdfService.staffTypemasterList(this.listStaffType);
    }, 1000);
   }
}
