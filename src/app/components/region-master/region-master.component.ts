import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild,AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { element } from 'protractor';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';


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
  permissionSave: any=false;
  permissionEdit:any=false;
  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getRegionList();
    this.getAuthPermission();
  }
  getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='REGION MASTER' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
          if(element.masterName=='REGION MASTER' && element.operation=='EDIT'){
            this.permissionEdit=element.editAllowed
          }
        });
      }
    })
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

  downloadDocExcel(){
      let req={};
      let url='download-region-master'
      this.outSideService.downloadExcel(req,url).subscribe((res)=>{
       saveAs(res,'region-master-'+this.currentDate()+'.xlsx'); 
      }, error => {
        Swal.fire({
          'icon':'error',
          'text':'Something Went Wrong!'
        })
      })
  }
  downloadDocPdf(){
    let req={};
    let url='region-master'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
     saveAs(res,'region-master-'+this.currentDate()+'.pdf');
    }, error => {
      Swal.fire({
        'icon':'error',
        'text':'Something Went Wrong!'
      })
    })
  }
  currentDate(){
    let currentDate= this.datePipe.transform(new Date(),'dd-MM-yyyy_(hh/mm/ss)');
    return currentDate;
  }

}
