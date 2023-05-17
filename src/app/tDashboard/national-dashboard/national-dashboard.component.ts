import { Component, OnInit } from '@angular/core';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';
import {
  ColDef,
  GridReadyEvent,
  RowGroupingDisplayType,
} from 'ag-grid-community';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
@Component({
  selector: 'app-national-dashboard',
  templateUrl: './national-dashboard.component.html',
  styleUrls: ['./national-dashboard.component.css']
})
export class NationalDashboardComponent implements OnInit {

  kvicons: any;
  businessUnitTypeId: any;
  businessUnitTypeCode: any;
  dashboardData: any
  totalTeachingStaff: any;
  nontotalTeachingStaff: any;
  teachingNotVerified: any;
  nonteachingNotVerified: any;
  kvSchoolDetails: any;
  kvCode: any;


  kvSchoolList: any;
  stationCode1: any;
  regionCode: any;
  regionList: any;
  stationList: any;

  regionFlag: boolean = false;
  stationFlag: boolean = false;
  schoolFlag: boolean = false;

  regionId: any;
  stationId: any;
  schoolId: any;
  agGridCondition:any;
  showDiv = {
    next: false
  }
  constructor(public outSideService: OutsideServicesService) { }

  ngOnInit(): void {
    this.getKvRegion();
  }

  getStationByRegionId(val) {
    var data = {
      "businessUnitTypeId": '3',
      "businessUnitTypeCode": val
    }
    if (val == "all") {
      var reportValue = {
        "reportflag": "A",
        "reportvalue": ''
      }
    } else {
      reportValue = {
        "reportflag": "R",
        "reportvalue": val
      }
    }
    this.agGridCondition = reportValue;
    this.regionId = val;
    this.regionFlag = true;
    this.stationFlag = false;
    this.schoolFlag = false;

    this.dashboardReportData(reportValue)

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
    this.outSideService.fetchStationByRegionId(val).subscribe((res) => {
      this.stationList = res.response;

    })
  }

  getKvRegion() {
    var data = {
      "reportflag": "A",
      "reportvalue": ""
    }
    this.agGridCondition = data;
    this.dashboardReportData(data);
    this.outSideService.fetchKvRegion(1).subscribe((res) => {
      this.regionList = res.response;
    })
  }

  getKvSchoolByStationId(val) {
    if (val == 'all') {
      var reportValue = {
        "reportflag": "R",
        "reportvalue": this.regionId
      }
    } else {
      reportValue = {
        "reportflag": "S",
        "reportvalue": val
      }
    }
    this.agGridCondition = reportValue;
    this.stationId = val;
    this.stationFlag = true;
    this.schoolFlag = false;
    this.dashboardReportData(reportValue)
    var data = {
      "businessUnitTypeId": '4',
      "businessUnitTypeCode": val
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

    this.outSideService.fetchKvSchoolByStationCode(val).subscribe((res) => {
      this.kvSchoolList = res.response;
      this.stationCode1 = res.response[0].stationCode;
      this.regionCode = res.response[0].regionCode;
    })
  }


  onSchoolSelect(val) {
    var data = {
      "businessUnitTypeId": '5',
      "businessUnitTypeCode": val
    }
    if (val == 'all') {
      var reportValue = {
        "reportflag": "S",
        "reportvalue": this.stationId
      }
    } else {
      reportValue = {
        "reportflag": "SCH",
        "reportvalue": val
      }
    }
    this.agGridCondition = reportValue;
    this.schoolId = val;
    this.schoolFlag = true;
    this.dashboardReportData(reportValue);
  }


  dashboardReportData(data) {
    this.outSideService.dashboardReportData(data).subscribe((res) => {
      this.dashboardData = res.response[0];
    })
  }






  columnDefs = [
    { headerName: 'Region Name', field: 'region_name', rowGroup: true, hide: true },
    { headerName: 'Station Name', field: 'station_name', rowGroup: true, hide: true },
    { headerName: 'School Name', field: 'kv_name', rowGroup: true, hide: true },
    { headerName: 'Udise Code', field: 'udise_sch_code' },
    { headerName: 'Total Staff', field: 'total_staff_all' },


    {
      headerName: 'Teaching staff',
      children: [
        { headerName: 'Total Teaching Staff', field: 'total_teacher_all', aggFunc: 'sum' },
        { headerName: 'Total Pending at teacher', field: 'total_teacher_initiated', aggFunc: 'sum' },
        { headerName: 'Total Teacher Confirmed', field: 'total_teacher_approved', aggFunc: 'sum' },
        { headerName: 'Total School Initiated', field: 'total_teacher_school_initiated', aggFunc: 'sum' },
        { headerName: 'Total Pending at school', field: 'total_teacher_school_edited', aggFunc: 'sum' },
        { headerName: 'Total Teacher verified', field: 'total_teacher_school_approved', aggFunc: 'sum' },
        { headerName: 'Total Teacher not initiated', field: 'total_teacher_not_initiatedat_any_level', aggFunc: 'sum' },
        { headerName: 'Total Teacher Dropbox', field: 'total_teacher_dropbox_teacher', aggFunc: 'sum' }
      ]
    },
    {
      headerName: 'Non Teaching staff',
      children: [
        { headerName: 'Total Non-Teaching Staff', field: 'total_non_teacher_all', aggFunc: 'sum' },
        { headerName: 'Total Pending at teacher', field: 'total_non_teacher_initiated', aggFunc: 'sum' },
        { headerName: 'Total Teacher Confirmed', field: 'total_non_teacher_approved', aggFunc: 'sum' },
        { headerName: 'Total School Initiated', field: 'total_non_teacher_school_initiated', aggFunc: 'sum' },
        { headerName: 'Total Pending at school', field: 'total_non_teacher_school_edited', aggFunc: 'sum' },
        { headerName: 'Total Staff verified', field: 'total_non_teacher_school_approved', aggFunc: 'sum' },
        { headerName: 'Total Staff not initiated', field: 'total_non_teacher_not_initiatedat_any_level', aggFunc: 'sum' },
        { headerName: 'Total Staff Dropbox', field: 'total_non_teacher_dropbox_teacher', aggFunc: 'sum' },
      ]
    },
    { headerName: 'Total Staff Not Initiated', field: 'not_initiatedat_any_level', aggFunc: 'sum' },
    { headerName: 'Total  Staff Dropbox', field: 'dropbox', aggFunc: 'sum' },

  ];

  rowData = [];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    resizable: true,
  };
  public autoGroupColumnDef: ColDef = {
    // headerValueGetter: params => `${params.colDef.headerName} Group Column`,
    minWidth: 220,
    // cellRendererParams: {
    //     suppressCount: true,
    //     checkbox: true,
    // }
  };
  public groupDisplayType: RowGroupingDisplayType = 'multipleColumns';
  gridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      filter: true,
    },
    // debug: true,
    columnDefs: this.columnDefs,
    suppressAggFuncInHeader: true,
    rowData: null,
  };

  getDataOnMoreClick() {
    // const data = {
    //   "reportflag": "A",
    //   "reportvalue": "1"
    // }
    this.outSideService.getDashboardOnMoreClick(this.agGridCondition).subscribe((res) => {
      this.rowData = res.response;
    })

  }

}
