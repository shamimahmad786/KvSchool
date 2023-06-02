import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-station-category',
  templateUrl: './add-station-category.component.html',
  styleUrls: ['./add-station-category.component.css']
})
export class AddStationCategoryComponent implements OnInit,OnDestroy {
  stationCategoryForm: FormGroup;
  isSubmitted: boolean = false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  isEdit: boolean=false;
  editId: any;
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }

  ngOnInit(): void {
    this.buildStationForm();
    if(sessionStorage.getItem('stationCategoryEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('stationCategoryEdit'));
      this.updateData(data);
    }
  }

  buildStationForm(){
    this.stationCategoryForm = this.fb.group({
      categoryName: ['',[Validators.required,CustomValidator.IsText1,Validators.minLength(3)]],
      status:[true,Validators.required]
    });
  }

  updateData(data){
    this.stationCategoryForm.patchValue(data);
    this.stationCategoryForm.get('categoryName').setValue(data.categoryname);
    this.editId=data.id;
  }

  submit(){
  
    if (this.stationCategoryForm.invalid) {
      this.isSubmitted = true;
     this.stationCategoryForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.stationCategoryForm.getRawValue();
      let request:any={
        categoryName: payload.categoryName,
        status:payload.status
      }
      if(this.isEdit){
         request.id=this.editId;
         console.log(request)
        this.outSideService.editStationCategoryMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'Category Updated Successfully!',
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
        this.outSideService.addStationCategoryMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Category Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/stationCategoryMaster']);
          }
        },
        error => {
          alert(error);
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
    sessionStorage.removeItem('stationCategoryEdit');
    this.router.navigate(['/teacher/stationCategoryMaster']);
  }
  clear(){
    this.buildStationForm();
    this.isSubmitted=false;
    this.stationCategoryForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.stationCategoryForm.controls[controlName].hasError(errorName);
  }
  ngOnDestroy(){
    sessionStorage.removeItem('stationCategoryEdit');
  }
}
