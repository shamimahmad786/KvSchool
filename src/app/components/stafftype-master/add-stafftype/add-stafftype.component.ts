import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-stafftype',
  templateUrl: './add-stafftype.component.html',
  styleUrls: ['./add-stafftype.component.css']
})
export class AddStafftypeComponent implements OnInit {
  staffTypeForm: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean=false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  ngOnInit(): void {
    this.buildstaffTypeForm();
    if(sessionStorage.getItem('staffTypeEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('staffTypeEdit'));
      this.updateData(data);
    }
  }
  buildstaffTypeForm(){
    this.staffTypeForm = this.fb.group({
      staffType: ['',[Validators.required,CustomValidator.IsText1,Validators.minLength(3)]],
      id:[],
      status:[true]
    });
  }
  updateData(data){
    this.staffTypeForm.patchValue(data);
    this.staffTypeForm.get('staffType').setValue(data.stafftype);
  }
  submit(){
    if (this.staffTypeForm.invalid) {
      this.isSubmitted = true;
     this.staffTypeForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.staffTypeForm.getRawValue();
      console.log(payload)
      let request:any={
        staffType: payload.staffType,
        status: payload.status
      }
      if(this.isEdit){
        //Edit stafftype
        request.id=payload.id;
        request.staffType=payload.staffType;
        request.status=payload.status;
        this.outSideService.editStaffTypeMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'Staff Type Updated Successfully!',
              '',
              'success'
            )
           this.redirectToList();
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            'icon':'error',
             'text':error.error
          }
          )
        })
      }else{
        //new stafftype add
        this.outSideService.addStaffTypeMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Staff Type Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/stafftypeMaster']);
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            'icon':'error',
             'text':error.error
          }
          )
        })
      }

    }

    
  }
  redirectToList(){
    sessionStorage.removeItem('staffTypeEdit');
    this.router.navigate(['/teacher/stafftypeMaster']);
  }
  clear(){
    this.buildstaffTypeForm();
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.staffTypeForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.staffTypeForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy(){
    sessionStorage.removeItem('staffTypeEdit');
  }
}
