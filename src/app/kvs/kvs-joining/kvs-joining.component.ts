import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/teacherEntryForm/service/internalService/data-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as bcrypt from 'bcryptjs';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, formatDate } from '@angular/common';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import * as moment from 'moment';
// import { type } from 'os';
declare var $: any;
declare const srvTime: any;
@Component({
  selector: 'app-kvs-joining',
  templateUrl: './kvs-joining.component.html',
  styleUrls: ['./kvs-joining.component.css']
})
export class KvsJoiningComponent implements OnInit, AfterViewInit {

  displayedColumns = ['sno', 'empcode', 'name','postName', 'subjectName','transferGround','relivingdate','joiningdate','From','action'];
  displayedColumnsOut = ['sno', 'empcode', 'name','postName', 'subjectName','transferGround','relivingdate','To','action'];
  hBSource : MatTableDataSource<any>;
  sBSource : MatTableDataSource<any>;
  remarksForm: FormGroup;
 @ViewChild('paginator') paginator: MatPaginator;
 @ViewChild('paginatorOut') paginatorOut: MatPaginator;
 @ViewChild('hBSort') hBSort: MatSort;
 @ViewChild('sBSort') sBSort: MatSort;
 @ViewChild('JoiningBox', { static: true }) JoiningBox: TemplateRef<any>;   
 @ViewChild('RelivingBox', { static: true }) RelivingBox: TemplateRef<any>;
  relevingData = { "sno": "","empcode": "", "name": "","postName": "","subjectName": "","join_relieve_flag":"","transferGround":"","relivingdate": "","teacher_id":"","From":"","allot_kv_code":"","To":""}
  joiningData = { "sno": "","empcode": "", "name": "","postName": "","subjectName": "","transferGround":"","relivingdate": "","joiningdate": "","join_relieve_flag":"","teacher_id":"","from_kv":"","From":"","To":""}
  relevingDataArray: any = [];
  joiningDataArray: any = [];
  teacherJoiningArray: any;
  teacherReliveArray: any;
  userName: any;
  businessUnitTypeCode: any;
  stationNameCode: any = null;
  stationCode: any;
  kvNameCode: any = null;
  udiseSchCode: any;
  kvCode: any;
  deleteDocUpdate1: boolean = true;
  responseData: any = {};
  businessUnitTypeId: any;
  showFirstButtonColor: boolean = true;
  showsecondButtonColor: boolean = false;
  showNationalSelector: boolean = false
  nationalLogin: boolean = true;
  disabledCreateButton: boolean = false;
  isNationalLogin:boolean = false;
  user_name:any;
  employeeTransferIn: FormGroup;
  employeeTransferOut: FormGroup;
  kvTeacher: any;
  fileUpload: boolean = true;
  documentUploadArray: any[] = [];
  enableUploadButton1: boolean = false;
  teacherList:any;
  result: any;
  flagUpdatedList:any
  onClickRelevingTeacherId: any;
  onClickJoiningTeacherId: any;
  onClickEmplCode: any;
  teacherName:any;
  fromKvCode:any;
  onClickRelEmplCode:any
  returnTypeSrvTime: any;
  maxDate: any;
  teacherRelName: any;
  constructor(private pdfService: MasterReportPdfService,private date: DatePipe,private outSideService: OutsideServicesService, private router: Router, private modalService: NgbModal, private setDataService: DataService,private toastr: ToastrService) { }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.returnTypeSrvTime = srvTime();
    var date = new Date(this.returnTypeSrvTime),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    this.maxDate =  [date.getFullYear(), mnth, day].join("-");
    console.log("server dataaat--"+ [date.getFullYear(), mnth, day].join("-"))
    this.employeeTransferIn = new FormGroup({
      JoiningDate: new FormControl('', Validators.required),
    });   
    this.employeeTransferOut = new FormGroup({
       relievingDate: new FormControl('', Validators.required),
    });

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      this.userName = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].user_name;
      this.businessUnitTypeCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.kvCode = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_code;
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
    }

    if (this.businessUnitTypeId != '2' && this.businessUnitTypeId != '3' && this.businessUnitTypeId != '4') {
      this.disabledCreateButton = false;
      this.getKvTeacherRelevingJoiningDetails();
    }
  }
  ngAfterViewInit(): void {
  }
  applyFilterHBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.hBSource.filter = filterValue;
  }
  applyFilterSBSource(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.hBSource.filter = filterValue;
  }
  //**********************   Logic for get  Data from Api  ******************************
  getKvTeacherRelevingJoiningDetails() {
     this.teacherList = [];
     const data={"kvCode":this.kvCode};
     this.outSideService.getEmployeetransferDetails(data).subscribe((res) => {
       this.teacherList = res.response;
       var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
      };
      this.result = groupBy(this.teacherList['rowValue'], 'trans_type');
      console.log( this.result)
      this.teacherReliveArray = this.result[2]
      this.teacherJoiningArray = this.result[1]
      this.setToRelivingMatTable(this.teacherReliveArray);
      this.setToJoingMatTable(this.teacherJoiningArray);
     })
  }
  navColor(nav:any){
    if(nav=='transferin')
    {
      this.showFirstButtonColor=true;
      this.showsecondButtonColor=false;
    }else{
      this.showFirstButtonColor=false;
      this.showsecondButtonColor=true;
    } 
  }
  //********************** Joining Data Set in to Table ******************************
   setToJoingMatTable(data) {
    this.joiningDataArray = [];
    this.kvTeacher = data;
    for (let i = 0; i < data.length; i++) {
      this.joiningData.sno = '' + (i + 1) + '';
      this.joiningData.empcode = data[i].teacher_employee_code;
      this.joiningData.name = data[i].teacher_name;
      this.joiningData.postName = data[i].post_name;
      this.joiningData.subjectName = data[i].subject_name;  
      this.joiningData.relivingdate = data[i]?.relieve_date;
      this.joiningData.joiningdate = data[i]?.join_date;
      this.joiningData.join_relieve_flag = data[i]?.join_relieve_flag;
      this.joiningData.transferGround= data[i].ground_level;
      this.joiningData.teacher_id= data[i].teacher_id;    
      this.joiningData.from_kv= data[i].from_kv;
      this.joiningData.From= data[i].from_kv_name;
      this.joiningData.To= data[i].kv_name_alloted;
      this.joiningDataArray.push(this.joiningData);
      this.joiningData = { "sno": "","empcode": "", "name": "","postName": "","subjectName": "","transferGround":"","relivingdate": "","joiningdate":"","join_relieve_flag":"","teacher_id":"","from_kv":"","From":"","To":""}
    }
    setTimeout(() => {
      this.hBSource  = new MatTableDataSource(this.joiningDataArray);
      this.hBSource .paginator = this.paginator;
      this.hBSource .sort = this.hBSort;  
    }, 100)
  }
  //**********************  Releving Data set in to Table ******************************
  setToRelivingMatTable(data) {
    console.log(data)
    this.relevingDataArray = [];
    this.kvTeacher = data;
    for (let i = 0; i < data.length; i++) {
      this.relevingData.sno = '' + (i + 1) + '';
      this.relevingData.empcode = data[i].teacher_employee_code;
      this.relevingData.name = data[i].teacher_name;
      this.relevingData.postName = data[i].post_name;
      this.relevingData.subjectName = data[i].subject_name;  
      this.relevingData.relivingdate = data[i]?.relieve_date;
      this.relevingData.join_relieve_flag = data[i]?.join_relieve_flag;
      this.relevingData.transferGround= data[i].ground_level;
      this.relevingData.teacher_id= data[i].teacher_id;
      this.relevingData.From= data[i].from_kv_name;
      this.relevingData.allot_kv_code= data[i].allot_kv_code;
      this.relevingData.To= data[i].kv_name_alloted;
      this.relevingDataArray.push(this.relevingData);
      this.relevingData = { "sno": "","empcode": "", "name": "","postName": "","subjectName": "","transferGround":"","join_relieve_flag":"","relivingdate": "","teacher_id":"","From":"","allot_kv_code":"","To":""}
    }
    setTimeout(() => {
      this.sBSource   = new MatTableDataSource(this.relevingDataArray);
      this.sBSource  .paginator = this.paginatorOut;
      this.sBSource  .sort = this.sBSort;
    }, 100)
  }
 
  //********************** Function Use for Open Joing Modal *****************************
    openJoiningmodal(joinId:any,emplCode:any,fromKvCode:any,name:any) {
        this.teacherName=name;
        this.fromKvCode = fromKvCode;
        this.onClickEmplCode =emplCode;
        this.onClickJoiningTeacherId =joinId;
        this.modalService.open(this.JoiningBox, { size: 'lg', backdrop: 'static', keyboard: false ,centered: true});
      }
  //********************** Function Use for Open Releving Modal*****************************
     openRelivingmodal(relId:any,emplCode:any,name:any) {
        this.teacherRelName=name;
        this.onClickRelevingTeacherId =relId
        this.onClickRelEmplCode =emplCode;
        this.modalService.open(this.RelivingBox, { size: 'lg', backdrop: 'static', keyboard: false ,centered: true});
      }
  //********************** show date in dd-mm-yyyy format in table **************************
      changeDateFormat(date: any){
        console.log(date)
        if(date!='' && date!=null){
          return moment(date).format('DD-MM-YYYY')
        }
      }
  //**********************  Export  Transfer Out Data in Excel Formate ***********************
      exportexcelRelieving(){
        console.log(this.relevingDataArray)
        const workBook = new Workbook();
        const workSheet = workBook.addWorksheet('Employee Transfer');
        const excelData = [];
        const ws1 = workSheet.addRow([ '','','EMPLOYEE TRANSFER OUT']);
        const dobCol = workSheet.getColumn(1);
        dobCol.width = 15;
        const dobCol1 = workSheet.getColumn(2);
        dobCol1.width = 30;
        const dobCol2 = workSheet.getColumn(3);
        dobCol2.width = 20;
        const dobCol3 = workSheet.getColumn(4);
        dobCol3.width = 20;
        const dobCol4 = workSheet.getColumn(5);
        dobCol4.width = 10;
        const dobCol5 = workSheet.getColumn(6);
        dobCol5.width = 20;
        const dobCol6 = workSheet.getColumn(7);
        dobCol6.width = 35;
        workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 18, bold: true };
        for (let i = 1; i < 8; i++) {
          const col = ws1.getCell(i);
          col.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb:  '9c9b98' },   
          };
        }
       const ws = workSheet.addRow(['Employee Code', 'Name', 'Post Name', 'Subject Name','Transfer Ground','Relieving Date','Transfer To']);
       workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
          for (let i = 1; i < 8; i++) {
            const col = ws.getCell(i);
            col.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb:  'd6d6d4' },
            };
          }
          workSheet.autoFilter = {
            from: 'A2',
            to: 'G2',
           }
          this.relevingDataArray.forEach((item) => {
          const row = workSheet.addRow([item.empcode, item.name,item.postName,item.subjectName,item.transferGround,item.relivingdate,item.To]);
        });
        workBook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          });
          saveAs(blob, 'EmployeeTransferOut.xlsx');
        });
      }
  //********************** Export  Transfer In Data in Excel Formate ***************************
        exportexcelJoining(){
          console.log(this.joiningDataArray)
          const workBook = new Workbook();
          const workSheet = workBook.addWorksheet('Employee Transfer');
          const excelData = [];
          const ws1 = workSheet.addRow([ '','','','EMPLOYEE TRANSFER IN']);
          const dobCol = workSheet.getColumn(1);
          dobCol.width = 15;
          const dobCol1 = workSheet.getColumn(2);
          dobCol1.width = 30;
          const dobCol2 = workSheet.getColumn(3);
          dobCol2.width = 20;
          const dobCol3 = workSheet.getColumn(4);
          dobCol3.width = 20;
          const dobCol4 = workSheet.getColumn(5);
          dobCol4.width = 10;
          const dobCol5 = workSheet.getColumn(6);
          dobCol5.width = 20;
          const dobCol6 = workSheet.getColumn(7);
          dobCol6.width = 20;
          const dobCol7 = workSheet.getColumn(8);
          dobCol7.width = 35;
          workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 18, bold: true };
          for (let i = 1; i < 9; i++) {
            const col = ws1.getCell(i);
            col.fill = {
              type: 'pattern',           
              pattern: 'solid',
              fgColor: { argb:  '9c9b98' },   
            };
          }
         const ws = workSheet.addRow(['Employee Code', 'Name', 'Post Name', 'Subject Name','Transfer Ground','Relieving Date','Joining Date','Transfer From']);
         workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
            for (let i = 1; i < 9; i++) {
              const col = ws.getCell(i);
              col.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb:  'd6d6d4' },
              };
            }
            workSheet.autoFilter = {
              from: 'A2',
              to: 'H2',
             }
           
            this.joiningDataArray.forEach((item) => {
            const row = workSheet.addRow([item.empcode, item.name,item.postName,item.subjectName,item.transferGround,item.relivingdate,item.joiningdate,item.To]);
          });
          workBook.xlsx.writeBuffer().then((data) => {
            let blob = new Blob([data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            saveAs(blob, 'EmployeeTransferIn.xlsx');
          });
       
        }
  //********************** Function Use for export Transfer Out data In PDF Formate **********************
      exportTransferOutDataInpdf(){
        this.returnTypeSrvTime = srvTime();
        setTimeout(() => {
          this.pdfService.exportTransferOutDataList(this.relevingDataArray,this.returnTypeSrvTime);
        }, 1000);
      }
  //********************** Function Use for export Transfer In data In PDF Formate *********************
      exportTransferInDataInpdf(){
        this.returnTypeSrvTime = srvTime();
        setTimeout(() => {
          this.pdfService.exportTransferInDataList(this.joiningDataArray,this.returnTypeSrvTime);
        }, 1000);
      }
  //********************** Function Use for Save joining Data ******************************
  onEmployeeTransferFormSubmit(event: Event){
    console.log(this.fromKvCode)
     const data={"kvCode":this.fromKvCode,"emp_code":this.onClickEmplCode,"teacherId":this.onClickJoiningTeacherId,"doj":this.employeeTransferIn.value.JoiningDate};
     console.log(data)
     this.outSideService.sendEmplooyeeJoiningDate(data).subscribe((res) => {
       console.log(res);
       this.flagUpdatedList = res.responseCode;
       this.modalService.dismissAll() 
       if( this.flagUpdatedList =='200 OK')
       {
         Swal.fire(
           'Your Data has been saved Successfully!',
           '',
           'success'
         )
       }
     })
    }
  //********************** Function Use for Save Releiving Data ******************************
    onEmployeeTransferOutFormSubmit(event: Event){
    console.log(event)
    console.log(this.employeeTransferOut)
    const data={"emp_code":this.onClickRelEmplCode,"doj":this.employeeTransferOut.value.relievingDate};
    console.log(data)
    this.outSideService.sendEmplooyeeRelevingDate(data).subscribe((res) => {
      console.log(res);
      this.modalService.dismissAll() 
      this.flagUpdatedList = res.responseCode;
      if( this.flagUpdatedList =='200 OK')
    {
      Swal.fire(
        'Your Data has been saved Successfully!',
        '',
        'success'
      )
    }
  })
}
}
      
