import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

declare const changePassword: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('resetPasswordModal', { static: true }) resetPasswordModal: TemplateRef<any>;
  changePaswordForm: FormGroup;
  userId: any;
  user_name: any;
  dialogRef: any;

  constructor(private outSideService: OutsideServicesService,  private modalService: NgbModal) { }

  ngOnInit(): void {
    this.user_name = JSON.parse(sessionStorage.getItem("authTeacherDetails"))?.user_name;
   
    setTimeout(() => {
      this.changePaswordForm.patchValue({
        userId:this.user_name
      })
    }, 100)
    const  data = {
      userId:this.user_name
    }
	
	    this.outSideService.checkPasswordChanged(data).subscribe((res)=>{
      if(res.status==1){  
        this.dialogRef = this.modalService.open(this.resetPasswordModal, {  backdrop: 'static', keyboard: false,
          }, );
      }
     console.log(res);
    })
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
    var res = changePassword(this.user_name, this.changePaswordForm.value.oldPassword, this.changePaswordForm.value.newPassword, this.changePaswordForm.value.confirmPassword);
   
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
