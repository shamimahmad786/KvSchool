import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-freeze-masters',
  templateUrl: './freeze-masters.component.html',
  styleUrls: ['./freeze-masters.component.css'],
})
export class FreezeMastersComponent implements OnInit {
  freezeForm?: FormGroup;
  updateData:any
  freeze: any;
  constructor(
    private fb: FormBuilder,
    private freezeService: OutsideServicesService
  ) {}

  ngOnInit(): void {
    this.freezeForm = this.fb.group({
      regionMasterId: [],
      stationMasterId: [],
      schoolInstitutionMasterId: [],
      stationCategoryMasterId: [],
      designationMasterId: [],
      staffTypeMasterId: [],
      subjectMasterId: [],
      regionStationMappingId: [],
      stationCategoryMappingId: [],
      stationSchoolMappingId:[],
      staffTypePostMappingId:[],
      postSubjectMappingId:[],
      sanctionedPostMappingId:[],
      regionMaster: [false],
      stationMaster: [false],
      schoolInstitutionMaster: [false],
      stationCategoryMaster: [false],
      staffTypeMaster: [false],
      designationMaster: [false],
      subjectMaster: [false],
      regionStationMapping: [false],
      stationCategoryMapping: [false],
      stationSchoolMapping: [false],
      staffTypePostMapping: [false],
      postSubjectMapping: [false],
      sanctionedPostMapping: [false],
    });
    this.getFreezeMaster();
    // this.updateFreezeMaster();
  }

