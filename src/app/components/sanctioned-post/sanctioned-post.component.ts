import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterReportPdfService } from 'src/app/kvs/makePdf/master-report-pdf.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import Swal from 'sweetalert2';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
declare const srvTime: any;
@Component({
  selector: 'app-sanctioned-post',
  templateUrl: './sanctioned-post.component.html',
  styleUrls: ['./sanctioned-post.component.css']
})
export class SanctionedPostComponent implements OnInit {
  sanctionedPost:FormGroup;
  schoolCode:any='';
  data: any;
  isEdit: boolean;
  regionList: any=[];
  stationList: any=[];
  schoolList:any=[];
  sanctionPostMappingDataListArray: any=[];
  returnTypeSrvTime: any;
  regionNameCode: any;
  constructor(private pdfService: MasterReportPdfService,private fb: FormBuilder,private outSideService: OutsideServicesService, public route:Router,
    private router: ActivatedRoute) { }
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;
  responseData: any;
  shiftAvailable: boolean = false;
  totalSanctionedPost:number = 0;
  totalSurplusPost:number = 0;
  totalOccupiedPost:number = 0;
  totalVacantPost:number = 0;
  regionSelection:any=1;
  stationSelection:any;
  regionCode:any;
  stationCode:any;
  selectedRegion:any;
businessTypeId:any;
businessTypeCode:any;
regionName:any;
stationName:any;
schoolName:any;
sanctionPostFor:any;
shift:any;


  testData = {sno: '',stationName:'', staffType: '', postName: '', postCode: '',subjectName:'',subjectCode:'',sanctionedPost:'',occupiedPost:'',vacant:'',surplus:''};
  ngOnInit(): void {
    this.regionName =localStorage.getItem('regionName');
    this.stationName =localStorage.getItem('stationName');
    this.schoolName = localStorage.getItem('schoolName');
    this.buildSanctionForm();
    this.router.queryParams.subscribe(params => {
      this.schoolCode=params['SchoolCode'];
      this.regionCode=params['RegionCode'];
      this.stationCode=params['StationCode'];
      this.shift=params['Shift'];
      // this.getStationList( params['RegionCode']);
      // this.getSanctionPostList(params['SchoolCode']);
       //this.getSchoolList(params['StationCode']);
    })
    this.isEdit=false;
    this.businessTypeId=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_id;
    this.businessTypeCode=JSON.parse(sessionStorage.getItem('authTeacherDetails')).applicationDetails[0].business_unit_type_code;
    // this.getRegionList();
    

    if(this.businessTypeId=="3"){
   this.selectedRegion=+this.businessTypeCode.trim();
   // this.getStationList(this.selectedRegion);
    }
    this.fetchSanctionPost("2",this.schoolCode,this.stationCode,this.shift);
  }
  buildSanctionForm(){
    this.sanctionedPost = this.fb.group({
      'sanctionedPostDetails': new FormArray([]),
     'schoolCode':['',Validators.required],
    });

  }
  getRegionList(){
    debugger
    this.outSideService.fetchRegionList().subscribe((res)=>{
      alert(JSON.stringify(res));
      if(res.length>0){
        res.forEach(element => {
          if(element.isActive==true){
            this.regionList.push(element)
          }
        });
      }
      if(this.businessTypeId=="3"){
        // alert("called"+this.regionList);
        for(var i=0;i<this.regionList.length;i++){
          // alert(this.regionList[i].regionCode+"----"+this.selectedRegion)
      if(this.regionList[i].regionCode==this.selectedRegion){
        // alert("matched")
    this.regionName=this.regionList[i].regionName;
      }
        }
        this.getStationList(this.selectedRegion);
      }

   
// alert( this.regionName);
    })
 
  }
  nationalEdit:any;
  fetchSanctionPost(type,value,depValue,schoolShift){
  const data={"type":type,"value":value,"depValue":depValue,"shift":schoolShift};
  this.sanctionedPost.get('schoolCode').setValue(value);
  this.outSideService.fetchSanctionPost(data).subscribe((res)=>{
    // alert(JSON.stringify(res));
  //  alert(JSON.stringify(res));
    this.setDataToSanctionedArray(JSON.parse(JSON.stringify(res)).rowValue)
          this.sanctionPostMappingDataListArray=[];
          if(JSON.parse(JSON.stringify(res)).rowValue.length>0){
            for (let i = 0; i < JSON.parse(JSON.stringify(res)).rowValue.length; i++) {
              this.testData.sno = '' + (i + 1) + '';
              this.testData.staffType = JSON.parse(JSON.stringify(res)).rowValue[i].stafftype_id;
              this.testData.postName =  JSON.parse(JSON.stringify(res)).rowValue[i].post_name;
              this.testData.postCode =  JSON.parse(JSON.stringify(res)).rowValue[i].post_code;
              this.testData.subjectName =  JSON.parse(JSON.stringify(res)).rowValue[i].subject_name;
              this.testData.subjectCode =  JSON.parse(JSON.stringify(res)).rowValue[i].subject_code;
              this.testData.sanctionedPost =  JSON.parse(JSON.stringify(res)).rowValue[i].sanctioned_post;
              this.testData.occupiedPost =  JSON.parse(JSON.stringify(res)).rowValue[i].occupied_post;
              this.testData.vacant =  JSON.parse(JSON.stringify(res)).rowValue[i].vacant;
              this.testData.surplus =  JSON.parse(JSON.stringify(res)).rowValue[i].surplus;
              this.sanctionPostMappingDataListArray.push(this.testData);
              this.testData = {sno: '',stationName:'', staffType: '', postName: '', postCode: '',subjectName:'',subjectCode:'',sanctionedPost:'',occupiedPost:'',vacant:'',surplus:''};
            }

            
          }

          if((type==2) && this.businessTypeId=="3"){
            this.isEdit=true;
          }else{
            this.isEdit=false;
          }

          if(this.businessTypeId=="2"){
            this.nationalEdit=true;
          }else{
            this.nationalEdit=false;
          }


          if(JSON.parse(JSON.stringify(res)).rowValue[0].freezed_sanction_post==1){
            this.isEdit=false;
          }
  })

  



}



