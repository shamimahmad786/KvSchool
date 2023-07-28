import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-school-review',
  templateUrl: './school-review.component.html',
  styleUrls: ['./school-review.component.css']
})
export class SchoolReviewComponent implements OnInit {
  schoolReviewForm: FormGroup;
  dummyJson: any[] = [];
  submitted = false;
  constructor() { }

  ngOnInit(): void {
    this.schoolReviewForm = new FormGroup({
      'correctDcDropDown': new FormControl(''),
      'correctTcDropDown': new FormControl(''),
      'correctDcPoint': new FormControl(''),
      'correctTcPoint': new FormControl('')
    });
    this.dummyJson =[
      {
        "name": "Adeel Solangi",
        "emp_code": "1234",
        "id": "1",
      "dc_count":"12",
      "tc_count":"8"
      
      },
      {
        "name": "Afzal Ghaffar",
        "emp_code": "5634",
        "id": "2",
        "dc_count":"24",
      "tc_count":"18"
      },
     {
        "name": "Bhupesh Menon",
        "emp_code": "9766",
        "id": "4",
      "dc_count":"26",
      "tc_count":"28"
      },
      {
        "name": "Bhupesh Menon",
        "emp_code": "4565",
        "id": "3",
        "dc_count":"32",
      "tc_count":"15"
      }
    
    ]
    this.schoolEmlpyList();
  }
 schoolEmlpyList()
 {
console.log( this.dummyJson)
 }

verifyTcDcData(emp_code:any)
{
alert(emp_code)
this.schoolReviewForm.value;
console.log(this.schoolReviewForm.value)
debugger
// if(this.schoolReviewForm.value.correctDcDropDown!=''){
//   if(this.schoolReviewForm.value.correctDcPoint=='')
//   {
//     Swal.fire(
//       'Please Fill All DC  Field !',
//       '',
//       'error'
//     )
//   }
// }
//  if(this.schoolReviewForm.value.correctTcDropDown!=''){
//   if(this.schoolReviewForm.value.correctTcPoint=='')
//   {
//     Swal.fire(
//       'Please Fill All TC Field !',
//       '',
//       'error'
//     )
//   }
// }
// if(this.schoolReviewForm.value.correctDcDropDown=='' && this.schoolReviewForm.value.correctTcDropDown=='' &&  this.schoolReviewForm.value.correctDcPoint=='' && this.schoolReviewForm.value.correctTcPoint==''){
//   Swal.fire(
//     'Please Fill All The Required Field !',
//     '',
//     'error'
//   )
// }

// else{
//   alert("data is correct")
// }

}
}