  getFreezeMaster() {
    this.freezeService.getFreezeMaster('').subscribe((res) => {
      this.freeze = res;
      console.log(res)
      // alert(JSON.stringify(res));
      debugger
      for (let i = 0; i < JSON.parse(JSON.stringify(res)).length; i++) {
        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeRegionMaster') {     
          this.data =res[i].status;
          this.freezeForm.patchValue({
            regionMasterId: JSON.parse(JSON.stringify(res))[i].id,
            regionMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }
        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeStationMaster') {
          this.data1 =res[i].status;
          this.freezeForm.patchValue({
            stationMasterId: JSON.parse(JSON.stringify(res))[i].id,
            stationMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeSchoolInstitutionMaster') {
          this.data2 =res[i].status;
          this.freezeForm.patchValue({
            schoolInstitutionMasterId: JSON.parse(JSON.stringify(res))[i].id,
            schoolInstitutionMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }
        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeStationCategoryMaster') {
          this.data3 =res[i].status;
          this.freezeForm.patchValue({
            stationCategoryMasterId: JSON.parse(JSON.stringify(res))[i].id,
            stationCategoryMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }
        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeStaffTypeMaster') {
          this.data4 =res[i].status;
          this.freezeForm.patchValue({
            staffTypeMasterId: JSON.parse(JSON.stringify(res))[i].id,
            staffTypeMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }


        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeDesignationMaster') {
          this.data5 =res[i].status;
          this.freezeForm.patchValue({
            designationMasterId: JSON.parse(JSON.stringify(res))[i].id,
            designationMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeSubjectMaster') {
          this.data6 =res[i].status;
          this.freezeForm.patchValue({
            subjectMasterId: JSON.parse(JSON.stringify(res))[i].id,
            subjectMaster: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeRegionStationMapping') {
          this.data7 =res[i].status;
          this.freezeForm.patchValue({
            regionStationMappingId: JSON.parse(JSON.stringify(res))[i].id,
            regionStationMapping: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeStationCategoryMapping') {
          this.data8 =res[i].status;
          this.freezeForm.patchValue({
            stationCategoryMappingId: JSON.parse(JSON.stringify(res))[i].id,
            stationCategoryMapping: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeStationSchoolMapping') {
          this.data9 =res[i].status;
          this.freezeForm.patchValue({
            stationSchoolMappingId: JSON.parse(JSON.stringify(res))[i].id,
            stationSchoolMapping: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeStaffTypePostMapping') {
          this.data10 =res[i].status;
          this.freezeForm.patchValue({
            staffTypePostMappingId: JSON.parse(JSON.stringify(res))[i].id,
            staffTypePostMapping: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezePostSubjectMapping') {
          this.data11 =res[i].status;
          this.freezeForm.patchValue({
            postSubjectMappingId: JSON.parse(JSON.stringify(res))[i].id,
            postSubjectMapping: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

        if (JSON.parse(JSON.stringify(res))[i].operation == 'freezeSanctionedPostMapping') {
          this.data12 =res[i].status;
          this.freezeForm.patchValue({
            sanctionedPostMappingId: JSON.parse(JSON.stringify(res))[i].id,
            sanctionedPostMapping: JSON.parse(JSON.stringify(res))[i].status,
          });
        }

      }

      console.log(JSON.stringify(this.freezeForm.value))
    });
  }

  // updateFreezeMaster(){
  //   this.freezeService.updateFreezeMaster().subscribe((res:any)=>{
  //     this.freeze=res;
  //   })
  // }

  finalValues: any = {
    regionMaster: false,
    stationMaster: false,
    schoolInstitutionMaster: false,
    stationCategoryMaster: false,
    staffTypeMaster: false,
    designationMaster: false,
    subjectMaster: false,
    regionStationMapping: false,
    stationCategoryMapping: false,
    stationSchoolMapping: false,
    staffTypePostMapping: false,
    postSubjectMapping: false,
    sanctionedPostMapping: false,
  };

  freezemaster(formValue: any) {
    console.log(this.freezeForm.value);
    // alert(JSON.stringify(formValue, null, 2));
  }

  data: boolean = false;
  data1: boolean = false;
  data2: boolean = false;
  data3: boolean = false;
  data4: boolean = false;
  data5: boolean = false;
  data6: boolean = false;
  data7: boolean = false;
  data8: boolean = false;
  data9: boolean = false;
  data10: boolean = false;
  data11: boolean = false;
  data12: boolean = false;
  onToggle(data: any,masterType:any) {
   // flips the value of data
    //alert(!data?.regionMaster);
    // this.finalValues.regionMaster = !data?.regionMaster;
    // console.log(this.finalValues);
    // this.getFreezeMaster();
  //  alert(JSON.stringify(this.freezeForm.value));
  debugger
  if(masterType=='regionMaster')
  { 
   
    this. updateData = {
      id: this.freezeForm.controls['regionMasterId'].value,
      operation:'freezeRegionMaster',
      status: !data?.regionMaster,
    };
  }
  if(masterType=='stationMaster')
  {  
    this. updateData = {
      id: this.freezeForm.controls['stationMasterId'].value,
      operation: 'freezeStationMaster',
      status: !data?.stationMaster,
    };
  }
  if(masterType=='schoolInstitutionMaster')   
  {
    this. updateData = {
      id: this.freezeForm.controls['schoolInstitutionMasterId'].value,
      operation: 'freezeSchoolInstitutionMaster',
      status: !data?.schoolInstitutionMaster,
    };
  }
  if(masterType=='stationCategoryMaster')
  {
    this. updateData = {
      id: this.freezeForm.controls['stationCategoryMasterId'].value,
      operation: 'freezeStationCategoryMaster',
      status: !data?.stationCategoryMaster,
    };
  }
  if(masterType=='staffTypeMaster')
  {
    this. updateData = {
      id: this.freezeForm.controls['staffTypeMasterId'].value,
      operation: 'freezeStaffTypeMaster',
      status: !data?.staffTypeMaster,
    };
  }

  if(masterType=='designationMaster')
  {
    this. updateData = {
      id: this.freezeForm.controls['designationMasterId'].value,
      operation: 'freezeDesignationMaster',
      status: !data?.designationMaster,
    };
  }

  if(masterType=='subjectMaster')
  {
    this. updateData = {
      id: this.freezeForm.controls['subjectMasterId'].value,
      operation: 'freezeSubjectMaster',
      status: !data?.subjectMaster,
    };
  }

  
  if(masterType=='regionStationMapping')
  {
    this. updateData = {
      id: this.freezeForm.controls['regionStationMappingId'].value,
      operation: 'freezeRegionStationMapping',
      status: !data?.regionStationMapping,
    };
  }

  if(masterType=='stationCategoryMapping')
  {
    this. updateData = {
      id: this.freezeForm.controls['stationCategoryMappingId'].value,
      operation: 'freezeStationCategoryMapping',
      status: !data?.stationCategoryMapping,
    };
  }

  if(masterType=='stationSchoolMapping')
  {
    this. updateData = {
      id: this.freezeForm.controls['stationSchoolMappingId'].value,
      operation: 'freezeStationSchoolMapping',
      status: !data?.stationSchoolMapping,
    };
  }

  if(masterType=='staffTypePostMapping')
  {
    this. updateData = {
      id: this.freezeForm.controls['staffTypePostMappingId'].value,
      operation: 'freezeStaffTypePostMapping',
      status: !data?.staffTypePostMapping,
    };
  }

  if(masterType=='postSubjectMapping')
  {
    this. updateData = {
      id: this.freezeForm.controls['postSubjectMappingId'].value,
      operation:'freezePostSubjectMapping',
      status: !data?.postSubjectMapping,
    };
  }

  if(masterType=='sanctionedPostMapping')
  {
    this. updateData = {
      id: this.freezeForm.controls['sanctionedPostMappingId'].value,
      operation: 'freezeSanctionedPostMapping',
      status: !data?.sanctionedPostMapping,
    };
  }

    this.freezeService.updateFreezeMaster(this.updateData).subscribe((res) => {
    //   console.log("after update")
    //  console.log(res)
    this.getFreezeMaster();
    })
 
  }

  

  // onToggle1(data: any) {
  //   this.data1 = !this.data1; // flips the value of data
  //   this.finalValues.stationMaster = !data?.stationMaster;
  //   console.log(this.finalValues);
  // }
  // onToggle2(data: any) {
  //   this.data2 = !this.data2; // flips the value of data
  //   this.finalValues.schoolInstitutionMaster = !data?.schoolInstitutionMaster;
  //   console.log(this.finalValues);
  // }
  // onToggle3(data: any) {
  //   this.data3 = !this.data3; // flips the value of data
  //   this.finalValues.stationCategoryMaster = !data?.stationCategoryMaster;
  //   console.log(this.finalValues);
  // }

  // onToggle4(data: any) {
  //   this.data4 = !this.data4; // flips the value of data
  //   this.finalValues.staffTypeMaster = !data?.staffTypeMaster;
  //   console.log(this.finalValues);
  // }
  // onToggle5(data: any) {
  //   this.data5 = !this.data5; // flips the value of data
  //   this.finalValues.designationMaster = !data?.designationMaster;
  //   console.log(this.finalValues);
  // }
  // onToggle6(data: any) {
  //   this.data6 = !this.data6; // flips the value of data
  //   this.finalValues.subjectMaster = !data?.subjectMaster;
  //   console.log(this.finalValues);
  // }
  // onToggle7(data: any) {
  //   this.data7 = !this.data7; // flips the value of data
  //   this.finalValues.regionStationMapping = !data?.regionStationMapping;
  //   console.log(this.finalValues);
  // }
  // onToggle8(data: any) {
  //   this.data8 = !this.data8; // flips the value of data
  //   this.finalValues.stationCategoryMapping = !data?.stationCategoryMapping;
  //   console.log(this.finalValues);
  // }
  // onToggle9(data: any) {
  //   this.data9 = !this.data9; // flips the value of data
  //   this.finalValues.stationSchoolMapping = !data?.stationSchoolMapping;
  //   console.log(this.finalValues);
  // }
  // onToggle10(data: any) {
  //   this.data10 = !this.data10; // flips the value of data
  //   this.finalValues.staffTypePostMapping = !data?.staffTypePostMapping;
  //   console.log(this.finalValues);
  // }
  // onToggle11(data: any) {
  //   this.data11 = !this.data11; // flips the value of data
  //   this.finalValues.postSubjectMapping = !data?.postSubjectMapping;
  //   console.log(this.finalValues);
  // }
  // onToggle12(data: any) {
  //   this.data12 = !this.data12; // flips the value of data
  //   this.finalValues.sanctionedPostMapping = !data?.sanctionedPostMapping;
  //   console.log(this.finalValues);
  // }
}
