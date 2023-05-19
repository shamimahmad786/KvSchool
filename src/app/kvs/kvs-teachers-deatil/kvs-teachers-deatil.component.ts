import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/teacherEntryForm/service/internalService/data-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
// import { type } from 'os';
declare var $: any;

@Component({
  selector: 'app-kvs-teachers-deatil',
  templateUrl: './kvs-teachers-deatil.component.html',
  styleUrls: ['./kvs-teachers-deatil.component.css']
})
export class KvsTeachersDeatilComponent implements OnInit, AfterViewInit {

  displayedColumns = ['sno', 'empcode', 'name','gender', 'dob', 'staffType',  "status", 'systchcode', 'action'];
  dataSource: MatTableDataSource<any>;

  dropboxForm: FormGroup;
  remarksForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "gender": "", "approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "","e":"", "teacherId": "", "empcode": "", "staffType": "" }
  users: any = [];
  kvTeacher: any;
  teacherList: any;
  verifySingleTeacherList: any;
  verifiedSchCode: any;
  singleDeletedTeacher: any;
  dropoutTypeValue: any;
  dropoutType: boolean = false;
  dropoutTypeSelected: boolean = false;
  userName: any;
  businessUnitTypeCode: any;
  tempTeacherId: any;
  processingSingleTchList: any;
  subjectList: any;
  subjectListNameCode: any;
  subjectCodeNameV: any = null;
  dropboxIndex: any;

  profileFormShow: boolean = false;
  disabilityFormShow: boolean = false;
  informationFormShow: boolean = false;
  qualificationFormShow: boolean = false;
  trainingFormShow: boolean = false;
  experienceFormShow: boolean = false;
  uploadFormShow: boolean = false;

  kvSchoolDetails: any;
  stationNameCode: any = null;
  stationCode: any;
  kvNameCode: any = null;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  kvCode: any;
  verifyEnable: boolean = false;
  teacherTypeData: any;
  teacherTypeDataNameCode: any;
  teacherTypeDataNameCodeV: any;
  flagUpdatedList: any;
  businessUnitTypeId: any;

  showNationalSelector: boolean = false
  nationalLogin: boolean = true;
  showSchoolDetailsHeader: boolean = true;
  showHeader: boolean = false;

  regionList: any;
  stationList: any;
  kvSchoolList: any;
  selectedUdiseCode: any;
  udiseSchoolCode: any;
  regionCode: any;
  stationCode1: any;

