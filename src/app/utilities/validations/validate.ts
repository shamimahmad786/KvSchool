import { FormControl, AbstractControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

export class CustomValidator {
  numberOnly: any;
  static IsText(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === '') return null;

    const regularExpression = /^[a-z0-9A-Z.() ]*$/
    if (!val.match(regularExpression)) {
      return { 'textField': true }
    }
    return null;
  }
  static IsTextSchool(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === '') return null;

    const regularExpression = /^[a-z0-9A-Z'.() ]*$/
    if (!val.match(regularExpression)) {
      return { 'textField': true }
    }
    return null;
  }
  static IsText1(control: AbstractControl) {
    let val = control.value;
    if (val === null || val === '') return null;

    const regularExpression = /^[a-zA-Z{3}][a-z0-9A-Z ]*$/
    if (!val.match(regularExpression)) {
      return { 'textField': true }
    }
    return null;
  }
  
  public isInteger(evt: any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.numberOnly = true;
      return false;
    }
    this.numberOnly = false;
    return true;
  }
}