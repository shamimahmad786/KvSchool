
import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import * as moment from 'moment';
import { DataService } from 'src/app/service/data.service'
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { FormDataService } from 'src/app/teacherEntryForm/service/internalService/form-data.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { TeacherTransferPdfService } from '../makePdf/teacher-transfer-pdf.service';

declare const loadScroller12: any;
declare const onNextClick: any;

@Component({
  selector: 'app-kvs-transfer-edit',
  templateUrl: './kvs-transfer-edit-updated.component.html',
  styleUrls: ['./kvs-transfer-edit.component.css']
})
export class KvsTransferEditComponent implements OnInit {

  @ViewChild('selectSchoolModal', { static: true }) selectSchoolModal: TemplateRef<any>;
  @ViewChild('selectSchoolModalInterStation', { static: true }) selectSchoolModalInterStation: TemplateRef<any>;

  transferForm: FormGroup;

  showMe: boolean = true
  responseDataTransfer: any = {}
  sh: any;
  gkFile: any;
  gkFile11: any;
  gkFile12: any;
  gkFilebenefit: boolean = false;
  gkFilemMedical: boolean = false;
  spGround: boolean = false;
  dfpGround: boolean = false;
  boardExam: boolean = false;
  careGiver: boolean = false;
  abledChild: boolean = false;
  isChecked: boolean = true;
  panelOpenState = false;
  disabled  = true;
  step = 0;
  tempTeacherId: any;
  isCheckedNew: any;
  proceed: boolean;
  teacherTypeData: any;
  teacherTypeDataNameCode: any;
  stationList: any;
  showTcField: boolean = false;
  empTransferradioButton:any;
  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  kvCode: any;
  existingTransferId: any;

  subjectList: any;
  subjectListNameCode: any;

  stateMasterList: any;
  noAward: boolean = false;
  regionalAward: boolean = false;
  nationalAward: boolean = false;
  presidentAward: boolean = false;

  responseData: any;
  appG1: any;
  appG2: any;

  showStationChoice18B: boolean = false;
  showStationChoice18C: boolean = false;
  showStationChoice18: boolean = false;
  show18BOption: boolean = false;
  show18COption: boolean = false;
  profileData: any;
  districListByStateIdP: any;
  teacherExperienceData: any;

  kvSchoolList: any;
  kvSchoolList1: any = [];
  kvSchoolList2: any = [];
  kvSchoolList3: any = [];
  kvSchoolList4: any = [];

  kvSchoolListP1: any;
  kvSchoolListP2: any;
  kvSchoolListP3: any;
  kvSchoolListP4: any;
  kvSchoolListP5: any;
  showMe11: boolean = true;

  regionList: any;
  selectedUdiseCode: any;
  position: any;

  sameStationSchool1: any;
  sameStationSchool2: any;
  sameStationSchool3: any;
  sameStationSchool4: any;
  sameStationSchool5: any;

  absence1: number = 0;
  absence2: number = 0;
  totalWorkingDaysF: number = 0;
  totalWorkingDaysTC: number = 0;
  show18BOptionCheckBox = null;
  spouseAtSmaeStation: boolean = false;
  spouseAtCentralGovt: boolean = false;
  spouseAtStateGovt: boolean = false;
  wooomanEmp: boolean = false;
  disableShiftType: boolean = false;
  preferenceStationList: any = [];
  preferenceSchoolList: any;
  reponseDataForPdf: any;

  absenceTc: number = 0;
  transfer5b: boolean = true;
  transfer7b: boolean = true;
  documentUploadArray: any[] = [];
  enableUploadButton0: boolean = false;
  enableUploadButton1: boolean = false;
  enableUploadButton2: boolean = false;
  enableUploadButton3: boolean = false;
  enableUploadButton5: boolean = false;
  enableUploadButton6: boolean = false;
  enableUploadButton7: boolean = false;
  enableUploadButton8: boolean = false;

  deleteDocUpdate0: boolean = true;
  deleteDocUpdate1: boolean = true;
  deleteDocUpdate2: boolean = true;
  deleteDocUpdate3: boolean = true;
  deleteDocUpdate5: boolean = true;
  deleteDocUpdate6: boolean = true;
  deleteDocUpdate7: boolean = true;
  deleteDocUpdate8: boolean = true;
  fromStatus: any;

  employeeType: any = "Regular"
  transferApplicationNumberVal: any;
  enableTransferFormYn: boolean = true;
  enableTransferFormYnVal: any;
  transferStatusOperation: any;

  memJCM: boolean = false;
  formStatusLocale: any;

  formDataList: any;
  transferGroundList: any

  imageData: any;

  disableLTR: boolean = false;
  disableDFP: boolean = false;
  disableMDG: boolean = false;
  disableSP: boolean = false;
  disableWidow: boolean = false;

  transferStatus:any=1;
  transferRelatedFormTempId: any;
  responseTcDcData: any;
  totaldaysPresent: any;
  spouseStationName: any;
  dcStayAtStation: any;
  dcPeriodAbsence: any;
  dcReturnStation: any;
  tcSpouseAtSmaeStation: boolean;
  tcSpouseAtCentralGovt: boolean;
  tcSpouseAtStateGovt: boolean;
  tcWooomanEmp: boolean;
  totaldaysPresentTc: number;
  tcStayAtStation: any;
  tcPeriodAbsence: any;
  tcReturnStation: any;


  constructor(private transferPdfService: TeacherTransferPdfService, private date: DatePipe, private formData: FormDataService, private dataService: DataService, private outSideService: OutsideServicesService, private fb: FormBuilder, private modalService: NgbModal) {
    loadScroller12();
  }

  nextClick(index) {
    onNextClick(index);
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStep() {
    this.step++;
  }
  // appraisalAvg() {
  //   var appG1Value = 0;
  //   var appG2Value = 0;
  //   var total = 0;
  //   if (this.appG1 * 1 >= 0 && this.appG1 * 1 <= 3.9 || this.appG2 * 1 >= 0 && this.appG2 * 1 <= 3.9) {

  //     if (this.appG1 != null && this.appG1 * 1 >= 0 && this.appG1 * 1 <= 3.9) {
  //       appG1Value = 2;
  //     }
  //     if (this.appG2 != null && this.appG2 * 1 >= 0 && this.appG2 * 1 <= 3.9) {
  //       appG2Value = 2;
  //     }

  //     var total = (appG1Value * 1 + appG2Value * 1)

  //     if (total < 5) {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           q2DPt: total
  //         }
  //       })
  //     }
  //   } else {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q2DPt: 0
  //       }
  //     })
  //   }
  //   this.appraisalAvgT();
  // }

  // appraisalAvgT() {

  //   var appG1ValueT = 0;
  //   var appG2ValueT = 0;
  //   var totalT = 0;
  //   if (this.appG1 * 1 >= 8 || this.appG2 * 1 >= 8) {

  //     if (this.appG1 != null && this.appG1 * 1 >= 8) {
  //       appG1ValueT = 2;
  //     }
  //     if (this.appG2 != null && this.appG2 * 1 >= 8) {
  //       appG2ValueT = 2;
  //     }

  //     var totalT = (appG1ValueT * 1 + appG2ValueT * 1)

  //     if (totalT < 5) {
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           q2TPt: totalT
  //         }
  //       })
  //     }
  //   } else {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q2TPt: 0
  //       }
  //     })
  //   }
  // }

  // pHEmployee(val) {
  //   if (val == '1') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q9DPt: -60
  //       }
  //     })
  //   } else if (val == '0') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q9DPt: 0
  //       }
  //     })
  //   }
  // }

  // associatedMember(val) {
  //   if (val == '1') {
  //     this.memJCM = true;
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q10DPt: -25
  //       },
  //       declaration: {
  //         memberJCM: '1'
  //       },
  //       transferCount: {
  //         associationMemberYnT: '1'
  //       }
  //     })
  //   } else if (val == '2') {
  //     this.memJCM = true;
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q10DPt: -25
  //       },
  //       declaration: {
  //         memberJCM: '1'
  //       },
  //       transferCount: {
  //         associationMemberYnT: '2'
  //       }
  //     })
  //   } else if (val == '0') {
  //     this.memJCM = false;
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q10DPt: 0
  //       },
  //       declaration: {
  //         memberJCM: '0'
  //       },
  //       transferCount: {
  //         associationMemberYnT: '3'
  //       }
  //     })
  //   }
  // }

  // prevStep() {
  //   this.step--;
  // }
  // toogleTag() {
  //   this.showMe = !this.showMe
  // }
  // showMe1: boolean = true
  // toogleTag1() {
  //   this.showMe1 = !this.showMe1
  // }
  // showMe2: boolean = true
  // toogleTag2() {
  //   this.showMe2 = !this.showMe2
  // }
  // showMe3: boolean = true
  // toogleTag3() {
  //   this.showMe3 = !this.showMe3
  // }
  // showMe4: boolean = true
  // toogleTag4() {
  //   this.showMe4 = !this.showMe4
  // }
  // showMe5: boolean = true
  // toogleTag5() {
  //   this.showMe5 = !this.showMe5
  // }
  // showMe6: boolean = true
  // toogleTag6() {
  //   this.showMe6 = !this.showMe6
  // }
  // showMe7: boolean = true
  // toogleTag7() {
  //   this.showMe7 = !this.showMe7
  // }
  // showMe8: boolean = true
  // toogleTag8() {
  //   this.showMe8 = !this.showMe8
  // }
  // showMe9: boolean = true
  // toogleTag9() {
  //   this.showMe9 = !this.showMe9
  // }
  // showMe10: boolean = true
  // toogleTag10() {
  //   this.showMe10 = !this.showMe10
  // }
  // toogleTag11() {
  //   this.showMe11 = !this.showMe11
  // }

  ngOnInit(): void {

    this.formDataList = this.formData.formData();
    this.transferGroundList = this.formDataList.transferGround;
    this.fromStatus = sessionStorage.getItem('finalStatus')
    this.disableShiftType = ((sessionStorage.getItem('shiftYn')) == '0') ? true : false;
    this.tempTeacherId = sessionStorage.getItem('tempTchId')
    
    this.getAllMaster();
    this.getStateMaster();

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      
     // this.getSchoolDetailsByKvCode();
    }
    this.setTcDcReceivedData();

    setTimeout(function () {
      loadScroller12();
    }, 1000);

    this.transferForm = new FormGroup({
      // basicDetails: new FormGroup({
      //   'teacherName': new FormControl,
      //   'teacherEmployeeCode': new FormControl,
      //   'teacherDob': new FormControl,
      //   'teacherParmanentState': new FormControl,
      //   'teacherGender': new FormControl,
      //   'teacherPermanentDistrict': new FormControl,
      //   'lastPromotionPositionType': new FormControl,
      //   'lastPromotionPositionDate': new FormControl,
      //   'workExperiencePositionTypePresentStationStartDate': new FormControl,
      //   'workExperienceWorkStartDatePresentKv': new FormControl,
      //   'presentStationName': new FormControl,
      //   'currentSchoolName': new FormControl,
      //   'workExperienceAppointedForSubject': new FormControl,
      //   'natureOfAppointment': new FormControl,
      //   'teacherId': new FormControl
      // }),
      stationChoice: new FormGroup({
        'applyTransferYn': new FormControl('', Validators.required),
     //   'id':new FormControl(''),
       // 'transferStatus':new FormControl(''),
        'teacherId':new FormControl(''),
        'choiceKv1StationCode':  new FormControl,
        'choiceKv2StationCode':  new FormControl,
        'choiceKv3StationCode':  new FormControl,
        'choiceKv4StationCode':  new FormControl,
        'choiceKv5StationCode':  new FormControl,
        'choiceKv1StationName': new FormControl('', Validators.required),
        'choiceKv2StationName': new FormControl('', Validators.required),
        'choiceKv3StationName': new FormControl('', Validators.required),
        'choiceKv4StationName': new FormControl('', Validators.required),
        'choiceKv5StationName': new FormControl('', Validators.required)
        // 'displacement1StationCode': new FormControl,
        // 'displacement2StationCode': new FormControl,
        // 'displacement3StationCode': new FormControl,
        // 'displacement4StationCode': new FormControl,
        // 'displacement5StationCode': new FormControl,
        // 'displacement1StationName': new FormControl('', Validators.required),
        // 'displacement2StationName': new FormControl,
        // 'displacement3StationName': new FormControl,
        // 'displacement4StationName': new FormControl,
        // 'displacement5StationName': new FormControl
      }),
      displacementCount: new FormGroup({
        'kvCode': new FormControl(),
        'teacherId': new FormControl(),
        'transferId': new FormControl(),
        'teacherEmployeeCode': new FormControl(),
        //'workExperiencePositionTypePresentStationStartDate': new FormControl(), //1
       // 'presentStationName': new FormControl(), //1
       // 'presentStationCode': new FormControl(), //1
        'dcStayStationPoint': new FormControl(),//1
       // 'teacherDob': new FormControl,//3    
        //'hardStationWorkStartDate': new FormControl(), //3
       // 'hardStationWorkEndDate': new FormControl(), //3
        'dcTenureHardPoint': new FormControl(),//3
        'dcPhysicalChallengedPoint': new FormControl(),//3     
        'dcMdDfGroungPoint': new FormControl(),   
        'dcLtrPoint': new FormControl(),//5   
        'dcSinglePoint': new FormControl(),//6
        'dcSpousePoint': new FormControl(),//6    
        'dcRjcmNjcmPoint': new FormControl(),//7        
        'dcTotalPoint': new FormControl(),
      }),
      transferCount: new FormGroup({
        'kvCode': new FormControl(),
        'teacherId': new FormControl(),
        'transferId': new FormControl(),
        'teacherEmployeeCode': new FormControl(),
      //  'workExperiencePositionTypePresentStationStartDate': new FormControl(), //1
      //  'presentStationName': new FormControl(), //1
       // 'presentStationCode': new FormControl(), //1
        'tcStayStationPoint': new FormControl(),//1
       // 'teacherDob': new FormControl,//3    
       // 'hardStationWorkStartDate': new FormControl(), //3
        //'hardStationWorkEndDate': new FormControl(), //3
        'tcTenureHardPoint': new FormControl(),//3
        'tcPhysicalChallengedPoint': new FormControl(),//3     
        'tcMdDfGroungPoint': new FormControl(),   
        'tcLtrPoint': new FormControl(),//5   
        'tcSinglePoint': new FormControl(),//6
        'tcSpousePoint': new FormControl(),//6    
        'tcRjcmNjcmPoint': new FormControl(),//7        
        'tcTotalPoint': new FormControl(),
      }),
      // declaration: new FormGroup({
      //   'spouseKvsYnD': new FormControl(),
      //   'personalStatusMdgD': new FormControl(),
      //   'personalStatusSpD': new FormControl(),
      //   'personalStatusDfpD': new FormControl(),
      //   'memberJCM': new FormControl(),
      //   'child_10_12_ynD': new FormControl(),
      //   'careGiverYnD': new FormControl(),
      //   'childDifferentAbleYnD': new FormControl(),

      //   'spouseEmpCode': new FormControl(''),
      //   'spousePost': new FormControl(''),
      //   'spouseStationName': new FormControl(''),

      //   'patientName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      //   'patientAilment': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      //   'patientHospital': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      //   'patientMedicalOfficerName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      //   'patientMedicalOfficerDesignation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),

      //   'child_10_12_name': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
      //   'child_10_12_class': new FormControl('', Validators.required),
      //   'child_10_12_school': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
      //   'child_10_12_board': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),

      //   'careGiverName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      //   'careGiverRelation': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
      //   'careGiverDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
      //   'careGiverDisabilityPrcnt': new FormControl('', [Validators.required, Validators.maxLength(3), Validators.min(0), Validators.max(100), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),

      //   'childDifferentName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z ]*$")]),
      //   'childDifferentDisabilityName': new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern("^[A-Za-z0-9 ]*$")]),
      //   'childDifferentDisabilityPrcnt': new FormControl('', [Validators.required, Validators.min(0), Validators.max(100), Validators.maxLength(3), RxwebValidators.numeric({ allowDecimal: true, isFormat: true })]),
      // }),
      // 'previousPostingDetails': new FormArray([]),
    })
    this.getTransferProfile();
  }

