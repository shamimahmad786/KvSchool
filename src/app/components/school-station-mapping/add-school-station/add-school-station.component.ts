import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-school-station',
  templateUrl: './add-school-station.component.html',
  styleUrls: ['./add-school-station.component.css']
})
export class AddSchoolStationComponent implements OnInit {
  schoolStationMForm: FormGroup;
  isSubmitted: boolean = false;
 
  stationList: any=[];
  dropdownStationList = [];
  selectedStationItems = [];
  dropdownStationSettings = {};

  schoolList: any=[];
  dropdownSchoolList:any=[];
  selectedSchoolItems = [];
  dropdownSchoolSettings = {};

  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}]

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe:DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
    this.settingSchoolDropDown();
    this.settingStationlDropDown();
  }
  @ViewChild('multiStation') multiStation;
  ngOnInit(): void {
    this.buildRegionMappingForm();
    this.getSchoolList();
    this.getStationList();
  }
  settingStationlDropDown(){
    this.dropdownStationSettings = {
      singleSelection: true,
      idField: 'stationCode',
      textField: 'stationName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }
  settingSchoolDropDown(){
    this.dropdownSchoolSettings = {
      singleSelection: false,
      idField: 'schoolCode',
      textField: 'schoolName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 4,
      allowSearchFilter: true
    };
  }

  buildRegionMappingForm(){
    this.schoolStationMForm = this.fb.group({
      schoolCode: ['', [Validators.required]],
      stationCode: ['',[Validators.required]],
      fromDate:[new Date(),[Validators.required]],
      toDate:[''],
      status:['',[Validators.required]],
    });
  }
  getSchoolList(){
    let req={};
    this.outSideService.fetchSchoolList(req).subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.schoolStatus){
            this.schoolList.push({ schoolCode: element.schoolCode, schoolName: element.schoolName+"("+element.shift+")"})
          }
        });
         this.dropdownSchoolList=this.schoolList;
      }
    })
  }
  getStationList(){
    let request={};
    this.outSideService.fetchStationList(request).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.isActive){
            this.stationList.push({ stationCode: element.stationCode, stationName: element.stationName })
          }
        });
        this.dropdownStationList=this.stationList;
      }

    })
  }
  submit(){
    if (this.schoolStationMForm.invalid) {
      this.isSubmitted = true;
     this.schoolStationMForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.schoolStationMForm.getRawValue();
      let request={
        // schoolName: payload.schoolCode[0].schoolName,
        // schoolId: payload.schoolCode[0].schoolCode,
        schoolMasterReqVoList:payload.schoolCode,
        stationCode: payload.stationCode[0].stationCode,
        stationName: payload.stationCode[0].stationName,
        fromDate:this.datePipe.transform(payload.fromDate ,'yyyy-MM-dd'),
        toDate:this.datePipe.transform(payload.toDate ,'yyyy-MM-dd'),
        status:payload.status,
     
      
      }
      console.log(request)
      this.outSideService.addSchoolStationMapping(request).subscribe((res)=>{
        if(res=="SUCCESS"){
          Swal.fire(
            'New School Station Mapped Successfully!',
            '',
            'success'
          )
          this.router.navigate(['/teacher/schoolStationMapping']);
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          'icon':'error',
           'title':'Opps...',
           'text':error.error
        }
        )
      })
    }

    
  }
  redirectToList(){
    this.router.navigate(['/teacher/schoolStationMapping']);
  }
  clear(){
    this.formDirective.resetForm();
    this.schoolStationMForm.get('stationCode').setValue('');
    this.schoolStationMForm.get('schoolCode').setValue('');
    this.isSubmitted=false;
    this.schoolStationMForm.reset();
    this.schoolStationMForm.get('fromDate').setValue(new Date());
    this.schoolStationMForm.get('toDate').setValue('');
    this.schoolStationMForm.get('status').setValue('');
  }
  errorHandling(controlName: string, errorName: string) {
    return this.schoolStationMForm.controls[controlName].hasError(errorName);
  }
  currentDate():Date{
    return new Date();
  }

}