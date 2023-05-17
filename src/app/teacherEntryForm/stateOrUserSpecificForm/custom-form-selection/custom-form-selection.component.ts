import { flatten } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-custom-form-selection',
  templateUrl: './custom-form-selection.component.html',
  styleUrls: ['./custom-form-selection.component.css']
})
export class CustomFormSelectionComponent implements OnInit {

  productForm: FormGroup;
  actualForm: any = [];
  actualFormData:any;
  otherSelected:boolean=false;
  noneSelected:boolean=false;
  onInput:boolean=false;
  businessUnitIdentity:any = '1';
  savedCustomForm:any;

  constructor(private fb:FormBuilder, private outSideService: OutsideServicesService) { 

   

  }
  onSelectType:boolean = false;
  selectedLevel:String = 'Select'
  setLableType:String;
  onValid:boolean = false;

  agreeType=['Strongly agree', 'Agree', 'Neither agree nor disagree', 'Disagree', 'Strongly disagree'];
  satisfiedType=['Very satisfied', 'Satisfied', 'Neither satisfied nor dissatisfied','Dissatisfied','Very dissatisfied']
  yesnoType=['Yes','No'];
  interestedType=['Extremely interested','Very interested','Somewhat interested','Not so interested','Not at all interested'];
  easyType=['Very easy','Easy','Neither easy nor difficult','Difficult','Very difficult'];
  alwaysType=['Always','Usually','Sometimes','Rarely','Never'];
  approveType=['Strongly approve','Approve','Neither approve nor disapprove','Disapprove','Strongly disapprove'];
  trueType=['True','False'];
  allType=['All','Most','Some','A few','None'];
  positiveType=['Very positive','Positive','Neutral','Negative','Very negative'];
  clearlyType=['Extremely clearly','Very clearly','Somewhat clearly','Not so clearly','Not at all clearly'];
  earlyType=['Early','On time','Late'];
  monthsType=['January','February','March','April','May','June','July','August','September','October','November','December'];
  weekType=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  incomeType=['Under $15,000','Between $15,000 and $29,999','Between $30,000 and $49,999','Between $50,000 and $74,999','Between $75,000 and $99,999','Between $100,000 and $150,000','Over $150,000'];
  raceType=['White or Caucasian','Black or African American','Hispanic or Latino','Asian or Asian American','American Indian or Alaska Native','Native Hawaiian or other Pacific Islander','Another race'];
  ageType=['Under 18','18-24','25-34','35-44','45-54','55-64','65+'];
  frequencyType=['Every day','A few times a week','About once a week','A few times a month','Once a month','Less than once a month'];
  recentexpType=['In the last week','More than a week ago but less than a month ago','More than a month ago','More than a month ago but less than a year ago','More than a year ago'];




  ngOnInit(): void {

    this.productForm = this.fb.group({   
      'name': this.fb.control('', Validators.required),
      'label': this.fb.control('', Validators.required),
      'type': this.fb.control('', Validators.required),
      'noneClick': this.fb.control('', Validators.required),
      'quantities': this.fb.array([]) ,  
    });

    this.getCustomQuestion();
  }

  getCustomQuestion(){
    this.outSideService.getCustomQues(this.businessUnitIdentity).subscribe((response)=>{
      this.savedCustomForm = response
      for(let i=0; i<this.savedCustomForm.length; i++){
      this.actualFormData = this.savedCustomForm[i]
      var obj2 = {}
      var testNew = [];
      var fieldCount = [];  
      for(let j=1; j<=this.actualFormData.field_count; j++){        
        fieldCount.push("field"+"_"+"position"+"_"+"0"+j)
      }

      for(let k=1; k<=this.actualFormData.field_count; k++){
        testNew.push(obj2["'"+k+"'"]=this.actualFormData[fieldCount[k-1]])
      }
      this.actualFormData.field_position_01 = testNew
      this.actualForm.push(this.actualFormData)
      }     
    })
  }



  //Dynamic add remove form starts
  quantities() : FormArray {  
    return this.productForm.get("quantities") as FormArray  
  }  
     
  newQuantity(data): FormGroup {  
    return this.fb.group({  
      qty: data
    })  
  }  
     
  addQuantity(data) {  
    this.quantities().push(this.newQuantity(data));  
  }  
     
  removeQuantity(i:number) {  
    this.quantities().removeAt(i);  
  }  
     
  onSubmit() {     
    this.productForm.patchValue({
      type: this.setLableType
    });
    

    var obj = {
      question_text: this.productForm.value.label,
      question_type: this.productForm.value.type,
      field_count: this.productForm.value.quantities.length,
      businessUnitIdentityCode: '1'
  };
  for(let i=0; i<this.productForm.value.quantities.length; i++){
    obj["field"+"_"+"position"+"_"+"0"+(i+1)] = this.productForm.value.quantities[i].qty
  }

  this.outSideService.saveCustomQues(obj).subscribe((response)=>{
    this.actualForm = [];
    this.getCustomQuestion();
    // this.actualFormData = response;
    // var obj2 = {}
    // var testNew = [];
    // var fieldCount = [];  
    // for(let i=1; i<=this.actualFormData.field_count; i++){
      
    //   fieldCount.push("field"+"_"+"position"+"_"+"0"+i)
    // }
    // for(let i=1; i<=this.actualFormData.field_count; i++){
    //   testNew.push(obj2["'"+i+"'"]=this.actualFormData[fieldCount[i-1]])
    // }
    // this.actualFormData.field_position_01 = testNew
    
    // this.actualForm.push(this.actualFormData)
  })
  }  
  //Dynamic add remove form end

