import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-kvs-surplus-listing',
  templateUrl: './kvs-surplus-listing.component.html',
  styleUrls: ['./kvs-surplus-listing.component.css']
})
export class KvsSurplusListingComponent implements OnInit {

  teacherSurplusForm:FormGroup;

  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService) { }

  ngOnInit(): void {
    this.teacherSurplusForm = new FormGroup({
      'detailsOfPosting': new FormArray([]),
    })

    this.getUniversalSurplus();


  }


  getUniversalSurplus(){
    var data = {
      "udisecode":JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code
    }
    this.outSideService.getUniversalSurplus(data).subscribe((res)=>{
      
      for(let i=0; i<res.response.length; i++){
        this.addQuantity(res.response[i])
      }
    })
  }




    //Add and Remove Posting Form --Start
  detailsOfPosting(): FormArray {
    return this.teacherSurplusForm.get("detailsOfPosting") as FormArray
  }
  newQuantity(data): FormGroup {

    // currentUdiseSchCode,accademicYear,lastPromotionId,lastPromotionPositionType,workExperienceAppointedForSubject,noOfsanctionPost

    if (data != undefined) {
      return this.fb.group({
        currentUdiseSchCode: data.currentUdiseSchCode,
        schoolName: data.schoolName,
        accademicYear: (new Date()).getFullYear(),
        lastPromotionPositionType: data.lastPromotionPositionType,
        organizationTeacherTypeName: data.organizationTeacherTypeName,
        workExperienceAppointedForSubject: data.workExperienceAppointedForSubject,
        subjectName: data.subjectName,
        noOfExistingStaff: data.noOfExistingStaff,
        noOfSanctionPost:'',
        surplusCount: '',
        vacantCount: ''
        // teacherId: data.teacherId,
        // workExperienceId: data.workExperienceId,
        // shiftType: data.shiftType,
        // groundForTransfer: data.groundForTransfer,
        // currentlyActiveYn: data.currentlyActiveYn,
        // udiseSchoolName: [data.udiseSchoolName, [Validators.required]],
        // udiseSchCode: [data.udiseSchCode, [Validators.required]],
        // workStartDate: [data.workStartDate, [Validators.required]],
        // workEndDate: [data.workEndDate, [Validators.required]],
        // natureOfAppointment: [data.natureOfAppointment, [Validators.required]],
        // positionType: [data.positionType, [Validators.required]],
        // appointedForSubject: [data.appointedForSubject, [Validators.required]],
      })
    } else {
      return this.fb.group({
        currentUdiseSchCode: JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code,
        accademicYear: (new Date()).getFullYear(),
        lastPromotionPositionType:'',
        organizationTeacherTypeName: '',
        workExperienceAppointedForSubject: '',
        subjectName: '',
        noOfExistingStaff: '',
        noOfSanctionPost:'',
        surplusCount: '',
        vacantCount: ''
        // teacherId: this.tempTeacherId,
        // workExperienceId: '',
        // shiftType: '',
        // groundForTransfer: '',
        // currentlyActiveYn: '',
        // udiseSchoolName: ["", [Validators.required]],
        // udiseSchCode: ["", [Validators.required]],
        // workStartDate: ["", [Validators.required]],
        // workEndDate: ["", [Validators.required]],
        // natureOfAppointment: ["", [Validators.required]],
        // positionType: ["", [Validators.required]],
        // appointedForSubject: ["", [Validators.required]],
      })
    }

  }
  addQuantity(data) {
    this.detailsOfPosting().push(this.newQuantity(data));
  }
  removeQuantity(val) {
    
    let deletedData = this.teacherSurplusForm.value.detailsOfPosting[val]
    var data = {
      "workExperienceId": deletedData.workExperienceId
    }

    // if (this.workExpId == data.workExperienceId) {
    //   Swal.fire(
    //     'Alert !',
    //     'This record cannot be deleted !',
    //     'error'
    //   )
    // } else {
    //   this.detailsOfPosting().removeAt(val)
    //   this.outSideService.deleteExpByWorkExpId(data).subscribe((response) => {
    //     if (response) {
    //       Swal.fire(
    //         'This record has been deleted !',
    //         '',
    //         'success'
    //       )
    //     }
    //   })
    // }



    // this.detailsOfPosting().removeAt();
  }




  // getTchExpByTchId() {
    
  //   (this.teacherForm.controls['detailsOfPosting'] as FormArray).clear();
  //   this.tchExpList = [];
  //   if (this.tempTeacherId) {
  //     this.outSideService.fetchTchExpByTchId(this.tempTeacherId).subscribe((res) => {
    
  //       this.tchExpList = res.response;
  //       for (let i = 0; i < this.tchExpList.length; i++) {
  //         var data = {
  //           "applicationId": this.applicationId,
  //           "teacherTypeId": this.tchExpList[i].positionType
  //         }
  //         this.getSubjectByTchTypeExp(data, i)
  //         this.addQuantity(this.tchExpList[i])
  //         this.tempTeacherId = this.tchExpList[i].teacherId;
  //       }
  //       for (let i = 0; i < this.tchExpList.length; i++) {
  //         if (this.tchExpList[i].workExperienceId == this.workExpId) {
  //           ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('workEndDate').disable();
  //           ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('groundForTransfer').disable();
  //           // ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('workStartDate').disable();
  //           // ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('natureOfAppointment').disable();
  //           // ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('positionType').disable();
  //           // ((this.teacherForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('appointedForSubject').disable();
  //         }
  //       }

  //       // if (this.tchExpList.length <= 0) {
  //       //   this.addQuantity("undefind");
  //       // }
  //     })
  //   } else {
  //     // this.addQuantity("undefind");
  //   }

  // }



  //Add and Remove Posting Form --Start 


  calculateSurplusCount(event, i){
    
    var noOfExistingStaff = ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('noOfExistingStaff').value
    var surplusC = (noOfExistingStaff*1 - event.target.value*1)
    if(surplusC > 0){
      ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('surplusCount').patchValue(surplusC);
      ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('vacantCount').patchValue(0);
    }else if(surplusC < 0){
      ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('vacantCount').patchValue(surplusC*-1);
      ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('surplusCount').patchValue(0);
    }else{
      ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('surplusCount').patchValue(0);
      ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('vacantCount').patchValue(0);
    }
    
    // ((this.teacherSurplusForm.get('detailsOfPosting') as FormArray).at(i) as FormGroup).get('surplusCount').patchValue('');
  }

  onSubmit(event: Event) {
    
    var activeButton = document.activeElement.id;
    
    if(activeButton == 'submit6'){
      this.outSideService.saveSurplusDataBySchool(this.teacherSurplusForm.value.detailsOfPosting).subscribe((res)=>{
        
      })
    }
  }

}
