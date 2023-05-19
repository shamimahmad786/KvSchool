import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sanctioned-post',
  templateUrl: './sanctioned-post.component.html',
  styleUrls: ['./sanctioned-post.component.css']
})
export class SanctionedPostComponent implements OnInit {
  sanctionedPost:FormGroup;
  schoolCode:any='';
  data: any;
  isEdit: boolean;
  regionList: any=[];
  stationList: any=[];
  schoolList:any=[];
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  responseData: any;
  shiftAvailable: boolean = false;
  totalSanctionedPost:number = 0;
  totalSurplusPost:number = 0;
  totalOccupiedPost:number = 0;
  totalVacantPost:number = 0;
  ngOnInit(): void {
    this.getRegionList();
    this.buildSanctionForm();
  }
  buildSanctionForm(){
    this.sanctionedPost = this.fb.group({
      'sanctionedPostDetails': new FormArray([]),
      'schoolCode':['',Validators.required],
    });

  }
  getRegionList(){
    this.outSideService.fetchRegionList().subscribe((res)=>{
      if(res.length>0){
        res.forEach(element => {
          if(element.isActive==true){
            this.regionList.push(element)
          }
        });
      }
    })
  }
  getSanctionPostList(schoolCode){
    this.schoolCode=schoolCode.value;
    this.sanctionedPost.get('schoolCode').setValue(schoolCode.value);
    let request={
      schoolCode:schoolCode.value,
    }
    this.outSideService.schoolCodeExistOrNot(request).subscribe((res)=>{
      console.log(res)
      this.data='';
      this.totalSanctionedPost = 0;
      this.totalSurplusPost = 0;
      this.totalOccupiedPost = 0;
      this.totalVacantPost = 0;
      if(res.message=="ENTRY-NOT-FOUND"){
        let req={}
        this.outSideService.fetchSubjectPostMapping(req).subscribe((res)=>{
          console.log(res)
        this.isEdit=false;
        this.setDataToSanctionedArray(res.content)
        })
      }else{
        this.outSideService.fetchSanctionPostList(request).subscribe((res)=>{
          console.log(res)
          this.isEdit=true;
          this.setDataToSanctionedArray(res.content)
          });
      }

    },
    error => {
      console.log(error);
      this.data='';
      this.totalSanctionedPost = 0;
      this.totalSurplusPost = 0;
      this.totalOccupiedPost = 0;
      this.totalVacantPost = 0;
    })

  }
  onSubmit(){
    if (this.sanctionedPost.invalid) {
     this.sanctionedPost.markAllAsTouched();
    }else{
       console.log(this.sanctionedPost.value);
       this.data=this.sanctionedPost.value.sanctionedPostDetails;
       let sanctionedPostRequestVo2Data=[];
       
       if(!this.isEdit){
        this.data.forEach(element => {
          sanctionedPostRequestVo2Data.push({
          schoolCode:this.schoolCode,
          staffTypeId:element.staffTypeId,  
          postId:element.postId,
          subjectId:element.subjectId,
          sanctionedPost:element.sanctionedPost,
          occupiedPost:element.occupiedPost,
          vacant:element.vacantPost,
          surplus:element.surplusPost
          })
        });
       }else{
         //update case
        this.data.forEach(element => {
          sanctionedPostRequestVo2Data.push({
          sanctionedPost:element.sanctionedPost,
          occupiedPost:element.occupiedPost,
          vacant:element.vacantPost,
          surplus:element.surplusPost,
          sactionedPostId:element.sanctionedPostid,
          })
        });
       }

      if (sanctionedPostRequestVo2Data.length > 0 && this.isEdit == false) {
        let request = {
          sanctionedPostRequestVo2: sanctionedPostRequestVo2Data
        }
        this.outSideService.saveSanctionedData(request).subscribe((res) => {
          if (res == "SUCCESS") {
            Swal.fire(
              'Sanction-Post Save Successfully!',
              '',
              'success'
            );
     
          }
        })
      } 
      if(sanctionedPostRequestVo2Data.length > 0 && this.isEdit == true){
        //update case
        let request = {
          listOfSanctionedPostUpdateRequestVo: sanctionedPostRequestVo2Data
        }
        this.outSideService.updateSanctionedData(request).subscribe((res) => {
          console.log(res)
          if (res == "SUCCESS") {
            Swal.fire(
              'Sanction-Post Updated Successfully!',
              '',
              'success'
            )
          }
        })
      }

    }
  }

