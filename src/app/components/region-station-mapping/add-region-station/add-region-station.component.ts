import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-region-station',
  templateUrl: './add-region-station.component.html',
  styleUrls: ['./add-region-station.component.css']
})
export class AddRegionStationComponent implements OnInit {
  regionMForm: FormGroup;
  isSubmitted: boolean = false;
 
  stationList: any=[];
  dropdownStationList = [];
  selectedStationItems = [];
  dropdownStationSettings = {};

  regionList: any=[];
  dropdownRegionList:any=[];
  selectedRegionItems = [];
  dropdownRegionSettings = {};
  stationMapped:boolean=false;

  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe: DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
    this.settingRegionDD();
    this.settingStationDD();
  }
  @ViewChild('multiStation') multiStation;
  ngOnInit(): void {
    this.buildRegionMappingForm();
    this.getRegionList();
    this.getStationList();
  }
  settingStationDD(){
    this.dropdownStationSettings = {
      singleSelection: false,
      idField: 'stationCode',
      textField: 'stationName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
  }
  settingRegionDD(){
    this.dropdownRegionSettings = {
      singleSelection: true,
      idField: 'regionCode',
      textField: 'regionName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }

  buildRegionMappingForm(){
    this.regionMForm = this.fb.group({
      regionCode: ['', [Validators.required]],
      stationCode: ['',[Validators.required]],
      fromDate:[new Date(),[Validators.required]],
      toDate:[''],
      status:['',[Validators.required]]
    });
  }
  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.isActive){
            this.regionList.push({ regionCode: element.regionCode, regionName: element.regionName+"("+element.regionCode+")"})
          }
        });
         this.dropdownRegionList=this.regionList;
      }
    })
  }
  getStationList(){
    let request={};
    this.outSideService.fetchUnmappedStationList(request).subscribe((res)=>{
      if(res.rowValue.length>0){
        res.rowValue.forEach(element => {
          if(element.is_active){ 
            this.stationList.push({ stationCode: element.station_code, stationName: element.station_name+"("+element.station_code+")"})
          }
        });
        this.dropdownStationList=this.stationList;
      }else{
        this.stationMapped=true;
      }

    })
  }
  submit(){
    if (this.regionMForm.invalid) {
      this.isSubmitted = true;
     this.regionMForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.regionMForm.getRawValue();
      console.log(payload)
      let filterRegionName=payload.regionCode[0].regionName.split("(",1);
      let filterStationName=payload.stationCode[0].stationName.split("(",1);
      let newStationData=[];
        newStationData.push({'stationCode':payload.stationCode[0].stationCode,'stationName':filterStationName[0]})
      let request={
        regionName: filterRegionName[0],
        regionCode: payload.regionCode[0].regionCode,
        // stationCode: payload.stationCode[0].stationCode,
        // stationName: payload.stationCode[0].stationName,
        station:newStationData,
        fromDate:this.datePipe.transform(payload.fromDate ,'yyyy-MM-dd'),
        toDate:this.datePipe.transform(payload.toDate,'yyyy-MM-dd'),
        status:payload.status,
      }
      console.log(request)
      this.outSideService.addRegionStationMapping(request).subscribe((res)=>{
        if(res=="SUCCESS"){
          Swal.fire(
            'New Region-Station Mapped Successfully!',
            '',
            'success'
          )
          this.router.navigate(['/teacher/regionStationMapping']);
        }
      },
      error => {
        console.log(error);
        Swal.fire({
          'icon':'error',
           'text':error.error
        }
        )
      })
    }

    
  }
  redirectToList(){
    this.router.navigate(['/teacher/regionStationMapping']);
  }
  clear(){
    this.formDirective.resetForm();
    this.regionMForm.get('stationCode').setValue('');
    this.regionMForm.get('regionCode').setValue('');
    this.isSubmitted=false;
    this.regionMForm.reset();
    this.regionMForm.get('fromDate').setValue(new Date());
    this.regionMForm.get('toDate').setValue('');
    this.regionMForm.get('status').setValue('');
  }
  errorHandling(controlName: string, errorName: string) {
    return this.regionMForm.controls[controlName].hasError(errorName);
  }
  currentDate():Date{
    return new Date();
  }
  setDate(date){
    console.log(date)
    let d=date;
    console.log(d)
    d.setHours(d.getHours() + 5);
    d.setMinutes(d.getMinutes() + 30);
    return new Date(d)
  }

}
