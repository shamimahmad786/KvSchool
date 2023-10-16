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
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, formatDate } from '@angular/common';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';

// import { type } from 'os';
declare var $: any;
declare const srvTime: any;
@Component({
  selector: 'app-controler-management',
  templateUrl: './controler-management.component.html',
  styleUrls: ['./controler-management.component.css']
})
export class ControlerManagementComponent implements OnInit, AfterViewInit {

  displayedColumns = ['Sno', 'Employee Code', 'Employee name','Created By', 'Modified By','Start Date','End Date','Status','Action' ];
 
  hBSource : MatTableDataSource<any>;

  remarksForm: FormGroup;
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild('hBSort') hBSort: MatSort;
 @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>;   

  childUserData = { "sno": "","employeeCode": "", "employeeName": "","createdBy": "","modifiedBy": "","stateDate":"","endDate": "","regionCode":"","status": ""}
  applicationId: any;
  loginUsername: any;
  userType: boolean = true;
  userName: boolean = true;
  userEmail: boolean = true;
  userMobile: boolean = true;
  changePassword: boolean = true;
  staticUserType: boolean = false;
  staticUserName: boolean = false;
  staticUserEmail: boolean = false;
  staticUserMobile: boolean = false;
  staticChangePassword: boolean = false;
  activePaneOne: boolean = true;
  activePaneTwo: boolean = false;
  businessUnitTypeId: any;
  userTypeValue: string;
  loginUserMobile:any;
  loginUserEmail:any;
  loginUserNameForChild: any;
  controllerOfficeList:any;
  controllerOfficeDataArray: any = [];
  newChildUserListArr: any = [];
  showFirstButtonColor: boolean = true;
  showsecondButtonColor: boolean = false;
  selectedLanguage: string;
  password: any;
  confirmpassword: any;
  loginUserNameForService: any;
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private router: Router, private modalService: NgbModal, private setDataService: DataService,private toastr: ToastrService) { }

  ngOnInit(): void {
   
    this.applicationId = environment.applicationId;
    this.getLoginUserdetail();
    
  }
  ngAfterViewInit(): void {
  }
  getLoginUserdetail(){
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
      this.loginUsername=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].firstname + " "+ JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].lastname;
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      this.loginUserEmail=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].email;
      this.loginUserMobile=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].mobile;
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
      this.loginUserNameForService=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    this.getControllerOffice();
  }
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.hBSource.filter = filterValue;
  }

  //**********************   Logic for get  Data from Api  ******************************
  getControllerOffice() {
     this.controllerOfficeList = [];
     const data = {
      "controllerType":"R"
  }
  this.outSideService.getControllerOffice(data,this.loginUserNameForService ).subscribe(res => {
      console.log(res)
      this.controllerOfficeList = res['response'];
      this.setToJoingMatTable(this.controllerOfficeList);
     })
  }
  navColor(nav:any){
    if(nav=='transferin')
    {
      this.showFirstButtonColor=true;
      this.showsecondButtonColor=false;
      this.activePaneOne=true;
      this.activePaneTwo=false;
    }else{
      this.showFirstButtonColor=false;
      this.showsecondButtonColor=true;
      this.activePaneOne=false;
      this.activePaneTwo=true;
    } 
  }
  //********************** Joining Data Set in to Table ******************************
   setToJoingMatTable(data:any) {
    this.controllerOfficeDataArray = [];
    for (let i = 0; i < data.length; i++) {
      this.childUserData.sno = '' + (i + 1) + '';
      this.childUserData.employeeCode =data[i].employeeCode;
      this.childUserData.employeeName = data[i].employeeName;
      this.childUserData.createdBy = data[i].createdBy;
      this.childUserData.modifiedBy = data[i].modifiedBy;  
      this.childUserData.stateDate =data[i].stateDate;  
      this.childUserData.endDate = data[i].endDate;  
      this.childUserData.regionCode = data[i].regionCode;  
      this.childUserData.status = data[i].isActive;  
      this.controllerOfficeDataArray.push(this.childUserData);
      this.childUserData = { "sno": "","employeeCode": "", "employeeName": "","createdBy": "","modifiedBy": "","stateDate":"","endDate": "","regionCode":"","status": ""}
    }
    setTimeout(() => {
      this.hBSource  = new MatTableDataSource(this.controllerOfficeDataArray);
      this.hBSource .paginator = this.paginator;
      this.hBSource .sort = this.hBSort;  
    }, 100)
  }
  childActiveDeactive(action:any,userName:any)
  { 
    debugger
    const data ={
    "updateType":"AD",
    "username":userName,
    "value":action
   }
    this.outSideService.childActiveDeactiveAction(data,this.loginUserNameForService).subscribe(res => {
      Swal.fire({
        'icon':'success',
        'text':res['response']
      })
        this.getLoginUserdetail();
       })
  }
  addUpdateUserMapping(regionId:any,event:any){
    debugger
    if(event=='add'){
      this.router.navigate(['/teacher/user-mapping'], { queryParams: { action: 'Add' } });  
    }
    if(event=='update'){
      this.router.navigate(['/teacher/user-mapping'], { queryParams: { action: 'update',regionId :regionId} });  
    }
  }
 
  enableInputField(event:any){
    if(event=='staticUserEmail'){
      this.staticUserEmail=true;
      this.userEmail=false;
     
      this.staticUserMobile=false;
      this.userMobile=true;
      this.staticChangePassword=false;
      this.changePassword=true;
    }else if(event=='staticUserMobile'){
      this.staticUserMobile=true;
      this.userMobile=false;
     
      this.staticUserEmail=false;
      this.userEmail=true;
      this.staticChangePassword=false;
      this.changePassword=true;
    }else if(event=='staticChangePassword'){
      this.staticChangePassword=true;
      this.changePassword=false;
    
      this.staticUserEmail=false;
      this.userEmail=true;
      this.staticUserMobile=false;
      this.userMobile=true;
    }
   
console.log(event)
  }

  editChildUser(userName:any,type:any){
    this.showFirstButtonColor=false;
    this.showsecondButtonColor=true;
    this.activePaneOne=false;
    this.activePaneTwo=true;
    this.newChildUserListArr=[];
    debugger
    for (let i = 0; i < this.controllerOfficeList.length; i++) {
      if ( this.controllerOfficeList[i]['username']== userName) {
        this.newChildUserListArr.push(this.controllerOfficeList[i]);
      }
    }
    console.log(this.newChildUserListArr)
    this.loginUserNameForChild =this.newChildUserListArr[0]['username']
    this.loginUserMobile=this.newChildUserListArr[0]['mobile']
    this.loginUserEmail=this.newChildUserListArr[0]['email']
    
  }
  saveProfileData(val:any,userName:any,type:any){
    debugger
  if(type=='email'){
    var filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!filter.test(val)) {
    Swal.fire({
      'icon':'error',
      'text':'Please provide a valid email address.'
    })
    return false;
    }
    else{
    this.staticUserEmail=false;
    this.userEmail=true;
    var data = {
        "updateType":"E",
        "username":userName,
        "value":val
    }
    }
  }
  if(type=='mobile'){
    var filter = /^[6-9]{1}[0-9]{9}$/;
  if (!filter.test(val)) {
    Swal.fire({
      'icon':'error',
      'text':'Please provide a valid mobile number.'
    })
    return false;
    }
    else{
      this.staticUserMobile=false;
      this.userMobile=true;
      var data = {
        "updateType":"M",
        "username":userName,
        "value":val
    }
    }
  }
  if(type=='password'){
    this.password= (<HTMLInputElement>document.getElementById("staticChangePassword")).value;
    this.confirmpassword = (<HTMLInputElement>document.getElementById("staticConfirmChangePassword")).value;

  if (this.password!=this.confirmpassword) {
    Swal.fire({
      'icon':'error',
      'text':'New password and confirm password are not same.....'
    })
    return false;
    }
    else{
      this.staticChangePassword=false;
      this.changePassword=true;
      var data = {
        "updateType":"p",
        "username":userName,
        "value":this.confirmpassword
    }
    }
  }
this.outSideService.childActiveDeactiveAction(data,this.loginUserNameForService).subscribe(res => {
    this.showFirstButtonColor=true;
    this.showsecondButtonColor=false;
    this.activePaneOne=true;
    this.activePaneTwo=false;
  Swal.fire({
    'icon':'success',
    'text':res['response']
  })
  
    this.getLoginUserdetail();
   },
   error => { 
    Swal.fire({
      'icon':'error',
       'text':'You are not Authorized.'
    })
   });
  } 
}
      
