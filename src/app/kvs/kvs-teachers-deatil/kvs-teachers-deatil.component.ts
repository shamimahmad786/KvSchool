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
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
// import { type } from 'os';
declare var $: any;

@Component({
  selector: 'app-kvs-teachers-deatil',
  templateUrl: './kvs-teachers-deatil.component.html',
  styleUrls: ['./kvs-teachers-deatil.component.css']
})
export class KvsTeachersDeatilComponent implements OnInit, AfterViewInit {

  displayedColumns = ['sno', 'empcode', 'name','postName', 'subjectName',   "status", 'systchcode', 'action'];
  
  dataSource: MatTableDataSource<any>;
  dropboxForm: FormGroup;
  remarksForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
 @ViewChild(MatSort) sort: MatSort;
  
  testData = { "sno": "", "name": "", "postName": "", "email": "", "mobile": "", "subjectName": "","approvedStatus":"","approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "","e":"", "teacherId": "", "empcode": "", "staffType": "" }
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
  teacherStationChioce:any;
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
  user_name:any;
  

  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private router: Router, private modalService: NgbModal, private setDataService: DataService,private toastr: ToastrService) { }

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


  changeDateFormat(date: any){
    return moment(date).format('DD-MM-YYYY')
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
  dashboardMasterpdf()
  {
    console.log(this.users)
   setTimeout(() => {
     this.pdfService.dashboardMasterList(this.users,this.kvNameCode);
   }, 1000);
  }
  exportexcel()
  {
      console.log(this.users)
      const workBook = new Workbook();
      const workSheet = workBook.addWorksheet('Dashboard');
      const excelData = [];
      const ws1 = workSheet.addRow(['', '', 'EMPLOYEE DETAILS OF '+ this.kvNameCode]);
      const dobCol = workSheet.getColumn(1);
      dobCol.width = 15;
      const dobCol1 = workSheet.getColumn(2);
      dobCol1.width = 25;
      const dobCol2 = workSheet.getColumn(3);
      dobCol2.width = 35;
      const dobCol3 = workSheet.getColumn(4);
      dobCol3.width = 20;
      const dobCol4 = workSheet.getColumn(5);
      dobCol4.width = 20;
      const dobCol5 = workSheet.getColumn(6);
      dobCol5.width = 20;
      workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
      for (let i = 1; i < 6; i++) {
        const col = ws1.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  '9c9b98' },   
        };
      }
     const ws = workSheet.addRow(['Employee Code','Name','Post Name','Subject  Name','Status']);
     workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
        for (let i = 1; i < 6; i++) {
          const col = ws.getCell(i);
          col.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb:  'd6d6d4' },
          };
        }
        this.users.forEach((item) => {
        const row = workSheet.addRow([item.empcode,item.name,item.postName,item.subjectName,item.approvedStatus]);
      });
      workBook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        saveAs(blob, 'kvDetails.xlsx');
      });
   
    }
  
  getKvTeacherByUdiseCode() {
    if (this.businessUnitTypeId != '2' && this.businessUnitTypeId != '3' && this.businessUnitTypeId != '4') {
      // this.udiseSchoolCode = JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code;
    }
    this.outSideService.getKvTeacherByUdiseCode(this.kvCode).subscribe((res) => {
      console.log("--------------teacher detail----------------------")
      console.log(res.response)
      this.teacherList = [];
      this.teacherList = res.response;
      this.setToMatTable(res.response);
    })
  }


  setToMatTable(data) {
    
    this.users = [];
    this.kvTeacher = data;
    debugger
    for (let i = 0; i < data.length; i++) {
      this.tempTeacherId = data[i].teacherId
      this.testData.sno = '' + (i + 1) + '';
      this.testData.name = data[i].teacherName;
      var dateString = data[i].dob;
      dateString = new Date(dateString).toUTCString();
      dateString = dateString.split(' ').slice(0, 4).join(' ');
      this.testData.subjectName = data[i].subjectName;;
      this.testData.empcode = data[i].teacherEmployeeCode;
      this.testData.teacherId = data[i].teacherId;
      this.testData.systchcode = data[i].teacherSystemGeneratedCode;
      this.testData.approved = data[i].finalStatus;
      if( data[i].finalStatus=='SI')
      {
        this.testData.approvedStatus = "School Initiated"
      }
      if( data[i].finalStatus=='SA')
      {
        this.testData.approvedStatus = "Verified"
      }
      if( data[i].finalStatus=='SR')
      {
        this.testData.approvedStatus = "Rejected"
      }
      if( data[i].finalStatus=='SES' || data[i].finalStatus=='SEM')
      {
        this.testData.approvedStatus = "School Edited"
      }
      if( data[i].finalStatus=='SE')
      {
        this.testData.approvedStatus = "School Editing(Pending)"
      }
      if( data[i].finalStatus=='TA')
      {
        this.testData.approvedStatus = "Pending(School)"
      }
      if( data[i].finalStatus=='TA')
      {
        this.testData.approvedStatus = "Pending(School)"
      }
      if( data[i].finalStatus!='TI' && data[i].finalStatus!='TA' &&  data[i].finalStatus!='SI' &&  data[i].finalStatus!='SA' &&  data[i].finalStatus!='SR'  &&  data[i].finalStatus!='SE'  &&  data[i].finalStatus!='SEM' &&  data[i].finalStatus!='SES' &&  data[i].finalStatus!='SES' )
      {
        this.testData.approvedStatus = "Not Initiated"
      }
      if( data[i].finalStatus=='TI')
      {
        this.testData.approvedStatus = "Pending(Employee)"
      }



      this.testData.staffType = (data[i].teachingNonteaching == '1') ? 'Teaching' : (data[i].teachingNonteaching == '2') ? 'Non-Teaching' : 'NA';
      // (data[i].teachingNonteaching == '1') ? 'Teaching' : 'Non-Teaching';
      this.testData.postName = data[i].postName;
      this.users.push(this.testData);
      console.log("---------------user detail----------")
      console.log(this.users)
      this.testData = { "sno": "", "name": "", "postName": "", "email": "", "mobile": "", "subjectName": "","approvedStatus": "", "approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "","e":"", "teacherId": "", "empcode": "", "staffType": "" }
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
      this.teacherStationChioce= res.response.teacherTrainingProfile
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

    document.getElementById(teacherId).setAttribute("disabled","disabled")
    
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
               

                  // alert(JSON.stringify(response));
               
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
  resetPassword(empCode){
    debugger
    this.outSideService.resetPassword(empCode).subscribe((res)=>{
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
  
  onVerify(value, flag) {
   // alert("called--->"+value);
   debugger
   const data ={
    "teacherId":value,
    "reportType":"1"
   }
   debugger
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

    }
  }
  // Teacher varification Code -- End


  // Below Code is for putting teacher into Dropbox -- Start
  onDropboxClick(value) {
// alert("Drop box employee code--->"+value);
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

  unloackStatus:any;

  unlockEmloyee(empCode){
    
    this.outSideService.unlockEmloyee(empCode).subscribe((res) => {
      // alert(JSON.stringify(res));
       this.unloackStatus=JSON.parse(JSON.stringify(res)).status;
       if(this.unloackStatus=="1"){
      Swal.fire(
        '',
        'Employee data unfreeze.You can now edit the data.',
        'success'
      )

      setTimeout(() => {
        location.reload();
      }, 2000);
    
      
       }else{
        Swal.fire(
          'Please contact with admin',
          'error'
        )
       }
    
    })
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
