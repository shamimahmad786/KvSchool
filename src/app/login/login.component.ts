import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/AuthService'
import { Router, ActivatedRoute } from '@angular/router';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userDto:any;
  loginForm: FormGroup;
  submitted = false;
  constructor(   private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router, private auth :AuthService) { }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
  sessionStorage.clear();
  sessionStorage.removeItem('authTeacherDetails')
  sessionStorage.removeItem('mappingData')
  sessionStorage.removeItem('shiftYn')
  sessionStorage.removeItem('shiftAvailable')
  sessionStorage.removeItem('singleKvTeacher')
  sessionStorage.removeItem('systemTeacherCode')
  console.log(this.loginForm.value)
  debugger
  this.userDto={"username":"kv_9999","password":"system123#"};
  this.auth.login(this.loginForm.value).subscribe(res => {
    //console.log(res);
    sessionStorage.setItem("loginType","jwt");
    // alert(res);
    // alert(JSON.stringify("login response---->"+JSON.stringify(res)))
    if (res.token) {
      sessionStorage.setItem("authTeacherDetails", JSON.stringify(res));
      this.router.navigate(['/teacher/profile']);
    }
  },
    error => { 
      alert("login response--->"+JSON.stringify(error))
});
  }
}
