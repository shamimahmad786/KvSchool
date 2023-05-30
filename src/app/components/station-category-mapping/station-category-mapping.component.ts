import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { Observable } from 'rxjs';

import {map, startWith} from 'rxjs/operators';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { saveAs } from 'file-saver';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-station-category-mapping',
  templateUrl: './station-category-mapping.component.html',
  styleUrls: ['./station-category-mapping.component.css']
})
export class StationCategoryMappingComponent implements OnInit {
  stationCategoryMF: FormGroup;
  isSubmitted: boolean = false;

  dataSource:any;
  displayedColumns:any = ['sno','stationname','categoryname','fromdate','todate','status'];

  testData = { "sno": "", "stationname": "", "categoryname": "", "fromdate": "","todate":"","status":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionStation: any=[];
  stationList: any=[];
  filteredOptions: Observable<string[]>;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  permissionSave: any=false;

  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe: DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.buildSchoolStationMappingForm();
    this.getStationList();
    this.searchList();
    this.getAuthPermission();
  }
  getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='STATION CATEGORY MAPPING' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
        });
      }
    })
  }
  buildSchoolStationMappingForm(){
    this.stationCategoryMF = this.fb.group({
      stationCode: ['', [Validators.required]],
    });
  }

  getStationList(){
    let req={}
    this.outSideService.fetchStationList(req).subscribe((res)=>{
      if(res){
        this.stationList.push({ stationCode: 'Select All', stationName: 'Select All'})
        res.forEach(element => {
          if(element.isActive){
            this.stationList.push({ stationCode: element.stationCode, stationName: element.stationName})
          }
        });
        this.filteredOptions = this.stationCategoryMF['controls'].stationCode.valueChanges.pipe(
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
  search(){
    if (this.stationCategoryMF.invalid) {
      this.isSubmitted = true;
     this.stationCategoryMF.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.stationCategoryMF.getRawValue();
      if(payload.stationCode=='Select All'){
         this.searchList();
      }else{
        let request={
          stationName: payload.stationCode,
        }
        this.outSideService.searchStationCategoryMList(request).subscribe((res)=>{
             this.getStationCategoryMList(res.content)
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
    this.stationCategoryMF.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.stationCategoryMF.controls[controlName].hasError(errorName);
  }
 redirectto(){
    this.router.navigate(['/teacher/stationCategoryMapping/add']);
  }
  searchList(){
    let request={};
    this.outSideService.searchStationCategoryMList(request).subscribe((res)=>{
      this.getStationCategoryMList(res.content)
    },
    error => {
      // console.log(error);
    })
  }
  getStationCategoryMList(res:any){
    this.listRegionStation=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.stationname = res[i].stationName+"("+res[i].stationCode+")";
            this.testData.categoryname = res[i].categoryName;
            this.testData.fromdate = res[i].fromDate;
            this.testData.todate = res[i].toDate;
            this.testData.status = res[i].isActive;
      
            this.listRegionStation.push(this.testData);
            this.testData = { "sno": "", "stationname": "", "categoryname": "", "fromdate": "","todate":"","status":"" };
   
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
      // this.stationCategoryMF.get('stationCode').setValue('');
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
  stationCategoryMappingpdf()
  {
    setTimeout(() => {
      this.pdfService.stationCategoryMappingList(this.listRegionStation);
    }, 1000);

  }
  downloadDocExcel(){
    let req={};
    let url='download-station-category-mapping'
    this.outSideService.downloadExcel(req,url).subscribe((res)=>{
     saveAs(res,'station-category-mapping-'+this.currentDate()+'.xlsx'); 
    }, error => {
      Swal.fire({
        'icon':'error',
        'text':'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf(){
    let req={};
    let url='station-category-mapping'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
    saveAs(res,'station-category-mapping-'+this.currentDate()+'.pdf');
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