  //Add Posting Form --Start
  // previousPostingDetails(): FormArray {
  //   return this.transferForm.get("previousPostingDetails") as FormArray
  // }
  // newQuantity(data): FormGroup {
  //   return this.fb.group({
  //     teacherId: data.teacherId,
  //     workExperienceId: data.workExperienceId,
  //     stationName: data.stationName,
  //     udiseSchoolName: [data.udiseSchoolName, [Validators.required]],
  //     kvCode: [data.kvCode, [Validators.required]],
  //     workStartDate: [data.workStartDate, [Validators.required]],
  //     workEndDate: [data.workEndDate, [Validators.required]],
  //     natureOfAppointment: [data.natureOfAppointment, [Validators.required]],
  //     positionType: [data.positionType, [Validators.required]],
  //     stationType: [data.stationType, [Validators.required]],
  //     groundForTransfer: [data.groundForTransfer],
  //     shiftType: [data.shiftType, [Validators.required]],
  //     udiseSchCode: [data.udiseSchCode]
  //   })
  // }
  // addQuantity(data) {
  //   this.previousPostingDetails().push(this.newQuantity(data));
  // }

  //Add Posting Form --Start

  // getTransferBasicProfileByTchId() {
  //   debugger
  //   this.outSideService.fetchTransferBasicProfileByTchId(this.tempTeacherId).subscribe((res) => {

  //     this.profileData = res.response.profileDetails
  //     this.responseData = res.response.profileDetails;
  //     this.reponseDataForPdf = this.responseData

  //     this.teacherExperienceData = res.response.teacherExperience;
  //     this.transferStatusOperation = res.response.profileDetails.transferStatus;
  //     this.formStatusLocale = res.response.profileDetails.transferStatus;
  //     this.spouseStationName=res.response.profileDetails.spouseStationName;

  //     if (this.responseData.hasOwnProperty('transferApplicationNumber')) {
  //       this.transferApplicationNumberVal = this.responseData?.transferApplicationNumber;
  //     } else {
  //       this.transferApplicationNumberVal = 'Transfer Not Initiated';
  //     }


  //     if ((this.responseData.tpersonalStatusLtr == null || this.responseData.tpersonalStatusLtr == undefined) && (this.responseData.tpersonalStatusDfp == null || this.responseData.tpersonalStatusDfp == undefined) &&
  //       (this.responseData.tpersonalStatusMdg == null || this.responseData.tpersonalStatusMdg == undefined) && (this.responseData.tpersonalStatusWid == null
  //         || this.responseData.tpersonalStatusWid == undefined) && (this.responseData.tpersonalStatusSp == null || this.responseData.tpersonalStatusSp == undefined)) {

  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatus: '1',
  //           personalStatusDefault: '1'
  //         }
  //       })
  //     }

  //     setTimeout(() => {
  //       this.getDistrictByStateId(this.profileData.teacherParmanentState)
  //     }, 300);

  //     this.setTcDcReceivedData(this.responseData)
  //     this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
  //       this.documentUploadArray = res;

  //       for (let i = 0; i < res.length; i++) {

  //         if (res[i].docName == 'Medical_Certificate.pdf') {
  //           this.deleteDocUpdate0 = false;
  //         }
  //         if (res[i].docName == 'Board_examination_Proof.pdf') {
  //           this.deleteDocUpdate1 = false;
  //         }
  //         if (res[i].docName == 'Disability_Certificate.pdf') {
  //           this.deleteDocUpdate2 = false;
  //         }
  //         if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
  //           this.deleteDocUpdate3 = false;
  //         }
  //       }
  //     })
  //   })
  // }
  setTcDcReceivedData()
  {
    debugger
    const data = {
           "kvCode":this.kvCode,
           "teacherId": this.tempTeacherId
       }
         this.outSideService.fetchTcDcData(data).subscribe((res) => {
          console.log("tc dc res school")
console.log(res)
         this.responseTcDcData=res;
         this.totaldaysPresent=this.responseTcDcData.dcStayAtStation+this.responseTcDcData.dcReturnStation-this.responseTcDcData.dcPeriodAbsence
         this.totaldaysPresentTc=this.responseTcDcData.tcStayAtStation-this.responseTcDcData.tcPeriodAbsence
         this.dcStayAtStation =this.responseTcDcData.dcStayAtStation,
         this.dcPeriodAbsence =this.responseTcDcData.dcPeriodAbsence,
         this.dcReturnStation=this.responseTcDcData.dcReturnStation,
         this.tcStayAtStation =this.responseTcDcData.tcStayAtStation,
         this.tcPeriodAbsence =this.responseTcDcData.tcPeriodAbsence,
         this.tcReturnStation=this.responseTcDcData.tcReturnStation,
         this.transferForm.patchValue({
          displacementCount: {
            kvCode:this.kvCode,
            teacherId:this.tempTeacherId,
            dcStayStationPoint: this.responseTcDcData.dcStayStationPoint,
            dcTenureHardPoint: this.responseTcDcData.dcTenureHardPoint,
            dcPhysicalChallengedPoint: this.responseTcDcData.dcPhysicalChallengedPoint,
            dcMdDfGroungPoint: this.responseTcDcData.dcMdDfGroungPoint,
            dcLtrPoint: this.responseTcDcData.dcLtrPoint,
            dcRjcmNjcmPoint: this.responseTcDcData.dcRjcmNjcmPoint,
            dcTotalPoint: this.responseTcDcData.dcTotalPoint
          },
        })
        this.transferForm.patchValue({
          transferCount: {
            kvCode:this.kvCode,
            teacherId:this.tempTeacherId,
            tcStayStationPoint: this.responseTcDcData.tcStayStationPoint,
            tcTenureHardPoint: this.responseTcDcData.tcTenureHardPoint,
            tcPhysicalChallengedPoint: this.responseTcDcData.tcPhysicalChallengedPoint,
            tcMdDfGroungPoint: this.responseTcDcData.tcMdDfGroungPoint,
            tcLtrPoint: this.responseTcDcData.tcLtrPoint,
            tcRjcmNjcmPoint: this.responseTcDcData.tcRjcmNjcmPoint,
            tcTotalPoint: this.responseTcDcData.tcTotalPoint
          },
        })
        this.canculateDcPoint();
        this.canculateTcPoint();
    })

    
}

canculateDcPoint()
{
  if(this.responseTcDcData.dcSinglePoint=='-12')
        {
          this.transferForm.patchValue({
            displacementCount: {
              dcSinglePoint: this.responseTcDcData.dcSinglePoint
            },
          })
        }
        else{
          this.transferForm.patchValue({
            displacementCount: {
              dcSpousePoint: this.responseTcDcData.dcSpousePoint
            },
          })
          if(this.responseTcDcData.dcSpousePoint=='-10')
          {
            this.spouseAtSmaeStation=true;
          }
          if(this.responseTcDcData.dcSpousePoint=='-8')
          {
            this.spouseAtCentralGovt=true;
          }
          if(this.responseTcDcData.dcSpousePoint=='-6')
          {
            this.spouseAtStateGovt=true;
          }
          if(this.responseTcDcData.dcSpousePoint=='-4')
          {
            this.wooomanEmp=true;
          }
        
        }
}

canculateTcPoint()
{
  debugger
  if(this.responseTcDcData.tcSinglePoint=='20')
        {
          this.transferForm.patchValue({
            transferCount: {
              tcSinglePoint: this.responseTcDcData.tcSinglePoint
            },
          })
        }
        else{
          this.transferForm.patchValue({
            transferCount: {
              tcSpousePoint: this.responseTcDcData.tcSpousePoint
            },
          })
          if(this.responseTcDcData.tcSpousePoint=='15')
          {
            this.tcSpouseAtSmaeStation=true;
          }
          if(this.responseTcDcData.tcSpousePoint=='12')
          {
            this.tcSpouseAtCentralGovt=true;
          }
          if(this.responseTcDcData.tcSpousePoint=='10')
          {
            this.tcSpouseAtStateGovt=true;
          }
          if(this.responseTcDcData.tcSpousePoint=='8')
          {
            this.tcWooomanEmp=true;
          }
        
        }
}
  // getInitiatedTeacherDetails() {
  //   this.outSideService.fetchInitiateTeacherTransfer(this.tempTeacherId).subscribe((res) => {

  //     this.responseData = res.response;
  //     this.existingTransferId = this.responseData.transferApplicationNumber