  getSanctionPostList(schoolCode){
    debugger
    // alert("school name--->"+schoolCode)
     this.shift=this.schoolList[schoolCode.value].shift;
    this.schoolCode=this.schoolList[schoolCode.value].schoolCode;
    this.sanctionedPost.get('schoolCode').setValue(schoolCode.value);
    let request={
      schoolCode:schoolCode.value,
    }

    for(var i=0;i<this.schoolList.length;i++){
if(this.schoolList[i].schoolCode==this.schoolCode && this.schoolList[i].shift==this.shift){
this.schoolName=this.schoolList[i].schoolName;
}
    }


    this.fetchSanctionPost("2",schoolCode,this.stationCode,this.shift);
    this.sanctionPostFor=this.schoolName +" School";


    // this.outSideService.schoolCodeExistOrNot(request).subscribe((res)=>{
    //   console.log(res)
    //   this.data='';
    //   this.totalSanctionedPost = 0;
    //   this.totalSurplusPost = 0;
    //   this.totalOccupiedPost = 0;
    //   this.totalVacantPost = 0;
    //   if(res.message=="ENTRY-NOT-FOUND"){
    //     let req={}
    //     this.outSideService.fetchSubjectPostMapping(req).subscribe((res)=>{
    //       console.log(res)
    //     this.isEdit=false;
    //     this.setDataToSanctionedArray(res.content)
    //     this.sanctionPostMappingDataListArray=[];
    //     if(res.content.length>0){
    //       for (let i = 0; i < res.content.length; i++) {
    //         this.testData.sno = '' + (i + 1) + '';
    //         this.testData.staffType = res.content[i].staffType;
    //         this.testData.postName =  res.content[i].postName;
    //         this.testData.postCode =  res.content[i].postCode;
    //         this.testData.subjectName =  res.content[i].subjectName;
    //         this.testData.subjectCode =  res.content[i].subjectCode;
    //         this.testData.sanctionedPost =  res.content[i].sanctionedPost;
    //         this.testData.occupiedPost =  res.content[i].occupiedPost;
    //         this.testData.vacant =  res.content[i].vacant;
    //         this.testData.surplus =  res.content[i].surplus;
    //         this.sanctionPostMappingDataListArray.push(this.testData);
    //         this.testData = {sno: '', staffType: '', postName: '', postCode: '',subjectName:'',subjectCode:'',sanctionedPost:'',occupiedPost:'',vacant:'',surplus:''};
    //       }
    //       console.log("sanctionPostMappingDataListArray")
    //       console.log( this.sanctionPostMappingDataListArray)
    //   }       
    //     })
    //   }else{
    //     this.outSideService.fetchSanctionPostList(request).subscribe((res)=>{
    //       console.log(res)
    //       this.isEdit=true;
    //       this.setDataToSanctionedArray(res.content)
    //       this.sanctionPostMappingDataListArray=[];
    //       if(res.content.length>0){
    //         for (let i = 0; i < res.content.length; i++) {
    //           this.testData.sno = '' + (i + 1) + '';
    //           this.testData.staffType = res.content[i].staffType;
    //           this.testData.postName =  res.content[i].postName;
    //           this.testData.postCode =  res.content[i].postCode;
    //           this.testData.subjectName =  res.content[i].subjectName;
    //           this.testData.subjectCode =  res.content[i].subjectCode;
    //           this.testData.sanctionedPost =  res.content[i].sanctionedPost;
    //           this.testData.occupiedPost =  res.content[i].occupiedPost;
    //           this.testData.vacant =  res.content[i].vacant;
    //           this.testData.surplus =  res.content[i].surplus;
    //           this.sanctionPostMappingDataListArray.push(this.testData);
    //           this.testData = {sno: '', staffType: '', postName: '', postCode: '',subjectName:'',subjectCode:'',sanctionedPost:'',occupiedPost:'',vacant:'',surplus:''};
    //         }
    //         console.log("sanctionPostMappingDataListArray")
    //   console.log( this.sanctionPostMappingDataListArray)
    //     }     
    //       });
    //   }

    // },
    // error => {
    //   console.log(error);
    //   this.data='';
    //   this.totalSanctionedPost = 0;
    //   this.totalSurplusPost = 0;
    //   this.totalOccupiedPost = 0;
    //   this.totalVacantPost = 0;
    // })

  }
  onSubmit(){
    debugger
    if (this.sanctionedPost.invalid) {
     this.sanctionedPost.markAllAsTouched();
    }else{
       console.log(this.sanctionedPost.value);
       this.data=this.sanctionedPost.value.sanctionedPostDetails;

       
// alert(JSON.stringify(this.data));
       let sanctionedPostRequestVo2Data=[];
       
       if(!this.isEdit){
        this.data.forEach(element => {
          sanctionedPostRequestVo2Data.push({
          schoolCode:this.schoolCode,
          staffTypeId:element.staffTypeId,  
          postId:element.postId,
          subjectId:element.subjectId,
          sanctionedPost:element.sanctionedPost,
          occupiedPost:element.occupiedPost,
          vacant:element.vacantPost,
          surplus:element.surplusPost,
          sactionedPostId:element.sanctionedPostid,
          })
        });
       }else{
         //update case
        this.data.forEach(element => {
          sanctionedPostRequestVo2Data.push({
          sanctionedPost:element.sanctionedPost,
          occupiedPost:element.occupiedPost,
          vacant:element.vacantPost,
          surplus:element.surplusPost,
          sactionedPostId:element.sanctionedPostid,
          })
        });
       }

      if (sanctionedPostRequestVo2Data.length > 0 && this.isEdit == false) {
        let request = {
          sanctionedPostRequestVo2: sanctionedPostRequestVo2Data
        }

        // this.outSideService.saveSanctionedData(request).subscribe((res) => {
        //   if (res == "SUCCESS") {
        //     Swal.fire(
        //       'Sanction-Post Save Successfully!',
        //       '',
        //       'success'
        //     );
     
        //   }
        // })
      } 

      if(sanctionedPostRequestVo2Data.length > 0 && (this.isEdit == true || this.nationalEdit==true)){
        //update case
        let request = {
          listOfSanctionedPostUpdateRequestVo: sanctionedPostRequestVo2Data
        }


        // alert(JSON.stringify(request));

        this.outSideService.updateSanctionedData(request).subscribe((res) => {
          console.log(res)
          if (res == "SUCCESS") {
            Swal.fire(
              'Sanction-Post Updated Successfully!',
              '',
              'success'
            )
          }
        })
      }

    }
  }

