import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-region',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.css']
})
export class AddRegionComponent implements OnInit,OnDestroy {
  regionForm: FormGroup;
  isSubmitted: boolean = false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  isEdit: boolean=false;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  
  ngOnInit(): void {
    this.buildregionForm();
    if(sessionStorage.getItem('regionEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('regionEdit'));
      this.updateData(data);
    }
  }
  buildregionForm(){
    this.regionForm = this.fb.group({
      regioncode: ['', [Validators.required,Validators.pattern(/^[1-9][0-9]{1}$/)]],
      regionname: ['',[Validators.required,CustomValidator.IsText1,Validators.minLength(3)]],
      status:[true,[Validators.required]],
      id:['']
    });
  }
  updateData(data){
    this.regionForm.patchValue(data);
    this.regionForm.get('regioncode').disable();
  }
  submit(){
    if (this.regionForm.invalid) {
      this.isSubmitted = true;
     this.regionForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.regionForm.getRawValue();
      let request:any={
        regionCode: payload.regioncode,
        regionName: payload.regionname,
        status:payload.status,
      }
      if(this.isEdit){
        //Edit region
        request.id=payload.id;
        this.outSideService.editRegionMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'Region Updated Successfully!',
              '',
              'success'
            )
           this.redirectToList();
          }
        },
        error => {
          // console.log(error);
          Swal.fire({
            'icon':'error',
             'text':error.error.message
          }
          )
        })
      }else{
        this.outSideService.addRegionMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Region Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/regionMaster']);
          }
        },
        error => {
          // console.log(error);
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
    sessionStorage.removeItem('regionEdit');
    this.router.navigate(['/teacher/regionMaster']);
  }
  clear(){
    this.buildregionForm();
    this.formDirective.resetForm();
    this.isSubmitted=false;
    this.regionForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.regionForm.controls[controlName].hasError(errorName);
  }

  ngOnDestroy(){
    sessionStorage.removeItem('regionEdit');
  }





}
