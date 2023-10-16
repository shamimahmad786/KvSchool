import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/AuthService'
import { Router, ActivatedRoute } from '@angular/router';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  forgetPasswordForm: FormGroup;
  passwordFormsubmitted= false;
  captchaforget:any;
  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute,private router: Router, private auth :AuthService) { }
  ngOnInit(): void {
    this.forgetPasswordForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'ForgetPasswordCaptcha': new FormControl('', Validators.required),
    });
    this.generate();
  }
  get f() { return this.forgetPasswordForm.controls; }
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
    this.captchaforget = first.toString()+second.toString()+third.toString()+fourth.toString()+fifth.toString()+sixth.toString();
    const captchaText = <HTMLCanvasElement> document.getElementById('captchaforget');
    var ctx = captchaText.getContext("2d");
    ctx.font = "bold 60px Courier";
    ctx.fillStyle = "black";
    ctx.clearRect(0, 0, captchaText.width, captchaText.height);
    ctx.fillText(this.captchaforget, captchaText.width/6, captchaText.height/1.7);
    let output = document.getElementById('output');
    output.innerHTML = "";
  }
  //********************************  Forgot Password Form Submit  ******************************/
  onSubmit() {
    debugger
    this.passwordFormsubmitted = true;
    if (this.forgetPasswordForm.invalid) {
      this.generate();
      return;
  }
  if (this.forgetPasswordForm.controls['ForgetPasswordCaptcha'].value != this.captchaforget ) {
    this.forgetPasswordForm.patchValue({
      ForgetPasswordCaptcha: '',
    })
    this.generate()
    return;
  }
  var data = {"email":this.forgetPasswordForm.controls['email'].value}
  this.auth.forgetPasswordMail(data).subscribe((res) => {
    this.generate();
    console.log(res)
    if(res.status=='1'){
      Swal.fire(
        'Please check mail for reset password',
        '',
        'success'
      )}
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