  //   })
  // }


//   setReceivedData(setData) {
//     console.log("dfssssssssssssssssssssssssssss")
// console.log("setData")
//     const data = {
//       "applicationId": environment.applicationId,
//       "teacherTypeId": setData.lastPromotionPositionType
//     }
//     setTimeout(() => {
//       this.getSubjectByTchType(data);
//       if (this.kvSchoolList == "" || this.kvSchoolList == undefined) {
//         var intraStationCond = {
//           "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
//           "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
//         }
//         this.getKvSchoolByStationId(intraStationCond);
//       }

//     }, 300);

//     debugger
//     if (setData != null) {

//       sessionStorage.setItem('q5DPt', setData.q5DPt)
//       this.totalWorkingDaysTC = setData.numberOfWorkingDays;
//       this.absenceTc = setData.absenceDaysTcone;

//       sessionStorage.setItem('spouseStatus', setData.spouseStatus)
//       if (setData.spouseStatusTransfer == '1' || setData.spouseStatusTransfer == '2' || setData.spouseStatusTransfer == '3') {
//         if (setData?.stationWithin100km1 != '1' && setData?.stationWithin100km2 != '1' && setData?.stationWithin100km3 != '1' && setData?.stationWithin100km4 != '1' && setData?.stationWithin100km5 != '1') {
//           var temp_q4TPt = 0;
//           if (setData.teacherGender == '2' || setData.teacherGender == 2) {
//             var temp_q9TPt = '20';
//             var temp_unmarriedWomanYn = '4';
//           } else {
//             temp_q9TPt = setData.q9TPt;
//             temp_unmarriedWomanYn = setData.unmarriedWomanYn;
//           }
//         } else {
//           if (setData.spouseStatusTransfer == '1') {
//             temp_q4TPt = 50;
//             temp_q9TPt = '0';
//             temp_unmarriedWomanYn = '0';
//           } else if (setData.spouseStatusTransfer == '2') {
//             temp_q4TPt = 40;
//             temp_q9TPt = '0';
//             temp_unmarriedWomanYn = '0';
//           } else if (setData.spouseStatusTransfer == '3') {
//             temp_q4TPt = 30;
//             temp_q9TPt = '0';
//             temp_unmarriedWomanYn = '0';
//           }
//         }
//       } else if (setData.spouseStatusTransfer == '4') {
//         temp_q4TPt = setData.q4TPt;
//         temp_q9TPt = setData.q9TPt;
//         temp_unmarriedWomanYn = setData.unmarriedWomanYn;
//       } else if (setData.spouseStatusTransfer == '5') {
//         temp_q4TPt = setData.q4TPt;
//         temp_q9TPt = setData.q9TPt;
//         temp_unmarriedWomanYn = setData.unmarriedWomanYn;
//       }

//       sessionStorage.setItem('q9TPt', temp_q9TPt)
//       sessionStorage.setItem('unmarriedWomanYn', temp_unmarriedWomanYn)

//       if ((setData.personalStatusDfp == '1' || setData.personalStatusLtr == '1' || setData.personalStatusMdg == '1' || setData.personalStatusSp == '1' || setData.personalStatusWid == '1') && (setData.q6TPt == '50' || setData.q6TPt == 50)) {
//         temp_q9TPt = '0';
//         temp_unmarriedWomanYn = '0';
//       }

//       // if ((moment().diff(setData.teacherDob, 'years')) < 57) {
//       //   this.transferForm.get('displacementCount').get('personalStatusLtrDc').disable();
//       // }

//       if (setData.personalStatusLtr == '9' || ((moment().diff(setData.teacherDob, 'years')) < 57)) {
//         this.disableLTR = true;
//         this.transferForm.get('transferCount').get('personalStatusLtr').disable();
//       }
//       if (setData.personalStatusDfp == '9') {
//         this.disableDFP = true;
//         this.transferForm.get('transferCount').get('personalStatusDfp').disable();
//       }
//       if (setData.personalStatusMdg == '9') {
//         this.disableMDG = true;
//         this.transferForm.get('transferCount').get('personalStatusMdg').disable();
//       }
//       if (setData.personalStatusSp == '9') {
//         this.disableSP = true;
//         this.transferForm.get('transferCount').get('personalStatusSp').disable();
//       }
//       if (setData.personalStatusWid == '9') {
//         this.disableWidow = true;
//         this.transferForm.get('transferCount').get('personalStatusWid').disable();
//       }


//       if (setData.teacherDisabilityYn == '0') {
//         this.transfer7b = true;

//       } else {
//         this.transfer7b = false;
//       }

//       if (setData.applyTransferYn == '1') {
//         this.enableTransferFormYn = true;
//         this.enableTransferFormYnVal = '1'
//       } else if (setData.applyTransferYn == '0') {
//         this.enableTransferFormYn = false;
//         this.enableTransferFormYnVal = '0'
//       } else {
//         this.enableTransferFormYn = true;
//         this.enableTransferFormYnVal = ''
//       }

//       if (setData.q6TPt == '0' || setData.q6TPt == 0) {
//         this.transfer5b = true;
//       } else {
//         this.transfer5b = false;
//       }
//       if (setData.choiceKv1StationCode != null && setData.choiceKv1StationCode != "") {
//         this.preferenceStationList.push(setData.choiceKv1StationCode)
//       }
//       if (setData.choiceKv2StationCode != null && setData.choiceKv2StationCode != "") {
//         this.preferenceStationList.push(setData.choiceKv2StationCode)
//       }
//       if (setData.choiceKv3StationCode != null && setData.choiceKv3StationCode != "") {
//         this.preferenceStationList.push(setData.choiceKv3StationCode)
//       }
//       if (setData.choiceKv4StationCode != null && setData.choiceKv4StationCode != "") {
//         this.preferenceStationList.push(setData.choiceKv4StationCode)
//       }
//       if (setData.choiceKv5StationCode != null && setData.choiceKv5StationCode != "") {
//         this.preferenceStationList.push(setData.choiceKv5StationCode)
//       }
//       var finalList = {
//         "stationList": this.preferenceStationList,
//       }
//       this.schoolPreferenceListByStationCode(finalList);


//       if (setData.presidentAward == '1') {
//         this.presidentAward = true;
//         this.noAward = false;
//       }
//       if (setData.nationalAward == '1') {
//         this.nationalAward = true;
//         this.noAward = false;
//       }
//       if (setData.regionalAward == '1') {
//         this.regionalAward = true;
//         this.noAward = false;
//       }
//       if (setData.spouseKvsYnd == '1' || setData.spouseKvsYn == '1') {
//         this.gkFilebenefit = true

//       } if (setData?.personalStatusMdgD == '1' || setData?.personalStatusMdg == '1') {
//         this.gkFilemMedical = true

//       } if (setData?.personalStatusSpD == '1' || setData?.personalStatusSp == '1') {
//         this.spGround = true

//       } if (setData?.personalStatusDfpD == '1' || setData?.personalStatusDfp == '1') {
//         this.dfpGround = true

//       } if (setData?.associationMemberYn == '1' || setData?.associationMemberYn == '2') {
//         this.memJCM = true

//       } if (setData?.childDifferentAbleYnD == '1' || setData?.childDifferentAbleYn == '1') {
//         this.abledChild = true

//       } if (setData?.child_10_12_yn == '1') {
//         this.boardExam = true

//       } if (setData?.child_10_12_yn == '0') {
//         this.boardExam = false

//       } if (setData?.careGiverYn == '1') {
//         this.careGiver = true

//       } if (setData?.childDifferentAbleYn == '1') {
//         this.abledChild = true
//       }
//       if (setData.presidentAward != '1' && setData.nationalAward != '1' && setData.regionalAward != '1') {
//         this.noAward = true;
//       }
//       if (setData.shiftChangeSameSchool == '2') {


//       }
//       if ((setData.choiceKv1UdiseCodePresentStation != null && setData.choiceKv1UdiseCodePresentStation != 'null'
//         && setData.choiceKv1UdiseCodePresentStation != '' || setData.choiceKv2UdiseCodePresentStation != null && setData.choiceKv2UdiseCodePresentStation != 'null'
//         && setData.choiceKv2UdiseCodePresentStation != '') || setData.shiftChangeSameSchool == '2') {

//         this.showStationChoice18B = true;

//       } if (setData.choiceKv1StationCode != null && setData.choiceKv1StationCode != 'null' &&
//         setData.choiceKv1StationCode != '' || setData.shiftChangeSameSchool == '3') {
//         this.showStationChoice18C = true;
//       }

//       if (setData.presidentAward == '1') {
//         var awardPoint = -6
//       } else if (setData.presidentAward == '1' && setData.nationalAward == '1' && setData.regionalAward == '1') {
//         var awardPoint = -6
//       } else if (setData.presidentAward != '1' && setData.nationalAward == '1' && setData.regionalAward == '1') {
//         var awardPoint = -6
//       } else if (setData.presidentAward != '1' && setData.nationalAward == '1' && setData.regionalAward != '1') {
//         var awardPoint = -4
//       } else if (setData.presidentAward != '1' && setData.nationalAward != '1' && setData.regionalAward == '1') {
//         var awardPoint = -2
//       } else {
//         var awardPoint = 0;
//       }
//     }

   

//     this.transferForm.patchValue({
//       basicDetails: {
//         teacherId: setData.teacherId,
//         teacherName: setData.teacherName,
//         teacherEmployeeCode: setData.teacherEmployeeCode,
//         teacherDob: setData.teacherDob,
//         teacherParmanentState: setData.teacherParmanentState,
//         teacherPermanentDistrict: setData.teacherPermanentDistrict,
//         teacherGender: setData.teacherGender,
//         lastPromotionPositionType: setData.lastPromotionPositionType,
//         lastPromotionPositionDate: setData.lastPromotionPositionDate,
//         workExperiencePositionTypePresentStationStartDate: setData.workExperiencePositionTypePresentStationStartDate,
//         workExperienceWorkStartDatePresentKv: setData.workExperienceWorkStartDatePresentKv,
//         workExperienceAppointedForSubject: setData.workExperienceAppointedForSubject,
//         natureOfAppointment: setData.natureOfAppointment
//       },
//       stationChoice: {
//         id: setData.id,  
//         applyTransferYn: setData.applyTransferYn,    
//         choiceKv1StationCode: setData.choiceKv1StationCode,
//         choiceKv2StationCode: setData.choiceKv2StationCode,
//         choiceKv3StationCode: setData.choiceKv3StationCode,
//         choiceKv4StationCode: setData.choiceKv4StationCode,
//         choiceKv5StationCode: setData.choiceKv5StationCode,
//         displacement1StationCode: setData.displacement1StationCode,
//         displacement2StationCode: setData.displacement2StationCode,
//         displacement3StationCode: setData.displacement3StationCode,
//         displacement4StationCode: setData.displacement4StationCode,
//         displacement5StationCode: setData.displacement5StationCode,      
//         choiceKv1StationName: setData.choiceKv1StationName,
//         choiceKv2StationName: setData.choiceKv2StationName,
//         choiceKv3StationName: setData.choiceKv3StationName,
//         choiceKv4StationName: setData.choiceKv4StationName,
//         choiceKv5StationName: setData.choiceKv5StationName,
//         displacement1StationName: setData.displacement1StationName,
//         displacement2StationName: setData.displacement2StationName,
//         displacement3StationName: setData.displacement3StationName,
//         displacement4StationName: setData.displacement4StationName,
//         displacement5StationName: setData.displacement5StationName,
//       },
//       displacementCount: {
//       //  numberOfWorkingDays: setData.numberOfWorkingDays,//1
//       //  absenceDaysOne: setData.absenceDaysOne,//1
//        // absenceDaysTwo: setData.absenceDaysTwo,//1
//       //  actualNumberOfWorkingDays: setData.actualNumberOfWorkingDays,//1
//         workExperiencePositionTypePresentStationStartDate: setData?.workExperiencePositionTypePresentStationStartDate, //1
//         presentStationName: setData.presentStationName, //1
//         presentStationCode: setData.presentStationCode, //1
//         q1DPt: setData.q1DPt,//1
//        // apprGradeYr1: setData.apprGradeYr1, //2
//        // apprGrade1: setData.apprGrade1, //2
//       //  apprGradeYr2: setData.apprGradeYr2, //2
//        // apprGrade2: setData.apprGrade2, //2
//         q2DPt: setData.q2DPt,//2
//         teacherDob: setData?.teacherDob,//3
//         hardStationCode: setData.hardStationCode, //3
//         hardStationName: setData.hardStationName, //3
//         hardStationWorkStartDate: setData?.hardStationWorkStartDate, //3
//         hardStationWorkEndDate: setData?.hardStationWorkEndDate, //3
//        // q3DYn: setData.q3DYn, //3
//         q3DPt: setData.q3DPt,//3
//        // personalStatus: '1', //4
//        // personalStatusLtrDc: setData.personalStatusLtrDc, //4
//      //   personalStatusDfpDc: setData.personalStatusDfpDc,//4
//      //   personalStatusMdgDc: setData.personalStatusMdgDc, //4
//      //   personalStatusWidDc: setData.personalStatusWidDc, //4
//      //   personalStatusSpDc: setData.personalStatusSpDc, //4
//         q4DPt: setData.q4DPt, //4
//         //spouseStatus: setData.spouseStatus, //5
//        // spouseKvsYn: setData.spouseKvsYn, //5
//       //  spouseStateGvotYn: setData.spouseStateGvotYn, //5
//      //   spouseCentralGvotYn: setData.spouseCentralGvotYn, //5
//         unmarriedWomanYn: (setData.unmarriedWomanYn == '4') ? '4' : '0', //5
//       //  spouseNa: setData.spouseNa,
//         q5DPt: setData.q5DPt,//5
//        // teacherDisabilityYn: setData.teacherDisabilityYn,//6
//         q9DPt: setData.q9DPt,//6
//      //   associationMemberYn: setData.associationMemberYn, //7  
//         q10DPt: setData.q10DPt,//7 
//       //  presidentAward: setData.presidentAward, //8
//        // nationalAward: setData.nationalAward, //8
//        // regionalAward: setData.regionalAward, //8
//         q11DPt: awardPoint,//8
//        // child_10_12_yn: setData.child_10_12_yn, //9
//         q12DPt: setData.q12DPt,//9
//       //  careGiverYn: setData.careGiverYn,  //10
//         q13DPt: setData.q13DPt,//10
//         totalDisplacementCount: setData.totalDisplacementCount,
//       //  stationWithin100kmDispYn: setData?.stationWithin100kmDispYn,
//      //   spouseStatusDisplacement: setData?.spouseStatusDisplacement,

//         personalStatusDefaultDc: ((setData.personalStatusLtrDc == null || setData.personalStatusLtrDc == undefined || setData.personalStatusLtrDc == "9") &&
//           (setData.personalStatusDfpDc == null || setData.personalStatusDfpDc == undefined || setData.personalStatusDfpDc == "9") &&
//           (setData.personalStatusMdgDc == null || setData.personalStatusMdgDc == undefined || setData.personalStatusMdgDc == "9") &&
//           (setData.personalStatusWidDc == null || setData.personalStatusWidDc == undefined || setData.personalStatusWidDc == "9") &&
//           (setData.personalStatusSpDc == null || setData.personalStatusSpDc == undefined || setData.personalStatusSpDc == "9")) ? '1' : null
//       },
//       transferCount: {
//         applyTransferYn: setData.applyTransferYn,
//         numberOfWorkingDays: setData.numberOfWorkingDays,
//         absenceDaysOne: setData.absenceDaysOne,
//         absenceDaysTwo: setData.absenceDaysTwo,
//         absenceDaysTcone: setData.absenceDaysTcone,
//         actualNumberOfWorkingTcdays: setData.actualNumberOfWorkingTcdays,
//         workExperiencePositionTypePresentStationStartDate: setData?.workExperiencePositionTypePresentStationStartDate,
//         presentStationName: setData.presentStationName,
//         presentStationCode: setData.presentStationCode,
//         q1TPt: setData.q1TPt,
//         apprGradeYr1: setData.apprGradeYr1,
//         apprGrade1: setData.apprGrade1,
//         apprGradeYr2: setData.apprGradeYr2,
//         apprGrade2: setData.apprGrade2,
//         q2TPt: setData.q2TPt,
//         presidentAward: setData.presidentAward,
//         nationalAward: setData.nationalAward,
//         regionalAward: setData.regionalAward,
//         q3TPt: setData.q3TPt,
//         spouseStatusTransfer: setData.spouseStatusTransfer,
//         tSpouseStatus: setData.spouseStatus,
//         spouseKvsYn: setData.spouseKvsYn,
//         spouseStateGvotYn: setData.spouseStateGvotYn,
//         spouseCentralGvotYn: setData.spouseCentralGvotYn,
//         unmarriedWomanYn: (temp_unmarriedWomanYn == '4') ? '4' : '0',
//         spouseNa: setData.spouseNa,
//         q4TPt: temp_q4TPt,
//         personalStatusLtr: setData.personalStatusLtr,
//         personalStatusDfp: setData.personalStatusDfp,
//         personalStatusMdg: setData.personalStatusMdg,
//         personalStatusWid: setData.personalStatusWid,
//         personalStatusSp: setData.personalStatusSp,
//         isLastTransferGroundPersonalStatusYn: setData.isLastTransferGroundPersonalStatusYn,
//         q6TPt: setData.q6TPt,
//         q6TYyn: setData.q6TYyn,
//         personalStatus: setData.personalStatus,
//         teacherDob: setData.teacherDob,
//         hardStationCode: setData.hardStationCode,
//         hardStationName: setData.hardStationName,
//         hardStationWorkStartDate: setData.hardStationWorkStartDate,
//         hardStationWorkEndDate: setData.hardStationWorkEndDate,
//         q9TPt: temp_q9TPt,
//         q7TPt: setData.q7TPt,
//         q7TYyn: setData.q7TYyn,
//         q8TPt: setData.q8TPt,
//         q8TYyn: setData.q8TYyn,
//         q10TPt: setData.q10TPt,
//         q10TYyn: setData.q10TYyn,
//         childDifferentAbleYn: setData.childDifferentAbleYn,
//         teacherDisabilityYnT: setData.teacherDisabilityYn,
//         isLastTransferGroundTeacherDisabilityYn: setData.isLastTransferGroundTeacherDisabilityYn,
//         associationMemberYnT: setData.associationMemberYn,
//         totalTransferCount: setData.totalTransferCount,
//         doptStationOneCode: setData.doptStationOneCode,
//         doptStationOneName: setData.doptStationOneName,
//         doptStationTwoCode: setData.doptStationTwoCode,
//         doptStationTwoName: setData.doptStationTwoName,

//         personalStatusDefault: ((setData.personalStatusLtr == null || setData.personalStatusLtr == undefined || setData.personalStatusLtr == "9") &&
//           (setData.personalStatusDfp == null || setData.personalStatusDfp == undefined || setData.personalStatusDfp == "9") &&
//           (setData.personalStatusMdg == null || setData.personalStatusMdg == undefined || setData.personalStatusMdg == "9") &&
//           (setData.personalStatusWid == null || setData.personalStatusWid == undefined || setData.personalStatusWid == "9") &&
//           (setData.personalStatusSp == null || setData.personalStatusSp == undefined || setData.personalStatusSp == "9")) ? '1' : null

//       },
//       declaration: {
//         spouseKvsYnD: setData.spouseKvsYnd,
//         personalStatusMdgD: setData.personalStatusMdg == '1' ? '1' : '0',
//         personalStatusSpD: setData.personalStatusSp == '1' ? '1' : '0',
//         personalStatusDfpD: setData.personalStatusDfp == '1' ? '1' : '0',
//         memberJCM: setData.associationMemberYn == '3' ? '0' : '1',
//         child_10_12_ynD: setData.child_10_12_yn,
//         careGiverYnD: setData.careGiverYn,
//         childDifferentAbleYnD: setData.childDifferentAbleYn,

//         spouseEmpCode: setData.spouseEmpCode,
//         spousePost: setData.spousePost,
//         spouseStationName: setData.spouseStationName,
//         patientName: setData.patientName,
//         patientAilment: setData.patientAilment,
//         patientHospital: setData.patientHospital,
//         patientMedicalOfficerName: setData.patientMedicalOfficerName,
//         patientMedicalOfficerDesignation: setData.patientMedicalOfficerDesignation,
//         child_10_12_name: setData.child1012Name,
//         child_10_12_class: setData.child1012Class,
//         child_10_12_school: setData.child1012School,
//         child_10_12_board: setData.child1012Board,
//         careGiverName: setData.careGiverName,
//         careGiverRelation: setData.careGiverRelation,
//         careGiverDisabilityName: setData.careGiverDisabilityName,
//         careGiverDisabilityPrcnt: setData.careGiverDisabilityPrcnt,
//         childDifferentName: setData.childDifferentName,
//         childDifferentDisabilityName: setData.childDifferentDisabilityName,
//         childDifferentDisabilityPrcnt: setData.childDifferentDisabilityPrcnt,
//       }
      
//     });




//     // (this.transferForm.controls['previousPostingDetails'] as FormArray).clear();

//     for (let i = 0; i < this.teacherExperienceData.length; i++) {
//       const tempExpData = JSON.parse(JSON.stringify(this.teacherExperienceData[i]))
//       if (tempExpData.workEndDate != null && tempExpData.workEndDate != "null") {
//         tempExpData.workEndDate = this.date.transform(new Date(tempExpData.workEndDate * 1), 'yyyy-MM-dd')
//       }
//       tempExpData.workStartDate = this.date.transform(new Date(tempExpData.workStartDate * 1), 'yyyy-MM-dd')
//       this.addQuantity(tempExpData)
//     }
//     this.getTransferProfile();
//   }

