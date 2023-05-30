import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
const ELEMENT_DATA: any = [
  {sno: '', stationcode: '', stationname: '', status: ''}


];
@Component({
  selector: 'app-station-master',
  templateUrl: './station-master.component.html',
  styleUrls: ['./station-master.component.css']
})
export class StationMasterComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns:any = ['sno', 'stationcode', 'stationname', 'status','action'];
  testData = {sno: '', stationcode: '', stationname: '', status: '',id:''};
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  stationList: any=[];
  permissionSave: boolean=false;
  permissionEdit: boolean=false;
  constructor(private pdfService: MasterReportPdfService, private datePipe: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
   this.getStationMaterList();
   this.getAuthPermission();
  }
  getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='STATION MASTER' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
          if(element.masterName=='STATION MASTER' && element.operation=='EDIT'){
            this.permissionEdit=element.editAllowed
          }
        });
      }
    })
  }
  redirectto(){
    this.router.navigate(['/teacher/stationMaster/add']);
  }
  getStationMaterList(){
    let request={};
    this.outSideService.fetchStationList(request).subscribe((res)=>{
      if(res.length>0){
        for (let i = 0; i < res.length; i++) {
       
          this.testData.sno = '' + (i + 1) + '';
          this.testData.stationcode = res[i].stationCode;
          this.testData.stationname = res[i].stationName;
          this.testData.status = res[i].isActive;
          this.testData.id = res[i].id;

          this.stationList.push(this.testData);
          this.testData = {sno: '', stationcode: '', stationname: '', status: '',id:''};
  
        }
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.stationList);
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
    console.log(data)
    sessionStorage.setItem("stationEdit",JSON.stringify(data));
    this.router.navigate(['/teacher/stationMaster/edit']);
   }

   stationMasterPdf()
   {
    setTimeout(() => {
      this.pdfService.stationMasterList(this.stationList);
    }, 1000);

  }
  downloadDocExcel(){
    let req={};
    let url='download-station-master'
    this.outSideService.downloadExcel(req,url).subscribe((res)=>{
     saveAs(res,'station-master-'+this.currentDate()+'.xlsx');
      
    }, error => {
      Swal.fire({
        'icon':'error',
         'text':'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf(){
    let req={};
    let url='station-master'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
    saveAs(res,'station-master-'+this.currentDate()+'.pdf');  
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