  //Sanction Post Details Form Data Filling Start
  sanctionedPostDetails(): FormArray {
    return this.sanctionedPost.get("sanctionedPostDetails") as FormArray
  }
  setDataToSanctionedArray(data) {
    (this.sanctionedPost.controls['sanctionedPostDetails'] as FormArray).clear();
    for (let i = 0; i < data.length; i++) {
      this.totalSanctionedPost += (data[i].sanctionedPost)?data[i].sanctionedPost:0;
      this.totalVacantPost += (data[i].vacant)?data[i].vacant:0;
      this.totalOccupiedPost += (data[i].occupiedPost)?data[i].occupiedPost:0;
      this.totalSurplusPost += (data[i].surplus)?data[i].surplus:0;
      this.addQuantity(data[i])
    }
    if(this.totalSanctionedPost>this.totalOccupiedPost){
      this.totalVacantPost=this.totalSanctionedPost-this.totalOccupiedPost;
    }else{
      this.totalSurplusPost=this.totalOccupiedPost-this.totalSanctionedPost;
    }
  }
  addQuantity(data) {
    this.sanctionedPostDetails().push(this.newQuantity(data));
  }
  newQuantity(data): FormGroup {
    return this.fb.group({
      staffType:data?.staffType,
      postName:data?.postName,
      postCode:data?.postCode,
      subjectName: data?.subjectName,
      subjectCode: data?.subjectCode,
      sanctionedPost: [data.sanctionedPost > 0 ? data.sanctionedPost : 0, [Validators.required, Validators.min(0), Validators.max(500), Validators.pattern("[0-9]*$")]],
      occupiedPost: [data.occupiedPost > 0 ? data.occupiedPost : 0, [Validators.required, Validators.min(0), Validators.max(500), Validators.pattern("[0-9]*$")]],
      vacantPost: [data.vacant > 0 ? data.vacant : 0],
      surplusPost: [data.surplus > 0 ? data.surplus : 0],
      postId:data?.postId,
      staffTypeId:data?.staffTypeId,
      subjectId:data?.subjectId,
      sanctionedPostid:data?.sanctionedPostid,

    })
  }
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  calculateVacantPost(event, i, type) {
    if (event.target.value >= 0) {
      var vacantPost = 0;
      if (type == 'O' && (((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').valid)) {
        var noOfSanctionedPost = ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').value;
        vacantPost = (noOfSanctionedPost*1 - event.target.value*1);
        if(vacantPost < 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue((vacantPost*(-1)));
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }else if(vacantPost > 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(vacantPost);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
        }else{
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }
      } else if (type == 'S' && (((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').valid)) {
        var noOfOccupiedPost = ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').value
        vacantPost = (event.target.value*1 - noOfOccupiedPost);
        if(vacantPost < 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue((vacantPost*(-1)));
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }else if(vacantPost > 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(vacantPost);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
        }else{
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }    
      }else{
        if (type == 'O') {
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue('');
        } else if (type == 'S') {
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue('');
        }
      }
    } else {
      if (type == 'O') {
        ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').patchValue('');
      } else if (type == 'S') {
        ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').patchValue('');
      }
    }
    this.totalCount();
  }
  totalCount(){
    this.totalSanctionedPost = 0;
    this.totalVacantPost = 0;
    this.totalOccupiedPost = 0;
    this.totalSurplusPost = 0;

    var formValuesArray = (this.sanctionedPost.get('sanctionedPostDetails') as FormArray).value;
    for(let i=0; i<formValuesArray.length; i++){
      if(!isNaN(formValuesArray[i].sanctionedPost)){
        this.totalSanctionedPost += formValuesArray[i].sanctionedPost;
      }
      if(!isNaN(formValuesArray[i].vacantPost)){
        this.totalVacantPost += formValuesArray[i].vacantPost;
      }
      if(!isNaN(formValuesArray[i].occupiedPost)){
        this.totalOccupiedPost += formValuesArray[i].occupiedPost;
      }
      if(!isNaN(formValuesArray[i].surplusPost)){
        this.totalSurplusPost += formValuesArray[i].surplusPost;
      }
    }
  }
  getStationList(regionId){
    let request = {
      regionCode: regionId.value
    }
    this.outSideService.searchRegionStationMList(request).subscribe((res) => {
      if (res.content.length > 0) {
        res.content.forEach(element => {
          this.stationList.push(element)
        });
      }
    })
       
  }
  getSchoolList(stationCode){
   let request={
     stationCode:stationCode.value
   }
   this.outSideService.searchSchoolStationMList(request).subscribe((res)=>{
     if (res.content.length > 0) {
      res.content.forEach(element => {
        this.schoolList.push(element)
      });
    }
   })
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }



}
