import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';


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

  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) {

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

}


