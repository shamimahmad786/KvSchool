import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
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
 
  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
   this.getStationMaterList();
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

}
