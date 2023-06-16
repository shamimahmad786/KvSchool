import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  title = 'teacherNew';
  applicationId: any;
  kvicons: any;
  kvIfConditions: boolean = false;
  businessUnitTypeId:any;

  showNational:boolean = false;
  showRegion:boolean = false;
  showStation:boolean = false;
  showSchool:boolean = false;
  ngOnInit(): void {
    $(document).ready(function () {

      $(".side-toggler").on('click', function () {
  
          if($('.main-wrapper').hasClass('side-toggled')){
              $('.main-wrapper').removeClass('side-toggled')
           }else{
             $('.main-wrapper').addClass('side-toggled')
           }
      });

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
        console.log('business id : '+this.businessUnitTypeId);
        this.showSchool = true;
      }
  
  });
  }

  authlogout(){}
}