  //Sanction Post Details Form Data Filling Start
  sanctionedPostDetails(): FormArray {
    return this.sanctionedPost.get("sanctionedPostDetails") as FormArray
  }
  setDataToSanctionedArray(data) {
    this.totalSanctionedPost=0;
    this.totalVacantPost=0;
    this.totalOccupiedPost=0;
    this.totalSurplusPost=0;
  debugger
    (this.sanctionedPost.controls['sanctionedPostDetails'] as FormArray).clear();
    for (let i = 0; i < data.length; i++) {
      this.totalSanctionedPost += (data[i].sanctioned_post)?data[i].sanctioned_post:0;
      this.totalVacantPost += (data[i].vacant)?data[i].vacant:0;
      this.totalOccupiedPost += (data[i].occupied_post)?data[i].occupied_post:0;
      this.totalSurplusPost += (data[i].surplus)?data[i].surplus:0;
      this.addQuantity(data[i])
    }
    if(this.totalSanctionedPost>this.totalOccupiedPost){
      this.totalVacantPost=this.totalSanctionedPost-this.totalOccupiedPost;
    }else{
      this.totalSurplusPost=this.totalOccupiedPost-this.totalSanctionedPost;
    }
  }
  addQuantity(data) {
    this.sanctionedPostDetails().push(this.newQuantity(data));
    console.log(this.sanctionedPostDetails['content'])
  }
  newQuantity(data): FormGroup {
    return this.fb.group({
      staffType:data?.stafftype_id=="1"?'Teaching':'Non Teaching',
      stationName:data?.station_name,
      postName:data?.post_name,
      postCode:data?.post_code,
      subjectName: data?.subject_name,
      subjectCode: data?.subject_code,
      sanctionedPost: [data.sanctioned_post > 0 ? data.sanctioned_post : 0, [Validators.required, Validators.min(0), Validators.max(20000), Validators.pattern("[0-9]*$")]],
      occupiedPost: [data.occupied_post > 0 ? data.occupied_post : 0, [Validators.required, Validators.min(0), Validators.max(20000), Validators.pattern("[0-9]*$")]],
      vacantPost: [data.vacant > 0 ? data.vacant : 0],
      surplusPost: [data.surplus > 0 ? data.surplus : 0],
      postId:data?.post_id,
      staffTypeId:data?.staff_type_id,
      subjectId:data?.subject_id,
      sanctionedPostid:data?.id,

    })
  }
  keyPressNumbers(event) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  calculateVacantPost(event, i, type) {
    if (event.target.value >= 0) {
      var vacantPost = 0;
      if (type == 'O' && (((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').valid)) {
        var noOfSanctionedPost = ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').value;
        vacantPost = (noOfSanctionedPost*1 - event.target.value*1);
        if(vacantPost < 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue((vacantPost*(-1)));
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }else if(vacantPost > 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(vacantPost);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
        }else{
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }
      } else if (type == 'S' && (((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').valid)) {
        var noOfOccupiedPost = ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').value
        vacantPost = (event.target.value*1 - noOfOccupiedPost);
        if(vacantPost < 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue((vacantPost*(-1)));
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }else if(vacantPost > 0){
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(vacantPost);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
        }else{
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue(0);
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue(0);
        }    
      }else{
        if (type == 'O') {
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue('');
        } else if (type == 'S') {
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('surplusPost').patchValue('');
          ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('vacantPost').patchValue('');
        }
      }
    } else {
      if (type == 'O') {
        ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('occupiedPost').patchValue('');
      } else if (type == 'S') {
        ((this.sanctionedPost.get('sanctionedPostDetails') as FormArray).at(i) as FormGroup).get('sanctionedPost').patchValue('');
      }
    }
    this.totalCount();
  }
  totalCount(){
    this.totalSanctionedPost = 0;
    this.totalVacantPost = 0;
    this.totalOccupiedPost = 0;
    this.totalSurplusPost = 0;

    var formValuesArray = (this.sanctionedPost.get('sanctionedPostDetails') as FormArray).value;
    for(let i=0; i<formValuesArray.length; i++){
      if(!isNaN(formValuesArray[i].sanctionedPost)){
        this.totalSanctionedPost += formValuesArray[i].sanctionedPost;
      }
      if(!isNaN(formValuesArray[i].vacantPost)){
        this.totalVacantPost += formValuesArray[i].vacantPost;
      }
      if(!isNaN(formValuesArray[i].occupiedPost)){
        this.totalOccupiedPost += formValuesArray[i].occupiedPost;
      }
      if(!isNaN(formValuesArray[i].surplusPost)){
        this.totalSurplusPost += formValuesArray[i].surplusPost;
      }
    }
  }
  getStationList(regionId){
    debugger
    this.stationList=[];
    this.schoolList=[];
    this.regionCode=regionId;

    for(var i=0;i<this.regionList.length;i++){
      if(this.regionList[i].regionCode==regionId){
this.regionName=this.regionList[i].regionName;
      }
    }
 
    if(regionId==0){
      // alert(this.regionName);
      this.regionSelection=regionId;
      this.fetchSanctionPost("2",regionId,"","");
      this.sanctionPostFor="All Region";
      
    }else{
      // alert(this.regionName);
      this.fetchSanctionPost("2",regionId,"","");
      this.sanctionPostFor=this.regionName +" Region";
      this.regionSelection=regionId;
    let request = {
      regionCode: regionId
    }
    this.outSideService.searchRegionStationMList(request).subscribe((res) => {
      if (res.content.length > 0) {
        res.content.forEach(element => {
          this.stationList.push(element)
        });
      }
    })
  }
  }



  getSchoolList(stationCode){
    this.stationCode=stationCode.value;
    this.schoolList=[];

    for(var i=0;i<this.stationList.length;i++){
      if(this.stationList[i].stationCode==stationCode.value){
           this.stationName=this.stationList[i].stationName;
      }
    }

    if(stationCode.value==0){
      this.stationSelection=1;
      this.fetchSanctionPost("1",stationCode.value,this.regionCode,"");
      this.sanctionPostFor=this.stationName +" Station";
    }else{
      this.fetchSanctionPost("1",stationCode.value,this.regionCode,"");
      this.sanctionPostFor=this.stationName +" Station";
   let request={
     stationCode:stationCode.value
   }
   this.outSideService.searchSchoolStationMList(request).subscribe((res)=>{
    // alert(JSON.stringify(res))
    this.schoolList=[];
     if (res.content.length > 0) {
      res.content.forEach(element => {
        this.schoolList.push(element)
      });
    }
   })
  }
  }
  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  sanctionedPostMappingPdf()
  {
    
    for(var i=0;i<this.regionList.length;i++){
                  if(this.regionList[i].regionCode==this.regionCode){
                    this.regionName=this.regionList[i].regionName;
                  }
    }

    for(var i=0;i<this.stationList.length;i++){
      if(this.stationList[i].stationCode==this.stationCode){
        this.stationName=this.stationList[i].stationName;
      }
}
debugger
for(var i=0;i<this.schoolList.length;i++){
  if(this.schoolList[i].schoolCode==this.schoolCode && this.schoolList[i].shift==this.shift){
    this.schoolName=this.schoolList[i].schoolName;
  }
}

    this.returnTypeSrvTime = srvTime();
    setTimeout(() => {
      this.pdfService.sanctionedPostMappingList(this.sanctionPostMappingDataListArray,this.returnTypeSrvTime,this.regionName,this.stationName,this.schoolName);
    }, 1000);
  }
  exportexcel(){
    console.log(this.sanctionPostMappingDataListArray)
    const workBook = new Workbook();
    const workSheet = workBook.addWorksheet('SanctionedPostMapping');
    const excelData = [];
    const ws1 = workSheet.addRow(['', 'SANCTIONED POST MAPPING', '']);
    // const ws2 = workSheet.addRow(['Region Name: '+this.regionName, 'Station Name: '+this.stationName, 'School Name: '+this.schoolName]);
    const dobCol = workSheet.getColumn(1);
    dobCol.width = 15;
    const dobCol1 = workSheet.getColumn(2);
    dobCol1.width = 30;
    const dobCol2 = workSheet.getColumn(3);
    dobCol2.width = 10;
    workSheet.getRow(1).font = { name: 'Arial', family: 4, size: 13, bold: true };
    for (let i = 1; i < 4; i++) {
      const col = ws1.getCell(i);
      col.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb:  '9c9b98' },   
      };
    }
   const ws = workSheet.addRow(['	Staff Type', 'Post Name', 'Post Code','Subject Name','Subject Code','Sanctioned Post','Occupied Post','Vacant Post','Surplus Post']);
   workSheet.getRow(2).font = { name: 'Arial', family: 4, size: 10, bold: true };
      for (let i = 1; i < 4; i++) {
        const col = ws.getCell(i);
        col.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb:  'd6d6d4' },
        };
      }
      
    this.sanctionPostMappingDataListArray.forEach((item) => {
      const row = workSheet.addRow([item.staffType=="1"?"Teaching":"Non Teaching", item.postName,item.postCode,item.subjectName,item.subjectCode,item.sanctionedPost,item.occupiedPost,item.vacant,item.surplus]);
    });
    workBook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, 'SanctionedPostMapping.xlsx');
    });
 
  }


  freezeSanctionPost(){


    if(this.schoolCode !=null && this.shift !=null){
      let request={"schoolCode":this.schoolCode,"shift":this.shift};
      this.outSideService.freezeSanctionPost(request).subscribe((res)=>{
  // alert(JSON.stringify(res));
  if(JSON.parse(JSON.stringify(res)).status==1){
    this.isEdit=false;
    Swal.fire(
      'Sanction-Post has been freezed  Successfully!',
      '',
      'success'
    )

  }
       });

    }

     

  
    }
    backToList(){

      this.route.navigate(['/teacher/sanctioned-all-post']);
    }

}
