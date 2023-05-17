import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-teacher-inbox',
  templateUrl: './teacher-inbox.component.html',
  styleUrls: ['./teacher-inbox.component.css']
})
export class TeacherInboxComponent implements OnInit {
 

  displayedColumns = ['sno', 'name', 'dob', 'email', 'mobile',  'systchcode', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  [x: string]: any;

  udise_code = { 'udiseSchCode': '01010100101' };
  teacherList: any;
  authDetails: any;
  verifySingleTeacherList: any;
  verifiedSchCode: any;
  testData = { "sno": "1", "name": "Gopi Khatana", "dob": "1989", "email": "gopi.jitin@gmail.com","mobile": "7014931622", "systchcode":"12345", "a":"", "b":"", "c":"","d":"","teacherId":""  }
  users: any = [{ "sno": "1", "name": "Gopi Khatana", "dob": "1989", "email": "gopi.jitin@gmail.com","mobile": "7014931622", "systchcode":"12345", "a":"", "b":"", "c":"","d":"","teacherId":""  }];

 
  
  constructor() { 
    this.dataSource = new MatTableDataSource(this.users);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
  }

}
