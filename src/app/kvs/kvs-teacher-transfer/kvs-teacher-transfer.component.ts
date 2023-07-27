import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import {TransferService} from 'src/app/service/TransferService';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TransferGroundPipe } from 'src/app/utilities/myPipe/myPipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-kvs-teacher-transfer',
  templateUrl: './kvs-teacher-transfer.component.html',
  styleUrls: ['./kvs-teacher-transfer.component.css']
})
export class KvsTeacherTransferComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('transferVerifyModal', { static: true }) transferVerifyModal: TemplateRef<any>;

  remarksForm: FormGroup;

  displayedColumns = ['sno', 'empcode', 'name', 'gender', "status",  'action'];
  testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "gender": "", "approved": "", "reInitiate": "", "rejected": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "", "empcode": "", "staffType": "" }
  dataSource: MatTableDataSource<any>;
  dataSource1: MatTableDataSource<any>;
  users: any = [];
  tempTeacherId: any;

  businessUnitTypeCode: any;
  businessUnitTypeId: any;
  udiseSchoolCode: any;
  teacherExperienceList: any;
  teacherTransferDetails: any;

  noAward: boolean = false;
  regionalAward: boolean = false;
  nationalAward: boolean = false;
  presidentAward: boolean = false;

  documentUploadArray:any[]=[];

  kvSchoolDetails: any;
  stationNameCode: any;
  stationCode: any;
  kvNameCode: any;
  udiseSchCode: any;
  schName: any;
  stationName: any;
  kvCode: any;

  showNationalSelector:boolean = false;
  regionList:any;
  
  stationList:any;
  kvSchoolList:any;
  stationCode1:any;
  regionCode:any;
  nationalLogin:boolean = true;

  teacherPost:any;
  teacherSub:any;

  constructor(private date: DatePipe,private outSideService: OutsideServicesService, private modalService: NgbModal, private router: Router,private transferServ: TransferService) { }

  ngOnInit(): void {

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.businessUnitTypeCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    }
    this.getInitiatedTransferByKvCode();

    if (this.businessUnitTypeId == '2') {
      // this.disabledCreateButton = true;
      this.showNationalSelector = true;
      // this.showHeader = true;
      this.nationalLogin = false;
      // this.showSchoolDetailsHeader = false;
      this.getKvRegion();
    } else if (this.businessUnitTypeId == '3') {
      // this.disabledCreateButton = true;
      // this.showNationalSelector = true;
      // this.showHeader = true;
      // this.nationalLogin = false;
      // this.showSchoolDetailsHeader = false;
      // this.regionCode = this.businessUnitTypeCode
      // this.getKvRegion();
      // this.getStationByRegionId(this.businessUnitTypeCode);
    } else if (this.businessUnitTypeId == '4') {
      // this.disabledCreateButton = true;
      // this.showNationalSelector = true;
      // this.showHeader = true;
      // this.nationalLogin = false;
      // this.showSchoolDetailsHeader = false;
      // this.stationCode1 = this.businessUnitTypeCode
      // this.getKvRegion();
      // this.getKvSchoolByStationId(this.businessUnitTypeCode);
    }


    if (this.businessUnitTypeId != '2' && this.businessUnitTypeId != '3' && this.businessUnitTypeId != '4') {
      // this.disabledCreateButton = false;
       this.getSchoolDetailsByKvCode();
      // this.getKvTeacherByKvCode();
      // this.getKvTeacherByUdiseCode();
    }

    if (this.businessUnitTypeId != '2' && this.businessUnitTypeId != '3' && this.businessUnitTypeId != '4') {
      // this.showNationalSelector = false;
      this.udiseSchoolCode = JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code;
      // this.getTransferInitiatedTchByUdise(); commented by shamim
       this.getSchoolDetailsByKvCode();
    }

    this.remarksForm = new FormGroup({
      'exemptionRemarks': new FormControl('', Validators.required),
      'exemptionType': new FormControl('', Validators.required)
    })

    

  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getTransferInitiatedTchByUdise() {
    this.outSideService.fetchInitiatedTransferByUdisecode(this.udiseSchoolCode).subscribe((res) => {
      
      if (res.status == '1' || res.status == 1) {
        this.setToMatTable(res.response)
      } else {
        Swal.fire(
          'Something went wrong !',
          '',
          'error'
        )
      }
    })
  }

  applyFilter(filterValue: string) {
    
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource1.filter = filterValue;
  }

  applyFilterOnSelect(filterValueSelect: string) {
    filterValueSelect = filterValueSelect.trim(); // Remove whitespace
    filterValueSelect = filterValueSelect.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValueSelect;
  }

  setToMatTable(data) {
debugger
    // alert("Data after get--->"+JSON.stringify(data));

    this.users = [];
    for (let i = 0; i < data.length; i++) {

      // alert(data[i].transfer_id);

      this.tempTeacherId = data[i].teacher_id
      this.testData.sno = '' + (i + 1) + '';
      this.testData.name = data[i].teacher_name;
      var dateString = data[i].dob;
      dateString = new Date(dateString).toUTCString();
      dateString = dateString.split(' ').slice(0, 4).join(' ');
      this.testData.dob = data[i].teacher_dob;
      this.testData.gender = (data[i].teacher_gender == '1') ? 'Male' : 'Female';
      this.testData.empcode = data[i].teacher_employee_code;
      this.testData.teacherId = data[i].teacher_id;
      //this.testData.systchcode = data[i].transfer_id;
      this.testData.approved = data[i].transfer_status;
      this.users.push(this.testData);
      this.testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "gender": "", "approved": "", "reInitiate": "", "rejected": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "", "empcode": "", "staffType": "" }
    }
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000)
  }

  // Below Code : On Verify Click and its operations -- Start
  onVerifyClick(teacherId) {  
    console.log(teacherId)  
    const transferGround = new TransferGroundPipe();
    this.tempTeacherId = teacherId;
    this.getUploadedDocs();
   // this.modalService.open(this.transferVerifyModal, { size: 'full', backdrop: 'static', keyboard: false });
    this.outSideService.fetchTransferBasicProfileByTchId(teacherId).subscribe((res) => {
      debugger
      this.teacherExperienceList = res.response.teacherExperience;
      // for(let i=0;i<this.teacherExperienceList.length; i++){
      //   var temp = [];
      //   for(let j=0; j<this.teacherExperienceList[i].groundForTransfer.length; j++){
      //     temp.push(transferGround.transform(this.teacherExperienceList[i].groundForTransfer[j])) 
      //   }
      //   if (this.teacherExperienceList[i].workEndDate != "null" && this.teacherExperienceList[i].workEndDate != null) {
      //     this.teacherExperienceList[i].workEndDate = this.date.transform(new Date(this.teacherExperienceList[i].workEndDate * 1), 'yyyy-MM-dd')
      //   }
      //   this.teacherExperienceList[i].workStartDate = this.date.transform(new Date(this.teacherExperienceList[i].workStartDate * 1), 'yyyy-MM-dd')

      //   this.teacherExperienceList[i].groundForTransfer = temp;
      // }
      
      this.teacherTransferDetails = res.response.profileDetails;
      
      if (this.teacherTransferDetails.presidentAward == '1') {
        this.presidentAward = true;
      }
      if (this.teacherTransferDetails.nationalAward == '1') {
        this.nationalAward = true;
      }
      if (this.teacherTransferDetails.regionalAward == '1') {
        this.regionalAward = true;
      }	  
	  
	   if (this.teacherTransferDetails.presidentAward != '1' && this.teacherTransferDetails.nationalAward != '1' && this.teacherTransferDetails.regionalAward != '1') {
        this.noAward = true;
      }

      this.getAllMaster();

      this.modalService.open(this.transferVerifyModal, { size: 'full', backdrop: 'static', keyboard: false });
    })
  }

  getUploadedDocs(){
    this.outSideService.fetchUploadedDoc(this.tempTeacherId).subscribe((res)=>{
      this.documentUploadArray = res;
  })}

  onApproved(val,tchId){
    if(val == 'R'){
      this.teacherTransferDetails.transferStatus = 'TRR';
      this.teacherTransferDetails.exemptionRemarks = this.remarksForm.value.exemptionRemarks;
      this.teacherTransferDetails.exemptionType = this.remarksForm.value.exemptionType;
    }else if(val == 'A'){
      this.teacherTransferDetails.lastPromotionPositionType = this.teacherPost;
      this.teacherTransferDetails.workExperienceAppointedForSubject = this.teacherSub;
      this.teacherTransferDetails.transferStatus = 'TRA';
    }
    this.outSideService.saveInitiatedTeacherTransfer(this.teacherTransferDetails).subscribe((res) => {

      for(let i=0; i<this.users.length; i++){
        if(this.users[i].teacherId == tchId){
          this.users[i].approved = res.response.transferStatus;
          if(val == 'R'){
            Swal.fire(
              'The transfer application has been rejected from your end !',
              '',
              'success'
            )
          }else if(val == 'A'){
            Swal.fire(
              'The transfer application has been approved !',
              '',
              'success'
            )
          }
        }
      }
    })
  }

  onEdit(tchId){
    debugger
    sessionStorage.setItem('tempTchId',tchId)
    this.router.navigate(['/teacher/transferEdit'])
  }

  getSchoolDetailsByKvCode() {
    debugger
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

  getAllMaster() {
    this.outSideService.fetchAllMaster(6).subscribe((res) => {
      var teacherTypeData = res.response.postionType;

      for(let i=0; i<teacherTypeData.length; i++){
        if(this.teacherTransferDetails.lastPromotionPositionType == teacherTypeData[i].teacherTypeId){
          this.teacherPost = teacherTypeData[i].teacherTypeId;
          this.teacherTransferDetails.lastPromotionPositionType = teacherTypeData[i].organizationTeacherTypeName;
          var data = {
            "applicationId": environment.applicationId,
            "teacherTypeId": teacherTypeData[i].teacherTypeId
          }
          this.getSubjectByTchType(data);
        }
      }
      
    })
  }

  getSubjectByTchType(data) {
    this.outSideService.fetchKvSubjectListByTchType(data).subscribe((res) => {
      var subjectList = res.response.rowValue;
      // this.subjectListNameCode = [];
      for (let i = 0; i < subjectList.length; i++) {
        if(this.teacherTransferDetails.workExperienceAppointedForSubject == subjectList[i].subject_id){
          this.teacherSub = subjectList[i].subject_id;
          this.teacherTransferDetails.workExperienceAppointedForSubject = subjectList[i].subject_name;
        }
        
      }
    })
  }

  // On Verify Click and its operations -- End

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
    // this.getKvTeacherByUdiseCode();
    this.getTransferInitiatedTchByUdise();
  }

  deleteInitiatedTransfer(teacherId,applicationNumber){
    
    this.outSideService.deleteInitiatedTeacherTransfer(teacherId).subscribe((res)=>{
      
      if(res.status == 1 || res.status == '1'){
        for(let i=0; i<this.users.length; i++){
          if(this.users[i].teacherId == teacherId){
            this.users.splice(i,1)
          }
        }
        Swal.fire(
          'The transfer application ' + applicationNumber + ' has been deleted sucessfully',
          'For re-initiation, kindly login to teacher and initiate',
          'success'
        )

        setTimeout(() => {
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 500)
        
      }else{
        Swal.fire(
          'Please try again after some time',
          '',
          'error'
        )
      }
    })
    }

transUser:any=[];
    getInitiatedTransferByKvCode(){
      const data={"kvCode":this.kvCode};
  this.transferServ.getInitiatedTransferByKvCode(data).subscribe((res)=>{

    // alert(JSON.stringify(res.response.rowValue));
    if(res.status==1){
      // alert(res.response.rowValue)
      this.setToMatTable1(res.response.rowValue);
    }
    

  })
    }

    transData:any = {"sno":"","empcode":"","name":"","gender":"","status":"","action":"","teacherId":""}
    setToMatTable1(data){
      // alert("Data after get--->"+JSON.stringify(data));

    this.users = [];
    for (let i = 0; i < data.length; i++) {

      // alert(data[i].transfer_id);

      this.tempTeacherId = data[i].teacher_id
      this.transData.teacherId=data[i].teacher_id;
      this.transData.sno = '' + (i + 1) + '';
      this.transData.empcode = data[i].teacher_employee_code;
      this.transData.name = data[i].teacher_name;
      var dateString = data[i].dob;
    
      dateString = new Date(dateString).toUTCString();
      dateString = dateString.split(' ').slice(0, 4).join(' ');
      // this.transData.dob = data[i].teacher_dob;
      this.transData.gender = (data[i].teacher_gender == '1') ? 'Male' : 'Female';
     
      // this.transData.teacherId = data[i].teacher_id;
      //this.testData.systchcode = data[i].transfer_id;
      // this.transData.status ="1";
      // this.transData.action="1";

      if(data[i]?.tc_save_yn==1){
        this.transData.status = "1";
        this.transData.action="1";
      }else if(data[i]?.dc_save_yn==1){
        this.transData.status = "1";
        this.transData.action="1";
      }else{
        this.transData.status = "3";
      }
// alert(JSON.stringify(this.transData));

      // this.testData.approved = data[i].transfer_status;
      this.transUser.push(this.transData);

      

      this.transData = {"sno":"","empcode":"","name":"","dob":"","gender":"","status":"","action":"","teacher":""}
    }


   

    setTimeout(() => {
      // alert(JSON.stringify(this.users));
      this.dataSource1 = new MatTableDataSource(this.transUser);
      this.dataSource1.paginator = this.paginator;
      this.dataSource1.sort = this.sort;
    }, 1000)
    }





}
