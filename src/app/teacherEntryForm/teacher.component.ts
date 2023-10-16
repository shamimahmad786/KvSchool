import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  timeLeft: number = 15;
  logoutLink = environment.LOGOUT_URL
  showNational:boolean = false;
  showRegion:boolean = false;
  showStation:boolean = false;
  showSchool:boolean = false;
  username: any;
  loginUserNameForChild: any;
  constructor(private router: Router) {

  }
  ngOnInit(): void {

    const dashboardSideBar = document.querySelector(".sidebar");
    const dashboardRemainingPart = document.querySelector(".dashboard--remaining--width");
    const closeSideBar = document.querySelector(".dashboard-chevron-left");
    const openSideBar = document.querySelector(".dashboard-chevron-right");
    // Close Sidebar
    let x = window.matchMedia("(max-width: 1400px)")
    
    const changeMediaQueries = (x) => {
        if (x.matches) { // If media query matches
            dashboardSideBar["style"].left = "-100%";
            dashboardRemainingPart["style"].marginLeft = "0px";
        } else {
            openSideBar["style"].display = "none";
        }
    }
    changeMediaQueries(x);
    
    closeSideBar.addEventListener("click", () => {
        dashboardSideBar["style"].left = "-100%";
        dashboardRemainingPart["style"].marginLeft = "0px";
        dashboardRemainingPart["style"].width = "100%";
        openSideBar["style"].display = "block";
    });
    
    // Open side bar icon hide
    // openSideBar.style.display = "none";
    // Open sidebar
    openSideBar.addEventListener("click", () => { 
        dashboardSideBar["style"].left = "0px";
        dashboardRemainingPart["style"].marginLeft = "320px";
        openSideBar["style"].display = "none";
    });
    
      this.applicationId = environment.applicationId;
      for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
        console.log(JSON.parse(sessionStorage.getItem("authTeacherDetails")));
        this.username=JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].firstname + " "+ JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].lastname;
        this.loginUserNameForChild=JSON.parse(sessionStorage.getItem("authTeacherDetails")).user_name;
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

  }

  authlogout(){   
    if(sessionStorage.getItem("loginType")=="jwt"){
          this.router.navigate(['/mainPage']);
    }else if(sessionStorage.getItem("loginType")=="auth"){
      window.location.href=this.logoutLink;
    }
    sessionStorage.clear();
    }
}