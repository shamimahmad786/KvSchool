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
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
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
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.buildSchoolStationMappingForm();
    this.getStationList();
    this.searchList();
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
      let request={
        stationName: payload.stationCode,
      }
      this.outSideService.searchStationCategoryMList(request).subscribe((res)=>{
           this.getRegionStationList(res.content)
      },
      error => {
        // console.log(error);
      })
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
      this.getRegionStationList(res.content)
    },
    error => {
      // console.log(error);
    })
  }
  getRegionStationList(res:any){
    this.listRegionStation=[];
      if(res.length>0){
          for (let i = 0; i < res.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.stationname = res[i].stationName+"("+res[i].stationCode+")";
            this.testData.categoryname = res[i].categoryName;
            this.testData.fromdate = res[i].fromDate;
            this.testData.todate = res[i].toDate;
            this.testData.status = res[i].active;
      
            this.listRegionStation.push(this.testData);
            this.testData = { "sno": "", "stationname": "", "categoryname": "", "fromdate": "","todate":"","status":"" };
   
          }
    console.log( this.listRegionStation)
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
  exportexcel(){
    console.log(this.listRegionStation)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('StationCategoryMapping');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'STATION CATEGORY MAPPING', '']);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 30;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 4; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['Station Name', 'Category Name','From Date','To Date', 'Status']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.listRegionStation.forEach((item) => {
      const row = workSheet.addRow([item.stationname, item.categoryname,item.fromdate,item.todate,item.status]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'StationCategoryMapping.xlsx');
    });
 
  }
}
