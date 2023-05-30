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
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-station-category-master',
  templateUrl: './station-category-master.component.html',
  styleUrls: ['./station-category-master.component.css']
})

export class StationCategoryMasterComponent implements OnInit {
  stationCategoryList: any=[];
  testData = {sno: '', categoryname: '', status: '',id:''};


  displayedColumns: string[] = ['sno','categoryname', 'status','action'];
  dataSource: MatTableDataSource<any>;
  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  permissionSave: any=false;
  permissionEdit: any=false;
  constructor(private pdfService: MasterReportPdfService,private datePipe: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) {

  }
  ngOnInit(): void {
    this.getListStationCategory();
    this.getAuthPermission();
  }
  getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='CATEGORY MASTER' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
          if(element.masterName=='CATEGORY MASTER' && element.operation=='EDIT'){
            this.permissionEdit=element.editAllowed
          }
        });
      }
    })
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
  
   stationCategoryMasterpdf()
   {
    setTimeout(() => {
      this.pdfService.stationCategoryMasterList(this.stationCategoryList);
    }, 1000);
   }
   downloadDocExcel() {
    let req = {};
    let url = 'download-category-master'
    this.outSideService.downloadExcel(req, url).subscribe((res) => {
      saveAs(res, 'station-category-master-'+this.currentDate()+'.xlsx');
    }, error => {
      Swal.fire({
        'icon': 'error',
        'text': 'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf() {
    let req = {};
    let url = 'category-master'
    this.outSideService.downloadPdf(req, url).subscribe((res) => {
      saveAs(res, 'station-category-master-'+this.currentDate()+'.pdf');
    }, error => {
      Swal.fire({
        'icon': 'error',
        'text': 'Something Went Wrong!'
      })
    })
  }
  currentDate(){
    let currentDate= this.datePipe.transform(new Date(),'dd-MM-yyyy_(hh/mm/ss)');
    return currentDate;
  }

}