  getTransferProfile(){
    debugger
    if(this.tempTeacherId==null){
      this.transferForm.patchValue({
        stationChoice: {
          applyTransferYn: '0',

        }
      })
    }
    const data={"teacherId":this.tempTeacherId}
    debugger
    this.outSideService.getTransferData(data).subscribe((res) => { 
    if(res.response!=null || res.response=='')
    {
  this.transferForm.patchValue({
  stationChoice: {
  id:res.response.id,
  teacherId:res.response.teacherId,
  applyTransferYn:res.response.applyTransferYn,
  choiceKv1StationCode:res.response.choiceKv1StationCode,
  choiceKv2StationCode:res.response.choiceKv2StationCode,
  choiceKv3StationCode:res.response.choiceKv3StationCode,
  choiceKv4StationCode:res.response.choiceKv4StationCode,
  choiceKv5StationCode:res.response.choiceKv5StationCode,
  choiceKv1StationName:res.response.choiceKv1StationName,
  choiceKv2StationName:res.response.choiceKv2StationName,
  choiceKv3StationName:res.response.choiceKv3StationName,
  choiceKv4StationName:res.response.choiceKv4StationName,
  choiceKv5StationName:res.response.choiceKv5StationName,
  displacement1StationCode:res.response.displacement1StationCode,
  displacement1StationName:res.response.displacement1StationName,
  displacement2StationName:res.response.displacement2StationName,
  displacement2StationCode:res.response.displacement2StationCode,
  displacement3StationName:res.response.displacement3StationName,
  displacement3StationCode:res.response.displacement3StationCode,
  displacement4StationCode:res.response.displacement4StationCode,
  displacement4StationName:res.response.displacement4StationName,
  displacement5StationCode:res.response.displacement5StationCode,
  displacement5StationName:res.response.displacement5StationName,
    },
  
  })
  }
  debugger
  this.empTransferradioButton= res.response.applyTransferYn
  if(this.empTransferradioButton==null || this.empTransferradioButton==""){
   
  this.empTransferradioButton=0;
  this.disabled  = true;
  this.showTcField =true;
 }
 if(this.empTransferradioButton==1 || this.empTransferradioButton=='1'){

  this.empTransferradioButton=1;
  this.disabled  = false;
  this.showTcField =false;
 }
 if(this.empTransferradioButton==0 || this.empTransferradioButton=='0'){
 
  this.empTransferradioButton=0;
  this.disabled  = true;
  this.showTcField =true;
 }
})
  
  }

  // initiateTeacherTransfer() {


  //   if (this.responseData.hasOwnProperty('transferApplicationNumber')) {
  //     if (this.responseData?.transferApplicationNumber == null || this.responseData?.transferApplicationNumber == 'null'
  //       || this.responseData?.transferApplicationNumber == '') {

  //       this.outSideService.initiateTeacherTransfer(this.transferForm.value.previousPostingDetails).subscribe((res) => {
  //         this.responseData = res.response;
  //         this.transferStatusOperation = res.response.transferStatus;
  //         this.formStatusLocale = res.response.transferStatus;
  //         Swal.fire(
  //           'Your transfer application has been initiated!',
  //           'Application Number : ' + this.responseData.transferApplicationNumber,
  //           'success'
  //         )
  //       })
  //       this.getTransferBasicProfileByTchId();
  //     } else {
  //     }
  //   } else {
  //     this.outSideService.initiateTeacherTransfer(this.transferForm.value.previousPostingDetails).subscribe((res) => {

  //       this.responseData = res.response;
  //       this.transferStatusOperation = res.response.transferStatus;
  //       this.formStatusLocale = res.response.transferStatus;
  //       Swal.fire(
  //         'Your transfer application has been initiated!',
  //         'Application Number : ' + this.responseData.transferApplicationNumber,
  //         'success'
  //       )
  //       this.getTransferBasicProfileByTchId();

  //     })
  //   }
  // }

  // checkCheckBoxvalue(event) {
  //   this.proceed = event.checked;
  // }

  onSubmit(event: Event) {
    var activeButton = document.activeElement.id;

   if (activeButton == 'submit1') {
      debugger
      console.log(console.log(this.transferForm.value.stationChoice))
     
    //  this.responseData.transferStatus = 'TRE'
      this.transferForm.patchValue({
        stationChoice: {
          teacherId:this.tempTeacherId,
        }
      });
    //  return
      this.outSideService.saveStationChoice(this.transferForm.value.stationChoice).subscribe((res) => {
        if (res.status == 1) {   
         Swal.fire(
           'Your Data has been saved Successfully!',
           '',
           'success'
         )
       
         this.nextClick(2)
       }
     })
    } else if (activeButton == 'submit5') {
      this.outSideService.schoolTransferVerify(this.tempTeacherId).subscribe((res) => {
        if (JSON.parse(JSON.stringify(res)).status == 1) {   
         Swal.fire(
           'Transfer has been Verified',
           '',
           'success'
         )
       
       //  this.nextClick(2)
       }
     })
    }
    // } else if (activeButton == 'submit6') {

    //   this.responseData.spouseEmpCode = this.transferForm.value.declaration.spouseEmpCode
    //   this.responseData.spousePost = this.transferForm.value.declaration.spousePost
    //   this.responseData.spouseStation = this.transferForm.value.declaration.spouseStation
    //   this.responseData.patientName = this.transferForm.value.declaration.patientName
    //   this.responseData.patientAilment = this.transferForm.value.declaration.patientAilment
    //   this.responseData.patientHospital = this.transferForm.value.declaration.patientHospital
    //   this.responseData.patientMedicalOfficerName = this.transferForm.value.declaration.patientMedicalOfficerName
    //   this.responseData.patientMedicalOfficerDesignation = this.transferForm.value.declaration.patientMedicalOfficerDesignation
    //   this.responseData.child1012Name = this.transferForm.value.declaration.child_10_12_name
    //   this.responseData.child1012Class = this.transferForm.value.declaration.child_10_12_class
    //   this.responseData.child1012School = this.transferForm.value.declaration.child_10_12_school
    //   this.responseData.child1012Board = this.transferForm.value.declaration.child_10_12_board
    //   this.responseData.careGiverName = this.transferForm.value.declaration.careGiverName
    //   this.responseData.careGiverRelation = this.transferForm.value.declaration.careGiverRelation
    //   this.responseData.careGiverDisabilityName = this.transferForm.value.declaration.careGiverDisabilityName
    //   this.responseData.careGiverDisabilityPrcnt = this.transferForm.value.declaration.careGiverDisabilityPrcnt
    //   this.responseData.childDifferentName = this.transferForm.value.declaration.childDifferentName
    //   this.responseData.childDifferentDisabilityName = this.transferForm.value.declaration.childDifferentDisabilityName
    //   this.responseData.childDifferentDisabilityPrcnt = this.transferForm.value.declaration.childDifferentDisabilityPrcnt
    //   this.responseData.transferStatus = 'TRE'

    //   var submitDeclaration0: boolean;
    //   var submitDeclaration1: boolean;
    //   var submitDeclaration2: boolean;
    //   var submitDeclaration3: boolean;
    //   var submitDeclaration5: boolean;
    //   var submitDeclaration6: boolean;
    //   var submitDeclaration7: boolean;
    //   var submitDeclaration8: boolean;
    //   var submitDeclarationFinal: boolean;

    //   if (this.gkFilemMedical) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "Medical_Certificate.pdf" || this.documentUploadArray[i].docName == "Medical_Certificate") {
    //         submitDeclaration0 = true;
    //         break;
    //       } else {
    //         submitDeclaration0 = false;
    //       }
    //     }
    //   }
    //   if (this.boardExam) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "Board_examination_Proof.pdf" || this.documentUploadArray[i].docName == "Board_examination_Proof") {
    //         submitDeclaration1 = true;
    //         break;
    //       } else {
    //         submitDeclaration1 = false;
    //       }
    //     }
    //   }
    //   if (this.careGiver) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "Disability_Certificate.pdf" || this.documentUploadArray[i].docName == "Disability_Certificate") {
    //         submitDeclaration2 = true;
    //         break;
    //       } else {
    //         submitDeclaration2 = false;
    //       }
    //     }
    //   }
    //   if (this.abledChild) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "Differentially_Abled_Certificate.pdf" || this.documentUploadArray[i].docName == "Differentially_Abled_Certificate") {
    //         submitDeclaration3 = true;
    //         break;
    //       } else {
    //         submitDeclaration3 = false;
    //       }
    //     }
    //   }
    //   if (this.gkFilebenefit) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "Spouse_Declaration.pdf" || this.documentUploadArray[i].docName == "Spouse_Declaration") {
    //         submitDeclaration5 = true;
    //         break;
    //       } else {
    //         submitDeclaration5 = false;
    //       }
    //     }
    //   }
    //   if (this.spGround) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "Single_Parent_Declaration.pdf" || this.documentUploadArray[i].docName == "Single_Parent_Declaration") {
    //         submitDeclaration6 = true;
    //         break;
    //       } else {
    //         submitDeclaration6 = false;
    //       }
    //     }
    //   }
    //   if (this.dfpGround) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "DFP_Declaration.pdf" || this.documentUploadArray[i].docName == "DFP_Declaration") {
    //         submitDeclaration7 = true;
    //         break;
    //       } else {
    //         submitDeclaration7 = false;
    //       }
    //     }
    //   }
    //   if (this.memJCM) {
    //     for (let i = 0; i < this.documentUploadArray.length; i++) {
    //       if (this.documentUploadArray[i].docName == "NJCM_RJCM_Declaration.pdf" || this.documentUploadArray[i].docName == "NJCM_RJCM_Declaration") {
    //         submitDeclaration8 = true;
    //         break;
    //       } else {
    //         submitDeclaration8 = false;
    //       }
    //     }
    //   }
    //   if (submitDeclaration0 == false || submitDeclaration1 == false || submitDeclaration2 == false || submitDeclaration8 == false ||
    //     submitDeclaration3 == false || submitDeclaration5 == false || submitDeclaration6 == false || submitDeclaration7 == false) {
    //     submitDeclarationFinal = false;
    //   } else {
    //     submitDeclarationFinal = true;
    //   }

    //   if (submitDeclarationFinal) {

    //     this.outSideService.saveInitiatedTeacherTransfer(this.responseData).subscribe((res) => {

    //       this.responseData = res.response;
    //       this.transferStatusOperation = res.response.transferStatus;
    //       this.setReceivedData(this.responseData)
    //       this.formStatusLocale = 'TRE'
    //       Swal.fire(
    //         'Your transfer application has been submitted successfully !',
    //         this.responseData.transferApplicationNumber,
    //         'success'
    //       )
    //     })
    //   } else {
    //     Swal.fire(
    //       'Kindly upload the required documents !',
    //       '',
    //       'error'
    //     )
    //   }

    // }
  }

  getAllMaster() {
    this.outSideService.fetchAllMaster(6).subscribe((res) => {


      this.teacherTypeData = res.response.postionType;
      this.teacherTypeDataNameCode = [];
      for (let i = 0; i < this.teacherTypeData.length; i++) {
        var concatElement;
        concatElement = this.teacherTypeData[i].organizationTeacherTypeName;
        concatElement = concatElement + "(" + this.teacherTypeData[i].teacherTypeId + ")";
        var data = {
          'nameCode': concatElement,
          'teacherTypeId': this.teacherTypeData[i].teacherTypeId
        }
        this.teacherTypeDataNameCode.push(data)
      }

    })
  }

  getSpouseDetails(event) {
    this.outSideService.fetchSpouseByEmpCode(event.target.value).subscribe((res) => {


      this.transferForm.patchValue({
        declaration: {
          spouseStation: res.response?.stationName,
          spousePost: res.response?.workExperienceIdPresentKv,
        }
      })
    })
  }

  getSchoolDetailsByKvCode() {
    this.outSideService.fetchKvSchoolDetails(this.kvCode).subscribe((res) => {
      this.kvSchoolDetails = res.response;

      for (let i = 0; i < this.kvSchoolDetails.rowValue.length; i++) {
        this.stationNameCode = this.kvSchoolDetails.rowValue[i].station_name;
        this.stationNameCode = this.stationNameCode + "(" + this.kvSchoolDetails.rowValue[i].station_code + ")";
        this.stationCode = this.kvSchoolDetails.rowValue[i].station_code

        this.kvNameCode = this.kvSchoolDetails.rowValue[i].kv_name;
        this.kvNameCode = this.kvNameCode + "(" + this.kvSchoolDetails.rowValue[i].kv_code + ")";

        this.udiseSchCode = this.kvSchoolDetails.rowValue[i].udise_sch_code;
        this.schName = this.kvSchoolDetails.rowValue[i].kv_name;
        this.stationName = this.kvSchoolDetails.rowValue[i].station_name;

      }

      this.getKvSchoolByStationId(this.stationCode);

      this.transferForm.patchValue({
        basicDetails: {
          currentSchoolName: this.kvNameCode,
          presentStationName: this.stationNameCode,
        }
      })


    })
  }

