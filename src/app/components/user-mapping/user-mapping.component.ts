import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-mapping',
  templateUrl: './user-mapping.component.html',
  styleUrls: ['./user-mapping.component.css']
})
export class UserMappingComponent implements OnInit {
  instituteType: any = [];
  addUserMapping: FormGroup;
  addUserMappingFormubmitted=false;
  regionList: any;
  loginUserNameForChild: any;
  constructor(private outSideService: OutsideServicesService) { }

  ngOnInit(): void {
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
  
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
     
    }
    this.addUserMapping = new FormGroup({
      'region': new FormControl('', Validators.required),
      'rooffice': new FormControl('', Validators.required),
      'empname': new FormControl('', Validators.required),
      'startdate':new FormControl('', Validators.required),
      'enddate': new FormControl('', Validators.required),
    });
   this.getStationByRegionId(); 
  }
  get f() { return this.addUserMapping.controls; }
 
  getStationByRegionId(){
  
  this.outSideService.fetchKvRegion(1).subscribe((res) => {
    this.regionList = res.response.rowValue;
    console.log("region list")
    console.log(this.regionList)
  })
  }
  getroOfficeByRegionId(event:any){
console.log(event.target.value)
  }
  onSubmit(){
    this.addUserMappingFormubmitted=true
    console.log(this.addUserMapping)
    debugger
     const data ={
       "username":this.addUserMapping.controls['region'].value,
       "email":this.addUserMapping.controls['rooffice'].value,
       "mobile":this.addUserMapping.controls['empname'].value,
       "businessUnitTypeId":this.addUserMapping.controls['startdate'].value,
       "businessUnitTypeCode":this.addUserMapping.controls['enddate'].value,
      }
      this.outSideService.createInstitutionUser(data,this.loginUserNameForChild).subscribe(res => {
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