  disabledCreateButton: boolean = false;
  verifyTchTeacherProfileData: any;
  verifyTchTeacherAcdQualification: any;
  verifyTchTeacherProfQualification: any;
  verifyTchTeacherAward: any;
  verifyTchTeacherTraining: any;
  verifyTchTeacherWorkExp: any;
  rejectedTeacher: any;
  isNationalLogin:boolean = false;

  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private router: Router, private modalService: NgbModal, private setDataService: DataService,private toastr: ToastrService) { }

  @ViewChild('test', { static: true }) test: TemplateRef<any>;
  @ViewChild('DropBox', { static: true }) DropBox: TemplateRef<any>;
  @ViewChild('changeRequest', { static: true }) changeRequest: TemplateRef<any>;
  @ViewChild('verifyModal', { static: true }) verifyModal: TemplateRef<any>;

  ngOnInit(): void {
    console.log(sessionStorage.getItem("authTeacherDetails"))

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.userName = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].user_name;
      this.businessUnitTypeCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      
    }

    if (this.businessUnitTypeId == '2') {
      this.isNationalLogin = true;
      this.disabledCreateButton = true;
      this.showNationalSelector = true;
      this.showHeader = true;
      this.nationalLogin = false;
      this.showSchoolDetailsHeader = false;
      this.getKvRegion();
    } else if (this.businessUnitTypeId == '3') {
      this.disabledCreateButton = true;
      this.showNationalSelector = true;
      this.showHeader = true;
      this.nationalLogin = false;
      this.showSchoolDetailsHeader = false;
      this.regionCode = this.businessUnitTypeCode
      this.getKvRegion();
      this.getStationByRegionId(this.businessUnitTypeCode);
    } else if (this.businessUnitTypeId == '4') {
      this.disabledCreateButton = true;
      this.showNationalSelector = true;
      this.showHeader = true;
      this.nationalLogin = false;
      this.showSchoolDetailsHeader = false;
      this.stationCode1 = this.businessUnitTypeCode
      this.getKvRegion();
      this.getKvSchoolByStationId(this.businessUnitTypeCode);
    }


    if (this.businessUnitTypeId != '2' && this.businessUnitTypeId != '3' && this.businessUnitTypeId != '4') {
      this.disabledCreateButton = false;
      this.getSchoolDetailsByKvCode();
      // this.getKvTeacherByKvCode();
      this.getKvTeacherByUdiseCode();
    }


    this.dropboxForm = new FormGroup({
      'feedback': new FormControl(''),
      'udiseCode': new FormControl('')
    })

    this.remarksForm = new FormGroup({
      'schoolRemarks': new FormControl('', Validators.required)
    })



  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  abc(val) {

    if (val == null) {
      this.verifyEnable = true;
      return true;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  applyFilterOnSelect(filterValueSelect: string) {
    filterValueSelect = filterValueSelect.trim(); // Remove whitespace
    filterValueSelect = filterValueSelect.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValueSelect;
  }

  getKvTeacherByKvCode() {
    this.outSideService.fetchKvTeacherByKvCode("456").subscribe((res) => {
      
      // this.setToMatTable(res.response);
    })
  }

  getKvTeacherByUdiseCode() {
    if (this.businessUnitTypeId != '2' && this.businessUnitTypeId != '3' && this.businessUnitTypeId != '4') {
      this.udiseSchoolCode = JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code;
    }
    this.outSideService.getKvTeacherByUdiseCode(this.udiseSchoolCode).subscribe((res) => {
      
      this.teacherList = [];
      this.teacherList = res.response;
      this.setToMatTable(res.response);
    })
  }


  setToMatTable(data) {
    
    this.users = [];
    this.kvTeacher = data;
    for (let i = 0; i < data.length; i++) {
      this.tempTeacherId = data[i].teacherId
      this.testData.sno = '' + (i + 1) + '';
      this.testData.name = data[i].teacherName;
      var dateString = data[i].dob;
      dateString = new Date(dateString).toUTCString();
      dateString = dateString.split(' ').slice(0, 4).join(' ');
      this.testData.dob = data[i].teacherDob;
      this.testData.gender = (data[i].teacherGender == '1') ? 'Male' : 'Female';
      this.testData.empcode = data[i].teacherEmployeeCode;
      this.testData.teacherId = data[i].teacherId;
      this.testData.systchcode = data[i].teacherSystemGeneratedCode;
      this.testData.approved = data[i].finalStatus;
      this.testData.staffType = (data[i].teachingNonteaching == '1') ? 'Teaching' : (data[i].teachingNonteaching == '2') ? 'Non-Teaching' : 'NA';
      // (data[i].teachingNonteaching == '1') ? 'Teaching' : 'Non-Teaching';

      this.users.push(this.testData);
      this.testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "gender": "", "approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "","e":"", "teacherId": "", "empcode": "", "staffType": "" }
    }



    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000)
  }

  // teachingNonTeaching(val:any){
  //   return type;
  // }

  getCorrectionInitiatedDetails() {

    this.outSideService.fetchCorrectionInitiatedDetails(this.tempTeacherId).subscribe((res) => {

      this.processingSingleTchList = res.response;
      this.modalService.open(this.changeRequest, { size: 'small', backdrop: 'static', keyboard: false });
    })
  }

  onProcessingInfoClick(tchId) {

    
    this.tempTeacherId = tchId
    this.getCorrectionInitiatedDetails();
  }

  newTeacher() {
    sessionStorage.setItem('newEntryStatus', '1')
    this.router.navigate(['/teacher/teacherHome'], { queryParams: { allowEdit: '3' } })
  }

  onViewClick(val) {
    // this.showSuccess();
    sessionStorage.removeItem('singleKvTeacher');

    for (let i = 0; i < this.kvTeacher.length; i++) {
      if (this.kvTeacher[i].teacherId == val) {
        sessionStorage.setItem('singleKvTeacher', JSON.stringify(this.kvTeacher[i]))
        sessionStorage.removeItem('responseData')
        sessionStorage.removeItem('workExpId')
        this.router.navigate(['/teacher/teacherHome'], { queryParams: { 'allowEdit': 0 } })
      }
    }
  }

  onEditClick(val) {
    
    sessionStorage.removeItem('singleKvTeacher')
    for (let i = 0; i < this.kvTeacher.length; i++) {
      if (this.kvTeacher[i].teacherId == val) {
        sessionStorage.setItem('singleKvTeacher', JSON.stringify(this.kvTeacher[i]))
        sessionStorage.removeItem('responseData')
        sessionStorage.removeItem('workExpId')
        this.router.navigate(['/teacher/teacherHome'], { queryParams: { 'allowEdit': 1 } })
        // this.router.navigateByUrl("teacher/teacherHome")
        // const url = '/teacher/teacherHome?allowEdit=';
        //  this.router.navigateByUrl(url);
      }
    }
  }

  // Below Code is for teacher varification -- Start
  onVerifyClick(value) {
    this.outSideService.fetchConfirmedTchDetails(value).subscribe((res) => {
      


      
      this.verifyTchTeacherProfileData = res.response.teacherProfile
      this.verifyTchTeacherAcdQualification = res.response.educationalQualification
      this.verifyTchTeacherProfQualification = res.response.profestinalQualification
      this.verifyTchTeacherAward = res.response.awards
      this.verifyTchTeacherTraining = res.response.training
      for(let i=0; i<res.response.experience.length; i++){
        if(res.response.experience[i].workEndDate != null || res.response.experience[i].workEndDate != null){
          res.response.experience[i].workEndDate = this.date.transform(new Date(res.response.experience[i].workEndDate*1),'yyyy-MM-dd')
        }
        res.response.experience[i].workStartDate = this.date.transform(new Date(res.response.experience[i].workStartDate*1),'yyyy-MM-dd')
      }
      this.verifyTchTeacherWorkExp = res.response.experience
    })

    this.modalService.open(this.verifyModal, { size: 'full', backdrop: 'static', keyboard: false });

  }

  createUser(val,teacherId) {
    
    // alert("create user--->"+JSON.stringify(this.teacherList));
    debugger;
// alert(teacherId);
debugger;
// alert("called");
    for (let i = 0; i < this.teacherList.length; i++) {
      if (this.teacherList[i].teacherEmployeeCode == val) {

        this.verifySingleTeacherList = this.teacherList[i];
        var str = this.verifySingleTeacherList.teacherName;
        var splitted = str.split(" ", 3);
        
        if (this.verifySingleTeacherList.teacherMobile != null &&
          this.verifySingleTeacherList.teacherMobile != "null" &&
          this.verifySingleTeacherList.teacherMobile != "") {

          this.outSideService.fetchTchDuplicateMobile(this.verifySingleTeacherList.teacherMobile).subscribe((res) => {

            
            if (res.response.status == 1) {
              

              if (val) {
                var createUser = {
                  "accountNonExpired": 1,
                  "accountNonLocked": 1,
                  "accountnonexpired": 1,
                  "accountnonlocked": 1,
                  "credentialsNonExpired": 1,
                  "credentialsnonexpired": 1,
                  "email": this.verifySingleTeacherList.teacherEmail,
                  "enabled": 1,
                  "firstname": splitted[0],
                  "lastname": splitted[splitted.length - 1],
                  "mobile": this.verifySingleTeacherList.teacherMobile,
                  "parentuser": this.userName,
                  "password": this.bcriptMethod('system123#'),
                  "username": this.verifySingleTeacherList.teacherEmployeeCode,
                  "businessUnitTypeCode": this.businessUnitTypeCode,
                  "verifyFlag": this.verifySingleTeacherList.verifyFlag
                }

                // To be commented Shamim

                // const flagData = {
                //   'teacherId': teacherId,
                //   'form1Status': 'SI',
                //   'form2Status': 'SI',
                //   'form3Status': 'SI',
                //   'form4Status': 'SI',
                //   'form5Status': 'SI',
                //   'form6Status': 'SI',
                //   'form7Status': 'SI',
                //   'finalStatus': 'SI',
                // }
              
                // this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
                //   this.users[i].approved = res.response.finalStatus;
                // })

                // End


                
                this.outSideService.createUserOnVerify(createUser).subscribe((response) => {
                  debugger;
                  debugger;

                  // alert(JSON.stringify(response));
                  debugger;
                  if(response.status == '1' || response.status == 1){
                    // alert(this.kvTeacher.length);
                    for(let i=0; i<this.kvTeacher.length; i++){
// console.log(this.kvTeacher[i].teacherEmployeeCode.trim() +"-----------"+ response.username.trim())

                      if(this.kvTeacher[i].teacherEmployeeCode.trim() == response.username.trim()){
                        this.kvTeacher[i].teacherAccountId = response.userHash;
                      }
                    }
                    
                    for (let i = 0; i < this.users.length; i++) {
                      if (this.teacherList[i].teacherEmployeeCode == response.username) {
                        this.teacherList[i].teacherSystemGeneratedCode = response.username;
                      }
                      
                      if (this.users[i].empcode == response.username) {
                        this.users[i].systchcode = response.username;
                        const data = {
                          "teacherAccountId": response.userHash,
                          "teacherId": this.users[i].teacherId,
                          "teacherSystemGeneratedCode": response.username
                        }
                        const flagData = {
                          'teacherId': teacherId,
                          'form1Status': 'SI',
                          'form2Status': 'SI',
                          'form3Status': 'SI',
                          'form4Status': 'SI',
                          'form5Status': 'SI',
                          'form6Status': 'SI',
                          'form7Status': 'SI',
                          'finalStatus': 'SI',
                        }
                        this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
                          this.users[i].approved = res.response.finalStatus;
                        })
  
                        this.outSideService.updateSysTchCode(data).subscribe((res) => {
                          if (this.users[i].teacherId == data.teacherId) {
                          }
                        })
                      }
                    }
                  }else if(response.status == '0' || response.status == 0){
                    Swal.fire(
                      'User not created',
                      'Please try again or contact system administrator!',
                      'error'
                    )
                  }
                 
                })
              }
            } else if (res.response.status == 0) {
              Swal.fire(
                'Oops...',
                'Mobile number already available with different account!',
                'error'
              )
            }
          })
        } else {
          Swal.fire(
            'Oops...',
            'Mobile number not available! Kindly update the profile!',
            'error'
          )
        }


        // else if (value === 'false') {
        // }
      }
    }
  }

  onVerify(value, flag) {
    if (flag == 'SA') {
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].teacherId == value) {
          const flagData = {
            'teacherId': value,
            'finalStatus': 'SA'
          }

          this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
            
            this.users[i].approved = res.response.finalStatus;
          })
        }
      }


      // if(this.verifyTchTeacherProfileData.teacherId == value){
      //   const data = {
      //     "teacherId": this.verifyTchTeacherProfileData.teacherId,
      //     "currentUdiseSchCode": this.verifyTchTeacherProfileData.currentUdiseSchCode
      //   }

      //   this.outSideService.getVerified(data).subscribe((res) => {
        
      //       this.verifiedSchCode = res.response

      //       for (let i = 0; i < this.teacherList.length; i++) {
      //         if (this.teacherList[i].teacherId == data.teacherId) {
      //           // this.teacherList[i].teacherSystemGeneratedCode = this.verifiedSchCode.rowValue[0].teacher_system_generated_code
      //           this.teacherList[i].verifyFlag = this.verifiedSchCode.rowValue[0].verify_flag
      //         }
      //         if (this.users[i].teacherId == data.teacherId) {
      //           // this.users[i].systchcode = this.verifiedSchCode.rowValue[0].teacher_system_generated_code
      //           this.users[i].approved = this.verifiedSchCode.rowValue[0].verify_flag
      //         }
      //       }
      //   })

      // }
    } else if (flag == 'SR') {
      
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].teacherId == value) {
          const flagData = {
            'teacherId': value,
            'form1Status': 'SR',
            'form2Status': 'SR',
            'form3Status': 'SR',
            'form4Status': 'SR',
            'form5Status': 'SR',
            'form6Status': 'SR',
            'form7Status': 'SR',
            'finalStatus': 'SR',
          }

          this.outSideService.updateFlagByTeacherId(flagData).subscribe((res) => {
            
            this.users[i].approved = res.response.finalStatus;

            for (let i = 0; i < this.teacherList.length; i++) {
              
              if (this.teacherList[i].teacherId == value) {
                // this.teacherList[i].teacherSystemGeneratedCode = this.verifiedSchCode.rowValue[0].teacher_system_generated_code
                
                
                this.teacherList[i].schoolRemarks = this.remarksForm.value.schoolRemarks;
                this.teacherList[i].verifyFlag = 'SR';
                this.rejectedTeacher = this.teacherList[i];
                
                this.outSideService.saveSingleTeacher(this.rejectedTeacher).subscribe((res) => {
                  
                })
              }
            }
          })
        }
      }


      // if(this.verifyTchTeacherProfileData.teacherId == value){
      //   const data = {
      //     "teacherId": this.verifyTchTeacherProfileData.teacherId,
      //     "currentUdiseSchCode": this.verifyTchTeacherProfileData.currentUdiseSchCode
      //   }

      // this.outSideService.getVerified(data).subscribe((res) => {
        
      //     this.verifiedSchCode = res.response

      //     for (let i = 0; i < this.teacherList.length; i++) {
      //       if (this.teacherList[i].teacherId == data.teacherId) {
      //         // this.teacherList[i].teacherSystemGeneratedCode = this.verifiedSchCode.rowValue[0].teacher_system_generated_code
      //         this.teacherList[i].verifyFlag = this.verifiedSchCode.rowValue[0].final_status
      //       }
      //       if (this.users[i].teacherId == data.teacherId) {
      //         // this.users[i].systchcode = this.verifiedSchCode.rowValue[0].teacher_system_generated_code
      //         this.users[i].approved = this.verifiedSchCode.rowValue[0].final_status
      //       }
      //     }
      // })

      // }
    }



  }
  // Teacher varification Code -- End


  // Below Code is for putting teacher into Dropbox -- Start
  onDropboxClick(value) {

    for (let i = 0; i < this.teacherList.length; i++) {
      if (this.teacherList[i].teacherId == value) {
        this.dropboxIndex = i;
        this.setDataService.setDeletedData(this.teacherList[i])
        this.singleDeletedTeacher = this.teacherList[i]
        
      }
    }

    this.modalService.open(this.DropBox, { size: 'md', backdrop: 'static', keyboard: false });
  }

  onDropoutTypeValue(event) {
    this.dropoutTypeValue = event.target.value;
  }

  onVerifyDropbox(val) {

    

    if (val == "true") {
      this.outSideService.dropTeacherBySchoolByTchId(this.singleDeletedTeacher.teacherId).subscribe((res) => {

        if (res.status == '1') {
          this.users.splice(this.dropboxIndex, 1);
          Swal.fire(
            'Employee has been sent to dropbox !',
            '',
            'success'
          )
        } else if (res.status == '0') {
          Swal.fire(
            'Sorry data could not be deleted 1',
            '',
            'info'
          )
        }
      })

      

      setTimeout(() => {
        this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 500)
      
      // this.singleDeletedTeacher.dropBoxFlag = this.dropoutTypeValue;
      // this.singleDeletedTeacher.dropboxFeedback = this.dropboxForm.value.feedback;
      // this.singleDeletedTeacher.transferedUdiseSchCode = this.dropboxForm.value.udiseCode;
      
    } else if (val == "false") {
    }
  }

  //Dropout type fnc start
  onDropoutType(event) {
    this.dropoutTypeSelected = true;
    if (event.target.value == 1) {
      this.dropoutType = true;
    } else if (event.target.value == 2) {
      this.dropoutType = false
    }
  }

  bcriptMethod(pass) {
    
    const salt = bcrypt.genSaltSync(10);
    var bcryptdata = bcrypt.hashSync(pass, salt);
    
    return bcryptdata;
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
    })
  }


  verifyEnableFn() {

    this.verifyEnable = true
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
        if (this.verifySingleTeacherList.lastPromotionPositionType == data.teacherTypeId) {
          this.teacherTypeDataNameCodeV = data.nameCode;
        }
        this.teacherTypeDataNameCode.push(data)
      }
    })
  }

  formSelection(val) {
    if (val == '1') {
      this.profileFormShow = true;

      // this.profileFormShow = false;
      this.disabilityFormShow = false;
      this.informationFormShow = false;
      this.qualificationFormShow = false;
      this.trainingFormShow = false;
      this.experienceFormShow = false;
      this.uploadFormShow = false;

    } else if (val == '5') {
      this.trainingFormShow = true;

      this.profileFormShow = false;
      this.disabilityFormShow = false;
      this.informationFormShow = false;
      this.qualificationFormShow = false;
      // this.trainingFormShow = false;
      this.experienceFormShow = false;
      this.uploadFormShow = false;

    } else if (val == '7') {
      this.uploadFormShow = true;

      this.profileFormShow = false;
      this.disabilityFormShow = false;
      this.informationFormShow = false;
      this.qualificationFormShow = false;
      this.trainingFormShow = false;
      this.experienceFormShow = false;
      // this.uploadFormShow = false;

    } else if (val == '2') {
      this.disabilityFormShow = true;

      this.profileFormShow = false;
      // this.disabilityFormShow = false;
      this.informationFormShow = false;
      this.qualificationFormShow = false;
      this.trainingFormShow = false;
      this.experienceFormShow = false;
      this.uploadFormShow = false;

    } else if (val == '6') {
      this.experienceFormShow = true;

      this.profileFormShow = false;
      this.disabilityFormShow = false;
      this.informationFormShow = false;
      this.qualificationFormShow = false;
      this.trainingFormShow = false;
      // this.experienceFormShow = false;
      this.uploadFormShow = false;

    } else if (val == '3') {
      this.informationFormShow = true;

      this.profileFormShow = false;
      this.disabilityFormShow = false;
      // this.informationFormShow = false;
      this.qualificationFormShow = false;
      this.trainingFormShow = false;
      this.experienceFormShow = false;
      this.uploadFormShow = false;

    } else if (val == '4') {
      this.qualificationFormShow = true;

      this.profileFormShow = false;
      this.disabilityFormShow = false;
      this.informationFormShow = false;
      // this.qualificationFormShow = false;
      this.trainingFormShow = false;
      this.experienceFormShow = false;
      this.uploadFormShow = false;

    }
  }

  getKvRegion() {
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response;

    })
  }

  getStationByRegionId(val) {

    this.outSideService.fetchStationByRegionId(val).subscribe((res) => {
      this.stationList = res.response;

    })
  }

  getKvSchoolByStationId(val) {
    
    this.outSideService.fetchKvSchoolByStationCode(val).subscribe((res) => {
      this.kvSchoolList = res.response;
      this.stationCode1 = res.response[0].stationCode;
      this.regionCode = res.response[0].regionCode;
      this.getStationByRegionId(res.response[0].regionCode);

    })
  }

  onSchoolSelect(val) {
    
    var str = val;
    var splitted = str.split("-", 2);
    
    this.udiseSchoolCode = splitted[0];
    this.businessUnitTypeCode = splitted[1];
    this.kvCode = splitted[1];
    sessionStorage.setItem('kvCode', this.kvCode)
    this.nationalLogin = true;
    this.getSchoolDetailsByKvCode();
    this.getKvTeacherByUdiseCode();
  }

  // selectSchoolByUdise(){
    
  //   for(let i=0; i<this.kvSchoolList.length; i++){
  //     if(this.kvSchoolList[i].udiseSchCode == this.selectedUdiseCode){
    
  
  //       this.setTeacherPostingData(this.kvSchoolList[i].kvName, this.kvSchoolList[i].udiseSchCode)

  //     }
  //   }
  // }

  testRemarksForm() {
  }

  resetPassword(tchId){
    this.outSideService.resetPassword(tchId).subscribe((res)=>{
      if(res.status == '1'){
        Swal.fire(
          'Password reset successfully !',
          '',
          'success'
        )
      }else if(res.status == '0'){
        Swal.fire(
          'Try again !',
          '',
          'error'
        )
      }
    })
  }


  getConfirmedTchDetails() {


    // http://10.25.26.251:8014/api/teacher/getConfirmedTeacherDetails

    //   var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    // var headers = new HttpHeaders({
    //   'Authorization':token,
    //   'Content-Type': 'text/plain; charset=utf-8',
    // }); 

    // return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getConfirmedTeacherDetails", data, {headers})

  }

  showSuccess() {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  showError(){
    this.toastr.error('Hello world!', 'Toastr fun!');
  }


  //Notification Function Below

//   showNotification(from, align){
//     const type = ['','danger'];

//     // const color = Math.floor((Math.random() * 4) + 1);

//     $.notify({
//         icon: "notifications",
//         message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer.",
//         title:"Test"

//     },{
//         type: type[1],
//         timer: 4000,
//         placement: {
//             from: from,
//             align: align
//         },
//         template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
//           '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
//           '<i class="material-icons" data-notify="icon">notifications</i> ' +
//           '<span data-notify="title">{1}</span> ' +
//           '<span data-notify="message">{2}</span>' +
//           '<div class="progress" data-notify="progressbar">' +
//             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
//           '</div>' +
//           '<a href="{3}" target="{4}" data-notify="url"></a>' +
//         '</div>'
//     });
// }

}
