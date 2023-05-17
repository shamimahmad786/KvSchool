import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-kvs-teacher-profile',
  templateUrl: './kvs-teacher-profile.component.html',
  styleUrls: ['./kvs-teacher-profile.component.css']
})
export class KvsTeacherProfileComponent implements OnInit {

  kvsTeacherBasicProfile:FormGroup;
  allowEdit: any;
  singleKvTeacher = {"teacherName":"", "postCode":"", "subjectCode":"", "teacherEmployeeCode":"", "presentStationCode":"",
  "presentKvCode":"", "teacherDob":"",  "dojPresentPost":"", "dojPresentStnPresentPost":"", "dojPresentKvPresentPost":"", "teacherGender":"", "teacherId":""};
 genderMale:any;
 genderFemale:any;
 genderOther:any;

  kvsDbData = {
    "teacherId": "",
    "teacherName": "",
    "teacherGender": "",
    "teacherDob": "",
    "teacherEmployeeCode": "",
    "teacherSocialCategory": "",
    "teacherMobile": "",
    "teacherEmail": "",
    "teacherReligion": "",
    "teacherNationality": "",
    "teacherBloodGroup": "",
    "teacherPermanentAddress": "",
    "teacherParmanentState": "",
    "teacherPermanentDistrict": "",
    "teacherPermanentPin": "",
    "teacherCorrespondenceAddress": "",
    "teacherCorrespondenceState": "",
    "teacherCorrespondenceDistrict": "",
    "teacherCorrespondencePin": "",
    "teacherPersonnelIdentification": "",
    "teacherPanNumber": "",
    "teacherAadhaarNumber": "",
    "teacherPassportNumber": "",
    "teacherDisabilityYn": "",
    "teacherDisabilityType": "",
    "teacherDisabilityFromBirthYn": "",
    "teacherDisabilityDate": "",
    "teacherDisabilityPrcnt": "",
    "teacherDisabilityCertAuthority": "",
    "teacherDisabilityCertNumber": "",
    "teacherTempId": "",
    "teacherSystemGeneratedCode": "",
    "currentUdiseSchCode": "",
    "schoolId": "",
    "teacherAccountId": "",
    "workExperiencePositionTypePresentKv": "",
    "workExperienceWorkStartDatePresentKv": "",
    "workExperienceIdPresentKv": "",
    "workExperiencePositionTypePresentStationStartDate": "",
    "lastPromotionId": "",
    "lastPromotionDate": "",
    "workExperienceAppointedForSubject": ""
}

  constructor(private outSideService: OutsideServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(window.location.href.includes("?allowEdit=")){
      this.route.queryParams.subscribe((queryParams: Params)=>{
        this.allowEdit = queryParams['allowEdit'];
        if(this.allowEdit == 0){
          this.allowEdit = false;
        }else if(this.allowEdit == 1){
          this.allowEdit = true;
        }else if(this.allowEdit == 3){
          this.onNewEntry();
        }
        
        if(sessionStorage.getItem('singleKvTeacher') != null){
          this.singleKvTeacher = JSON.parse(sessionStorage.getItem('singleKvTeacher'))
          if(this.singleKvTeacher.teacherGender=='1'){
            
            this.genderMale=1
          }else if(this.singleKvTeacher.teacherGender=='2'){
            this.genderFemale=1
          }else{
          this.genderOther=1;
          }
        }
      })
    }

    this.kvsTeacherBasicProfile = new FormGroup({
      'teacherName': new FormControl(''),
      'teacherId': new FormControl(''), 
      'subjectCode': new FormControl(''), 
      'empCode': new FormControl(''), 
      'presentStationCode': new FormControl(''), 
      'presentKvCode': new FormControl(''), 
      'dob': new FormControl(''), 
      'gender': new FormControl(''), 
      'dojKvsPresentPost': new FormControl(''),
      'dojPresentStationPresentPost': new FormControl(''),
      'dojKvPresentPost': new FormControl(''),
      'postCode': new FormControl('')
    })
  }

  onSubmit(){
    this.kvsTeacherBasicProfile.patchValue({
      teacherId: this.singleKvTeacher.teacherId
    })   
    
    this.kvsDbData.teacherName = this.kvsTeacherBasicProfile.value.teacherName
    // this.kvsDbData.subjectCode = this.kvsTeacherBasicProfile.value.subjectCode
    // // this.kvsDbData.shiftType = this.kvsTeacherBasicProfile.value
    // this.kvsDbData.presentStationCode = this.kvsTeacherBasicProfile.value.presentStationCode
    // this.kvsDbData.presentKvCode = this.kvsTeacherBasicProfile.value.presentKvCode
    // this.kvsDbData.postCode = this.kvsTeacherBasicProfile.value.postCode
    // // this.kvsDbData.mobile = this.kvsTeacherBasicProfile.valu
    // this.kvsDbData.gender = this.kvsTeacherBasicProfile.value.gender
    this.kvsDbData.teacherEmployeeCode = this.kvsTeacherBasicProfile.value.empCode
    // // this.kvsDbData.email = this.kvsTeacherBasicProfile.value
    // this.kvsDbData.dojPresentStnPresentPost = this.kvsTeacherBasicProfile.value.dojPresentStationPresentPost
    // this.kvsDbData.dojPresentPost = this.kvsTeacherBasicProfile.value.dojKvsPresentPost
    // this.kvsDbData.dojPresentKvPresentPost = this.kvsTeacherBasicProfile.value.dojKvPresentPost
    // this.kvsDbData.dob = this.kvsTeacherBasicProfile.value.dob
    this.kvsDbData.teacherId = this.kvsTeacherBasicProfile.value.teacherId
    
    this.outSideService.saveKvTeacher(this.kvsDbData).subscribe((response)=>{
      
    })
  }

  updateDOB(dateObject) {
    const stringified = dateObject.value.ToString()
    const dob = stringified.substring(1, 11);
  }

  onNewEntry() {
    sessionStorage.removeItem('singleKvTeacher')    
    this.allowEdit = true;
  }

}
