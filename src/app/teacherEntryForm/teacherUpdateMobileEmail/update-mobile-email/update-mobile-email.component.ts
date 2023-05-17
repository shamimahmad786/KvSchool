import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


import { DataService } from '../../service/internalService/data-service';
import { FormDataService } from '../../service/internalService/form-data.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'app-update-mobile-email',
  templateUrl: './update-mobile-email.component.html',
  styleUrls: ['./update-mobile-email.component.css']
})
export class UpdateMobileEmailComponent implements OnInit {

  displayedColumns = ['sno', 'name', 'email', 'mobile', 'systchcode', 'action'];
  dataSource: MatTableDataSource<any>;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  teacherBasicInfoForm: FormGroup;
  allowSingleVerify: any;
  singleTeacherData: any = [];
  formDataResp: any;
  teacherList: any;
  udise_code = { 'udiseSchCode': '01010100101' };
  authDetails: any;

  testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "" }
  users: any = [];

  newMobileNumber: any;
  reEnterMobileNumber: any;
  onClick:boolean = false;
  email:boolean;


  constructor(private getDataService: DataService, private formData: FormDataService, private outSideService: OutsideServicesService, private route: ActivatedRoute) {
    
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowSingleVerify = queryParams['allowSingleVerify']
        if (this.allowSingleVerify == '1') {
          this.allowSingleVerify = true;
          this.email = false;
        } else if (this.allowSingleVerify == '2') {
          this.allowSingleVerify = true;
          this.email = true;
        }
      }
    );

    if(this.allowSingleVerify){
      if(sessionStorage.getItem('allowSingleVerifyList') != null){
        this.singleTeacherData = JSON.parse(sessionStorage.getItem('allowSingleVerifyList'))
        this.setMatTableValue(this.singleTeacherData);
      }
    }else{
      this.getTeacherByUdiseCode(this.udise_code)
    }

    if (sessionStorage.getItem('authDetails') != null) {
      this.authDetails = JSON.parse(sessionStorage.getItem('authDetails'))
      this.udise_code = { 'udiseSchCode': this.authDetails.applicationDetails[0].business_unit_identity_code }
    }

    this.formDataResp = this.formData.formData();
    this.teacherBasicInfoForm = new FormGroup({
      // 'basicInfoForm': new FormGroup({
        'teacherId': new FormControl(''),
        'name': new FormControl('', Validators.required),
        'mobNumber': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
        'newMobileNum': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      // })
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onMobileClick(value){
    this.onClick = true;
    this.email = false;
    if(!this.allowSingleVerify){
      for (let i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].teacherId == value) {
          this.singleTeacherData = this.teacherList[i]
        }
      }
    }    
  }

  onEmailClick(value){
    this.onClick = true;
    this.email = true;
    if(!this.allowSingleVerify){
      for (let i = 0; i < this.teacherList.length; i++) {
        if (this.teacherList[i].teacherId == value) {
          this.singleTeacherData = this.teacherList[i]
        }
      }
    }    
  }
  onSubmit() { }

  updateDOB(dateObject) {
    const stringified = dateObject.value.ToString()
    const dob = stringified.substring(1, 11);
  }

  onEditClick(value) {
    this.onClick = true;
    for (let i = 0; i < this.teacherList.length; i++) {
      if (this.teacherList[i].teacherId == value) {
        this.singleTeacherData = { "name": this.teacherList[i].name, "teacherId": this.teacherList[i].teacherId, "mobile": this.teacherList[i].mobile }
      }
    }
  }


  getTeacherByUdiseCode(udiseCode) {
    this.outSideService.getTeacherBySchool(udiseCode).subscribe((response) => {
      this.teacherList = response;
      
      for (let i = 0; i < this.teacherList.length; i++) {
        this.testData.sno = "" + (i + 1) + "";
        this.testData.name = this.teacherList[i].name;
        this.testData.email = this.teacherList[i].email;
        this.testData.mobile = this.teacherList[i].mobile;
        this.testData.systchcode = this.teacherList[i].systemTeacherCode;
        this.testData.teacherId = this.teacherList[i].teacherId;
        this.users.push(this.testData)
        this.testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "" }
      }
    })
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000)
  }

  setMatTableValue(singleTeacher) {
    this.testData.sno = "1";
    this.testData.name = singleTeacher.name;
    this.testData.email = singleTeacher.email;
    this.testData.mobile = singleTeacher.mobile;
    this.testData.systchcode = singleTeacher.systemTeacherCode;
    this.testData.teacherId = singleTeacher.teacherId;
    this.users.push(this.testData)
    this.testData = { "sno": "", "name": "", "dob": "", "email": "", "mobile": "", "systchcode": "", "a": "", "b": "", "c": "", "d": "", "teacherId": "" }

    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 1000)
  }

}
