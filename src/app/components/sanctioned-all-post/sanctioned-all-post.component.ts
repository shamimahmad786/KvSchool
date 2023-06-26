import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
@Component({
  selector: 'app-sanctioned-all-post',
  templateUrl: './sanctioned-all-post.component.html',
  styleUrls: ['./sanctioned-all-post.component.css']
})
export class SanctionedAllPostComponent implements OnInit {
  sanctionedPost:FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  schoolCode:any='';
  data: any;
  isEdit: boolean;
  regionList: any=[];
  stationList: any=[];
  schoolList:any=[];
  sanctionPostMappingDataListArray: any=[];
  returnTypeSrvTime: any;
  url: string;
  appllicatioDetails: any;
  regionCodeData: any;
  modeselect: any;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  responseData: any;
  shiftAvailable: boolean = false;
  totalSanctionedPost:number = 0;
  totalSurplusPost:number = 0;
  totalOccupiedPost:number = 0;
  totalVacantPost:number = 0;
  regionSelection:any=1;
  stationSelection:any;
  regionCode:any;
  stationCode:any;
  selectedRegion:any;
  businessTypeId:any;
  businessTypeCode:any;
  regionName:any;
  stationName:any;
  schoolName:any;
  sanctionPostFor:any;
  shift:any;
  allList:any;
  listDesignation: any=[];
  displayedColumns:any = ['sno', 'regionName', 'stationName', 'schoolName','shift','status','action'];
  testData = {sno: '',regionName:'',regionCode:'',stationCode:'', stationName: '', schoolName: '',schoolCode:'',shift:'',shiftType:'', status: ''};
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngOnInit(): void { 
    this.businessTypeId=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_id;
    this.businessTypeCode=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_code;
    this.getRegionList();
    if(this.businessTypeId==3){
      this.getAllRegionStationSchoolList(this.businessTypeCode);
    }else if(this.businessTypeId==2){
      this.getAllRegionStationSchoolList(1);
    }
  
  }
  getAllRegionStationSchoolList(regionCode:any){
          this.allList='';
          this.listDesignation=[];
          console.log(regionCode)
          this.modeselect =+regionCode;
          this.appllicatioDetails= JSON.parse(sessionStorage.getItem('authTeacherDetails'))
          if(this.appllicatioDetails.applicationDetails['0'].business_unit_type_code==null){
          this.regionCodeData=regionCode;
          }
          else{
          this.regionCodeData=regionCode;
          }
          const data={
            "businessUnitTypeId":this.appllicatioDetails.applicationDetails['0'].business_unit_type_id,
            "regionCode": this.regionCodeData
            }
          console.log(data)
          this.outSideService.fetchAllSactionedPostMapping(data).subscribe((res)=>{
          this.allList=res['rowValue'];
          console.log(this.allList)
          for (let i = 0; i < this.allList.length; i++) {   
          this.testData.sno = '' + (i + 1) + '';
          this.testData.regionName = this.allList[i].region_name;
          this.testData.regionCode = this.allList[i].region_code;
          this.testData.stationName =this.allList[i].station_name;
          this.testData.stationCode =this.allList[i].station_code;
          this.testData.schoolName =this.allList[i].kv_name;
          this.testData.schoolCode =this.allList[i].school_code;
          this.testData.shift =this.allList[i].shift;
          if(this.allList[i].shift==0){
            this.testData.shiftType ='	Not Applicable';
          }
          else if(this.allList[i].shift==1){
            this.testData.shiftType ='First Shift';
          }
          else if(this.allList[i].shift==2){
            this.testData.shiftType ='Second Shift';
          }

          if(this.allList[i].freezed_sanction_post ==1 ){
          this.testData.status = 'Freezed';
          }
         else{
          this.testData.status ='UnFreezed';
          }        
          this.listDesignation.push(this.testData);
          this.testData = { "sno": "", "regionName": "","regionCode":"" ,"stationCode":"","stationName": "", "schoolName": "","schoolCode":"","shift":"","shiftType":"","status": "" };
         }
         console.log(this.listDesignation)
        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.listDesignation);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 100)
          })
      }
    
  getRegionList(){
        this.outSideService.fetchRegionList().subscribe((res)=>{
          if(res.length>0){
            res.forEach(element => {
              if(element.isActive==true){
                this.regionList.push(element)
              }
            });
          }
          if(this.businessTypeId=="3"){
            for(var i=0;i<this.regionList.length;i++){
          if(this.regionList[i].regionCode==this.selectedRegion){
              this.regionName=this.regionList[i].regionName;
          }
            }
          }
        })
     
      }
      applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); 
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
      }
 edit(elem:any)
 {
console.log(elem)
localStorage.setItem('regionName',elem.regionName);
localStorage.setItem('stationName',elem.stationName);
localStorage.setItem('schoolName',elem.schoolName);
this.url="/teacher/sanctioned-post";

this.router.navigate([this.url], {queryParams:{RegionCode:elem.regionCode,StationCode:elem.stationCode,SchoolCode:elem.schoolCode,Shift:elem.shift}});
 }

}
