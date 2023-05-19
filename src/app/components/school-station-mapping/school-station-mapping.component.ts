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

@Component({
  selector: 'app-school-station-mapping',
  templateUrl: './school-station-mapping.component.html',
  styleUrls: ['./school-station-mapping.component.css']
})
export class SchoolStationMappingComponent implements OnInit {
  schoolStationMF: FormGroup;
  isSubmitted: boolean = false;

  dataSource:any;
  displayedColumns:any = ['sno','stationname','schoolname','shift','fromdate','todate','status'];

  testData = { "sno": "", "stationname": "", "schoolname": "","shift":"" ,"fromdate": "","todate":"","status":""}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listRegionStation: any=[];
 
  stationList: any=[];
  filteredOptions: Observable<string[]>;
 

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.buildSchoolStationMappingForm();
    this.getStationList();
    this.searchList();
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
      let request={
        stationCode: payload.stationCode,
      }
      this.outSideService.searchSchoolStationMList(request).subscribe((res)=>{
           this.getSchoolStationList(res.content)
      },
      error => {
        console.log(error);
      })
    } 
  }

  clear(){
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.schoolStationMF.reset();
  }
  searchList(){
    let req={};
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
}
