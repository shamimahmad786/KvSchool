import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { CustomValidator } from 'src/app/utilities/validations/validate';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-station',
  templateUrl: './add-station.component.html',
  styleUrls: ['./add-station.component.css']
})
export class AddStationComponent implements OnInit,OnDestroy {
  stationForm: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean=false;
  statusList=[{'value':true,'status':'Active'},{'value':false,'status':'InActive'}];
  constructor(private fb: FormBuilder,private outSideService: OutsideServicesService, private router: Router) { }

  ngOnInit(): void {
    this.buildStationForm();
    if(sessionStorage.getItem('stationEdit')!=null){
      this.isEdit=true;
      let data= JSON.parse(sessionStorage.getItem('stationEdit'));
      this.updateData(data);
    }
  }

  buildStationForm(){
    this.stationForm = this.fb.group({
      stationCode: ['', [Validators.required,Validators.pattern(/^[1-9][0-9]{2}$/)]],
      stationName: ['',[Validators.required,CustomValidator.IsText1,Validators.minLength(3)]],
      status:[true,[Validators.required]],
      id:['']
    });
  }

  updateData(data){
    this.stationForm.patchValue(data);
    this.stationForm.get('stationCode').setValue(data.stationcode);
    this.stationForm.get('stationName').setValue(data.stationname);
    this.stationForm.get('stationCode').disable();
  }

  submit(){
    if (this.stationForm.invalid) {
      this.isSubmitted = true;
     this.stationForm.markAllAsTouched();
    }else{
      this.isSubmitted = false;
      let payload=this.stationForm.getRawValue();
      let request:any={
        stationCode: payload.stationCode,
        stationName: payload.stationName,
        status:payload.status
      }
      if(this.isEdit){
        request.id=payload.id;
        this.outSideService.editStationMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'Station Updated Successfully!',
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
             'text':error.error.message
          }
          )
        })
      }else{
        this.outSideService.addStationMaster(request).subscribe((res)=>{
          if(res=="SUCCESS"){
            Swal.fire(
              'New Station Added Successfully!',
              '',
              'success'
            )
            this.router.navigate(['/teacher/stationMaster']);
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
    sessionStorage.removeItem('stationEdit');
    this.router.navigate(['/teacher/stationMaster']);
  }
  clear(){
    this.buildStationForm();
    this.isSubmitted=false;
    this.stationForm.reset();
  }
  errorHandling(controlName: string, errorName: string) {
    return this.stationForm.controls[controlName].hasError(errorName);
  }
  ngOnDestroy(){
    sessionStorage.removeItem('stationEdit');
  }

}
