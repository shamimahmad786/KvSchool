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
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
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
  // displayedColumns:any = ['sno','stationname','schoolname','shift','fromdate','todate','status'];
  displayedColumns:any = ['sno','stationname','schoolname','shift','status'];

  testData = { "sno": "", "stationname": "", "schoolname": "","shiftType":"","shift":"" ,"fromdate": "","todate":"","status":"","statusType":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionStation: any=[];
 
  stationList: any=[];
  filteredOptions: Observable<string[]>;
 

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  returnTypeSrvTime: any;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.businessUnitId=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
    this.businessUnitTypeCode=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_code;
    this.buildSchoolStationMappingForm();
 debugger;
    if(this.businessUnitId=="2"){
      this.searchList();
    this.getStationList();
    }else if(this.businessUnitId=="3"){
      this.searchList();
      this.getStationListByRegion();
    }
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
        res.forEach(element => {
          if(element.isActive){
            this.stationList.push({ stationCode: element.stationCode, stationName: element.stationName})
          }
        });
        this.filteredOptions = this.schoolStationMF['controls'].stationCode.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
        // alert(JSON.stringify(this.filteredOptions));
      }
    })
  }

  getStationListByRegion(){
    // alert("called");
    debugger;
    let req={"regionCode":this.businessUnitTypeCode};
    this.outSideService.fetchStationByRegionId(req).subscribe((res)=>{
      // alert("get station list by region---->"+JSON.stringify(res));
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

  

    debugger;
    if (this.schoolStationMF.invalid) {
      this.isSubmitted = true;
     this.schoolStationMF.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.schoolStationMF.getRawValue();
      let request={
        stationCode: payload.stationCode,
      }


      
      if(this.businessUnitId==3 && payload.stationCode==0){
        this.searchList();
      }else{
        this.outSideService.searchSchoolStationMList(request).subscribe((res)=>{
          this.getSchoolStationList(res.content)
     },
     error => {
       console.log(error);
     })
      }

      // alert("called-->"+JSON.stringify(request));

    
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
          console.log(error);
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
       debugger
            this.testData.sno = '' + (i + 1) + '';
            this.testData.stationname = res[i].stationName+"("+res[i].stationCode+")";
            this.testData.schoolname = res[i].schoolName+"("+res[i].schoolCode+")";
            if(res[i].shift =='0' || res[i].shift ==0 )
            {
            this.testData.shiftType = 'Not Applicable';
            }
           if(res[i].shift =='1' || res[i].shift ==1 )
           {
            this.testData.shiftType ='First Shift';
           }
           if(res[i].shift =='2' || res[i].shift ==2 )
           {
            this.testData.shiftType ='Second Shift';
           }
            this.testData.shift=res[i].shift;
            this.testData.fromdate = res[i].fromDate;
            this.testData.todate = res[i].toDate;
            this.testData.status = res[i].active;
            if(res[i].active == true )
            {
            this.testData.statusType = 'Active';
            }

           if(res[i].active == false )
            {
            this.testData.statusType ='InActive';
            } 
            this.listRegionStation.push(this.testData);
            this.testData = { "sno": "", "stationname": "", "schoolname": "","shiftType":"","shift":"", "fromdate": "","todate":"","status":"","statusType":"" };
          }
          console.log(this.listRegionStation)
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
    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.schoolStationMappingList(this.listRegionStation,this.returnTypeSrvTime);
    }, 1000);

  }
  exportexcel(){
    console.log(this.listRegionStation)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('SchoolStationMapping');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'SCHOOL STATION MAPPING', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 30;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 45;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 7; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['Station Name', 'School Name', 'Status','Shift Type']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 7; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listRegionStation.forEach((item) => {
      const row = workSheet.addRow([item.stationname, item.schoolname,item.statusType,item.shiftType,]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'SchoolStationMapping.xlsx');
    });
 
  }
}
