import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-institute-head',
  templateUrl: './add-institute-head.component.html',
  styleUrls: ['./add-institute-head.component.css']
})
export class AddInstituteHeadComponent implements OnInit {
  instituteType: any = [];
  addInstituteForm: FormGroup;
  addInstituteFormubmitted=false;
  regionList: any;
  loginUserNameForChild: any;
  constructor(private outSideService: OutsideServicesService) { }

  ngOnInit(): void {
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
  
      this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
     
    }
    this.addInstituteForm = new FormGroup({
      'instituteType': new FormControl('', Validators.required),
      'instituteCode': new FormControl('', Validators.required),
      'userName': new FormControl('', Validators.required),
      'Email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'Name': new FormControl('', Validators.required),
      'Mobile': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
    });
    this.instituteType=[ {
      "name": "Region Office(RO)",
      "value": "3"
    },{
    "name": "ZIET",
    "value": "5"
   }]
  }
  get f() { return this.addInstituteForm.controls; }
 
  getStationByRegionId(event:any){
    console.log(event.target.value)
  if(event.target.value==3){
  this.outSideService.fetchKvRegion(1).subscribe((res) => {
    this.regionList = res.response.rowValue;
    console.log("region list")
    console.log(this.regionList)
  })
  }
  }
  onSubmit(){
    this.addInstituteFormubmitted=true
    console.log(this.addInstituteForm)
    debugger
     const data ={
       "username":this.addInstituteForm.controls['userName'].value,
       "email":this.addInstituteForm.controls['Email'].value,
       "mobile":this.addInstituteForm.controls['Mobile'].value,
       "parentuser": this.loginUserNameForChild,
       "businessUnitTypeId":this.addInstituteForm.controls['instituteType'].value,
       "businessUnitTypeCode":this.addInstituteForm.controls['instituteCode'].value,
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
