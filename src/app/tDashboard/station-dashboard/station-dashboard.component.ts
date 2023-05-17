import { Component, OnInit } from '@angular/core';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-station-dashboard',
  templateUrl: './station-dashboard.component.html',
  styleUrls: ['./station-dashboard.component.css']
})
export class StationDashboardComponent implements OnInit {

  
  kvicons: any;
  businessUnitTypeId: any;
  businessUnitTypeCode: any;
  dashboardData: any
  totalTeachingStaff: any;
  nontotalTeachingStaff: any;
  teachingNotVerified: any;
  nonteachingNotVerified:any;
  kvSchoolDetails:any;

  kvCode:any;

  
  kvSchoolList:any;
  stationCode1:any;
  regionCode:any;
  regionList:any;
  stationList:any;

  constructor(public outSideService: OutsideServicesService) { }

  ngOnInit(): void {

    

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      this.businessUnitTypeCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
    
      if (JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].application_id == environment.applicationId) {
        const data: any = {
          "extcall": "MOE_EXT_STATIONMAPPINGDATA",
          "conditionvalue": [JSON.parse(sessionStorage.getItem("authTeacherDetails")).applicationDetails[i].business_unit_type_code]
        }
        this.getMaster(data, this.businessUnitTypeId);
      }
    }

    this.getKvRegion();

    // if (this.kvicons?.includes(this.applicationId)) {
    //   this.kvIfConditions = true;
    // }else{
    //   this.kvIfConditions = false;
    // }

    if (this.businessUnitTypeId == '2') {
      // var data = {
      //   "businessUnitTypeId": this.businessUnitTypeId,
      //   "businessUnitTypeCode": this.businessUnitTypeCode
      // }
      
      // this.outSideService.fetchDashboardData(data).subscribe((res) => {
        
      //   this.dashboardData = res.response;

      //   this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
      //   this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1

      //   this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
      //     this.dashboardData.teachingTa * 1 +
      //     this.dashboardData.teachingSi * 1 +
      //     this.dashboardData.teachingNi * 1

      //   this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
      //     this.dashboardData.nonteachingSi * 1 +
      //     this.dashboardData.nonteachingTa * 1 +
      //     this.dashboardData.nonteachingTi * 1




      // })
      // this.showNational = true;
    } else if (this.businessUnitTypeId == '3') {
      // this.showRegion = true;
    } else if (this.businessUnitTypeId == '4') {
      var data = {
        "businessUnitTypeId": this.businessUnitTypeId,
        "businessUnitTypeCode": this.businessUnitTypeCode
      }
      
      this.outSideService.fetchDashboardData(data).subscribe((res) => {
        
        this.dashboardData = res.response;

        this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
        this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1

        this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
          this.dashboardData.teachingTa * 1 +
          this.dashboardData.teachingSi * 1 +
          this.dashboardData.teachingNi * 1

        this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
          this.dashboardData.nonteachingSi * 1 +
          this.dashboardData.nonteachingTa * 1 +
          this.dashboardData.nonteachingTi * 1

      })
      // this.showStation = true
    } else if (this.businessUnitTypeId == '5') {
      // this.showSchool = true;
    }

  }


  getMaster(data, business_unit_type_id) {
    
    this.outSideService.getMasterData(data).subscribe((res) => {
      

      var data1 = { 'business_unit_type_id': business_unit_type_id, "mappingData": JSON.parse(JSON.stringify(res.response)).rowValue }
      sessionStorage.setItem("mappingData", JSON.stringify(data1));
      
      this.kvSchoolDetails = JSON.parse(JSON.stringify(res.response)).rowValue[0];
      // this.getKvTeacherByUdiseCode();
      
    })
  }

  getStationByRegionId(val){
    var data = {
      "businessUnitTypeId":'3',
      "businessUnitTypeCode":val
    }

    this.outSideService.fetchDashboardData(data).subscribe((res)=>{
      this.dashboardData = res.response;

      this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
        this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1

        this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
          this.dashboardData.teachingTa * 1 +
          this.dashboardData.teachingSi * 1 +
          this.dashboardData.teachingNi * 1

        this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
          this.dashboardData.nonteachingSi * 1 +
          this.dashboardData.nonteachingTa * 1 +
          this.dashboardData.nonteachingTi * 1          
    })
    this.outSideService.fetchStationByRegionId(val).subscribe((res)=>{
      this.stationList = res.response;
      
    })
  }


  getKvRegion(){
    this.outSideService.fetchKvRegion(1).subscribe((res)=>{
      this.regionList = res.response;
      
    })
  }

  getKvSchoolByStationId(val){
    
    var data = {
      "businessUnitTypeId":'4',
      "businessUnitTypeCode":val
    }

    this.outSideService.fetchDashboardData(data).subscribe((res)=>{
      this.dashboardData = res.response;

      this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
        this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1

        this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
          this.dashboardData.teachingTa * 1 +
          this.dashboardData.teachingSi * 1 +
          this.dashboardData.teachingNi * 1

        this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
          this.dashboardData.nonteachingSi * 1 +
          this.dashboardData.nonteachingTa * 1 +
          this.dashboardData.nonteachingTi * 1          
    })

    this.outSideService.fetchKvSchoolByStationCode(val).subscribe((res)=>{
      this.kvSchoolList = res.response;
      this.stationCode1 = res.response[0].stationCode;
      this.regionCode = res.response[0].regionCode;
      // this.getStationByRegionId(res.response[0].regionCode);
      
    })
  }


  onSchoolSelect(val){

    var data = {
      "businessUnitTypeId":'5',
      "businessUnitTypeCode":val
    }

    this.outSideService.fetchDashboardData(data).subscribe((res)=>{
      
      this.dashboardData = res.response;

      this.totalTeachingStaff = this.dashboardData.teachingRegular * 1 + this.dashboardData.teachingContractual * 1
        this.nontotalTeachingStaff = this.dashboardData.nonteachingContractual * 1 + this.dashboardData.nonteachingRegular * 1

        this.teachingNotVerified = this.dashboardData.teachingTi * 1 +
          this.dashboardData.teachingTa * 1 +
          this.dashboardData.teachingSi * 1 +
          this.dashboardData.teachingNi * 1

        this.nonteachingNotVerified = this.dashboardData.nonteachingNi * 1 +
          this.dashboardData.nonteachingSi * 1 +
          this.dashboardData.nonteachingTa * 1 +
          this.dashboardData.nonteachingTi * 1          
    })
    
    var str = val;
    var splitted = str.split("-", 2);
    
    // this.udiseSchoolCode = splitted[0];
    // this.businessUnitTypeCode = splitted[1];
    this.kvCode = splitted[1];
    sessionStorage.setItem('kvCode',this.kvCode)
    // this.nationalLogin = true;
    // this.getSchoolDetailsByKvCode();
    // this.getKvTeacherByUdiseCode();
  }


  }


