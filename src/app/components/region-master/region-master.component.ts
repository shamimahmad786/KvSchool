import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { OutsideServicesService } from 'src/app/service/outside-services.service';


const ELEMENT_DATA: any = [];

@Component({
  selector: 'app-region-master',
  templateUrl: './region-master.component.html',
  styleUrls: ['./region-master.component.css']
})

export class RegionMasterComponent implements OnInit,AfterViewInit {

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:any = ['sno', 'regioncode', 'regionname', 'status','action'];

  testData = { "sno": "", "regioncode": "", "regionname": "", "status": "","id":"" }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listRegion: any=[];

  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
   this.getRegionList();
  }
  redirectto(){
    this.router.navigate(['/teacher/regionMaster/add']);
  }
  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.regioncode = res[i].regionCode;
            this.testData.regionname = res[i].regionName;
            this.testData.status = res[i].isActive;
            this.testData.id = res[i].id;

            this.listRegion.push(this.testData);
            this.testData = { "sno": "", "regioncode": "", "regionname": "", "status": "","id":"" };
   
          }
    
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.listRegion);
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
  edit(data){
   sessionStorage.setItem("regionEdit",JSON.stringify(data));
   this.router.navigate(['/teacher/regionMaster/edit'])
  }
}
