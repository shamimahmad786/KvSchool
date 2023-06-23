import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
@Component({
  selector: 'app-sanctioned-all-post',
  templateUrl: './sanctioned-all-post.component.html',
  styleUrls: ['./sanctioned-all-post.component.css']
})
export class SanctionedAllPostComponent implements OnInit {
  sanctionedPost:FormGroup;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  schoolCode:any='';
  data: any;
  isEdit: boolean;
  regionList: any=[];
  stationList: any=[];
  schoolList:any=[];
  sanctionPostMappingDataListArray: any=[];
  returnTypeSrvTime: any;
  url: string;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  responseData: any;
  shiftAvailable: boolean = false;
  totalSanctionedPost:number = 0;
  totalSurplusPost:number = 0;
  totalOccupiedPost:number = 0;
  totalVacantPost:number = 0;
  regionSelection:any=1;
  stationSelection:any;
  regionCode:any;
  stationCode:any;
  selectedRegion:any;
businessTypeId:any;
businessTypeCode:any;
regionName:any;
stationName:any;
schoolName:any;
sanctionPostFor:any;
shift:any;
allList:any;
listDesignation: any=[];
displayedColumns:any = ['sno', 'regionName', 'stationName', 'schoolName','status','action'];
  testData = {sno: '',regionName:'', stationName: '', schoolName: '',schoolCode:'', status: ''};
  ngOnInit(): void { 
   
this.allList=[
  {
    "id": 1,
    "regionName": "AHMEDABAD",
    "stationName": "ANKLESHWAR(2)",
    "schoolName": "Kendriya Vidyalaya Ongc Ankleshwar(1006)",
    "schoolCode":"1006",
    "status": 1
  },
  {
    "id": 2,
    "regionName": "BENGALURU",
    "stationName": "BELLARY",
    "schoolName":"Kendriya Vidyalaya Crpf Teligaon(2198)" ,
    "schoolCode":"2055",
    "status": 0
  },
  {
    "id": 3,
    "regionName": "BHOPAL",
    "stationName": "BHOPAL",
    "schoolName": "R O Bhopal(1901)",
    "schoolCode":"1419",
    "status": 1
  }
]
  this.getDesignationList();
  }

  getDesignationList(){

          for (let i = 0; i < this.allList.length; i++) {
       
            this.testData.sno = '' + (i + 1) + '';
            this.testData.regionName = this.allList[i].regionName;
            this.testData.stationName =this.allList[i].stationName;
            this.testData.schoolName =this.allList[i].schoolName;
            this.testData.schoolCode =this.allList[i].schoolCode;
           
            if(this.allList[i].status ==1 )
            {
            this.testData.status = 'Freez';
            }
           if(this.allList[i].status ==0 )
            {
            this.testData.status ='NotFreez';
            } 
           
            this.listDesignation.push(this.testData);
            this.testData = { "sno": "", "regionName": "", "stationName": "", "schoolName": "","schoolCode":"","status": "" };
   
          }
    console.log(this.listDesignation)
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.listDesignation);
   
    }, 100)
      }
     
      edit(elem:any)
      {
console.log(elem.schoolCode)
this.url="/teacher/sanctioned-post"
this.router.navigate([this.url], {queryParams:{RegionName:1,StationName:2,SchoolCode:elem.schoolCode}});

      }

}
