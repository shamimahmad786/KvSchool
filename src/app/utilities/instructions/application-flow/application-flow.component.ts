import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-flow',
  templateUrl: './application-flow.component.html',
  styleUrls: ['./application-flow.component.css']
})
export class ApplicationFlowComponent implements OnInit {

  constructor() { }

  loginType:any;

  ngOnInit(): void {

    this.loginType=JSON.parse(sessionStorage.authTeacherDetails).applicationDetails[0].business_unit_type_id;
  
  }

}
