import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kv-tch-sanctioned-post',
  templateUrl: './kv-tch-sanctioned-post.component.html',
  styleUrls: ['./kv-tch-sanctioned-post.component.css']
})
export class KvTchSanctionedPostComponent implements OnInit {

  constructor(private outSideService: OutsideServicesService, private fb: FormBuilder) { }

  sanctionedPost: FormGroup;

  kvCode: any;
  businessUnitTypeCode: any;
  udiseSchoolCode: any;
  stationList: any;
  kvSchoolList: any;
  stationCode1: any;
  regionCode: any;
  regionList: any;
  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  responseData: any;
  shiftAvailable: boolean = false;
  totalSanctionedPost:number = 0;
  totalSurplusPost:number = 0;
  totalOccupiedPost:number = 0;
  totalVacantPost:number = 0;


  ngOnInit(): void {
    this.sanctionedPost = new FormGroup({
      'sanctionedPostDetails': new FormArray([])
    })
    this.getKvRegion();
  }

  //Sanction Post Details Form Data Filling Start
  sanctionedPostDetails(): FormArray {
    return this.sanctionedPost.get("sanctionedPostDetails") as FormArray
  }
  newQuantity(data): FormGroup {
    this.shiftAvailable = data.shiftYn == 1 ? true : data.shiftYn == 2 ? true : false;
    return this.fb.group({
      id: data?.id,
      kvCode: data?.kvCode,
      kvName: data?.kvName,
      positionSubjectMapId: data?.positionSubjectMapId,
      regionCode: data?.regionCode,
      regionName: data?.regionName,
      shiftYn: data?.shiftYn,
      stationCode: data?.stationCode,
      stationName: data?.stationName,
      subjectId: data?.subjectId,
      teacherTypeId: data?.teacherTypeId,
      teacherTypeName: data?.teacherTypeName,
      udiseSchCode: data?.udiseSchCode,

      organizationTeacherTypeName: data?.organizationTeacherTypeName,
      orgTeacherTypeCode: data?.orgTeacherTypeCode,
      subjectName: data?.subjectName,
      subjectCode: data?.subjectCode,
      sanctionedPost: [data.sanctionedPost > 0 ? data.sanctionedPost : 0, [Validators.required, Validators.min(0), Validators.max(500), Validators.pattern("[0-9]*$")]],
      occupiedPost: [data.occupiedPost > 0 ? data.occupiedPost : 0, [Validators.required, Validators.min(0), Validators.max(500), Validators.pattern("[0-9]*$")]],
      vacantPost: [data.vacantPost > 0 ? data.vacantPost : 0],
      surplusPost: [data.surplusPost > 0 ? data.surplusPost : 0]

    })
  }

  addQuantity(data) {
    this.sanctionedPostDetails().push(this.newQuantity(data));
  }

  //Getting kv region master
  getKvRegion() {
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response;
    })
  }

  //Getting Station List by region Id
  getStationByRegionId(val) {
    this.outSideService.fetchStationByRegionId(val).subscribe((res) => {
      this.stationList = res.response;
    })
  }

  //Getting School Details by Station id
  getKvSchoolByStationId(val) {
    this.outSideService.fetchKvSchoolByStationCode(val).subscribe((res) => {
      this.kvSchoolList = res.response;
      this.stationCode1 = res.response[0].stationCode;
      this.regionCode = res.response[0].regionCode;
    })
  }

  onSchoolSelect(val) {
    this.udiseSchoolCode = val;
    this.getSanctionedData(this.udiseSchoolCode);
  }

  getSanctionedData(udiseCode) {
    this.outSideService.fetchSanctionedData(udiseCode).subscribe((res) => {
      this.responseData = res.response;
      this.kvCode = this.responseData[0]?.kvCode;
      this.setDataToSanctionedArray(this.responseData)
    })
  }

  setDataToSanctionedArray(data) {
    (this.sanctionedPost.controls['sanctionedPostDetails'] as FormArray).clear();
    for (let i = 0; i < data.length; i++) {
      this.totalSanctionedPost += data[i].sanctionedPost
      this.totalVacantPost += data[i].vacantPost
      this.totalOccupiedPost += data[i].occupiedPost
      this.totalSurplusPost += data[i].surplusPost
      this.addQuantity(data[i])
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

  onSubmit() {

    if(this.sanctionedPost.valid){
      this.outSideService.saveSanctionedFormData(this.sanctionedPost.value.sanctionedPostDetails).subscribe((res) => {
        Swal.fire(
          'Saved',
          '',
          'success'
        )
      })
    }else{
      Swal.fire(
        'Invalid form',
        '',
        'error'        
      )
    }
    
    
  }

}
