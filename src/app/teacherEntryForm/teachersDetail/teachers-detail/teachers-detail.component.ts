import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { DataService } from '../../service/internalService/data-service';
import { MatDialog} from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-teachers-detail',
  templateUrl: './teachers-detail.component.html',
  styleUrls: ['./teachers-detail.component.css'],

})
export class TeachersDetailComponent implements OnInit, AfterViewInit {

  dropboxForm:FormGroup;
  emailNoti=false;
  mobileNoti=true;
  dropoutType:boolean = false;
  dropoutTypeSelected:boolean = false;
  singleDeletedTeacher:any;
  dropoutTypeValue:any;

  displayedColumns = ['sno', 'name', 'dob', 'email', 'mobile', 'gender', 'systchcode', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  [x: string]: any;

  udise_code = { 'udiseSchCode': '01010100101' };
  teacherList: any;
  authDetails: any;
  verifySingleTeacherList: any;
  verifiedSchCode: any;
  testData = { "sno": "", "name": "", "dob": "", "email": "","mobile": "", "gender": "","systchcode":"", "a":"", "b":"", "c":"","d":"","teacherId":""  }
  users: any = [];

  constructor(private modalService: NgbModal, private outSideService: OutsideServicesService, private setDataService: DataService, private router: Router, public dialog: MatDialog) { }

  @ViewChild('test', { static: true }) test: TemplateRef<any>;
  @ViewChild('DropBox', { static: true }) DropBox: TemplateRef<any>;

  ngOnInit() {

    this.dropboxForm = new FormGroup({
      'feedback': new FormControl(''),
      'udiseCode': new FormControl('')
    })

    if (sessionStorage.getItem('authDetails') != null) {
      this.authDetails = JSON.parse(sessionStorage.getItem('authDetails'))
    //  this.udise_code = { 'udiseSchCode': this.authDetails.applicationDetails[0].business_unit_identity_code }
    }
    sessionStorage.setItem('udiseSchCode',JSON.stringify(this.udise_code))
    this.getTeacherByUdiseCode(this.udise_code)
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
  onVerifyMobile(value){    
    for(let i=0; i<this.teacherList.length; i++){
      if(this.teacherList[i].teacherId == value){
        
        sessionStorage.setItem('allowSingleVerifyList', JSON.stringify(this.teacherList[i]))
      }
    }
    this.router.navigate(['/teacher/updateEmailMobile'], {queryParams:{allowSingleVerify: '1'}})
  }

  onVerifyEmail(value){
    for(let i=0; i<this.teacherList.length; i++){
    if(this.teacherList[i].teacherId == value){
      
      sessionStorage.setItem('allowSingleVerifyList', JSON.stringify(this.teacherList[i]))
    }
  }
  this.router.navigate(['/teacher/updateEmailMobile'], {queryParams:{allowSingleVerify: '2'}})
  }

  // Below Code is for getting teacher list by UdiseCode -- Start
  getTeacherByUdiseCode(udiseCode) {
    this.users = [];
    this.outSideService.getKvTeacherByUdiseCode(JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code).subscribe((response) => {
      this.teacherList = response;
      

      var srn = 0;
      for (let i = 0; i < this.teacherList.length; i++) {  
        
        // if(this.teacherList[i].dropBoxFlag == 0){          
          this.testData.sno = ""+(srn+1)+"";
          this.testData.name = this.teacherList[i].teacherName;
          var dateString = this.teacherList[i].teacherDob;
          dateString = new Date(dateString).toUTCString();
          dateString = dateString.split(' ').slice(0, 4).join(' ');
          this.testData.dob = dateString;
          this.testData.email = this.teacherList[i].teacherEmail;
          this.testData.mobile = this.teacherList[i].teacherMobile;
          this.testData.gender = (this.teacherList[i].teacherGender==1)?'Male':'Female';
          this.testData.systchcode = this.teacherList[i].systemTeacherCode;
          this.testData.teacherId = this.teacherList[i].teacherId;
          this.users.push(this.testData)
          this.testData = { "sno": "", "name": "", "dob": "", "email": "","mobile": "", "gender": "","systchcode":"", "a":"", "b":"", "c":"","d":"","teacherId":"" }
          srn++;
        // }        
      }      
    })

    setTimeout(()=>{
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },1000)    
  }
  // Code for getting teacher list by UdiseCode -- End

  // Below Code is for teacher View -- Start
  onViewClick(value) {
    for (let i = 0; i < this.teacherList.length; i++) {
      if(this.teacherList[i].teacherId == value){
        this.setDataService.setData(this.teacherList[i])
      }
    }    
    sessionStorage.removeItem('singleTeacherList')
    this.router.navigate(['/teacher/teacherHome'], { queryParams: { allowEdit: '1' } })
  }
  // Code for teacher Edit -- End

  // Below Code is for teacher Edit -- Start
  onEditClick(value) {
    for (let i = 0; i < this.teacherList.length; i++) {
      if(this.teacherList[i].teacherId == value){
        this.setDataService.setData(this.teacherList[i])
      }
    }    
    sessionStorage.removeItem('singleTeacherList')
    this.router.navigate(['/teacher/teacherHome'], { queryParams: { allowEdit: '2' } })
  }
  // Code for teacher Edit -- End

  //New Teacher Start
  newTeacher(){
    this.router.navigate(['/teacher/teacherHome'], {queryParams:{ allowEdit: '3' }})
  }
  //New Teacher End

  //Dropout type fnc start
  onDropoutType(event){
    this.dropoutTypeSelected = true;
    if(event.target.value == 1){
      this.dropoutType = true;
    }else if(event.target.value == 2){
      this.dropoutType = false
    }
  }
  //Dropout type end

  // Below Code is for teacher varification -- Start
  onVerifyClick(value) {
    sessionStorage.setItem('teacherId', value)
    for (let i = 0; i < this.teacherList.length; i++) {
      if(this.teacherList[i].teacherId == value){
        this.verifySingleTeacherList = this.teacherList[i]
      }
    } 
    
    
    this.modalService.open(this.test, { size: 'full', backdrop: 'static', keyboard: false });
  }

  onVerify(value) {
    if (value === 'true') {
      const data = {
        "teacherId": this.verifySingleTeacherList.teacherId,
        "udiseSchCode": this.verifySingleTeacherList.udiseSchCode
      }
      this.outSideService.getVerified(data).subscribe((response) => {
        this.verifiedSchCode = response
        for (let i = 0; i < this.teacherList.length; i++) {
          if(this.teacherList[i].teacherId == sessionStorage.getItem('teacherId')){
            this.teacherList[i].systemTeacherCode = this.verifiedSchCode.rowValue[0].system_teacher_code
          }
          if(this.users[i].teacherId == sessionStorage.getItem('teacherId')){
            this.users[i].systchcode = this.verifiedSchCode.rowValue[0].system_teacher_code
          }
        } 
      })
    }
    else if (value === 'false') {
    }
  }
  // Teacher varification Code -- End


  // Below Code is for putting teacher into Dropbox -- Start
  onDropboxClick(value) {    
    
    for (let i = 0; i < this.teacherList.length; i++) {
      if(this.teacherList[i].teacherId == value){
        this.setDataService.setDeletedData(this.teacherList[i])
        this.singleDeletedTeacher = this.teacherList[i]
        
      }
    }     

    this.modalService.open(this.DropBox, { size: 'md', backdrop: 'static', keyboard: false });
  }

  onDropoutTypeValue(event){
    this.dropoutTypeValue = event.target.value;
  }

  onVerifyDropbox(val){
    if(val == "true"){
      
      this.singleDeletedTeacher.dropBoxFlag = this.dropoutTypeValue;
      this.singleDeletedTeacher.dropboxFeedback = this.dropboxForm.value.feedback;
      this.singleDeletedTeacher.transferedUdiseSchCode = this.dropboxForm.value.udiseCode;
      
      this.updateTeacher();
    }else if(val == "false"){
    }
  }
  // Code for putting teacher into Dropbox -- End

  updateTeacher(){
    this.outSideService.saveSingleTeacher(this.singleDeletedTeacher).subscribe((response)=>{
      
      
      if(response){
        this.getTeacherByUdiseCode(this.udise_code)
      }
    })
  }


}


