import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/service/data.service'
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
declare const changePassword: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('processFlow', { static: true }) processFlow: TemplateRef<any>;
  @ViewChild('resetPasswordModal', { static: true }) resetPasswordModal: TemplateRef<any>;
  user_name: any;
  dialogRef: any;
  constructor(private dataService: DataService, private outSideService: OutsideServicesService,  private modalService: NgbModal) { }
  schoolProfile: any;
  teacherList:any;
  changePaswordForm: FormGroup;
  verifiedCOunt:any;
  notInitiatedCount:any;
  teacherPendingCount:any;
  schoolPendingCount:any;
  schoolInitiated:any;
  totalTeachers:any;
  nonTeachingStaff:any;
  teachingStaff:any;
  kvCode:any;
  kvSchoolDetails:any;
  stationNameCode:any;
  stationCode:any;
  kvNameCode:any;
  udiseSchCode:any;
  schName:any;
  stationName:any;
  permanentEmpNonTch:any;
  contractualEmpNonTch:any;
  permanentEmpTch:any;
  contractualEmpTch:any;
  otherEmpTch:any;
  otherEmpNonTch:any;
  businessUnitTypeId: any;

  nonTeachingMale: any;
  nonTeachingFemale: any;
  teachingMale: any;
  teachingFemale: any;

  shiftAvailable: any;

  ngOnInit(): void {
    this.user_name = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
    setTimeout(() => {
      this.changePaswordForm.patchValue({
        userId:this.user_name
      })
    }, 100)
    const  data = {
      userId:this.user_name
    }
    debugger
    this.outSideService.checkPasswordChanged(data).subscribe((res)=>{
      if(res.status==1){  
        this.dialogRef = this.modalService.open(this.resetPasswordModal, {  backdrop: 'static', keyboard: false,
          }, );
      }
     console.log(res);
    })

    if(sessionStorage.getItem('displayPopUp') == 'true' && JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id !='2'){
      // this.modalService.open(this.processFlow, { size: 'xl', backdrop: 'static', keyboard: false })
    }

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      if (JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].business_unit_type_id == 5) {
        if (JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].application_id == environment.applicationId) {
          // alert(JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].business_unit_type_code)
          const data: any = {
            "extcall": "MOE_EXT_MAPPINGDATA",
            "conditionvalue": [JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].business_unit_type_code]
          }
          this.getMaster(data, this.businessUnitTypeId);
        }
      }
    }
    this.changePaswordForm = new FormGroup({
      'userId': new FormControl(''),
      'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8), this.checkConfirmPassword.bind(this)])
    })
    // this.getSchoolDetailsByKvCode();



  }
  // userIdCheck(event) {
  //   var userIdTemp = event.target.value;
  //   if (userIdTemp == JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name) {

  //   } else {
  //     this.changePaswordForm.patchValue({
  //       userId: ''
  //     })

  //     Swal.fire(
  //       'Incorrect User Id !',
  //       'Please re-enter again',
  //       'error'
  //     )
  //   }
  // }

  checkConfirmPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      if (this.changePaswordForm.value.newPassword != control.value) {
        return { 'passwordNotSame': true }
      }
    }
    return null;
  }
  onSubmit() {
    debugger
    var res = changePassword(this.user_name, this.changePaswordForm.value.oldPassword, this.changePaswordForm.value.newPassword, this.changePaswordForm.value.confirmPassword);
   console.log(res)
    if(res=="Password Changed successfully"){
      this.dialogRef.close();
    }
      Swal.fire(
        '',
        res,
      )
   
  }

  // getSchoolProfile() {
  //   this.dataService.getSchoolProfileByUdiseCode('01010100101').subscribe(res => {


  //     this.schoolProfile = res.data.result;

  

  //   },
  //     error => {
  //       // this.ngxLoader.stop();
  //     })
  // }

  getMaster(data, business_unit_type_id) {
// alert("called get master");
    this.outSideService.getMasterData(data).subscribe((res) => {
      var data1 = { 'business_unit_type_id': business_unit_type_id, "mappingData": JSON.parse(JSON.stringify(res.response)).rowValue }
      sessionStorage.setItem("mappingData", JSON.stringify(data1));
      this.kvSchoolDetails = JSON.parse(JSON.stringify(res.response)).rowValue[0];
      this.shiftAvailable = JSON.parse(JSON.stringify(res.response)).rowValue[0].shift_yn;
      sessionStorage.setItem('shiftYn', JSON.parse(JSON.stringify(res.response)).rowValue[0].shift_yn)
      sessionStorage.setItem('shiftAvailable',this.shiftAvailable)
      this.getKvTeacherByUdiseCode();
      
    })
  }
 
  getKvTeacherByUdiseCode() {

    
    this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code;
    this.outSideService.getKvTeacherByUdiseCode(this.kvCode).subscribe((res) => {
      
      this.teacherList = res.response;

      this.teacherPendingCount = 0;
      this.verifiedCOunt = 0;
      this.schoolPendingCount = 0;
      this.notInitiatedCount = 0;
      this.schoolInitiated = 0;
      this.teachingStaff = 0;
      this.nonTeachingStaff = 0;
      this.permanentEmpNonTch = 0;
      this.contractualEmpNonTch = 0;
      this.permanentEmpTch = 0;
      this.contractualEmpTch = 0;
      this.otherEmpNonTch = 0;
      this.otherEmpTch = 0;

      this.nonTeachingMale = 0;
      this.nonTeachingFemale = 0;
      this.teachingMale = 0;
      this.teachingFemale = 0;


      


      this.totalTeachers = this.teacherList.length;


      for(let i=0; i<this.teacherList.length; i++){
        
        if(this.teacherList[i].teachingNonteaching == "1"){
          this.teachingStaff = this.teachingStaff + 1;

          if(this.teacherList[i].teacherGender == '1'){
            this.teachingMale = this.teachingMale + 1;
          }else if(this.teacherList[i].teacherGender == '2'){
            this.teachingFemale = this.teachingFemale + 1;
          }

          if(this.teacherList[i].natureOfAppointment == "1"){
            this.permanentEmpTch = this.permanentEmpTch + 1;
          }else if(this.teacherList[i].natureOfAppointment == "2"){
            this.contractualEmpTch = this.contractualEmpTch + 1;
          }else if(this.teacherList[i].natureOfAppointment != "1" || this.teacherList[i].natureOfAppointment != "2"){
            this.otherEmpTch = this.otherEmpTch + 1;
          }         
        }
        if(this.teacherList[i].teachingNonteaching == "2"){
          this.nonTeachingStaff = this.nonTeachingStaff + 1;

          if(this.teacherList[i].teacherGender == '1'){
            this.nonTeachingMale = this.nonTeachingMale + 1;
          }else if(this.teacherList[i].teacherGender == '2'){
            this.nonTeachingFemale = this.nonTeachingFemale + 1;
          }
          
          if(this.teacherList[i].natureOfAppointment == "1"){
            this.permanentEmpNonTch = this.permanentEmpNonTch + 1;
          }else if(this.teacherList[i].natureOfAppointment == "2"){
            this.contractualEmpNonTch = this.contractualEmpNonTch + 1;
          }else if(this.teacherList[i].natureOfAppointment != "1" || this.teacherList[i].natureOfAppointment != "2"){
            this.otherEmpNonTch = this.otherEmpNonTch + 1;
          } 
        }

        if(this.teacherList[i].finalStatus == null || this.teacherList[i].finalStatus == "null" || this.teacherList[i].finalStatus == ""){
          this.notInitiatedCount = this.notInitiatedCount+1;
        }else if(this.teacherList[i].finalStatus == "TI"){
          this.teacherPendingCount = this.teacherPendingCount+1;
        }else if(this.teacherList[i].finalStatus == "TA" || this.teacherList[i].finalStatus == "SE" || this.teacherList[i].finalStatus == "SES"){
          this.schoolPendingCount = this.schoolPendingCount+1;
        }else if(this.teacherList[i].finalStatus == "SA"){
          this.verifiedCOunt = this.verifiedCOunt+1;
        }else if(this.teacherList[i].finalStatus == "SI"){
          this.schoolInitiated = this.schoolInitiated+1;
        }
        
      }
      // this.setToMatTable(response);
    })
  }

  // getSchoolDetailsByKvCode() {
  //   this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((response) => {
  //     this.kvSchoolDetails = response;
  
  //     for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
  //       this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
  //       this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
  //       this.stationCode = this.kvSchoolDetails.rowValue[i].station_code

  //       this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
  //       this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";

  //       this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
  //       this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
  //       this.stationName = this.kvSchoolDetails.rowValue[i].station_name;

  //     }
  //   })
  // }


}