  onChange(data){
    if(data){
      this.onSelectType = true;
    }
  }

  onChangeSelection(event){
  }

  optionalChechBox(value){
    if(value == 'other'){
      if(this.otherSelected == false){
        this.otherSelected = true
      }else{
        this.otherSelected = false;
      }
      if(this.otherSelected == true){
        this.addQuantity('Other')
      }
      if(this.otherSelected == false){
        this.quantities().removeAt(this.productForm.get('quantities').value.length-1);
      }
    }else if(value == 'none'){
      if(this.noneSelected == false){
        this.noneSelected = true
      }else{
        this.noneSelected = false;
      }
      if(this.noneSelected == true){
        this.addQuantity('None of the above')
      }
      if(this.noneSelected == false){
        this.quantities().removeAt(this.productForm.get('quantities').value.length-1);
      }
    }
    
  }

  onselectedlevel(event){
    this.selectedLevel = event;
    if(this.selectedLevel == 'Multiple Choice'){
      this.setLableType = 'checkbox'
    }else if(this.selectedLevel == 'Radio Button'){
      this.setLableType = 'radio'
    }else if(this.selectedLevel == 'Dropdown'){
      this.setLableType = 'select'
    }else if(this.selectedLevel == 'Single Text'){
      this.setLableType = 'input'
    }else if(this.selectedLevel == 'Multiple Text'){
      this.setLableType = 'multipleText'
    }else if(this.selectedLevel == 'Date Time'){
      this.setLableType = 'dateTime'
    }
    const arr = <FormArray>this.productForm.controls.quantities;
    arr.controls = [];
    if(this.setLableType == 'checkbox' || this.setLableType=='radio' || this.setLableType=='select'){
      this.onValid=true;
    }else {
      this.onValid = false;
    }
    

    if(this.setLableType != 'input'){
      if(this.setLableType == 'dateTime' || this.setLableType == 'input'){
        var j=1;
      }else{
        var j=4;
      }
      for(let i=0; i<j; i++){
        this.addQuantity('');
      }
    }   

  }

  

  onChangeType(data){
    
    const arr = <FormArray>this.productForm.controls.quantities;
    arr.controls = [];
    if(data == 'agree'){
      for(let i=0; i<this.agreeType.length; i++){
        this.addQuantity(this.agreeType[i]);
      }
    }else if(data == 'satisfied'){
      for(let i=0; i<this.satisfiedType.length; i++){
        this.addQuantity(this.satisfiedType[i]);
      }
    }else if(data == 'yesno'){
      for(let i=0; i<this.yesnoType.length; i++){
        this.addQuantity(this.yesnoType[i]);
      }
    }else if(data == 'interested'){
      for(let i=0; i<this.interestedType.length; i++){
        this.addQuantity(this.interestedType[i]);
      }
    }else if(data == 'easy'){
      for(let i=0; i<this.easyType.length; i++){
        this.addQuantity(this.easyType[i]);
      }
    }else if(data == 'always'){
      for(let i=0; i<this.alwaysType.length; i++){
        this.addQuantity(this.alwaysType[i]);
      }
    }else if(data == 'approve'){
      for(let i=0; i<this.approveType.length; i++){
        this.addQuantity(this.approveType[i]);
      }
    }else if(data == 'true'){
      for(let i=0; i<this.trueType.length; i++){
        this.addQuantity(this.trueType[i]);
      }
    }else if(data == 'all'){
      for(let i=0; i<this.allType.length; i++){
        this.addQuantity(this.allType[i]);
      }
    }else if(data == 'positive'){
      for(let i=0; i<this.positiveType.length; i++){
        this.addQuantity(this.positiveType[i]);
      }
    }else if(data == 'clearly'){
      for(let i=0; i<this.clearlyType.length; i++){
        this.addQuantity(this.clearlyType[i]);
      }
    }else if(data == 'early'){
      for(let i=0; i<this.earlyType.length; i++){
        this.addQuantity(this.earlyType[i]);
      }
    }else if(data == 'months'){
      for(let i=0; i<this.monthsType.length; i++){
        this.addQuantity(this.monthsType[i]);
      }
    }else if(data == 'week'){
      for(let i=0; i<this.weekType.length; i++){
        this.addQuantity(this.weekType[i]);
      }
    }else if(data == 'income'){
      for(let i=0; i<this.incomeType.length; i++){
        this.addQuantity(this.incomeType[i]);
      }
    }else if(data == 'race'){
      for(let i=0; i<this.raceType.length; i++){
        this.addQuantity(this.raceType[i]);
      }
    }else if(data == 'age'){
      for(let i=0; i<this.ageType.length; i++){
        this.addQuantity(this.ageType[i]);
      }
    }else if(data == 'frequency'){
      for(let i=0; i<this.frequencyType.length; i++){
        this.addQuantity(this.frequencyType[i]);
      }
    }else if(data == 'recentexp'){
      for(let i=0; i<this.recentexpType.length; i++){
        this.addQuantity(this.recentexpType[i]);
      }
    }else{
      for(let i=0; i<4; i++){
        this.addQuantity('');
      }
    }   
  }


  

}
