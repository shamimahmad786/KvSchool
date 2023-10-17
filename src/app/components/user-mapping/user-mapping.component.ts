import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.css']
})
export class UserMappingComponent implements OnInit {
  displayedColumns = ['Sno', 'Institution Name', 'Employee name', 'Modified By','Status'];
 
  userMappingSource : MatTableDataSource<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('userMappingSort') userMappingSort: MatSort;
  @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>; 
  childUserData = { "sno": "","institutionName": "","employeeName": "","modifiedBy": "","status": ""}
  addUserMapping: FormGroup;
  addUserMappingFormubmitted=false;
  regionReadOnly=false;
  endDateStatus=false
  regionList: any=[];
  loginUserNameForChild: any;
  roOfficeList: any=[];
  regionEmployeeSchoolList: any=[];
  duplicateregionCheck: any=[];
  historyControlingOfficedata: any=[];
  userMappingAction: any;
  userMappingRegionCode: any;
  controllerOfficeList: any;
  roOfficeCode: any;
  historyControllerOfficeDataArray: any = [];
  constructor(private outSideService: OutsideServicesService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userMappingAction=params['action'];
      this.userMappingRegionCode=params['regionId'];
    });
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
    }
    if(this.userMappingAction=="Add"){
    this.endDateStatus=false;
    this.regionReadOnly=true;
    this.addUserMapping = new FormGroup({
      'region': new FormControl('', Validators.required),
      'rooffice': new FormControl('', Validators.required),
      'empname': new FormControl('', Validators.required),
      'startdate':new FormControl('', Validators.required),
      'enddate': new FormControl(''),
    });
  }           
  if(this.userMappingAction=="update"){
    this.addUserMapping = new FormGroup({
      'region': new FormControl('', Validators.required),
      'rooffice': new FormControl('', Validators.required),
      'empname': new FormControl('', Validators.required),
      'startdate':new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
    });
  }
  if(this.userMappingAction=="view"){
   this.viewControlerHeirechy();
  }
   this.getControllerOffice();
  
  }
  get f() { return this.addUserMapping.controls; }
 
  getStationByRegionId(regionCode:any){
   
  this.outSideService.fetchKvRegion(1).subscribe((res) => {
    this.regionList = res.response.rowValue;
    console.log("region list")
    console.log(this.regionList)
    
  })
  }
 
  getRoOfficeByRegionId(event:any){
    this.regionEmployeeSchoolList=[];
    this.roOfficeList=[];
    var data={
      "regionCode":event
    }
    this.outSideService.getregionSchool(data,this.loginUserNameForChild).subscribe(res => {
    debugger
    this.roOfficeList=res
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
    const roOfficeCodename = event.split("/");
    var roOfficeCode= roOfficeCodename[0];
    var data={
      "kvCode":roOfficeCode
    }
    this.outSideService.getRegionSchoolEmployee(data,this.loginUserNameForChild).subscribe(res => {
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
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.userMappingSource.filter = filterValue;
  }
  getControllerOffice() {
    this.controllerOfficeList = [];
    const data = {
     "controllerType":"R"
  }
 this.outSideService.getControllerOffice(data,this.loginUserNameForChild ).subscribe(res => {
     this.controllerOfficeList = res['response']['rowValue'];
     if(this.userMappingAction=="update"){
      this.endDateStatus=true;
      this.editeControler();
      }
      if(this.userMappingAction=="Add"){
        this.addControler();
        }
      
    })
 }

    addControler(){
      debugger
      this.getStationByRegionId(this.userMappingRegionCode);
      this.getRoOfficeByRegionId(this.userMappingRegionCode);
      this.addUserMapping.patchValue({
        region:this.userMappingRegionCode,
      })
    }

    editeControler(){
      debugger
    for (let i = 0; i < this.controllerOfficeList.length; i++) {

        if(this.controllerOfficeList[i].region_code==this.userMappingRegionCode)
        {
          this.duplicateregionCheck.push(this.controllerOfficeList[i]); 
        }
      }
      this.getStationByRegionId(this.duplicateregionCheck[0]['region_code']);
      this.getRoOfficeByRegionId(this.duplicateregionCheck[0]['region_code']);
      this.getRoEmpByRegionOfficeId(this.duplicateregionCheck[0]['institution_code']+'/'+this.duplicateregionCheck[0]['institutionname']);
      this.addUserMapping.patchValue({
        region:this.duplicateregionCheck[0]['region_code'],
        rooffice:this.duplicateregionCheck[0]['institution_code']+'/'+this.duplicateregionCheck[0]['institutionname'],
        empname:this.duplicateregionCheck[0]['employee_code']+'/'+this.duplicateregionCheck[0]['employee_name'],
        startdate:this.duplicateregionCheck[0]['state_date']
      })
    }
    viewControlerHeirechy(){
      var data={
        "regionCode":this.userMappingRegionCode,
         "controllerType":"R"
      }
      this.outSideService.getControllerOfficeHistory(data,this.loginUserNameForChild).subscribe(res => {
        console.log(res)
        this.historyControlingOfficedata=res['response'];
        this.historyControllerOfficeDataArray = [];
        for (let i = 0; i < this.historyControlingOfficedata.length; i++) {
          this.childUserData.sno = '' + (i + 1) + '';
          this.childUserData.institutionName =this.historyControlingOfficedata[i].institutionName;
          this.childUserData.employeeName =this.historyControlingOfficedata[i].employeeName;
          this.childUserData.modifiedBy = this.historyControlingOfficedata[i].modifiedBy;
          this.childUserData.status = this.historyControlingOfficedata[i].isActive;
          this.historyControllerOfficeDataArray.push(this.childUserData);
          this.childUserData = { "sno": "","institutionName": "","employeeName": "","modifiedBy": "","status": ""}
        }
        setTimeout(() => {
          this.userMappingSource  = new MatTableDataSource(this.historyControllerOfficeDataArray);
          this.userMappingSource .paginator = this.paginator;
          this.userMappingSource .sort = this.userMappingSort;  
        }, 100)


      },
      error => { 
        Swal.fire({
          'icon':'error',
          'text':'You are not Authorized.'
        })
      });
    }
  onSubmit(){
    this.addUserMappingFormubmitted=true
    const splittedArrayEmp = this.addUserMapping.value.empname.split("/");
    var empCode= splittedArrayEmp[0];
    var empName= splittedArrayEmp[1];
    const splittedArrayInstitution = this.addUserMapping.value.rooffice.split("/");
    var institutionCode= splittedArrayInstitution[0];
    var institutionName= splittedArrayInstitution[1];

    if( this.userMappingAction=='Add' && this.addUserMapping.value.region ==  this.userMappingRegionCode){
    for (let i = 0; i < this.controllerOfficeList.length; i++) {
      if(this.controllerOfficeList[i].regionCode==this.addUserMapping.value.region)
      {
        this.duplicateregionCheck.push(this.controllerOfficeList[i]);
      }
    if(this.duplicateregionCheck.length>0){
      Swal.fire({
        'icon':'error',
        'text':"Please update the current controling officer end date.."
      })
      return false;
    }
    }
  const data = {
    "employeeCode":empCode,
    "employeeName":empName,
    "controllerType":"R",
    "regionCode":this.addUserMapping.value.region,
    "stationCode":"",
    "institutionCode":institutionCode,
    "institutionName":institutionName,
    "isActive":"1",
    "stateDate":this.addUserMapping.value.startdate,
    "endDate":"",
    "createdBy":this.loginUserNameForChild,
    "modifiedBy":this.loginUserNameForChild,
}
console.log(data)
//return;
    this.outSideService.saveControllerOffice(data,this.loginUserNameForChild).subscribe(res => {
      console.log(res)
    Swal.fire({
      'icon':'success',
      'text':res['message']
    })
    this.router.navigate(['/teacher/controler-management'])
    },
    error => { 
      Swal.fire({
        'icon':'error',
        'text':'You are not Authorized.'
      })
    });
}
if( this.userMappingAction=='update'){
  const data = {
    "employeeCode":empCode,
    "employeeName":empName,
    "controllerType":"R",
    "regionCode":this.addUserMapping.value.region,
    "stationCode":"",
    "institutionCode":institutionCode,
    "institutionName":institutionName,
    "isActive":"0",
    "stateDate":this.addUserMapping.value.startdate,
    "endDate":this.addUserMapping.value.enddate,
    "id":this.duplicateregionCheck[0]['id'],
    "createdBy":this.loginUserNameForChild,
    "modifiedBy":this.loginUserNameForChild,

}
console.log(data)

this.outSideService.saveControllerOffice(data,this.loginUserNameForChild).subscribe(res => {
  console.log(res)
Swal.fire({
  'icon':'success',
  'text':res['message']
})
this.router.navigate(['/teacher/controler-management'])
 },
 error => { 
  Swal.fire({
    'icon':'error',
     'text':'You are not Authorized.'
  })
 });
}
}

}
