import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-stafftype-post',
  templateUrl: './add-stafftype-post.component.html',
  styleUrls: ['./add-stafftype-post.component.css']
})
export class AddStafftypePostComponent implements OnInit {
  stafftypePostForm: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean=false;
  staffTypeList: any=[];
  designationList: any=[];
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  ngOnInit(): void {
    this.buildregionForm();
    this.getStaffTypeList();
    this.getPostList();

  }
  buildregionForm(){
    this.stafftypePostForm = this.fb.group({
      staffType: ['', [Validators.required]],
      postCode: ['',[Validators.required]],
      postName:['']
    });
  }
  getStaffTypeList(){
    let req={};
    this.outSideService.fetchStaffTypeList(req).subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.status==true){
            this.staffTypeList.push(element)
          }
        });
      }
    })
  }
  getPostList(){
    let req={};
    this.outSideService.fetchDesignationList(req).subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.status==true){
            this.designationList.push(element)
          }
        });
     }
    })
  }
  submit(){
    if (this.stafftypePostForm.invalid) {
      this.isSubmitted = true;
     this.stafftypePostForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.stafftypePostForm.getRawValue();
      let request={
        staffTypeId: payload.staffType,
        designationId: payload.postCode,
        // postName: payload.postName,
      }
     console.log(request)
        this.outSideService.addStaffTypePostMapping(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Staff-Type-Post Mapped Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/stafftypePostMapping']);
          }
        },
        error => {
          console.log(error);
          Swal.fire({
            'icon':'error',
             'text':error.error.message
          }
          )
        })
      }
  }
  redirectToList(){
    this.router.navigate(['/teacher/stafftypePostMapping']);
  }
  clear(){
    this.buildregionForm();
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.stafftypePostForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.stafftypePostForm.controls[controlName].hasError(errorName);
  }

  valueChange(name){
    this.stafftypePostForm.get('postName').setValue(name);
  }

}
