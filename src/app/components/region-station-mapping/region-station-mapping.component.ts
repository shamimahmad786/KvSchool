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
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
@Component({
  selector: 'app-region-station-mapping',
  templateUrl: './region-station-mapping.component.html',
  styleUrls: ['./region-station-mapping.component.css']
})
export class RegionStationMappingComponent implements OnInit {
  regionStationMF: FormGroup;
  isSubmitted: boolean = false;
  mdoDateResultArray: any = new Array()
  dataSource:any;
  // displayedColumns:any = ['sno','regionname','stationname','fromdate','todate','status'];
  displayedColumns:any = ['sno','regionname','stationname','status'];

  testData = { "sno": "", "regionname": "", "stationname": "", "fromdate": "","todate":"","status":"","statusType":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionStation: any=[];
  regionList: any=[];
  businessUnitId:any;
  businessTypeCode:any;
  freezeStatus:false;

  filteredOptions: Observable<string[]>;

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  returnTypeSrvTime: any;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getFreezeStatus();
    this.buildRegionMappingForm();
    this.getRegionList();
    
     this.businessUnitId=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
this.businessTypeCode=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
this.search();

  }

  buildRegionMappingForm(){
    this.regionStationMF = this.fb.group({
      regionCode: ['', [Validators.required]],
    });
  }
  getFreezeStatus()
  {
    this.outSideService.fetchFreezeStatus(8).subscribe((res)=>{  
    this.freezeStatus=res['status'];
    })
  }
  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res){
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
      // alert(payload.regionCode);
      let request={
        regionName: payload.regionCode,
      }

      if(payload.regionCode=='All'){
        this.search();
      }else{
      this.outSideService.searchRegionStationMList(request).subscribe((res)=>{
           this.getRegionStationList(res.content)
      },
      error => {
        console.log(error);
      })
    }
    }

    
  }
  search(){
    let request={};

    if(this.businessUnitId=="3"){
      request={"regionCode":this.businessTypeCode};
    }

    this.outSideService.searchRegionStationMList(request).subscribe((res)=>{

      // alert(JSON.stringify(res));
      this.getRegionStationList(res.content)
      },
      error => {
        console.log(error);
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
            this.testData.status = res[i].active;
            if(res[i].active ==true )
            {
            this.testData.statusType = 'Active';
            }
           if(res[i].active ==false )
            {
            this.testData.statusType ='InActive';
            } 
            this.listRegionStation.push(this.testData);
            this.testData = { "sno": "", "regionname": "", "stationname": "", "fromdate": "","todate":"","status":"","statusType":"" };
   
          }
    console.log(this.listRegionStation)
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
    this.returnTypeSrvTime = srvTime();
    var groupByEnrolementDate = function(xs:any, key:any) {
      return xs.reduce(function(rv:any, x:any) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    };
    var groubedByEnrolmentDateResult=groupByEnrolementDate(this.listRegionStation, 'regionname')
  
    this. mdoDateResultArray = Object.entries(groubedByEnrolmentDateResult)
  //  console.log(groubedByEnrolmentDateResult)
    console.log(this.mdoDateResultArray)
    this.pdfService.regionStationMappingList(this.mdoDateResultArray,this.returnTypeSrvTime);

    // setTimeout(() => {
    //   this.pdfService.regionStationMappingList(this.listRegionStation);
    // }, 1000);
  }
  exportexcel(){
    console.log(this.listRegionStation)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('RegionStationMapping');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'REGION STATION MAPPING', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 30;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 6; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
  //  const ws = workSheet.addRow(['Region Name', 'Station Name','From Date','todate','Status']);
   const ws = workSheet.addRow(['Region Name', 'Station Name','Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 6; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listRegionStation.forEach((item) => {
      const row = workSheet.addRow([item.regionname, item.stationname,item.statusType]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'RegionStationMapping.xlsx');
    });
 
  }
}
