import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.css']
})
export class AddDesignationComponent implements OnInit,OnDestroy {
  designationForm: FormGroup;
  isSubmitted: boolean = false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  isEdit: boolean=false;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  ngOnInit(): void {
    this.buildregionForm();
    if(sessionStorage.getItem('designationEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('designationEdit'));
      this.updateData(data);
    }
  }
  buildregionForm(){
    this.designationForm = this.fb.group({
      postCode: ['', [Validators.required,Validators.pattern(/^[a-z0-9A-Z]{3}$/)]],
      postName: ['',[Validators.required,CustomValidator.IsText1,Validators.minLength(3)]],
      status:[true,[Validators.required]],
      id:['']
    });
  }
  updateData(data){
    this.designationForm.patchValue(data);
  }
  submit(){
    if (this.designationForm.invalid) {
      this.isSubmitted = true;
     this.designationForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.designationForm.getRawValue();
      let request:any={
        postCode: payload.postCode,
        postName: payload.postName,
        status:payload.status,
      }
      if(this.isEdit){
        //Edit Designation
        request.id=payload.id;
        this.outSideService.editDesignationMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'Designation Updated Successfully!',
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
        //new Designation
        this.outSideService.addDesignationMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Designation Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/designationMaster']);
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
    sessionStorage.removeItem('designationEdit');
    this.router.navigate(['/teacher/designationMaster']);
  }
  clear(){
    this.buildregionForm();
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.designationForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.designationForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy(){
    sessionStorage.removeItem('designationEdit');
  }


}
