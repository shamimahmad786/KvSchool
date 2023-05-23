import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-station-category',
  templateUrl: './add-station-category.component.html',
  styleUrls: ['./add-station-category.component.css']
})
export class AddStationCategoryComponent implements OnInit {
  stationCategoryMForm: FormGroup;
  isSubmitted: boolean = false;
 
  stationList: any=[];
  dropdownStationList = [];
  selectedStationItems = [];
  dropdownStationSettings = {};

  categoryList: any=[];
  dropdownCategoryList:any=[];
  selectedCategoryItems = [];
  dropdownCategorySettings = {};

  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}]

  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router,private dateAdapter: DateAdapter<Date>,private datePipe:DatePipe) { 
    this.dateAdapter.setLocale('en-GB');
    this.settingCategoryDropDown();
    this.settingStationDropDown();
  }
  @ViewChild('multiStation') multiStation;
  ngOnInit(): void {
    this.buildRegionMappingForm();
    this.getCategoryList();
    this.getStationList();
  }
  settingStationDropDown(){
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
  settingCategoryDropDown(){
    this.dropdownCategorySettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'category',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true,
      maxHeight:200
    };
  }

  buildRegionMappingForm(){
    this.stationCategoryMForm = this.fb.group({
      category: ['', [Validators.required]],
      stationCode: ['',[Validators.required]],
      fromDate:[new Date(),[Validators.required]],
      toDate:[''],
      status:['',[Validators.required]]
    });
  }
  getCategoryList(){
    let req={};
    this.outSideService.fetchStationCategoryList(req).subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.isActive){
            this.categoryList.push({id:element.id,category:element.category})
          }
        });
         this.dropdownCategoryList=this.categoryList;
  
      }
    })
  }
  getStationList(){
    let request={};
    this.outSideService.fetchStationList(request).subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.isActive){
            this.stationList.push({ stationCode: element.stationCode, stationName: element.stationName+"("+element.stationCode+")" })
          }
        });
        this.dropdownStationList=this.stationList;
      }

    })
  }
  submit(){
    if (this.stationCategoryMForm.invalid) {
      this.isSubmitted = true;
     this.stationCategoryMForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.stationCategoryMForm.getRawValue();
      let request={
        // id: payload.category[0].id,
        categoryName: payload.category[0].category,
        categoryId: payload.category[0].id,
        stationCode: payload.stationCode[0].stationCode,
        // stationName: payload.stationCode[0].stationName,
        fromDate:this.datePipe.transform(payload.fromDate ,'yyyy-MM-dd'),
        toDate:this.datePipe.transform(payload.toDate ,'yyyy-MM-dd'),
        status:payload.status,
      }

      this.outSideService.addStationCategoryMapping(request).subscribe((res)=>{
        if(res=="SUCCESS"){
          Swal.fire(
            'New Station-Category Mapped Successfully!',
            '',
            'success'
          )
          this.router.navigate(['/teacher/stationCategoryMapping']);
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
    this.router.navigate(['/teacher/stationCategoryMapping']);
  }
  clear(){
    this.formDirective.resetForm();
    this.stationCategoryMForm.get('stationCode').setValue('');
    this.stationCategoryMForm.get('category').setValue('');
    this.isSubmitted=false;
    this.stationCategoryMForm.reset();
    this.stationCategoryMForm.get('fromDate').setValue(new Date());
    this.stationCategoryMForm.get('toDate').setValue('');
    this.stationCategoryMForm.get('status').setValue('');
  }
  errorHandling(controlName: string, errorName: string) {
    return this.stationCategoryMForm.controls[controlName].hasError(errorName);
  }
  currentDate():Date{
    return new Date();
  }

}
