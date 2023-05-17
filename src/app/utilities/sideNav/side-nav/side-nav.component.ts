import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  applicationId: any;
  kvicons: any;
  kvIfConditions: boolean = false;
  businessUnitTypeId:any;

  showNational:boolean = false;
  showRegion:boolean = false;
  showStation:boolean = false;
  showSchool:boolean = false;
  constructor() {

  }

  ngOnInit(): void {
    this.applicationId = environment.applicationId;
    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
    }

    if (this.kvicons?.includes(this.applicationId)) {
      this.kvIfConditions = true;
    }else{
      this.kvIfConditions = false;
    }

    if(this.businessUnitTypeId == '2'){
      this.showNational = true;
    }else if(this.businessUnitTypeId == '3'){
      this.showRegion = true;
    }else if(this.businessUnitTypeId == '4'){
      this.showStation = true
    }else if(this.businessUnitTypeId == '5'){
      this.showSchool = true;
    }

  }

  checkFunction(){
    alert("called");
  }

}
