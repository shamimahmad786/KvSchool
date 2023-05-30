import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { saveAs } from 'file-saver';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-region-station-mapping',
  templateUrl: './region-station-mapping.component.html',
  styleUrls: ['./region-station-mapping.component.css']
})
export class RegionStationMappingComponent implements OnInit {
  regionStationMF: FormGroup;
  isSubmitted: boolean = false;

  dataSource:any;
  displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];

  testData = { "sno": "", "regionname": "", "stationname": "", "fromdate": "","todate":"","status":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionStation: any=[];
  regionList: any=[];
  businessUnitId:any;
  businessTypeCode:any;
  

  filteredOptions: Observable<string[]>;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  permissionSave: any=false;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe: DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.buildRegionMappingForm();
    this.getRegionList();
    
     this.businessUnitId=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
    this.businessTypeCode=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
    this.search();
    this.getAuthPermission();
  }
  getAuthPermission(){
    let req={};
    this.outSideService.getMasterDetail(req).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.masterName=='REGION STATION MAPPING' && element.operation=='SAVE'){
            this.permissionSave=element.editAllowed;
          }
        });
      }
    })
  }
  buildRegionMappingForm(){
    this.regionStationMF = this.fb.group({
      regionCode: ['', [Validators.required]],
    });
  }

  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res){
        this.regionList.push({ regionCode: '', regionName: 'Select All'})
        res.forEach(element => {
         
          if(element.isActive){
            this.regionList.push({ regionCode: element.regionCode, regionName: element.regionName})
          }
        });
        this.filteredOptions = this.regionStationMF['controls'].regionCode.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
       
      }
    })
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.regionList.filter(option => option.regionName.toLowerCase().includes(filterValue));
  }
  submit(){
    if (this.regionStationMF.invalid) {
      this.isSubmitted = true;
     this.regionStationMF.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.regionStationMF.getRawValue();
      if(payload.regionCode=='Select All')
      {
        this.search()
      }else{
        let request={
          regionName: payload.regionCode,
        }
        this.outSideService.searchRegionStationMList(request).subscribe((res)=>{
             this.getRegionStationList(res.content)
        },
        error => {
          // console.log(error);
        })
      }

    }

    
  }
  search(){
    let request={};
    this.outSideService.searchRegionStationMList(request).subscribe((res)=>{
      this.getRegionStationList(res.content)
      },
      error => {
        // console.log(error);
      })
  }

  clear(){
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.regionStationMF.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.regionStationMF.controls[controlName].hasError(errorName);
  }
 redirectto(){
    this.router.navigate(['/teacher/regionStationMapping/add']);
  }
  getRegionStationList(res:any){
    this.listRegionStation=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.regionname = res[i].regionName+"("+res[i].regionCode+")";
            this.testData.stationname = res[i].stationName+"("+ res[i].stationCode+")";
            this.testData.fromdate = res[i].fromDate;
            this.testData.todate = res[i].toDate;
            this.testData.status = res[i].isActive;
      
            this.listRegionStation.push(this.testData);
            this.testData = { "sno": "", "regionname": "", "stationname": "", "fromdate": "","todate":"","status":"" };
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
      // this.regionStationMF.get('regionCode').setValue('');
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
  regionStationMappingpdf()
  {
    setTimeout(() => {
      this.pdfService.regionStationMappingList(this.listRegionStation);
    }, 1000);
  }
  downloadDocExcel(){
    let req={};
    let url='download-region-station-mapping'
    this.outSideService.downloadExcel(req,url).subscribe((res)=>{
     saveAs(res,'region-station-mapping-'+this.currentDate()+'.xlsx'); 
    }, error => {
      Swal.fire({
        'icon':'error',
        'text':'Something Went Wrong!'
      })
    })
  }
  downloadDocPdf(){
    let req={};
    let url='region-station-mapping'
    this.outSideService.downloadPdf(req,url).subscribe((res)=>{
    saveAs(res,'region-station-mapping-'+this.currentDate()+'.pdf');
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