  getSubjectByTchType(data) {

    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      this.subjectList = res.response.rowValue;

      this.subjectListNameCode = [];
      for (let i = 0; i < this.subjectList.length; i++) {
        var conElement;
        conElement = this.subjectList[i].subject_name;
        conElement = conElement + "(" + this.subjectList[i].subject_id + ")";
        var data = {
          'subNameCode': conElement,
          'subjectCode': this.subjectList[i].subject_id
        }
        this.subjectListNameCode.push(data);
      }
    })
  }

  getStateMaster() {
    this.outSideService.fetchStateMaster("a").subscribe((res) => {
      this.stateMasterList = res.response.rowValue;
    })
  }

  getDistrictByStateId(stateId) {
    this.outSideService.fetchDistrictByStateId(stateId).subscribe((res) => {
      this.districListByStateIdP = res.response.rowValue
    })
  }

  // updateSpouseValue(event) {
  //   var val = event.target.value
  //   if (val == '1') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q5DPt: -50,
  //         spouseKvsYn: '1',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '0',
  //         unmarriedWomanYn: '0',
  //         spouseNa: '0'
  //       },
  //       transferCount: {
  //         q4TPt: 50,

  //         spouseKvsYn: '1',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '0',
  //         unmarriedWomanYn: '0',
  //         spouseNa: '0'
  //       }
  //     })
  //   } else if (val == '2') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q5DPt: -40,
  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '2',
  //         spouseStateGvotYn: '0',
  //         unmarriedWomanYn: '0',
  //         spouseNa: '0'
  //       },
  //       transferCount: {
  //         q4TPt: 40,


  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '2',
  //         spouseStateGvotYn: '0',
  //         unmarriedWomanYn: '0',
  //         spouseNa: '0'
  //       }
  //     })
  //   } else if (val == '3') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q5DPt: -30,
  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '3',
  //         unmarriedWomanYn: '0',
  //         spouseNa: '0'
  //       },
  //       transferCount: {
  //         q4TPt: 30,


  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '3',
  //         unmarriedWomanYn: '0',
  //         spouseNa: '0'
  //       }
  //     })
  //   } else if (val == '4') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q5DPt: -20,
  //         unmarriedWomanYn: '4',
  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '0',
  //         spouseNa: '0'
  //       },
  //       transferCount: {
  //         unmarriedWomanYn: '4',
  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '0',
  //         spouseNa: '0',

  //         q4TPt: 0
  //       }
  //     })
  //   } else if (val == '5') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q5DPt: 0,
  //         unmarriedWomanYn: '0',
  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '0',
  //         spouseNa: '5'
  //       },
  //       transferCount: {
  //         q4TPt: 0,
  //         unmarriedWomanYn: '0',
  //         spouseKvsYn: '0',
  //         spouseCentralGvotYn: '0',
  //         spouseStateGvotYn: '0',
  //         spouseNa: '5'
  //       }
  //     })
  //   }
  // }

  // stationCoice(val) {

  //   if (val == '1') {
  //     this.showStationChoice18B = false;
  //     this.showStationChoice18C = false;
  //     this.transferForm.patchValue({
  //       stationChoice: {
  //         choiceKv1UdiseCodePresentStation: '',
  //         choiceKv2UdiseCodePresentStation: '',
  //         choiceKv3UdiseCodePresentStation: '',
  //         choiceKv4UdiseCodePresentStation: '',
  //         choiceKv5UdiseCodePresentStation: '',
  //         choiceKv1StationCode: '',
  //         choiceKv2StationCode: '',
  //         choiceKv3StationCode: '',
  //         choiceKv4StationCode: '',
  //         choiceKv5StationCode: '',
  //         choiceKv1UdiseNamePresentStation: '',
  //         choiceKv2UdiseNamePresentStation: '',
  //         choiceKv3UdiseNamePresentStation: '',
  //         choiceKv4UdiseNamePresentStation: '',
  //         choiceKv5UdiseNamePresentStation: '',
  //         choiceKv1StationName: '',
  //         choiceKv2StationName: '',
  //         choiceKv3StationName: '',
  //         choiceKv4StationName: '',
  //         choiceKv5StationName: '',

  //         choiceKv1StationCodeUdiseCode1: '',
  //         choiceKv1StationCodeUdiseCode2: '',
  //         choiceKv1StationCodeUdiseCode3: '',
  //         choiceKv2StationCodeUdiseCode1: '',
  //         choiceKv2StationCodeUdiseCode2: '',
  //         choiceKv2StationCodeUdiseCode3: '',
  //         choiceKv3StationCodeUdiseCode1: '',
  //         choiceKv3StationCodeUdiseCode2: '',
  //         choiceKv3StationCodeUdiseCode3: '',
  //         choiceKv4StationCodeUdiseCode1: '',
  //         choiceKv4StationCodeUdiseCode2: '',
  //         choiceKv4StationCodeUdiseCode3: '',
  //         choiceKv5StationCodeUdiseCode1: '',
  //         choiceKv5StationCodeUdiseCode2: '',
  //         choiceKv5StationCodeUdiseCode3: '',

  //         choiceKv1StationCodeUdiseName1: '',
  //         choiceKv1StationCodeUdiseName2: '',
  //         choiceKv1StationCodeUdiseName3: '',
  //         choiceKv2StationCodeUdiseName1: '',
  //         choiceKv2StationCodeUdiseName2: '',
  //         choiceKv2StationCodeUdiseName3: '',
  //         choiceKv3StationCodeUdiseName1: '',
  //         choiceKv3StationCodeUdiseName2: '',
  //         choiceKv3StationCodeUdiseName3: '',
  //         choiceKv4StationCodeUdiseName1: '',
  //         choiceKv4StationCodeUdiseName2: '',
  //         choiceKv4StationCodeUdiseName3: '',
  //         choiceKv5StationCodeUdiseName1: '',
  //         choiceKv5StationCodeUdiseName2: '',
  //         choiceKv5StationCodeUdiseName3: '',
  //       }
  //     })
  //   } else if (val == '2') {
  //     var intraStationCond = {
  //       "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
  //       "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
  //     }
  //     this.getKvSchoolByStationId(intraStationCond);
  //     this.showStationChoice18B = true;
  //     this.showStationChoice18C = false;
  //     this.transferForm.patchValue({
  //       stationChoice: {
  //         choiceKv1StationCode: '',
  //         choiceKv2StationCode: '',
  //         choiceKv3StationCode: '',
  //         choiceKv4StationCode: '',
  //         choiceKv5StationCode: '',

  //         choiceKv1StationName: '',
  //         choiceKv2StationName: '',
  //         choiceKv3StationName: '',
  //         choiceKv4StationName: '',
  //         choiceKv5StationName: '',

  //         choiceKv1StationCodeUdiseCode1: '',
  //         choiceKv1StationCodeUdiseCode2: '',
  //         choiceKv1StationCodeUdiseCode3: '',
  //         choiceKv2StationCodeUdiseCode1: '',
  //         choiceKv2StationCodeUdiseCode2: '',
  //         choiceKv2StationCodeUdiseCode3: '',
  //         choiceKv3StationCodeUdiseCode1: '',
  //         choiceKv3StationCodeUdiseCode2: '',
  //         choiceKv3StationCodeUdiseCode3: '',
  //         choiceKv4StationCodeUdiseCode1: '',
  //         choiceKv4StationCodeUdiseCode2: '',
  //         choiceKv4StationCodeUdiseCode3: '',
  //         choiceKv5StationCodeUdiseCode1: '',
  //         choiceKv5StationCodeUdiseCode2: '',
  //         choiceKv5StationCodeUdiseCode3: '',

  //         choiceKv1StationCodeUdiseName1: '',
  //         choiceKv1StationCodeUdiseName2: '',
  //         choiceKv1StationCodeUdiseName3: '',
  //         choiceKv2StationCodeUdiseName1: '',
  //         choiceKv2StationCodeUdiseName2: '',
  //         choiceKv2StationCodeUdiseName3: '',
  //         choiceKv3StationCodeUdiseName1: '',
  //         choiceKv3StationCodeUdiseName2: '',
  //         choiceKv3StationCodeUdiseName3: '',
  //         choiceKv4StationCodeUdiseName1: '',
  //         choiceKv4StationCodeUdiseName2: '',
  //         choiceKv4StationCodeUdiseName3: '',
  //         choiceKv5StationCodeUdiseName1: '',
  //         choiceKv5StationCodeUdiseName2: '',
  //         choiceKv5StationCodeUdiseName3: '',

  //       }
  //     })

  //   } else if (val == '3') {

  //     this.showStationChoice18C = true;
  //     this.showStationChoice18B = false;
  //     this.transferForm.patchValue({
  //       stationChoice: {
  //         choiceKv1UdiseCodePresentStation: '',
  //         choiceKv2UdiseCodePresentStation: '',
  //         choiceKv3UdiseCodePresentStation: '',
  //         choiceKv4UdiseCodePresentStation: '',
  //         choiceKv5UdiseCodePresentStation: '',

  //         choiceKv1UdiseNamePresentStation: '',
  //         choiceKv2UdiseNamePresentStation: '',
  //         choiceKv3UdiseNamePresentStation: '',
  //         choiceKv4UdiseNamePresentStation: '',
  //         choiceKv5UdiseNamePresentStation: '',

  //       }
  //     })

  //   } else if (val == '0') {
  //     this.showStationChoice18B = false;
  //     this.showStationChoice18C = false;
  //     this.transferForm.patchValue({
  //       stationChoice: {
  //         choiceKv1UdiseCodePresentStation: '',
  //         choiceKv2UdiseCodePresentStation: '',
  //         choiceKv3UdiseCodePresentStation: '',
  //         choiceKv4UdiseCodePresentStation: '',
  //         choiceKv5UdiseCodePresentStation: '',
  //         choiceKv1StationCode: '',
  //         choiceKv2StationCode: '',
  //         choiceKv3StationCode: '',
  //         choiceKv4StationCode: '',
  //         choiceKv5StationCode: '',
  //         choiceKv1UdiseNamePresentStation: '',
  //         choiceKv2UdiseNamePresentStation: '',
  //         choiceKv3UdiseNamePresentStation: '',
  //         choiceKv4UdiseNamePresentStation: '',
  //         choiceKv5UdiseNamePresentStation: '',
  //         choiceKv1StationName: '',
  //         choiceKv2StationName: '',
  //         choiceKv3StationName: '',
  //         choiceKv4StationName: '',
  //         choiceKv5StationName: '',

  //         choiceKv1StationCodeUdiseCode1: '',
  //         choiceKv1StationCodeUdiseCode2: '',
  //         choiceKv1StationCodeUdiseCode3: '',
  //         choiceKv2StationCodeUdiseCode1: '',
  //         choiceKv2StationCodeUdiseCode2: '',
  //         choiceKv2StationCodeUdiseCode3: '',
  //         choiceKv3StationCodeUdiseCode1: '',
  //         choiceKv3StationCodeUdiseCode2: '',
  //         choiceKv3StationCodeUdiseCode3: '',
  //         choiceKv4StationCodeUdiseCode1: '',
  //         choiceKv4StationCodeUdiseCode2: '',
  //         choiceKv4StationCodeUdiseCode3: '',
  //         choiceKv5StationCodeUdiseCode1: '',
  //         choiceKv5StationCodeUdiseCode2: '',
  //         choiceKv5StationCodeUdiseCode3: '',

  //         choiceKv1StationCodeUdiseName1: '',
  //         choiceKv1StationCodeUdiseName2: '',
  //         choiceKv1StationCodeUdiseName3: '',
  //         choiceKv2StationCodeUdiseName1: '',
  //         choiceKv2StationCodeUdiseName2: '',
  //         choiceKv2StationCodeUdiseName3: '',
  //         choiceKv3StationCodeUdiseName1: '',
  //         choiceKv3StationCodeUdiseName2: '',
  //         choiceKv3StationCodeUdiseName3: '',
  //         choiceKv4StationCodeUdiseName1: '',
  //         choiceKv4StationCodeUdiseName2: '',
  //         choiceKv4StationCodeUdiseName3: '',
  //         choiceKv5StationCodeUdiseName1: '',
  //         choiceKv5StationCodeUdiseName2: '',
  //         choiceKv5StationCodeUdiseName3: '',

  //       }
  //     })

  //   }
  // }

  // show18B(event) {
  //   var intraStationCond = {
  //     "extcall": "MOE_EXT_GETSTATION_BY_TEACHER_INTRA",
  //     "conditionvalue": [this.responseData.teacherId, this.responseData.teacherId]
  //   }
  //   this.getKvSchoolByStationId(intraStationCond);
  //   if (event.target.checked) {
  //     this.show18BOption = true;
  //   } else if (!event.target.checked) {
  //     this.show18BOption = false;
  //   }
  // }

  // show18C(event) {
  //   if (event.target.checked) {
  //     this.show18COption = true;
  //   } else if (!event.target.checked) {
  //     this.show18COption = false;
  //   }
  // }

  getKvSchoolByStationId(val) {
    this.outSideService.fetchIntraStationSchool(val).subscribe((res) => {
      this.kvSchoolList = res.response.rowValue;
    })
  }

  // getKvSchoolByStationIdPreference(event) {
  //   var str = event.target.value
  //   var splitted = str.split("-", 2);
  //   this.outSideService.fetchKvSchoolByStationCode(splitted[0]).subscribe((res) => {

  //     if (this.position == '1') {
  //       this.kvSchoolListP1 = res.response;
  //     } else if (this.position == '2') {
  //       this.kvSchoolListP2 = res.response;
  //     } else if (this.position == '3') {
  //       this.kvSchoolListP3 = res.response;
  //     } else if (this.position == '4') {
  //       this.kvSchoolListP4 = res.response;
  //     } else if (this.position == '5') {
  //       this.kvSchoolListP5 = res.response;
  //     }
  //   })
  // }

  // schoolPreferenceListByStationCode(finalList) {
  //   this.outSideService.fetchSchoolPreferenceByStationCode(finalList).subscribe((res) => {
  //     this.preferenceSchoolList = res.response;
  //     for (let i = 0; i < this.preferenceSchoolList.length; i++) {
  //       if (this.preferenceSchoolList[i].key == this.responseData.choiceKv1StationCode) {
  //         this.kvSchoolListP1 = this.preferenceSchoolList[i].value
  //       } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv2StationCode) {
  //         this.kvSchoolListP2 = this.preferenceSchoolList[i].value
  //       } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv3StationCode) {
  //         this.kvSchoolListP3 = this.preferenceSchoolList[i].value
  //       } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv4StationCode) {
  //         this.kvSchoolListP4 = this.preferenceSchoolList[i].value
  //       } else if (this.preferenceSchoolList[i].key == this.responseData.choiceKv5StationCode) {
  //         this.kvSchoolListP5 = this.preferenceSchoolList[i].value
  //       }
  //     }
  //   })
  // }

  schoolPreference(event, pos) {
    var val = event.target.value
    if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName1: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName2: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP1.length; i++) {
        if (this.kvSchoolListP1[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1StationCodeUdiseName3: this.kvSchoolListP1[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName1: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName2: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP2.length; i++) {
        if (this.kvSchoolListP2[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2StationCodeUdiseName3: this.kvSchoolListP2[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName1: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName2: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP3.length; i++) {
        if (this.kvSchoolListP3[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3StationCodeUdiseName3: this.kvSchoolListP3[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName1: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName2: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP4.length; i++) {
        if (this.kvSchoolListP4[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4StationCodeUdiseName3: this.kvSchoolListP4[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-1') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName1: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-2') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName2: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    } else if (pos == 'P1-3') {
      for (let i = 0; i < this.kvSchoolListP5.length; i++) {
        if (this.kvSchoolListP5[i].kvCode == val) {
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5StationCodeUdiseName3: this.kvSchoolListP5[i].kvName
            }
          })
        }
      }
    }
  }

  selectSchool(val) {

    this.position = val;
    this.getKvRegion();
    this.modalService.open(this.selectSchoolModalInterStation, { size: 'lg', backdrop: 'static', keyboard: false })

  }

  resetStationChoices() {
    this.transferForm.patchValue({
      stationChoice: {
        choiceKv1StationCode: '',
        choiceKv2StationCode: '',
        choiceKv3StationCode: '',
        choiceKv4StationCode: '',
        choiceKv5StationCode: '',
        choiceKv1StationName: '',
        choiceKv2StationName: '',
        choiceKv3StationName: '',
        choiceKv4StationName: '',
        choiceKv5StationName: ''
      }
    })
  }

  // getKvRegion() {

  //   var data = {
  //     "teacherID": this.responseData.teacherId,
  //     "nerFlag": this.transferForm.value.stationChoice.recruitedSpclDriveNer == '1' ? 'Y' : 'N',
  //     "dfpFlag": this.transferForm.value.displacementCount.personalStatusDfp == '1' ? 'Y' : 'N',
  //     "jcmFlag": this.transferForm.value.displacementCount.associationMemberYn == '1' ? 'Y' : 'N',
  //   }
  //   this.outSideService.fetchTransferRegion(data).subscribe((res) => {
  //     this.regionList = res.response;
  //   })
  // }
  getKvRegion() {
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      debugger
      console.log("region list")
      console.log( this.regionList)
      this.regionList = res.response.rowValue;
    })
  }


  
  getStationByRegionId(event) {
    this.stationList = [];
    this.selectedUdiseCode = '';
    var data = {
      "teacherId": this.responseData.teacherId,
      "regionCode": event.target.value
    }

    this.outSideService.fetchTransferStation(data).subscribe((res) => {
      this.stationList = res.response;
    })
  }

  getStationByRegionIdWithCond(event) {
    debugger
    const data = { "regionCode": event.target.value };
    this.outSideService.fetchStationByRegionId(data).subscribe((res) => {
      this.stationList = res.rowValue
    })
    console.log(this.stationList)
  }
  selectSchoolByUdise() {
debugger
    var str = this.selectedUdiseCode
    console.log(str)
    var splitted = str.split("-", 2);
    var spouseStation=this.transferForm.value.stationChoice?.spouseStationName;
    debugger

    // spouseKvsYnD,spouseEmpCode,spousePost,spouseStationName
    // alert(JSON.stringify(this.teacherForm.value.transferRelatedForm));
    // alert(this.teacherForm.value.transferRelatedForm.spouseKvsYnD);
    // alert(this.teacherForm.value.transferRelatedForm.spouseEmpCode);
    // alert(this.teacherForm.value.transferRelatedForm.spousePost);
    // alert(this.teacherForm.value.transferRelatedForm.spouseStationName);

    if (this.position == '1') {
   if(splitted[1] != this.spouseStationName){
    Swal.fire(
      'You have not selected spouse station in first choice so you are not eligible to get spouse point in transfer and spouse station is available in only first choice',
      '',
      'error'
    )
      }

     // choiceKv1StationName
      if (this.transferForm.value.stationChoice.choiceKv2StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv3StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv4StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1StationCode: '',
            choiceKv1StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1StationName: splitted[1],
            choiceKv1StationCode: splitted[0]
          }
        })
      }

    } else if (this.position == '2') {
debugger;
      if(splitted[1] == spouseStation){
        Swal.fire(
          'You are only eligible to select spouse station in first choice',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationCode: '',
            choiceKv2StationName: ''
            
          }
        })
        return
          }
      if (this.transferForm.value.stationChoice.choiceKv1StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv3StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv4StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationCode: '',
            choiceKv2StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2StationName: splitted[1],
            choiceKv2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '3') {

      if(splitted[1] == spouseStation){
        Swal.fire(
          'You are only eligible to select spouse station in first choice',
          '',
          'error'
        )

        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationCode: '',
            choiceKv3StationName: ''
          }
        })
return
          }

      if (this.transferForm.value.stationChoice.choiceKv2StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv1StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv4StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationCode: '',
            choiceKv3StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3StationName: splitted[1],
            choiceKv3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '4') {

      if(splitted[1] == spouseStation){
        Swal.fire(
          'You are only eligible to select spouse station in first choice',
          '',
          'error'
        )

        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationCode: '',
            choiceKv4StationName: ''
          }
        })
