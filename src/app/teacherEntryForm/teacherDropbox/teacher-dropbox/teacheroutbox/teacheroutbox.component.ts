import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-teacheroutbox',
  templateUrl: './teacheroutbox.component.html',
  styleUrls: ['./teacheroutbox.component.css']
})
export class TeacheroutboxComponent implements OnInit {

  displayedColumns = ['sno', 'empcode', 'name', 'gender', 'dob','staffType','schoolName','dropboxDate', 'action'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild('DropBox', { static: true }) DropBox: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  [x: string]: any;

  udise_code = { 'udiseSchCode': '01010100101' };
  teacherList: any;
  authDetails: any;
  verifySingleTeacherList: any;
  verifiedSchCode: any;
  singleRestoredTeacher:any;
  showImportButton:boolean;
  dropboxIndex:any;
  testData = { "sno": "", "name": "", "gender": "", "dob": "", "email": "", "mobile": "", "approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "", "empcode": "", "staffType":"",'schoolName':"",'dropboxDate':"" }
  users: any = [];

 
  
  constructor(private outSideService: OutsideServicesService, private modalService: NgbModal) { 
    this.dataSource = new MatTableDataSource(this.users);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {

    for (let i = 0; i < JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails.length; i++) {
      
      this.kvicons += JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].application_id + ",";
      this.businessUnitTypeId = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[i].business_unit_type_id;
      
    }

    this.getTeacherByUdiseCode()
  }

  getTeacherByUdiseCode() {
    this.users = [];
    this.outSideService.getOutboxTeacherByUdisecode('1').subscribe((res) => {
      
      this.teacherList = res.response;

      this.setToMatTable(this.teacherList);
      
      // var srn = 0;
      // for (let i = 0; i < this.teacherList.length; i++) {       
      //   // if(this.teacherList[i].dropBoxFlag > 0){          
      //     this.testData.sno = ""+(srn+1)+"";
      //     this.testData.name = this.teacherList[i].name;
      //     var dateString = this.teacherList[i].dob;
      //     dateString = new Date(dateString).toUTCString();
      //     dateString = dateString.split(' ').slice(0, 4).join(' ');
      //     this.testData.dob = dateString;
      //     this.testData.email = this.teacherList[i].email;
      //     this.testData.mobile = this.teacherList[i].mobile;
      //     this.testData.gender = this.teacherList[i].gender;
      //     this.testData.systchcode = this.teacherList[i].systemTeacherCode;
      //     this.testData.teacherId = this.teacherList[i].teacherId;
      //     this.users.push(this.testData)
      //     this.testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "gender": "", "approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "", "empcode": "", "staffType":"" }
      //     srn++;
      //   // }        
      // }      
    })

    // setTimeout(()=>{
    //   this.dataSource = new MatTableDataSource(this.users);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // },1000)    
  }


  setToMatTable(data) {
    this.users = [];
    this.kvTeacher = data;
    for (let i = 0; i < data.length; i++) {
      this.tempTeacherId = data[i].teacherId
      this.testData.sno = '' + (i + 1) + '';
      this.testData.name = data[i].teacherName;
      var dateString = data[i].dob;
      dateString = new Date(dateString).toUTCString();
      dateString = dateString.split(' ').slice(0, 4).join(' ');
      this.testData.dob = data[i].teacherDob;
      this.testData.gender = (data[i].teacherGender == '1') ? 'Male' : 'Female';
      this.testData.empcode = data[i].teacherEmployeeCode;
      this.testData.teacherId = data[i].teacherId;
      this.testData.systchcode = data[i].teacherSystemGeneratedCode;
      this.testData.approved = data[i].finalStatus;
      this.testData.staffType = (data[i].teachingNonteaching == '1') ? 'Teaching' : (data[i].teachingNonteaching == '2') ? 'Non-Teaching' : 'NA';
      this.testData.dropboxDate = data[i].dropboxdate;
      this.testData.schoolName = data[i].schoolName;
      // (data[i].teachingNonteaching == '1') ? 'Teaching' : 'Non-Teaching';
      
      this.users.push(this.testData);
      this.testData = { "sno": "", "name": "", "gender": "", "dob": "", "email": "", "mobile": "", "approved": "", "reInitiate": "", "rejected": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "", "empcode": "", "staffType":"",'schoolName':"",'dropboxDate':"" }
    }



    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000)
  }

  getEmployee(val){
    for (let i = 0; i < this.teacherList.length; i++) {
      if (this.teacherList[i].teacherId == val) {
        this.dropboxIndex = i;
        this.singleRestoredTeacher = this.teacherList[i]
        
      }
    }
    this.modalService.open(this.DropBox, { size: 'md', backdrop: 'static', keyboard: false });
  }

  onClick(event){
    if(event.target.value == '1'){
      this.showImportButton = true;
    }else if(event.target.value == '0'){
      this.showImportButton = false;
    }
  }

  moveToSchool(tchId){
    
    // alert(tchId);
    debugger;

    this.udiseSchoolCode = JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].udise_sch_code;

 
      var data = {
        "currentUdiseSchCode": this.udiseSchoolCode,
        "teacherId": tchId,
        "businessUnitTypeCode": JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_code,
        "kvName":JSON.parse(sessionStorage.getItem("mappingData")).mappingData[0].kv_name
      }


      if(data.businessUnitTypeCode == '' || data.businessUnitTypeCode == 'null' || data.businessUnitTypeCode == null ){
        Swal.fire(
        'Please contact system administrator!',
        '',
        'error'
        )
      }else{
      this.outSideService.changeTeacherSchool(data).subscribe((res) => {
        
        // alert(JSON.stringify(res));
        if(res.status == '1' || res.status == 1){
          this.users.splice(this.dropboxIndex, 1);
          Swal.fire(
            'Teacher imported successfully !',
            '',
            'success'
          )




          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.users);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }, 500)


        }else if (res.status == '0') {
          Swal.fire(
            'Sorry data could not be deleted 1',
            '',
            'info'
          )
        }    
      })  
    }

  }

}
