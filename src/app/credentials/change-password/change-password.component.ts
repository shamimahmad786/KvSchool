import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare const changePassword: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePaswordForm: FormGroup;
  userId: any;

  constructor() { }

  ngOnInit(): void {

    this.changePaswordForm = new FormGroup({
      'userId': new FormControl('', Validators.required),
      'oldPassword': new FormControl('', Validators.required),
      'newPassword': new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8)]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.maxLength(12), Validators.minLength(8), this.checkConfirmPassword.bind(this)])
    })

  }

  userIdCheck(event) {
    var userIdTemp = event.target.value;
    if (userIdTemp == JSON.parse(sessionStorage.getItem('authTeacherDetails')).user_name) {

    } else {
      this.changePaswordForm.patchValue({
        userId: ''
      })

      Swal.fire(
        'Incorrect User Id !',
        'Please re-enter again',
        'error'
      )
    }
  }

  checkConfirmPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      if (this.changePaswordForm.value.newPassword != control.value) {
        return { 'passwordNotSame': true }
      }
    }
    return null;
  }

  onSubmit() {
    var res = changePassword(this.changePaswordForm.value.userId, this.changePaswordForm.value.oldPassword, this.changePaswordForm.value.newPassword, this.changePaswordForm.value.confirmPassword);
   
      Swal.fire(
        '',
        res,
      )
    
    // if (res.status == '1') {
    //   Swal.fire(
    //     res.message,
    //     '',
    //     'success'
    //   )
    // } else if (res.status == '0') {
    //   Swal.fire(
    //     res.message,
    //     '',
    //     'error'
    //   )
    // }
  }

}