return
          }

      if (this.transferForm.value.stationChoice.choiceKv2StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv3StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv1StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv5StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationCode: '',
            choiceKv4StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4StationName: splitted[1],
            choiceKv4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '5') {

      if(splitted[1] == spouseStation){
        Swal.fire(
          'You are only eligible to select spouse station in first choice',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationCode: '',
            choiceKv5StationName: ''
          }
        })
        return
          }

      if (this.transferForm.value.stationChoice.choiceKv2StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv3StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv4StationName == splitted[1] ||
        this.transferForm.value.stationChoice.choiceKv1StationName == splitted[1]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationCode: '',
            choiceKv5StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5StationName: splitted[1],
            choiceKv5StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '191') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement1StationCode: '',
            displacement1StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement1StationName: splitted[1],
            displacement1StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '192') {
      if (this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement2StationCode: '',
            displacement2StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement2StationName: splitted[1],
            displacement2StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '193') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement3StationCode: '',
            displacement3StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement3StationName: splitted[1],
            displacement3StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '194') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement4StationCode: '',
            displacement4StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement4StationName: splitted[1],
            displacement4StationCode: splitted[0]
          }
        })
      }
    } else if (this.position == '195') {
      if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
        this.transferForm.value.stationChoice.displacement1StationCode == splitted[0]) {
        Swal.fire(
          'Station already selected !',
          '',
          'error'
        )
        this.transferForm.patchValue({
          stationChoice: {
            displacement5StationCode: '',
            displacement5StationName: ''
          }
        })
      } else {
        this.transferForm.patchValue({
          stationChoice: {
            displacement5StationName: splitted[1],
            displacement5StationCode: splitted[0]
          }
        })
      }
    } 
  }
//   selectSchoolByUdise() {
// debugger
//     var str = this.selectedUdiseCode
//     var splitted = str.split("-", 2);
//     if (this.position == '1') {
//       if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv1StationCode: '',
//             choiceKv1StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv1StationName: splitted[1],
//             choiceKv1StationCode: splitted[0]
//           }
//         })
//       }

