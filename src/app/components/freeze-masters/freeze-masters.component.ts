import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-freeze-masters',
  templateUrl: './freeze-masters.component.html',
  styleUrls: ['./freeze-masters.component.css']
})
export class FreezeMastersComponent implements OnInit {
  freezeForm?:FormGroup;

  constructor(private fb:FormBuilder) { }


  ngOnInit(): void {
    this.freezeForm=this.fb.group({
      regionMaster:[''],
      stationMaster:[''],
      schoolInstitutionMaster:[''],
      stationCategoryMaster:[''],
      staffTypeMaster:[''],
      designationMaster:[''],
      subjectMaster:[''],
      regionStationMapping:[''],
      stationCategoryMapping:[''],
      stationSchoolMapping:[''],
      staffTypePostMapping:[''],
      postSubjectMapping:[''],
      sanctionedPostMapping:['']

    })
  }


  freezemaster(){
    console.log(this.freezeForm);
  }


  data: boolean = false;  data1: boolean = false;  data2: boolean = false;  data3: boolean = false;
  data4: boolean = false; data5: boolean = false;  data6: boolean = false;  data7: boolean = false; data8: boolean = false; 
  data9: boolean = false; data10: boolean = false; data11: boolean = false; data12: boolean = false; 
  onToggle(){
      this.data = !this.data; // flips the value of data
  }

  onToggle1(){
    this.data1 = !this.data1; // flips the value of data
}
onToggle2(){
  this.data2 = !this.data2; // flips the value of data
}
onToggle3(){
  this.data3 = !this.data3; // flips the value of data
}

onToggle4(){
  this.data4 = !this.data4; // flips the value of data
}
onToggle5(){
  this.data5 = !this.data5; // flips the value of data
}
onToggle6(){
  this.data6 = !this.data6; // flips the value of data
}
onToggle7(){
  this.data7 = !this.data7; // flips the value of data
}
onToggle8(){
  this.data8 = !this.data8; // flips the value of data
}
onToggle9(){
  this.data9 = !this.data9; // flips the value of data
}
onToggle10(){
  this.data10 = !this.data10; // flips the value of data
}
onToggle11(){
  this.data11 = !this.data11; // flips the value of data
}
onToggle12(){
  this.data12 = !this.data12; // flips the value of data
}

}
