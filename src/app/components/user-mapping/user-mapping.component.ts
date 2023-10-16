import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.css']
})
export class UserMappingComponent implements OnInit {
  addUserMapping: FormGroup;
  addUserMappingFormubmitted=false;
  endDateStatus=false
  regionList: any=[];
  loginUserNameForChild: any;
  roOfficeList: any=[];
  regionEmployeeSchoolList: any=[];
  duplicateregionCheck: any=[];
  userMappingAction: any;
  userMappingRegionId: any;
  controllerOfficeList: any;
  roOfficeCode: any;
  constructor(private outSideService: OutsideServicesService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params['action']); // 13467tdgbgfhjfgy
      this.userMappingAction=params['action'];
      this.userMappingRegionId=params['regionId'];
    });
    if(this.userMappingAction=="Add"){
    this.endDateStatus=false;
    }
  
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
  
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
     
    }
    this.addUserMapping = new FormGroup({
      'region': new FormControl('', Validators.required),
      'rooffice': new FormControl('', Validators.required),
      'empname': new FormControl('', Validators.required),
      'startdate':new FormControl('', Validators.required),
      'enddate': new FormControl(''),
    });
   this.getStationByRegionId(); 
   this.getControllerOffice();
  
  }
  get f() { return this.addUserMapping.controls; }
 
  getStationByRegionId(){
   
  this.outSideService.fetchKvRegion(1).subscribe((res) => {
    this.regionList = res.response.rowValue;
    console.log("region list")
    console.log(this.regionList)
  })
  }
 
  getRoOfficeByRegionId(event:any){
    debugger
    this.regionEmployeeSchoolList=[];
    this.roOfficeList=[];
console.log(event)
 var data={
  "regionCode":event
}
this.outSideService.getregionSchool(data,this.loginUserNameForChild).subscribe(res => {
 debugger
this.roOfficeList=res
this.roOfficeCode=res[0]['kvCode']
if(this.userMappingAction=='update'){
this.getRoEmpByRegionOfficeId(this.roOfficeCode);
}
console.log(res)
 },
 error => { 
  Swal.fire({
    'icon':'error',
     'text':'You are not Authorized.'
  })
 });
  }

  getRoEmpByRegionOfficeId(event:any){
    this.regionEmployeeSchoolList=[];
    var data={
      "kvCode":event
    }
    this.outSideService.getRegionSchoolEmployee(data,this.loginUserNameForChild).subscribe(res => {
      debugger
    this.regionEmployeeSchoolList=res
    console.log(res)
     },
     error => { 
      Swal.fire({
        'icon':'error',
         'text':'You are not Authorized.'
      })
     });
  }

  getControllerOffice() {
    this.controllerOfficeList = [];
    const data = {
     "controllerType":"R"
 }
 this.outSideService.getControllerOffice(data,this.loginUserNameForChild ).subscribe(res => {
  console.log("--controler ofice list---------")
     console.log(res)
     this.controllerOfficeList = res['response'];
     if(this.userMappingAction=="update"){

      this.endDateStatus=true;
      this.editeControler();
      }
    })
   
 }
 editeControler(){
  debugger
 for (let i = 0; i < this.controllerOfficeList.length; i++) {

    if(this.controllerOfficeList[i].regionCode==this.userMappingRegionId)
    {
      this.duplicateregionCheck.push(this.controllerOfficeList[i]);
    }
    this.getRoOfficeByRegionId(this.duplicateregionCheck[0]['regionCode'])
    debugger
 

  }
}

  onSubmit(){
    this.addUserMappingFormubmitted=true
    const splittedArray = this.addUserMapping.value.empname.split("/");
    var empCode= splittedArray[0];
    var empName= splittedArray[1];
    console.log(splittedArray)
    debugger
    for (let i = 0; i < this.controllerOfficeList.length; i++) {

      if(this.controllerOfficeList[i].regionCode==this.addUserMapping.value.region)
      {
        this.duplicateregionCheck.push(this.controllerOfficeList[i]);
      }
console.log("-----duplicate controler check----------")
console.log( this.duplicateregionCheck)
    if(this.duplicateregionCheck.length>0){
      Swal.fire({
        'icon':'error',
        'text':"please update controling officer"
      })
      return false;
    }

    }

if( this.userMappingAction=='Add'){
  var data = {
    "employeeCode":empCode,
    "employeeName":empName,
    "controllerType":"R",
    "regionCode":this.addUserMapping.value.region,
    "stationCode":"",
    "isActive":"1",
    "stateDate":this.addUserMapping.value.startdate,
    "endDate":"",
    "createdBy":this.loginUserNameForChild,
    "modifiedBy":this.loginUserNameForChild,

}
}
if( this.userMappingAction=='update'){
  var data = {
    "employeeCode":empCode,
    "employeeName":empName,
    "controllerType":"R",
    "regionCode":this.addUserMapping.value.region,
    "stationCode":"",
    "isActive":"1",
    "stateDate":this.addUserMapping.value.startdate,
    "endDate":"",
    "createdBy":this.loginUserNameForChild,
    "modifiedBy":this.loginUserNameForChild,

}
}
  //  return;
     console.log(data);
      this.outSideService.saveControllerOffice(data,this.loginUserNameForChild).subscribe(res => {
        console.log(res)
      Swal.fire({
        'icon':'success',
        'text':res['message']
      })
       },
       error => { 
        Swal.fire({
          'icon':'error',
           'text':'You are not Authorized.'
        })
       });

  }

}