//     } else if (this.position == '2') {
//       if (this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv2StationCode: '',
//             choiceKv2StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv2StationName: splitted[1],
//             choiceKv2StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '3') {
//       if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv3StationCode: '',
//             choiceKv3StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv3StationName: splitted[1],
//             choiceKv3StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '4') {
//       if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv4StationCode: '',
//             choiceKv4StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv4StationName: splitted[1],
//             choiceKv4StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '5') {
//       if (this.transferForm.value.stationChoice.choiceKv2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.choiceKv1StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv5StationCode: '',
//             choiceKv5StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             choiceKv5StationName: splitted[1],
//             choiceKv5StationCode: splitted[0]
//           }
//         })
//       }
//     } 
//     else if (this.position == '191') {
//       if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement1StationCode: '',
//             displacement1StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement1StationName: splitted[1],
//             displacement1StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '192') {
//       if (this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement2StationCode: '',
//             displacement2StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement2StationName: splitted[1],
//             displacement2StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '193') {
//       if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement3StationCode: '',
//             displacement3StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement3StationName: splitted[1],
//             displacement3StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '194') {
//       if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement1StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement5StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement4StationCode: '',
//             displacement4StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement4StationName: splitted[1],
//             displacement4StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '195') {
//       if (this.transferForm.value.stationChoice.displacement2StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement3StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement4StationCode == splitted[0] ||
//         this.transferForm.value.stationChoice.displacement1StationCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement5StationCode: '',
//             displacement5StationName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           stationChoice: {
//             displacement5StationName: splitted[1],
//             displacement5StationCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '291') {
//       if (this.transferForm.value.transferCount.doptStationTwoCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           transferCount: {
//             doptStationOneCode: '',
//             doptStationOneName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           transferCount: {
//             doptStationOneName: splitted[1],
//             doptStationOneCode: splitted[0]
//           }
//         })
//       }
//     } else if (this.position == '292') {
//       if (this.transferForm.value.transferCount.doptStationOneCode == splitted[0]) {
//         Swal.fire(
//           'Station already selected !',
//           '',
//           'error'
//         )
//         this.transferForm.patchValue({
//           transferCount: {
//             doptStationTwoCode: '',
//             doptStationTwoName: ''
//           }
//         })
//       } else {
//         this.transferForm.patchValue({
//           transferCount: {
//             doptStationTwoName: splitted[1],
//             doptStationTwoCode: splitted[0]
//           }
//         })
//       }
//     }
//   }

  // absenceCal() {
  //   var newCal = (this.totalWorkingDaysF * 1 + this.absence2 * 1)
  //   var calPoint = Math.floor(newCal / 365);
  //   var finalCalPoint = calPoint * 2;
  //   this.transferForm.patchValue({
  //     displacementCount: {
  //       actualNumberOfWorkingDays: newCal,
  //       q1DPt: finalCalPoint < 0 ? 0 : finalCalPoint
  //     }
  //   })

  // }

  // absenceCalTransferCount() {
  //   var newCal = (this.totalWorkingDaysTC * 1 - (this.absenceTc * 1))
  //   var calPoint = Math.floor(newCal / 365);
  //   var finalCalPoint = calPoint * 2;
  //   this.transferForm.patchValue({
  //     transferCount: {
  //       actualNumberOfWorkingTcdays: newCal,
  //       q1TPt: finalCalPoint
  //     }
  //   })
  // }

  // displacementTotalPoint() {
  //   var displaceMentTotal = (this.transferForm.value.displacementCount.q1DPt * 1)
  //     + (this.transferForm.value.displacementCount.q2DPt * 1)
  //     + (this.transferForm.value.displacementCount.q3DPt * 1)
  //     + (this.transferForm.value.displacementCount.q10DPt * 1)
  //     + (this.transferForm.value.displacementCount.q4DPt * 1)
  //     + (this.transferForm.value.displacementCount.q11DPt * 1)
  //     + (this.transferForm.value.displacementCount.q5DPt * 1)
  //     + (this.transferForm.value.displacementCount.q12DPt * 1)
  //     + (this.transferForm.value.displacementCount.q9DPt * 1)
  //     + (this.transferForm.value.displacementCount.q13DPt * 1)

  //   this.transferForm.patchValue({
  //     displacementCount: {
  //       totalDisplacementCount: displaceMentTotal
  //     }
  //   })
  // }

  // transferTotalPoint() {

  //   var transferTotal = this.transferForm.value.transferCount.q1TPt * 1
  //     + this.transferForm.value.transferCount.q2TPt * 1
  //     + this.transferForm.value.transferCount.q3TPt * 1
  //     + this.transferForm.value.transferCount.q4TPt * 1
  //     + this.transferForm.value.transferCount.q6TPt * 1
  //     + this.transferForm.value.transferCount.q7TPt * 1
  //     + this.transferForm.value.transferCount.q8TPt * 1
  //     + this.transferForm.value.transferCount.q9TPt * 1
  //     + this.transferForm.value.transferCount.q10TPt * 1

  //   this.transferForm.patchValue({
  //     transferCount: {
  //       totalTransferCount: transferTotal
  //     }
  //   })
  // }

  // personalStatusCheckBox(e, id) {

  //   if (e.target.checked) {
  //     if (id == '1') {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatusLtrDc: '1',
  //           q4DPt: -50,
  //           personalStatus: '1',
  //           personalStatusDefaultDc: null
  //         }
  //       })
  //     } else if (id == '2') {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatusDfpDc: '1',
  //           personalStatus: '1',
  //           q4DPt: -50,
  //           personalStatusDefaultDc: null
  //         }
  //       })
  //     } else if (id == '3') {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatusMdgDc: '1',
  //           personalStatus: '1',
  //           q4DPt: -50,
  //           personalStatusDefaultDc: null
  //         }
  //       })
  //     } else if (id == '4') {
  //       if (this.transferForm.value.displacementCount.spouseStatus != '' && this.transferForm.value.displacementCount.spouseStatus != null
  //         && (this.transferForm.value.displacementCount.spouseStatus == '4' || this.transferForm.value.displacementCount.spouseStatus == 4)) {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             spouseStatusDisplacement: '5',
  //             q5DPt: 0
  //           }
  //         })
  //       }
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatusWidDc: '1',
  //           personalStatus: '1',
  //           q4DPt: -50,
  //           personalStatusDefaultDc: null
  //         }
  //       })
  //     } else if (id == '5') {
  //       if (this.transferForm.value.displacementCount.spouseStatus != '' && this.transferForm.value.displacementCount.spouseStatus != null
  //         && (this.transferForm.value.displacementCount.spouseStatus == '4' || this.transferForm.value.displacementCount.spouseStatus == 4)) {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             spouseStatusDisplacement: '5',
  //             q5DPt: 0
  //           }
  //         })
  //       }
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatusSpDc: '1',
  //           personalStatus: '1',
  //           q4DPt: -50,
  //           personalStatusDefaultDc: null
  //         }
  //       })
  //     } else if (id == '6') {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           personalStatusDefaultDc: '1',
  //           personalStatus: '1',
  //           q4DPt: 0,
  //           personalStatusLtrDc: null,
  //           personalStatusDfpDc: null,
  //           personalStatusMdgDc: null,
  //           personalStatusWidDc: null,
  //           personalStatusSpDc: null
  //         }
  //       })
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
  //           q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
  //             this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
  //               this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
  //                 this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
  //                   this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
  //                     this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
  //                       this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
  //                         this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
  //         }
  //       })
  //     }
  //   } else if (!e.target.checked) {
  //     if (id == '1') {
  //       if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusLtrDc: null,
  //             q4DPt: -50
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusLtrDc: null,
  //             personalStatus: '1',
  //             q4DPt: 0,
  //             personalStatusDefaultDc: '1'
  //           }
  //         })
  //       }
  //     } else if (id == '2') {
  //       if (this.transferForm.value.displacementCount.personalStatusLtrDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusDfpDc: null,
  //             q4DPt: -50
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusDfpDc: null,
  //             personalStatus: '1',
  //             q4DPt: 0,
  //             personalStatusDefaultDc: '1'
  //           }
  //         })
  //       }

  //     } else if (id == '3') {

  //       if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusMdgDc: null,
  //             q4DPt: -50
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusMdgDc: null,
  //             personalStatus: '1',
  //             q4DPt: 0,
  //             personalStatusDefaultDc: '1'
  //           }
  //         })
  //       }

  //     } else if (id == '4') {
  //       if (this.transferForm.value.displacementCount.personalStatusSpDc != '1' || this.transferForm.value.displacementCount.personalStatusSpDc != 1) {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
  //             q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
  //               this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
  //                 this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
  //                   this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
  //                     this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
  //                       this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
  //                         this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
  //                           this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
  //           }
  //         })
  //       }
  //       if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusLtrDc == '1' || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusWidDc: null,
  //             q4DPt: -50
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusWidDc: null,
  //             personalStatus: '1',
  //             q4DPt: 0,
  //             personalStatusDefaultDc: '1'
  //           }
  //         })
  //       }

  //     } else if (id == '5') {
  //       if (this.transferForm.value.displacementCount.personalStatusWidDc != '1' || this.transferForm.value.displacementCount.personalStatusWidDc != 1) {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             spouseStatusDisplacement: this.transferForm.value.displacementCount.spouseStatus,
  //             q5DPt: this.transferForm.value.displacementCount.spouseStatus == '1' ? -50 :
  //               this.transferForm.value.displacementCount.spouseStatus == 1 ? -50 :
  //                 this.transferForm.value.displacementCount.spouseStatus == '2' ? -40 :
  //                   this.transferForm.value.displacementCount.spouseStatus == 2 ? -40 :
  //                     this.transferForm.value.displacementCount.spouseStatus == '3' ? -30 :
  //                       this.transferForm.value.displacementCount.spouseStatus == 3 ? -30 :
  //                         this.transferForm.value.displacementCount.spouseStatus == '4' ? -20 :
  //                           this.transferForm.value.displacementCount.spouseStatus == 4 ? -20 : 0
  //           }
  //         })
  //       }
  //       if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1') {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusSpDc: null,
  //             q4DPt: -50
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusSpDc: null,
  //             personalStatus: '1',
  //             q4DPt: 0,
  //             personalStatusDefaultDc: '1'
  //           }
  //         })
  //       }
  //     }
  //     else if (id == '6') {

  //       if (this.transferForm.value.displacementCount.personalStatusDfpDc == '1' || this.transferForm.value.displacementCount.personalStatusMdgDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusWidDc == '1' || this.transferForm.value.displacementCount.personalStatusLtrDc == '1'
  //         || this.transferForm.value.displacementCount.personalStatusSpDc == '1') {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusDefaultDc: null,
  //             q4DPt: -50
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           displacementCount: {
  //             personalStatusDefaultDc: '1',
  //             personalStatus: '1',
  //             q4DPt: 0
  //           }
  //         })
  //       }
  //     }
  //   }
  // }

  // personalStatusCheckBoxTc(e, id) {
  //   if (e.target.checked) {
  //     if (id == '1') {
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           personalStatusLtr: '1',
  //           personalStatus: '1',
  //           personalStatusDefault: null,
  //           q6TPt: 50,
  //         }
  //       })
  //       this.transfer5b = false;
  //     } else if (id == '2') {
  //       this.transferForm.patchValue({
  //         declaration: {
  //           personalStatusDfpD: '1'
  //         },
  //         transferCount: {
  //           personalStatus: '1',
  //           personalStatusDfp: '1',
  //           personalStatusDefault: null,
  //           q6TPt: 50,
  //         }
  //       })
  //       this.transfer5b = false;
  //       this.dfpGround = true;
  //     } else if (id == '3') {
  //       this.transferForm.patchValue({
  //         declaration: {
  //           personalStatusMdgD: '1'
  //         },
  //         transferCount: {
  //           personalStatusMdg: '1',
  //           personalStatus: '1',
  //           personalStatusDefault: null,
  //           q6TPt: 50,
  //         }
  //       })
  //       this.transfer5b = false;
  //       this.gkFilemMedical = true;
  //     } else if (id == '4') {
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           personalStatusWid: '1',
  //           personalStatus: '1',
  //           personalStatusDefault: null,
  //           q6TPt: 50,
  //           q9TPt: '0',
  //           unmarriedWomanYn: '0'
  //         }
  //       })
  //       this.transfer5b = false;
  //     } else if (id == '5') {
  //       this.transferForm.patchValue({
  //         declaration: {
  //           personalStatusSpD: '1'
  //         },
  //         transferCount: {
  //           personalStatusSp: '1',
  //           personalStatus: '1',
  //           personalStatusDefault: null,
  //           q6TPt: 50,
  //           q9TPt: '0',
  //           unmarriedWomanYn: '0'
  //         }
  //       })
  //       this.transfer5b = false;
  //       this.spGround = true;
  //     } else if (id == '6') {
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           personalStatusDefault: '1',
  //           personalStatus: '1',
  //           personalStatusLtr: this.disableLTR == true ? '9' : null,
  //           personalStatusDfp: this.disableDFP == true ? '9' : null,
  //           personalStatusMdg: this.disableMDG == true ? '9' : null,
  //           personalStatusWid: this.disableWidow == true ? '9' : null,
  //           personalStatusSp: this.disableSP == true ? '9' : null,
  //           q6TPt: 0,
  //           q9TPt: sessionStorage.getItem('q9TPt'),
  //           unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //         },
  //         declaration: {
  //           personalStatusDfpD: '0',
  //           personalStatusMdgD: '0',
  //           personalStatusSpD: '0'
  //         }
  //       })
  //       this.transfer5b = false;
  //       this.spGround = false;
  //       this.gkFilemMedical = false;
  //       this.dfpGround = false;
  //     }
  //   } else if (!e.target.checked) {
  //     if (id == '1') {
  //       if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
  //         || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
  //         this.transferForm.patchValue({
  //           transferCount: {
  //             personalStatusLtr: null,
  //             q6TPt: 50,
  //           }
  //         })
  //         this.transfer5b = false;
  //       } else {
  //         this.transferForm.patchValue({
  //           transferCount: {
  //             personalStatusLtr: null,
  //             personalStatus: '1',
  //             personalStatusDefault: '1',
  //             q6TPt: 0,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //       }
  //     } else if (id == '2') {
  //       if (this.transferForm.value.transferCount.personalStatusLtr == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
  //         || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
  //         this.transferForm.patchValue({
  //           declaration: {
  //             personalStatusDfpD: '0'
  //           },
  //           transferCount: {
  //             personalStatusDfp: null,
  //             q6TPt: 50,

  //           }
  //         })
  //         this.transfer5b = false;
  //       } else {
  //         this.transferForm.patchValue({
  //           declaration: {
  //             personalStatusDfpD: '0'
  //           },
  //           transferCount: {
  //             personalStatusDfp: null,
  //             personalStatus: '1',
  //             personalStatusDefault: '1',
  //             q6TPt: 0,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //       }
  //       this.dfpGround = false;

  //     } else if (id == '3') {

  //       if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1'
  //         || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
  //         this.transferForm.patchValue({
  //           declaration: {
  //             personalStatusMdgD: '0'
  //           },
  //           transferCount: {
  //             personalStatusMdg: null,
  //             q6TPt: 50,

  //           }
  //         })
  //         this.transfer5b = false;
  //       } else {
  //         this.transferForm.patchValue({
  //           declaration: {
  //             personalStatusMdgD: '0'
  //           },
  //           transferCount: {
  //             personalStatusMdg: null,
  //             personalStatus: '1',
  //             personalStatusDefault: '1',
  //             q6TPt: 0,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //       }
  //       this.gkFilemMedical = false;

  //     } else if (id == '4') {
  //       if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
  //         || this.transferForm.value.transferCount.personalStatusLtr == '1' || this.transferForm.value.transferCount.personalStatusSp == '1') {
  //         this.transferForm.patchValue({
  //           transferCount: {
  //             personalStatusWid: null,
  //             q6TPt: 50,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //         this.transfer5b = false;
  //       } else {
  //         this.transferForm.patchValue({
  //           transferCount: {
  //             personalStatusWid: null,
  //             personalStatus: '1',
  //             personalStatusDefault: '1',
  //             q6TPt: 0,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //       }

  //     } else if (id == '5') {
  //       if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
  //         || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1') {
  //         this.transferForm.patchValue({
  //           declaration: {
  //             personalStatusSpD: '0'
  //           },
  //           transferCount: {
  //             personalStatusSp: null,
  //             q6TPt: 50,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //         this.transfer5b = false;
  //       } else {
  //         this.transferForm.patchValue({
  //           declaration: {
  //             personalStatusSpD: '0'
  //           },
  //           transferCount: {
  //             personalStatusSp: null,
  //             personalStatus: '1',
  //             personalStatusDefault: '1',
  //             q6TPt: 0,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //       }
  //       this.spGround = false;
  //     }
  //     else if (id == '6') {

  //       if (this.transferForm.value.transferCount.personalStatusDfp == '1' || this.transferForm.value.transferCount.personalStatusMdg == '1'
  //         || this.transferForm.value.transferCount.personalStatusWid == '1' || this.transferForm.value.transferCount.personalStatusLtr == '1'
  //         || this.transferForm.value.transferCount.personalStatusSp == '1') {
  //         this.transferForm.patchValue({
  //           transferCount: {
  //             personalStatusDefault: null,
  //             q6TPt: 50,
  //             q9TPt: '0',
  //             unmarriedWomanYn: '0'
  //           }
  //         })
  //       } else {
  //         this.transferForm.patchValue({
  //           transferCount: {
  //             personalStatusDefault: '1',
  //             personalStatus: '1',
  //             q6TPt: 0,
  //             q9TPt: sessionStorage.getItem('q9TPt'),
  //             unmarriedWomanYn: sessionStorage.getItem('unmarriedWomanYn')
  //           }
  //         })
  //         this.spGround = false;
  //         this.dfpGround = false;
  //         this.gkFilemMedical = false;
  //       }
  //     }
  //   }

  //   if (this.transferForm.value.transferCount.q6TPt == '0' || this.transferForm.value.transferCount.q6TPt == 0) {
  //     this.transfer5b = true;
  //   } else {
  //     this.transfer5b = false;
  //   }
  // }

  // lastTransferBasedYn(event) {
  //   if (this.transferForm.value.basicDetails.teacherGender == '2') {
  //     if (event.target.value == '1') {
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           q6TPt: 0,
  //           unmarriedWomanYn: '4',
  //           q9TPt: 20
  //         }
  //       })

  //       this.transferTotalPoint();
  //     } else if (event.target.value == '0') {
  //       if (this.transferForm.value.transferCount.tpersonalStatusDefault != '1' || this.transferForm.value.transferCount.tpersonalStatusDefault != 1) {
  //         var data = 50;
  //       } else {
  //         data = 0;
  //       }
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           q6TPt: data,
  //           unmarriedWomanYn: '0',
  //           q9TPt: 0
  //         }
  //       })

  //       this.transferTotalPoint();
  //     }
  //   } else if (this.transferForm.value.basicDetails.teacherGender == '1') {
  //     if (event.target.value == '1') {
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           q6TPt: 0
  //         }
  //       })

  //       this.transferTotalPoint();
  //     } else if (event.target.value == '0') {
  //       if (this.transferForm.value.transferCount.tpersonalStatusDefault != '1' || this.transferForm.value.transferCount.tpersonalStatusDefault != 1) {
  //         var data = 50;
  //       } else {
  //         data = 0;
  //       }
  //       this.transferForm.patchValue({
  //         transferCount: {
  //           q6TPt: data
  //         }
  //       })
  //       this.transferTotalPoint();
  //     }
  //   }

  // }

  // lastTransferBasedOnDisablityYn(event) {

  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q8TPt: 0
  //       }
  //     })
  //     this.transferTotalPoint();
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q8TPt: 60
  //       }
  //     })
  //     this.transferTotalPoint();
  //   }
  // }

  // transferCount7(event) {
  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q7TPt: 55
  //       }
  //     })
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q7TPt: 0
  //       }
  //     })
  //   }
  // }

  // transferCount8(event) {
  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q8TPt: 60
  //       }
  //     })
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q8TPt: 0
  //       }
  //     })
  //   }
  // }

  // transferCount9(event) {

  //   if (event.target.value == '4') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q9TPt: 20
  //       }
  //     })
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q9TPt: 0
  //       }
  //     })
  //   }
  // }

  // transferCount10(event) {
  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q10TPt: 25
  //       }
  //     })
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       transferCount: {
  //         q10TPt: 0
  //       }
  //     })
  //   }
  // }

  // declaration1(event) {
  //   if (event.target.value == '1') {
  //     this.gkFilebenefit = true;
  //   } else if (event.target.value == '0') {
  //     this.gkFilebenefit = false;
  //   }
  // }

  // declaration2(event) {
  //   if (event.target.value == '1') {
  //     this.gkFilemMedical = true;
  //   } else if (event.target.value == '0') {
  //     this.gkFilemMedical = false;
  //   }
  // }

  // declaration6(event) {
  //   if (event.target.value == '1') {
  //     this.spGround = true;
  //   } else if (event.target.value == '0') {
  //     this.spGround = false;
  //   }
  // }

  // declaration3(event) {
  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       declaration: {
  //         child_10_12_ynD: '1'
  //       }
  //     })
  //     this.boardExam = true;
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       declaration: {
  //         child_10_12_ynD: '0'
  //       }
  //     })
  //     this.boardExam = false;
  //   }
  // }

  // declaration4(event) {
  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       declaration: {
  //         careGiverYnD: '1'
  //       }
  //     })
  //     this.careGiver = true;
  //   } else if (event.target.value == '0') {
  //     this.transferForm.patchValue({
  //       declaration: {
  //         careGiverYnD: '0'
  //       }
  //     })
  //     this.careGiver = false;
  //   }
  // }

  // declaration5(event) {
  //   if (event.target.value == '1') {

  //     this.transferForm.patchValue({
  //       declaration: {
  //         childDifferentAbleYnD: '1'
  //       }
  //     })
  //     this.abledChild = true;
  //   } else if (event.target.value == '0') {
  //     this.abledChild = false;
  //     this.transferForm.patchValue({
  //       declaration: {
  //         childDifferentAbleYnD: '0'
  //       }
  //     })
  //   }
  // }

  // declaration7(event) {
  //   if (event.target.value == '1') {
  //     this.dfpGround = true;
  //   } else if (event.target.value == '0') {
  //     this.dfpGround = false;
  //   }
  // }

  // fileToUpload: File | null = null;
  // handleFileInput(files: FileList, index) {
  //   var data = files.item(0).name
  //   var splitted = data.split('.', 2)
  //   if (splitted[1] == 'pdf' || splitted[1] == 'PDF') {
  //     if (files.item(0).size <= 204800) {
  //       this.fileToUpload = files.item(0);
  //       if (index == '0') {
  //         this.enableUploadButton0 = false;
  //       } else if (index == '1') {
  //         this.enableUploadButton1 = false;
  //       } else if (index == '2') {
  //         this.enableUploadButton2 = false;
  //       } else if (index == '3') {
  //         this.enableUploadButton3 = false;
  //       } else if (index == '5') {
  //         this.enableUploadButton5 = false;
  //       } else if (index == '6') {
  //         this.enableUploadButton6 = false;
  //       } else if (index == '7') {
  //         this.enableUploadButton7 = false;
  //       } else if (index == '8') {
  //         this.enableUploadButton8 = false;
  //       }
  //     } else {
  //       this.fileToUpload = null;
  //       Swal.fire(
  //         'File size allowed upto 200KB only !',
  //         '',
  //         'error'
  //       )
  //       if (index == '0') {
  //         this.enableUploadButton0 = true;
  //       } else if (index == '1') {
  //         this.enableUploadButton1 = true;
  //       } else if (index == '2') {
  //         this.enableUploadButton2 = true;
  //       } else if (index == '3') {
  //         this.enableUploadButton3 = true;
  //       } else if (index == '5') {
  //         this.enableUploadButton5 = true;
  //       } else if (index == '6') {
  //         this.enableUploadButton6 = true;
  //       } else if (index == '7') {
  //         this.enableUploadButton7 = true;
  //       } else if (index == '8') {
  //         this.enableUploadButton8 = true;
  //       }
  //     }
  //   } else {
  //     this.fileToUpload = null;
  //     Swal.fire(
  //       'Only PDF file can be uploaded',
  //       '',
  //       'error'
  //     )
  //     if (index == '0') {
  //       this.enableUploadButton0 = true;
  //     } else if (index == '1') {
  //       this.enableUploadButton1 = true;
  //     } else if (index == '2') {
  //       this.enableUploadButton2 = true;
  //     } else if (index == '3') {
  //       this.enableUploadButton3 = true;
  //     } else if (index == '5') {
  //       this.enableUploadButton5 = true;
  //     } else if (index == '6') {
  //       this.enableUploadButton6 = true;
  //     } else if (index == '7') {
  //       this.enableUploadButton7 = true;
  //     } else if (index == '8') {
  //       this.enableUploadButton8 = true;
  //     }
  //   }
  // }



  // documentUpload(index) {
  //   const formData = new FormData();
  //   if (this.fileToUpload != null) {
  //     formData.append('teacherId', this.responseData.teacherId);
  //     formData.append('file', this.fileToUpload);
  //     if (index == 0) {
  //       formData.append('filename', "Medical_Certificate");
  //     } else if (index == 1) {
  //       formData.append('filename', "Board_examination_Proof");
  //     } else if (index == 2) {
  //       formData.append('filename', "Disability_Certificate");
  //     } else if (index == 3) {
  //       formData.append('filename', "Differentially_Abled_Certificate");
  //     } else if (index == 5) {
  //       formData.append('filename', "Spouse_Declaration");
  //     } else if (index == 6) {
  //       formData.append('filename', "Single_Parent_Declaration");
  //     } else if (index == 7) {
  //       formData.append('filename', "DFP_Declaration");
  //     } else if (index == 8) {
  //       formData.append('filename', "NJCM_RJCM_Declaration");
  //     }

  //     this.outSideService.uploadDocument(formData).subscribe((res) => {
  //       this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
  //         this.documentUploadArray = res;
  //         for (let i = 0; i < res.length; i++) {

  //           if (res[i].docName == 'Medical_Certificate.pdf') {
  //             this.deleteDocUpdate0 = false;
  //           }
  //           if (res[i].docName == 'Board_examination_Proof.pdf') {
  //             this.deleteDocUpdate1 = false;
  //           }
  //           if (res[i].docName == 'Disability_Certificate.pdf') {
  //             this.deleteDocUpdate2 = false;
  //           }
  //           if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
  //             this.deleteDocUpdate3 = false;
  //           }
  //           if (res[i].docName == 'Spouse_Declaration.pdf') {
  //             this.deleteDocUpdate5 = false;
  //           }
  //           if (res[i].docName == 'Single_Parent_Declaration.pdf') {
  //             this.deleteDocUpdate6 = false;
  //           }
  //           if (res[i].docName == 'DFP_Declaration.pdf') {
  //             this.deleteDocUpdate7 = false;
  //           }
  //           if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
  //             this.deleteDocUpdate8 = false;
  //           }

  //         }
  //       })
  //       Swal.fire(
  //         'Document Upload Sucessfully',
  //         '',
  //         'success'
  //       )

  //       this.documentUploadArray[index] = { "docName": res.response.docName, "url": res.response.url };
  //       if (index == 0) {
  //         this.deleteDocUpdate0 = false
  //       } else if (index == 1) {
  //         this.deleteDocUpdate1 = false
  //       } else if (index == 2) {
  //         this.deleteDocUpdate2 = false
  //       } else if (index == 3) {
  //         this.deleteDocUpdate3 = false
  //       } else if (index == 5) {
  //         this.deleteDocUpdate5 = false
  //       } else if (index == 6) {
  //         this.deleteDocUpdate6 = false
  //       } else if (index == 7) {
  //         this.deleteDocUpdate7 = false
  //       } else if (index == 8) {
  //         this.deleteDocUpdate8 = false
  //       }

  //     })
  //   } else {
  //     Swal.fire(
  //       'Select PDF to be uploaded !',
  //       '',
  //       'error'
  //     )
  //   }

  //   this.fileToUpload = null;

  // }

  // deleteDocumentUploaded(documentName) {
  //   for (let i = 0; i < this.documentUploadArray.length; i++) {
  //     if (this.documentUploadArray[i].docName == documentName) {
  //       this.documentUploadArray[i] = {}
  //     }
  //   }
  //   var data = {
  //     "teacherId": this.responseData.teacherId,
  //     "docName": documentName
  //   }

  //   this.outSideService.deleteUploadedDoc(data).subscribe((res) => {
  //     Swal.fire(
  //       'Deleted !',
  //       '',
  //       'success'
  //     )

  //     this.outSideService.fetchUploadedDoc(this.responseData.teacherId).subscribe((res) => {
  //       this.documentUploadArray = res;
  //       for (let i = 0; i < res.length; i++) {
  //         if (res[i].docName == 'Medical_Certificate.pdf') {
  //           this.deleteDocUpdate0 = false;
  //         }
  //         if (res[i].docName == 'Board_examination_Proof.pdf') {
  //           this.deleteDocUpdate1 = false;
  //         }
  //         if (res[i].docName == 'Disability_Certificate.pdf') {
  //           this.deleteDocUpdate2 = false;
  //         }
  //         if (res[i].docName == 'Differentially_Abled_Certificate.pdf') {
  //           this.deleteDocUpdate3 = false;
  //         }
  //         if (res[i].docName == 'Spouse_Declaration.pdf') {
  //           this.deleteDocUpdate5 = false;
  //         }
  //         if (res[i].docName == 'Single_Parent_Declaration.pdf') {
  //           this.deleteDocUpdate6 = false;
  //         }
  //         if (res[i].docName == 'DFP_Declaration.pdf') {
  //           this.deleteDocUpdate7 = false;
  //         }
  //         if (res[i].docName == 'NJCM_RJCM_Declaration.pdf') {
  //           this.deleteDocUpdate8 = false;
  //         }
  //       }
  //     })
  //   })
  // }

  enableTransferForm(val) {
    if (val == '1') {
      this.enableTransferFormYn = true;
    } else if (val == '0') {
      this.enableTransferFormYn = false;
    }
  }

  stationChoiceSpouse(e, val) {
    if (e.target.checked) {
      if (val == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km1: '1'
          }
        })
      } else if (val == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km2: '1'
          }
        })
      } else if (val == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km3: '1'
          }
        })
      } else if (val == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km4: '1'
          }
        })
      } else if (val == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km5: '1'
          }
        })
      }
    } else if (!e.target.checked) {
      if (val == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km1: null
          }
        })
      } else if (val == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km2: null
          }
        })
      } else if (val == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km3: null
          }
        })
      } else if (val == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km4: null
          }
        })
      } else if (val == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            stationWithin100km5: null
          }
        })
      }
    }
  }

  // getSubjectByTchTypePdf(data) {
  //   this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
  //     var subjectList = res.response.rowValue;
  //     for (let i = 0; i < subjectList.length; i++) {
  //       if (this.reponseDataForPdf.workExperienceAppointedForSubject == subjectList[i].subject_id) {
  //         this.reponseDataForPdf.workExperienceAppointedForSubject = subjectList[i].subject_name;
  //       }

  //     }
  //   })
  // }

  // teacherTransferPdf() {
  //   this.getProfileImage();
  //   for (let i = 0; i < this.teacherTypeData.length; i++) {
  //     if (this.reponseDataForPdf.lastPromotionPositionType == this.teacherTypeData[i].teacherTypeId) {
  //       this.reponseDataForPdf.lastPromotionPositionType = this.teacherTypeData[i].organizationTeacherTypeName;
  //       var data = {
  //         "applicationId": environment.applicationId,
  //         "teacherTypeId": this.teacherTypeData[i].teacherTypeId
  //       }
  //       this.getSubjectByTchTypePdf(data);
  //     }
  //   }
  //   setTimeout(() => {
  //     this.transferPdfService.teacherTransferFnc(this.reponseDataForPdf, this.kvNameCode, this.stationNameCode, this.teacherExperienceData, this.documentUploadArray, this.imageData);
  //   }, 500);
  // }

  // getProfileImage() {
  //   this.outSideService.getProfileImage(this.responseData.teacherId).subscribe((res) => {
  //     if (res.status == '1' || res.status == '1') {
  //       this.imageData = "data:image/jpg;base64," + res.data;
  //     } else if (res.status == '0' || res.status == '0') {
  //       this.imageData = 'assets/assets/img/download.jpg';
  //     }

  //   },
  //     error => {
  //       this.imageData = 'assets/assets/img/download.jpg';
  //     })
  // }

  // Check For Same School
  checkForSameSchool(event, index) {
    let checkForZiet: boolean = false;
    for (let i = 0; i < this.kvSchoolList.length; i++) {
      if (this.responseData.teachingNonTeachingStaff == '1' && this.kvSchoolList[i].udise_sch_code == event.target.value && this.kvSchoolList[i].school_type == '2') {
        checkForZiet = true;
      }
    }

    if (checkForZiet) {
      if (index == 1) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv1UdiseCodePresentStation: ''
          }
        })
      } else if (index == 2) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv2UdiseCodePresentStation: ''
          }
        })
      } else if (index == 3) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv3UdiseCodePresentStation: ''
          }
        })
      } else if (index == 4) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv4UdiseCodePresentStation: ''
          }
        })
      } else if (index == 5) {
        this.transferForm.patchValue({
          stationChoice: {
            choiceKv5UdiseCodePresentStation: ''
          }
        })
      }
      Swal.fire(
        'ZIET school selection not allowed',
        '',
        'error'
      )

    } else {
      if (index == 1) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv1UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 2) {
        if (this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv2UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 3) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv3UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 4) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv5UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv4UdiseCodePresentStation: ''
            }
          })
        }
      } else if (index == 5) {
        if (this.transferForm.value.stationChoice.choiceKv2UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv3UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv4UdiseCodePresentStation == event.target.value ||
          this.transferForm.value.stationChoice.choiceKv1UdiseCodePresentStation == event.target.value) {
          Swal.fire(
            'School already selected !',
            '',
            'error'
          )
          this.transferForm.patchValue({
            stationChoice: {
              choiceKv5UdiseCodePresentStation: ''
            }
          })
        }
      }
    }
  }

  restStationSelection(val) {
    if (val == 1) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv1StationCode: '',
          choiceKv1StationName: ''
        }
      })
    } else if (val == 2) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv2StationCode: '',
          choiceKv2StationName: ''
        }
      })
    } else if (val == 3) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv3StationCode: '',
          choiceKv3StationName: ''
        }
      })
    } else if (val == 4) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv4StationCode: '',
          choiceKv4StationName: ''
        }
      })
    } else if (val == 5) {
      this.transferForm.patchValue({
        stationChoice: {
          choiceKv5StationCode: '',
          choiceKv5StationName: ''
        }
      })
    } else if (val == 191) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement1StationName: '',
          displacement1StationCode: ''
        }
      })
    } else if (val == 192) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement2StationName: '',
          displacement2StationCode: ''
        }
      })
    } else if (val == 193) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement3StationName: '',
          displacement3StationCode: ''
        }
      })
    } else if (val == 194) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement4StationName: '',
          displacement4StationCode: ''
        }
      })
    } else if (val == 195) {
      this.transferForm.patchValue({
        stationChoice: {
          displacement5StationName: '',
          displacement5StationCode: ''
        }
      })
    } else if (val == 291) {
      this.transferForm.patchValue({
        transferCount: {
          doptStationOneCode: '',
          doptStationOneName: ''
        }
      })
    } else if (val == 292) {
      this.transferForm.patchValue({
        transferCount: {
          doptStationTwoCode: '',
          doptStationTwoName: ''
        }
      })
    }
  }

  // spouseWithin100kmDisp(event) {
  //   if (event.target.value == '1') {
  //     this.transferForm.patchValue({
  //       displacementCount: {
  //         q5DPt: sessionStorage.getItem('q5DPt'),
  //         spouseStatus: sessionStorage.getItem('spouseStatus')
  //       }
  //     })
  //   } else if (event.target.value == '0') {
  //     if (this.responseData.teacherGender == '1' || this.responseData.teacherGender == '1') {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           q5DPt: 0,
  //           spouseStatus: '5'
  //         }
  //       })
  //     } else if (this.responseData.teacherGender == '2' || this.responseData.teacherGender == '2') {
  //       this.transferForm.patchValue({
  //         displacementCount: {
  //           q5DPt: -20,
  //           spouseStatus: '4'
  //         }
  //       })
  //     }
  //   }
  // }
  
  manageChoice(val){
//this.transferStatus=val;
if(val==1)
{
this.disabled=false;
}
else{
  this.disabled=true;
}
  }

}
