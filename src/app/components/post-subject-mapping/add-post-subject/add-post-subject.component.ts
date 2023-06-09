import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-post-subject',
  templateUrl: './add-post-subject.component.html',
  styleUrls: ['./add-post-subject.component.css']
})
export class AddPostSubjectComponent implements OnInit {
  postSubjectMForm: FormGroup;
  isSubmitted: boolean = false;
 
  subjectList: any=[];
  designationList: any=[];
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  ngOnInit(): void {
    this.buildregionForm();
    this.getSubjectList();
    this.getPostList();

  }
  buildregionForm(){
    this.postSubjectMForm = this.fb.group({
      subjectCode: ['', [Validators.required]],
      postCode: ['',[Validators.required]],
      postName:[''],
      subjectName:['']
    });
  }
  getSubjectList(){
    let req={};
    this.outSideService.fetchSubjectList(req).subscribe((res)=>{
      if(res){
        res.forEach(element => {
          if(element.status==true){
            this.subjectList.push(element)
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
    if (this.postSubjectMForm.invalid) {
      this.isSubmitted = true;
     this.postSubjectMForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.postSubjectMForm.getRawValue();
      let request={
        postId: payload.postCode,
        subjectId: payload.subjectCode,
      }
     console.log(request)
        this.outSideService.addSubjectPostMapping(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Staff-Type-Post Mapped Successfully!',
              'success'
            )
            this.router.navigate(['/teacher/postSubjectMapping']);
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
    this.router.navigate(['/teacher/postSubjectMapping']);
  }
  clear(){
    this.buildregionForm();
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.postSubjectMForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.postSubjectMForm.controls[controlName].hasError(errorName);
  }

  valueChangeSubject(subjectName){
    console.log(subjectName)
    this.postSubjectMForm.get('subjectName').setValue(subjectName);
  }
  valueChangePost(postName){
    console.log(postName)
    this.postSubjectMForm.get('postName').setValue(postName);
  }

  getSubject(postId){
          const data={"postId":postId};
          this.outSideService.getSubjectByPost(data).subscribe((res)=>{
            if(JSON.parse(JSON.stringify(res)).rowValue){
              JSON.parse(JSON.stringify(res)).rowValue.forEach(element => {
                if(element.status==true){
                  this.subjectList.push(element)
                }
              });
            }
  });
}
}
