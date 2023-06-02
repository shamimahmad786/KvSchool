import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit,OnDestroy {

  subjectForm: FormGroup;
  isSubmitted: boolean = false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  isEdit: boolean=false;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  ngOnInit(): void {
    this.buildregionForm();
    if(sessionStorage.getItem('subjectEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('subjectEdit'));
      this.updateData(data);
    }
  }
  buildregionForm(){
    this.subjectForm = this.fb.group({
      subjectCode: ['', [Validators.required,CustomValidator.IsText1]],
      // subjectName: ['',[Validators.required,CustomValidator.IsText1,Validators.minLength(3)]],
      subjectName: [''],
      status:[true,[Validators.required]],
      id:['']
    });
  }
  updateData(data){
    this.subjectForm.patchValue(data);
  }
  submit(){
    if (this.subjectForm.invalid) {
      this.isSubmitted = true;
     this.subjectForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.subjectForm.getRawValue();
      let request:any={
        subjectCode: payload.subjectCode,
        subjectName: payload.subjectName,
        status:payload.status,
      }
      if(this.isEdit){
        //Edit Subject
        request.id=payload.id
        this.outSideService.editSubjectMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'Subject Updated Successfully!',
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
        //new Subject
        this.outSideService.addSubjectMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Subject Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/subjectMaster']);
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
    sessionStorage.removeItem('subjectEdit');
    this.router.navigate(['/teacher/subjectMaster']);
  }
  clear(){
    this.buildregionForm();
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.subjectForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.subjectForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy(){
    sessionStorage.removeItem('subjectEdit');
  }



}
