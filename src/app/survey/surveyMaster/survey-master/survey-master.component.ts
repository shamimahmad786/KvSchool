import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OutsideServicesService } from 'src/app/service/outside-services.service';

@Component({
  selector: 'app-survey-master',
  templateUrl: './survey-master.component.html',
  styleUrls: ['./survey-master.component.css']
})
export class SurveyMasterComponent implements OnInit {

  toppingsControl = new FormControl('test');
  teamInitial = [];

  customQuestionsList:any;
  customQuestionsListUpdate:any=[];
  surveyMaster:FormGroup;
  surveyQuestions:FormGroup;
  surveyMstQuestion:FormGroup;
  selection:any = [];

  actualForm: any = [];
  actualFormData:any;

  udiseCode:any;
  surveyMasterList:any;
  surveyMstQuesId:any;

  surveySelected:any;

  surveyMasterData:any={'surveyId':"",
  'surveyCode':"",
  'surveyName':"",
  'surveyStartDate':"",
  'surveyEndDate':"",
  'surveyDescription':"",
  'surveyUploadDocument':"",
  'createdByUser':""};

  @ViewChild('test', { static: true }) test: TemplateRef<any>;

  constructor(private outSideService:OutsideServicesService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.udiseCode = JSON.parse(sessionStorage.getItem('udiseSchCode'))
    
    this.getSurveyMasterList(this.udiseCode.udiseSchCode)

    this.surveyMaster = new FormGroup({
      'surveyName': new FormControl(''),
      'surveyStartDate': new FormControl(''),
      'surveyEndDate': new FormControl(''),
      'surveyDescription': new FormControl(''),
      'surveyUploadDocument': new FormControl('')
    })
    this.surveyQuestions = new FormGroup({
      toppings: this.toppingsControl
    })
  }

  getCustomQuestion(){
    this.outSideService.getCustomQues("1").subscribe((response)=>{
      this.customQuestionsList = response;
    })
  }

  onSubmitMaster(){
    this.surveyMasterData.surveyName=this.surveyMaster.value.surveyName
    this.surveyMasterData.surveyStartDate=this.surveyMaster.value.surveyStartDate
    this.surveyMasterData.surveyEndDate=this.surveyMaster.value.surveyEndDate
    this.surveyMasterData.surveyDescription=this.surveyMaster.value.surveyDescription
    this.surveyMasterData.surveyUploadDocument=this.surveyMaster.value.surveyUploadDocument
    this.surveyMasterData.createdByUser = this.udiseCode.udiseSchCode
    this.outSideService.saveSurveyMaster(this.surveyMasterData).subscribe((response)=>{
      if(response){
      }
      this.getSurveyMasterList(this.udiseCode.udiseSchCode)
    })
    
  } 

  getSurveyMasterList(data){
    this.outSideService.getSurveyMasterList(data).subscribe((response)=>{
      this.surveyMasterList = response;
      this.getCustomQuestion();
    })
  }

  getSurveyMasterQues(data){   
      this.customQuestionsListUpdate = [];
      this.selection = []; 
      const surveyId = data*1;
      this.outSideService.getSurveyMstQues(surveyId).subscribe((response)=>{        
        this.surveyMstQuesId = response;
        for(let i=0; i<this.surveyMstQuesId.length; i++){
          for(let j=0; j<this.customQuestionsList.length; j++){
            if(this.surveyMstQuesId[i].questionId == this.customQuestionsList[j].question_id){
              this.selection.push(this.customQuestionsList[j])
            }
          }
        }
        
        for(let i=0; i<this.customQuestionsList.length; i++){
          var isValid:boolean = false;
          var customQuesListQuesId:any = this.customQuestionsList[i].question_id;
          for(let j=0; j<this.selection.length; j++){
            if(customQuesListQuesId == this.selection[j].question_id){
              isValid = true
            }
          }
          if(!isValid){
            this.customQuestionsListUpdate.push(this.customQuestionsList[i])
          }
        }
      })
    }

  getValues(event: {
    isUserInput: any;
    source: { value: any; selected: any };
  }) {    
    if (event.isUserInput) {
      if (event.source.selected === true) {
        this.selection.push(event.source.value)
      } else {
        this.selection.splice(this.selection.indexOf(event.source.value),1)
      }
    }
  }

  onSubmitSurveyMstQues(){
    var surveyMstQues = [];
    var surveyMastQuesObj = {"questionId":"","surveyId":""}
    for(let i=0; i<this.selection.length; i++){
      surveyMastQuesObj.questionId = this.selection[i].question_id;
      surveyMastQuesObj.surveyId = this.surveySelected;
      surveyMstQues.push(surveyMastQuesObj)
      surveyMastQuesObj = {"questionId":"","surveyId":""}
    }
    this.outSideService.removeSurveyMstQuesBySurveyId(this.surveySelected*1).subscribe((response)=>{
      this.outSideService.saveSurveyMstQues(surveyMstQues).subscribe((response)=>{
        if(response){
          alert("Successfully Saved")
        }
      })
    })
    
  }

  removeFromLocal(value){
    this.selection.splice(this.selection.indexOf(value),1);
    if(this.customQuestionsListUpdate.includes(value)){      
    }else{
      this.customQuestionsListUpdate.push(value)
    }    
  }

  onSelectMasterSurvey(event){
    this.teamInitial = [];
    this.surveySelected = event.target.value;
    this.getSurveyMasterQues(this.surveySelected);
  }


  // viewSample(value){
  //    this.actualFormData = value;
  //   var obj2 = {}
  //   var testNew = [];
  //   var fieldCount = [];  
  //   for(let i=1; i<=this.actualFormData.field_count; i++){
      
  //     fieldCount.push("field"+"_"+"position"+"_"+"0"+i)
  //   }
  //   for(let i=1; i<=this.actualFormData.field_count; i++){
  //     testNew.push(obj2["'"+i+"'"]=this.actualFormData[fieldCount[i-1]])
  //   }
  //   this.actualFormData.field_position_01 = testNew
  
  //   this.actualForm.push(this.actualFormData)


  //   this.modalService.open(this.test, { size: 'xl', backdrop: 'static', keyboard: false });
  // }

  onVerify(){
    this.actualForm = [];
  }

}
