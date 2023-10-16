import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/AuthService'
import { Router, ActivatedRoute } from '@angular/router';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
 import * as $ from 'jquery';
import { OutsideServicesService } from '../service/outside-services.service';
declare const encriptedText: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  submittedOtp = false;
  mobileNo:any;
  captcha:any;
  businessUnitTypeId:any;
  timeLeft: number = 120;
  interval;
  isDisabled: boolean = false;
  showTimer: boolean = false;
  captchaotp: any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router, private auth :AuthService,private outSideService: OutsideServicesService) { }
  ngOnInit(): void {
      this.loginForm = new FormGroup({
      passwordForm: new FormGroup({
       'username': new FormControl('', Validators.required),
       'password': new FormControl('', Validators.required),
       'passwordCaptcha': new FormControl('', Validators.required),
      }),
      otpForm: new FormGroup({
        'mobileNo': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("[8976][0-9]{9}")]),
        'OTP': new FormControl('', Validators.required),
        'otpCaptcha': new FormControl('', Validators.required),
      }),
    })
    $('.password').on('click',()=>{
      $('.password').addClass('active')
      $('.mobile').removeClass('active')
      $('.login-with-pass').removeClass('d-none')
      $('.login-with-otp').addClass('d-none')
  })
  
  $('.mobile').on('click',()=>{
      $('.password').removeClass('active');
      $('.mobile').addClass('active')
      $('.login-with-otp').removeClass('d-none')
      $('.login-with-pass').addClass('d-none')
  })
  this.generate();
  }
  //********************************  Function use For Captcha genration   ******************************/
  generate() {
    let alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    console.log(alphabets.length);
    let first = alphabets[Math.floor(Math.random() * alphabets.length)];
    let second = Math.floor(Math.random() * 10);
    let third = Math.floor(Math.random() * 10);
    let fourth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let fifth = alphabets[Math.floor(Math.random() * alphabets.length)];
    let sixth = Math.floor(Math.random() * 10);
    this.captcha = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
    this.captchaotp = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
    const captchaText = <HTMLCanvasElement> document.getElementById('captcha');
    let output = document.getElementById('output');
    var ctx = captchaText.getContext("2d");
    ctx.font = "bold 60px Courier";
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    ctx.fillText(this.captcha, captchaText.width/6, captchaText.height/1.7);
    output.innerHTML = "";

    let outputotp = document.getElementById('outputotp');
    const captchaOtpText = <HTMLCanvasElement> document.getElementById('otpcaptcha');
    var ctxotp = captchaOtpText.getContext("2d");
    ctxotp.font = "bold 60px Courier";
    ctxotp.fillStyle = "black";
    ctxotp.clearRect(0, 0, captchaOtpText.width, captchaOtpText.height);
    ctxotp.fillText(this.captchaotp, captchaOtpText.width/6, captchaOtpText.height/1.7);
    outputotp.innerHTML = "";
    }
  //********************************  Function Use For Otp Generation   ******************************/
  otpSend(){
    const pattern = "[8976][0-9]{9}";
    var stripped = this.loginForm.controls.otpForm.value['mobileNo'];
    var isGoodMatch = String(stripped).match(/^[8976][0-9]{9}$/);
    if (!isGoodMatch || stripped=='' ) {
      Swal.fire({
        'icon':'error',
         'text':'Please Provide Valid Mobile Number.'
      })
        return false;
    }
    else{
     this.timeLeft = 120;
     this.isDisabled=true
     this.showTimer=true;
     this.interval = setInterval(() => {
       if(this.timeLeft > 0) {
         this.timeLeft--;
       } else {
         this.showTimer=false;
         this.isDisabled=false;
         clearInterval(this.interval);
       }
     },1000)
      this.mobileNo=this.loginForm.controls.otpForm.value['mobileNo'];
      var data={"mobile":this.mobileNo}
      this.auth.fetchOtp(data).subscribe((res) => {
      console.log(res)
      })
    }
    }    
  onSubmit(event: Event) {
    debugger
   var formSubmitAction = document.activeElement.id;
  //********************************  Password Form Submit  ******************************/
   if(formSubmitAction=="submitPasswordForm")
   {
    this.submitted=true
    if (this.loginForm.controls.passwordForm.status == 'INVALID' ) {
      this.generate()
      return;
    }
    // if (this.loginForm.controls.passwordForm.value['passwordCaptcha'] != this.captcha ) {
    //   this.loginForm.patchValue({
    //     passwordForm: {
    //       passwordCaptcha: '',
    //     }
    //   })
    //   this.generate()
    //   return;
    // }
      sessionStorage.clear();
      sessionStorage.removeItem('authTeacherDetails')
      sessionStorage.removeItem('mappingData')
      sessionStorage.removeItem('shiftYn')
      sessionStorage.removeItem('shiftAvailable')
      sessionStorage.removeItem('singleKvTeacher')
      sessionStorage.removeItem('systemTeacherCode')
      var encriptedPassword=encriptedText(this.loginForm.controls.passwordForm.value['username'],this.loginForm.controls.passwordForm.value['password']);
      this.auth.login(encriptedPassword,this.loginForm.controls.passwordForm.value['username']).subscribe(res => {
      sessionStorage.setItem("loginType","jwt");
     //alert(JSON.stringify("login response---->"+JSON.stringify(res)))
      console.log(res)
       if (res.token) {
       sessionStorage.setItem("authTeacherDetails", JSON.stringify(res));
       this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
        if(this.businessUnitTypeId=="2"){
          this.router.navigate(['/teacher/userMaster']);
        }else if(this.businessUnitTypeId=="3"){
          this.router.navigate(['/teacher/regionStationMapping']);  
        }else if(this.businessUnitTypeId=="4"){
          this.router.navigate(['/teacher/stationDashboard']);
        }else if(this.businessUnitTypeId=="5"){
          this.router.navigate(['/teacher/profile']);
        }else{
          this.router.navigate(['/teacher/profile']);
        }
      }
      this.generate();
    },
      error => { 
        this.generate();
        Swal.fire({
          'icon':'error',
           'text':'You are not Authorized.'
        })
    });
   }
  //********************************  Otp Form Submit  ********************************/
   if(formSubmitAction=="submitOtpForm")
   {
    this.submittedOtp=true
    if (this.loginForm.controls.otpForm.status == 'INVALID'  ) {
      this.generate();
      return;
    }
    // if (this.loginForm.controls.otpForm.value['otpCaptcha'] != this.captchaotp ) {
    //   this.loginForm.patchValue({
    //     otpForm: {
    //       otpCaptcha: '',
    //     }
    //   })
    //   this.generate();
    //   return;
    // }
    sessionStorage.clear();
    sessionStorage.removeItem('authTeacherDetails')
    sessionStorage.removeItem('mappingData')
    sessionStorage.removeItem('shiftYn')
    sessionStorage.removeItem('shiftAvailable')
    sessionStorage.removeItem('singleKvTeacher')
    sessionStorage.removeItem('systemTeacherCode')
    var data = {"mobile":this.loginForm.controls.otpForm.value['mobileNo'],"otp":this.loginForm.controls.otpForm.value['OTP']}
    this.auth.otpLogin(data).subscribe((res) => {
      console.log(res)
      if (res.token) {
        sessionStorage.setItem("authTeacherDetails", JSON.stringify(res));
        this.businessUnitTypeId= JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.applicationDetails[0].business_unit_type_id;
         if(this.businessUnitTypeId=="2"){
           this.router.navigate(['/teacher/regionMaster']);
         }else if(this.businessUnitTypeId=="3"){
           this.router.navigate(['/teacher/regionStationMapping']);  
         }else if(this.businessUnitTypeId=="4"){
           this.router.navigate(['/teacher/stationDashboard']);
         }else if(this.businessUnitTypeId=="5"){
           this.router.navigate(['/teacher/profile']);
         }else{
           this.router.navigate(['/teacher/profile']);
         }
       }
       if(res.errorMessage='User is not active'){
        Swal.fire({
          'icon':'error',
           'text':'User is not active.'
        })
       }
       this.generate();
      },
      error => { 
        this.generate();
        Swal.fire({
          'icon':'error',
           'text':'You are not Authorized.'
        })
    });
   }
  }
}
