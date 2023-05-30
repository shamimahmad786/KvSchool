import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import {map, startWith} from 'rxjs/operators';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-school-station-mapping',
  templateUrl: './school-station-mapping.component.html',
  styleUrls: ['./school-station-mapping.component.css']
})
export class SchoolStationMappingComponent implements OnInit {
  schoolStationMF: FormGroup;
  isSubmitted: boolean = false;
  businessUnitId:any;
  businessUnitTypeCode:any;

  dataSource:any;
  displayedColumns:any = ['sno','stationname','schoolname','shift','fromdate','todate','status'];

  testData = { "sno": "", "stationname": "", "schoolname": "","shift":"" ,"fromdate": "","todate":"","status":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionStation: any=[];
 
  stationList: any=[];
  filteredOptions: Observable<string[]>;
 

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  permissionSave: any=false;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe:DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.businessUnitId=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
    this.businessUnitTypeCode=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
    this.buildSchoolStationMappingForm();
    this.getAuthPermission();
    if(this.businessUnitId=="2"){
      this.searchList();
    this.getStationList();
    }else if(this.businessUnitId=="3"){
      this.searchList();
      this.getStationListByRegion();
    }
  }
  getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='SCHOOL STATION MAPPING' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
        });
      }
    })
  }
  buildSchoolStationMappingForm(){
    this.schoolStationMF = this.fb.group({
      stationCode: [''],
      stationName:['',[Validators.required]]
    });
  }

  getStationList(){
    let req={}
    this.outSideService.fetchStationList(req).subscribe((res)=>{
      if(res){
        this.stationList.push({ stationCode: 'Select All', stationName:'Select All'})
        res.forEach(element => {
          if(element.isActive){
            this.stationList.push({ stationCode: element.stationCode, stationName: element.stationName})
          }
        });
        this.filteredOptions = this.schoolStationMF['controls'].stationCode.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    })
  }

  getStationListByRegion(){
    let req={"regionCode":this.businessUnitTypeCode};
    this.outSideService.fetchStationByRegionId(req).subscribe((res)=>{
      if(res.rowValue){
        res.rowValue.forEach(element => {
          if(element.is_active){
            this.stationList.push({ stationCode: element.station_code, stationName: element.station_name})
          }
        });
        this.filteredOptions = this.schoolStationMF['controls'].stationCode.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    })
  }


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.stationList.filter(option => option.stationName.toLowerCase().includes(filterValue));
  }
  setStationNameVal(val){
   this.schoolStationMF.get('stationCode').setValue(val);
  }
  search(){
    if (this.schoolStationMF.invalid) {
      this.isSubmitted = true;
     this.schoolStationMF.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.schoolStationMF.getRawValue();
    
      if(payload.stationCode=='Select All'){
        this.searchList();
      }else{
        let request={
          stationCode: payload.stationCode,
        }
        this.outSideService.searchSchoolStationMList(request).subscribe((res)=>{
             this.getSchoolStationList(res.content)
        },
        error => {
          // console.log(error);
        })
      }

    } 
  }

  clear(){
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.schoolStationMF.reset();
  }

  searchList(){
    let req={};

    if(this.businessUnitId=="3"){
      req={"regionCode":this.businessUnitTypeCode};
    }

    this.outSideService.searchSchoolStationMList(req).subscribe((res)=>{
      this.getSchoolStationList(res.content)
        },
        error => {
          // console.log(error);
        })
  }


  errorHandling(controlName: string, errorName: string) {
    return this.schoolStationMF.controls[controlName].hasError(errorName);
  }
 redirectto(){
    this.router.navigate(['/teacher/schoolStationMapping/add']);
  }
  getSchoolStationList(res:any){
    this.listRegionStation=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.stationname = res[i].stationName+"("+res[i].stationCode+")";
            this.testData.schoolname = res[i].schoolName+"("+res[i].schoolCode+")";
            this.testData.shift=res[i].shift;
            this.testData.fromdate = res[i].fromDate;
            this.testData.todate = res[i].toDate;
            this.testData.status = res[i].active;
      
            this.listRegionStation.push(this.testData);
            this.testData = { "sno": "", "stationname": "", "schoolname": "","shift":"", "fromdate": "","todate":"","status":"" };
          }
      }else{
        Swal.fire({
          'icon':'error',
           'text':'No Mapping Found!'
        })
      }
      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.listRegionStation);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 100)
      // this.schoolStationMF.get('stationName').setValue('');
      // this.formDirective.resetForm();
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }
  
  schoolStationMappingPdf()
  {
    setTimeout(() => {
      this.pdfService.schoolStationMappingList(this.listRegionStation);
    }, 1000);

  }
  downloadDocExcel(){
    let req={};
    let url='download-station-school-mapping'
    this.outSideService.downloadExcel(req,url).subscribe((res)=>{
     saveAs(res,'school-station-mapping-'+this.currentDate()+'.xlsx'); 
    }, error => {
      Swal.fire({
        'icon':'error',
        'text':'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf(){
    let req={};
    let url='station-school-mapping'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
    saveAs(res,'school-station-mapping-'+this.currentDate()+'.pdf');
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
