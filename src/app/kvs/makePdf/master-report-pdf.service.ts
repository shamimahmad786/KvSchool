import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { BloodGroupPipe, DisabilityPipe, TransferGroundPipe } from '../../utilities/myPipe/myPipe';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MasterReportPdfService {
  regionListArray:any;
  stationListArray:any;
  schoolListArray:any;
  stationCategorylistArray:any;
  staffTypelistArray:any;
  designationlistArray:any;
  subjectMasterListArray:any;
  regionStationMappingListArray:any;
  stationCategoryMappingListArray:any;
  schoolStationMappingListArray:any;
  stafftypePostMappingListArray:any;
  postSubjectMappingListArray:any;
  sanctionPostMappingListArray:any;
  dashboardMasterListArray:any;
  relevingDataListArray:any;
  joiningDataListArray:any
  regionHead = [['S.No', 'Region Code', 'Region Name', 'Status']]
  stationHead = [['S.No', 'Station Code', 'Station Name', 'Status']]
  schoolHead = [['S.No', 'School Code', 'School Name', 'Status','Shift' ]]
  stationCategoryHead = [['S.No', 'Category Name', 'Status']]
  staffTypeHead = [['S.No', 'Staff Type Name', 'Status']]
  designationHead = [['S.No', 'Designation Code','Designation Name', 'Status']]
  subjectHead = [['S.No', 'Subject Code','Subject Name', 'Status']]
  regionStationMappingHead = [['S.No', 'Region Name','Station Name','Status']]
  stationCategoryMappingHead = [['S.No', 'Station Name','Category Name','From Date','To Date','Status']]
  schoolStationMappingHead = [['S.No', 'Station Name','School Name','shift','status']]
  staffTypePostMappingHead = [['S.No', 'Staff-Type','Post Code','Post Name']]
  postSubjectMappingHead = [['S.No', 'Post Code','Post name','Subject Code','Subject Name']]
  sanctionPostMappingHead = [['S.No', 'Staff Type','Post Name','Post Code','Subject Name','Subject Code','Sanctioned Post','Occupied Post','Vacant Post','Surplus Post']]
  dashboardHead=[['S.No', 'Employee Code','Name','Post Name','Subject Name','Status']]
  relieviengData=[['S.No', 'Employee Code','Name','Post Name','Subject Name','Transfer Ground','Relieving Date','Transfer To']]
  joiningData=[['S.No', 'Employee Code','Name','Post Name','Subject Name','Transfer Ground','Relieving Date','Joining Date','Transfer From']]
  yPoint: any;
  currentDate: any;
  constructor(private date: DatePipe) {
  }
//------------------- region master --------------------------------------------------------------------------
  regionMasterList(regionList:any ,srvTime:any) {
    this.regionListArray = [];

    for(let i=0; i<regionList.length; i++){
      var regionListTemp = [];
      regionListTemp.push(regionList[i]?.sno)
      regionListTemp.push(regionList[i]?.regioncode)
      regionListTemp.push(regionList[i]?.regionname)
      if(regionList[i]?.status==true)
      {
         regionListTemp.push('Active')
      }
      else{
        regionListTemp.push('Inactive')
      }
      this.regionListArray.push(regionListTemp)
    }
    console.log("region  list")
    console.log(this.regionListArray)

    this.currentDate = "(" + this.currentDate + ")"
    // var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Region Master', 130, 45);    

    
    (doc as any).autoTable({
      head: this.regionHead,
      body: this.regionListArray,
      theme: 'grid',
      startY: 40,
      didDrawPage: function (data) {

       // const currentDate = new Date();

       const currentDate = srvTime.toString();
       var index = currentDate.lastIndexOf(':') +3
       const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(15, 35, 280, 35);

        doc.setTextColor(138, 24, 34);
        doc.setFontSize(14);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report : Region (M01)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str,130, pageHeight - 7);
        doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },
      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })
    doc.save('regionMaster.pdf')
  }
//------------------- station master --------------------------------------------------------------------------

  stationMasterList(stationList:any,serTime:any) {
    this.stationListArray = [];

    for(let i=0; i<stationList.length; i++){
      var stationListTemp = [];
      stationListTemp.push(stationList[i]?.sno)
      stationListTemp.push(stationList[i]?.stationcode)
      stationListTemp.push(stationList[i]?.stationname)
      if(stationList[i]?.status==true)
      {
        stationListTemp.push('Active')
      }
      else{
        stationListTemp.push('Inactive')
      }
      this.stationListArray.push(stationListTemp)
    }
    console.log("station  list")
    console.log(this.stationListArray)

    this.currentDate = "(" + serTime + ")"
    // var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Station Master', 130, 45);    

    
    (doc as any).autoTable({
      head: this.stationHead,
      body: this.stationListArray,
      theme: 'grid',
      startY: 40,
      didDrawPage: function (data) {
       const currentDate = serTime.toString();
       var index = currentDate.lastIndexOf(':') +3
       const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(15, 35, 280, 35);

        doc.setTextColor(138, 24, 34);
        doc.setFontSize(14);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report : Station (M02)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str,130, pageHeight - 7);
        doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },
      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })
    doc.save('stationMaster.pdf')
  }
  //------------------- school master --------------------------------------------------------------------------
  schoolMasterList(schoollist:any,servTime:any)
  {
    this.schoolListArray = [];

    for(let i=0; i<schoollist.length; i++){
      var schoolListTemp = [];
      schoolListTemp.push(schoollist[i]?.sno)
      schoolListTemp.push(schoollist[i]?.schoolcode)
      schoolListTemp.push(schoollist[i]?.schoolname)
      if(schoollist[i]?.status==true)
      {
        schoolListTemp.push('Active')
      }
      else{
        schoolListTemp.push('Inactive')
      }

      if(schoollist[i]?.shift==0 || schoollist[i]?.shift=='0' || schoollist[i]?.shift==1 || schoollist[i]?.shift=='1')
      {
        schoolListTemp.push('First Shift')
      }
      else{
        schoolListTemp.push('Second Shift')
      }
      this.schoolListArray.push(schoolListTemp)
    }
    this.currentDate = "(" + servTime + ")"
    // var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('School Master', 130, 45);    

    
    (doc as any).autoTable({
      head: this.schoolHead,
      body: this.schoolListArray,
      theme: 'grid',
      startY: 40,
      didDrawPage: function (data) {
       const currentDate = servTime.toString();
       var index = currentDate.lastIndexOf(':') +3
       const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(15, 35, 280, 35);

        doc.setTextColor(138, 24, 34);
        doc.setFontSize(14);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report : School (M03)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str,130, pageHeight - 7);
        doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },
      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })
    doc.save('schoolMaster.pdf') 
  }
    //------------------- station Category master --------------------------------------------------------------------------
    stationCategoryMasterList(stationCategorylist:any,servTime:any)
    {
      this.stationCategorylistArray = [];
  
      for(let i=0; i<stationCategorylist.length; i++){
        var stationCategorylistTemp = [];
        stationCategorylistTemp.push(stationCategorylist[i]?.sno)
        stationCategorylistTemp.push(stationCategorylist[i]?.categoryname)
       // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
        if(stationCategorylist[i]?.status==true)
        {
          stationCategorylistTemp.push('Active')
        }
        else{
          stationCategorylistTemp.push('Inactive')
        }
        this.stationCategorylistArray.push(stationCategorylistTemp)
      }
     // this.currentDate = "(" + this.currentDate + ")"
      // var tchId = "" + teacherProfile.teacherId + ""
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Station Category Master', 130, 45);    
  
      
      (doc as any).autoTable({
        head: this.stationCategoryHead,
        body: this.stationCategorylistArray,
        theme: 'grid',
        startY: 40,
        didDrawPage: function (data) {
         const currentDate = servTime.toString();
         var index = currentDate.lastIndexOf(':') +3
         const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
          // Header
          doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
          doc.setDrawColor(0, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setLineWidth(1);
          doc.line(15, 35, 280, 35);
  
          doc.setTextColor(138, 24, 34);
          doc.setFontSize(14);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report : Station Category (M04)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str,130, pageHeight - 7);
          doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
      
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'normal');
          doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
        },
  
        didDrawCell: data => {
          this.yPoint = data.cursor.y
        },
        headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [255, 251, 245] },
        valign: 'top',
        margin: {
          top: 40,
          bottom: 15,
        },
      })
      doc.save('stationCategoryMaster.pdf') 
    }

 //------------------- staff Type master --------------------------------------------------------------------------
    staffTypemasterList(staffTypelist:any,servTime:any)
    {
      this.staffTypelistArray = [];
  
      for(let i=0; i<staffTypelist.length; i++){
        var staffTypelistTemp = [];
        staffTypelistTemp.push(staffTypelist[i]?.sno)
        staffTypelistTemp.push(staffTypelist[i]?.stafftype)
       // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
        if(staffTypelist[i]?.status==true)
        {
          staffTypelistTemp.push('Active')
        }
        else{
          staffTypelistTemp.push('Inactive')
        }
        this.staffTypelistArray.push(staffTypelistTemp)
      }
      this.currentDate = "(" + servTime + ")"
      // var tchId = "" + teacherProfile.teacherId + ""
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Station Category Master', 130, 45);    
  
      
      (doc as any).autoTable({
        head: this.staffTypeHead,
        body: this.staffTypelistArray,
        theme: 'grid',
        startY: 40,
        didDrawPage: function (data) {
         const currentDate = servTime.toString();
         var index = currentDate.lastIndexOf(':') +3
         const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
          // Header
          doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
          doc.setDrawColor(0, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setLineWidth(1);
          doc.line(15, 35, 280, 35);
  
          doc.setTextColor(138, 24, 34);
          doc.setFontSize(14);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report : Staff Type (M05)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str,130, pageHeight - 7);
          doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
      
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'normal');
          doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
        },
  
        didDrawCell: data => {
          this.yPoint = data.cursor.y
        },
        headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [255, 251, 245] },
        valign: 'top',
        margin: {
          top: 40,
          bottom: 15,
        },
      })
      doc.save('staffTypeMaster.pdf') 
    }

     //------------------- designation master --------------------------------------------------------------------------


     designationMasterList(designationlist:any,servTime:any)
     {
       this.designationlistArray = [];
   
       for(let i=0; i<designationlist.length; i++){
         var designationlistTemp = [];
         designationlistTemp.push(designationlist[i]?.sno)
         designationlistTemp.push(designationlist[i]?.postCode)
         designationlistTemp.push(designationlist[i]?.postName)
        // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
         if(designationlist[i]?.status==true)
         {
          designationlistTemp.push('Active')
         }
         else{
          designationlistTemp.push('Inactive')
         }
         this.designationlistArray.push(designationlistTemp)
       }
       this.currentDate = "(" + servTime + ")"
       // var tchId = "" + teacherProfile.teacherId + ""
       const doc = new jsPDF('l', 'mm', 'a4');
       doc.setTextColor(138, 24, 34);
       doc.setFontSize(14);
       doc.setFont('Times-Roman', 'bold');
       doc.text('Station Category Master', 130, 45);    
   
       
       (doc as any).autoTable({
         head: this.designationHead,
         body: this.designationlistArray,
         theme: 'grid',
         startY: 40,
         didDrawPage: function (data) {
          const currentDate = servTime.toString();
          var index = currentDate.lastIndexOf(':') +3
          const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
           // Header
           doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
           doc.setDrawColor(0, 0, 0);
           doc.setTextColor(0, 0, 0);
           doc.setLineWidth(1);
           doc.line(15, 35, 280, 35);
   
           doc.setTextColor(138, 24, 34);
           doc.setFontSize(14);
           doc.setFont('Times-Roman', 'bold');
           doc.text('Report : Designation (M06)', 15, 28);
   
           // Footer
           var str = "Page " + data.doc.internal.getNumberOfPages();
   
           doc.setFontSize(10);
           // jsPDF 1.4+ uses getWidth, <1.4 uses .width
           var pageSize = doc.internal.pageSize;
           var pageHeight = pageSize.height
             ? pageSize.height
             : pageSize.getHeight();
           doc.text(str,130, pageHeight - 7);
           doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
           doc.setTextColor(0, 0, 0);
           doc.setFontSize(12);
           doc.setFont('Times-Roman', 'bold');
           doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
       
           doc.setTextColor(0, 0, 0);
           doc.setFontSize(12);
           doc.setFont('Times-Roman', 'normal');
           doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
         },
   
         didDrawCell: data => {
           this.yPoint = data.cursor.y
         },
         headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
         alternateRowStyles: { fillColor: [255, 251, 245] },
         valign: 'top',
         margin: {
           top: 40,
           bottom: 15,
         },
       })
       doc.save('designationMaster.pdf') 
     }
 //------------------- subject master --------------------------------------------------------------------------


     subjectMasterList(subjectMasterList:any,servTime:any){
      this.subjectMasterListArray = [];
   
      for(let i=0; i<subjectMasterList.length; i++){
        var designationlistTemp = [];
        designationlistTemp.push(subjectMasterList[i]?.sno)
        designationlistTemp.push(subjectMasterList[i]?.subjectCode)
        designationlistTemp.push(subjectMasterList[i]?.subjectName)
       // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
        if(subjectMasterList[i]?.status==true)
        {
         designationlistTemp.push('Active')
        }
        else{
         designationlistTemp.push('Inactive')
        }
        this.subjectMasterListArray.push(designationlistTemp)
      }
      this.currentDate = "(" + servTime + ")"
      // var tchId = "" + teacherProfile.teacherId + ""
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Station Category Master', 130, 45);    
  
      
      (doc as any).autoTable({
        head: this.subjectHead,
        body: this.subjectMasterListArray,
        theme: 'grid',
        startY: 40,
        didDrawPage: function (data) {
         const currentDate = servTime.toString();
         var index = currentDate.lastIndexOf(':') +3
         const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
          // Header
          doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
          doc.setDrawColor(0, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setLineWidth(1);
          doc.line(15, 35, 280, 35);
  
          doc.setTextColor(138, 24, 34);
          doc.setFontSize(14);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report : Subject (M07)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str,130, pageHeight - 7);
          doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
      
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'normal');
          doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
        },
  
        didDrawCell: data => {
          this.yPoint = data.cursor.y
        },
        headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [255, 251, 245] },
        valign: 'top',
        margin: {
          top: 40,
          bottom: 15,
        },
      })
      doc.save('subjectMaster.pdf')
     }



// -------------------------------------Region Station Mapping------------------------------------

   regionStationMappingList(regionStationMappingList:any,servTime:any){
      this.regionStationMappingListArray = [];
   console.log("dsdsdsdsd")
      // for(let i=0; i<regionStationMappingList.length; i++){
      //   console.log(regionStationMappingList[i])
      //   var regionStationMappinglistTemp = [];
      //   regionStationMappinglistTemp.push(regionStationMappingList[i]?.sno)
      //   regionStationMappinglistTemp.push(regionStationMappingList[i]?.regionname)
      //   regionStationMappinglistTemp.push(regionStationMappingList[i]?.stationname)
      //   regionStationMappinglistTemp.push(regionStationMappingList[i]?.fromdate)
      //   regionStationMappinglistTemp.push(regionStationMappingList[i]?.todate)
      //  // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
      //   if(regionStationMappingList[i]?.status==true)
      //   {
      //     regionStationMappinglistTemp.push('Active')
      //   }
      //   else{
      //     regionStationMappinglistTemp.push('Inactive')
      //   }
      //   this.regionStationMappingListArray.push(regionStationMappinglistTemp)
      // }

var k =1;
      for(let i=0; i<regionStationMappingList.length; i++){
        var regionStationMappinglistTemp = [];
        //   var regionStationMappinglistsTemp = [];
           regionStationMappinglistTemp.push(regionStationMappingList[i][0])
      
        for(let j=0; j<regionStationMappingList[i][1].length; j++){ 
          var regionStationMappinglistsTemp = []
          regionStationMappinglistsTemp.push(k)
          if(j==0)
          {
            regionStationMappinglistsTemp.push(regionStationMappingList[i][0])
          }else{
            regionStationMappinglistsTemp.push('')
          }
          regionStationMappinglistsTemp.push(regionStationMappingList[i][1][j]?.stationname)
          // regionStationMappinglistsTemp.push(regionStationMappingList[i][1][j]?.fromdate)
          // regionStationMappinglistsTemp.push(regionStationMappingList[i][1][j]?.todate)
          if(regionStationMappingList[i][1][j]?.status==true)
            {
              regionStationMappinglistsTemp.push('Active')
            }
            else{
              regionStationMappinglistsTemp.push('Inactive')
            }
        this.regionStationMappingListArray.push(regionStationMappinglistsTemp)
        k++;
        }
      }
console.log(this.regionStationMappingListArray)


      this.currentDate = "(" + servTime + ")"
      // var tchId = "" + teacherProfile.teacherId + ""
      const doc = new jsPDF('l', 'mm', 'a4');
      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Station Category Master', 130, 45);    
  
      
      (doc as any).autoTable({
        head: this.regionStationMappingHead,
        body: this.regionStationMappingListArray,
        theme: 'grid',
        startY: 40,
        didDrawPage: function (data) {
         const currentDate = servTime.toString();
         var index = currentDate.lastIndexOf(':') +3
         const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
          // Header
          doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
          doc.setDrawColor(0, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setLineWidth(1);
          doc.line(15, 35, 280, 35);
  
          doc.setTextColor(138, 24, 34);
          doc.setFontSize(14);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report : Region Station Mapping (M08)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str,130, pageHeight - 7);
          doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'bold');
          doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
      
          doc.setTextColor(0, 0, 0);
          doc.setFontSize(12);
          doc.setFont('Times-Roman', 'normal');
          doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
        },
  
        didDrawCell: data => {
          this.yPoint = data.cursor.y
        },
        headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
        alternateRowStyles: { fillColor: [255, 251, 245] },
        valign: 'top',
        margin: {
          top: 40,
          bottom: 15,
        },
      })
      doc.save('regionStationMapping.pdf')
     }


     
// -------------------------------------Station Category mapping Mapping------------------------------------

   stationCategoryMappingList(stationCategoryMappingList:any){
    this.stationCategoryMappingListArray = [];
 
    for(let i=0; i<stationCategoryMappingList.length; i++){
      var stationCategoryMappinglistTemp = [];
      stationCategoryMappinglistTemp.push(stationCategoryMappingList[i]?.sno)
      stationCategoryMappinglistTemp.push(stationCategoryMappingList[i]?.stationname)
      stationCategoryMappinglistTemp.push(stationCategoryMappingList[i]?.categoryname)
      stationCategoryMappinglistTemp.push(stationCategoryMappingList[i]?.fromdate)
      stationCategoryMappinglistTemp.push(stationCategoryMappingList[i]?.todate)
     // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
      if(stationCategoryMappingList[i]?.status==true)
      {
        stationCategoryMappinglistTemp.push('Active')
      }
      else{
        stationCategoryMappinglistTemp.push('Inactive')
      }
      this.stationCategoryMappingListArray.push(stationCategoryMappinglistTemp)
    }
    this.currentDate = "(" + this.currentDate + ")"
    // var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Station Category Master', 130, 45);    

    
    (doc as any).autoTable({
      head: this.stationCategoryMappingHead,
      body: this.stationCategoryMappingListArray,
      theme: 'grid',
      startY: 40,
      didDrawPage: function (data) {
       const currentDate = new Date().toString();
       var index = currentDate.lastIndexOf(':') +3
       const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(15, 35, 280, 35);

        doc.setTextColor(138, 24, 34);
        doc.setFontSize(14);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report :Station Category Mapping (M09)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str,130, pageHeight - 7);
        doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },
      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })
    doc.save('stationCategoryMapping.pdf')
   }

        
// -------------------------------------School Station  Mapping------------------------------------

schoolStationMappingList(schoolStationMappingList:any,servTime:any){
  console.log("------------mapping list")
  console.log(schoolStationMappingList)
  this.schoolStationMappingListArray = [];

  for(let i=0; i<schoolStationMappingList.length; i++){
    var schoolStationMappinglistTemp = [];
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.sno)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.stationname)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.schoolname)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.shift);
    // schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.fromdate)
    // schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.todate)
   // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
if(schoolStationMappingList[i]?.shift==0){
  schoolStationMappinglistTemp.push('Not Applicable');
}else if(schoolStationMappingList[i]?.shift==1){
  schoolStationMappinglistTemp.push('First Shift');
}else if(schoolStationMappingList[i]?.shift==2){
  schoolStationMappinglistTemp.push('Second Shift');
}

    if(schoolStationMappingList[i]?.status==true)
    {
      schoolStationMappinglistTemp.push('Active')
    }
    else{
      schoolStationMappinglistTemp.push('Inactive')
    }
    // if(schoolStationMappingList[i]?.shift==0 || schoolStationMappingList[i]?.shift=='0' || schoolStationMappingList[i]?.shift==1 || schoolStationMappingList[i]?.shift=='1')
    // {
    //   schoolStationMappingList.push('First Shift')
    // }
    // else{
    //   schoolStationMappingList.push('Second Shift')
    // }
 
    this.schoolStationMappingListArray.push(schoolStationMappinglistTemp)
  }
  this.currentDate = "(" + servTime + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(14);
  doc.setFont('Times-Roman', 'bold');
  doc.text('Station Category Master', 130, 45);    

  
  (doc as any).autoTable({
    head: this.schoolStationMappingHead,
    body: this.schoolStationMappingListArray,
    theme: 'grid',
    startY: 40,
    didDrawPage: function (data) {
     const currentDate = servTime.toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report :School Station Mapping (M010)', 15, 28);
      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
        doc.text(str,130, pageHeight - 7);
        doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('schoolStationMapping.pdf')
 }
 staffTypePostMappingList(stafftypePostMappingList:any,servTime:any)
 {
  this.stafftypePostMappingListArray = [];
 
    for(let i=0; i<stafftypePostMappingList.length; i++){
      var stafftypePostMappingListTemp = [];
      stafftypePostMappingListTemp.push(stafftypePostMappingList[i]?.sno)
      stafftypePostMappingListTemp.push(stafftypePostMappingList[i]?.staffType)
      stafftypePostMappingListTemp.push(stafftypePostMappingList[i]?.postCode)
      stafftypePostMappingListTemp.push(stafftypePostMappingList[i]?.postName)
      this.stafftypePostMappingListArray.push(stafftypePostMappingListTemp)
    }
    this.currentDate = "(" + servTime + ")"
    // var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Station Category Master', 130, 45);    

    
    (doc as any).autoTable({
      head: this.staffTypePostMappingHead,   
      body: this.stafftypePostMappingListArray,
      theme: 'grid',
      startY: 40,
      didDrawPage: function (data) {
       const currentDate = servTime.toString();
       var index = currentDate.lastIndexOf(':') +3
       const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(1);
        doc.line(15, 35, 280, 35);

        doc.setTextColor(138, 24, 34);
        doc.setFontSize(14);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report :Staff Type post Mapping (M011)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str,130, pageHeight - 7);
        doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
       // doc.setDrawColor(0, 0, 0);
       // doc.setTextColor(0, 0, 0);
        //doc.setLineWidth(1);


        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'bold');
        doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
    
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },
      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })
    doc.save('staffTypepostMapping.pdf')
 }

 postSubjectMappingList(postSubjectMappingList:any,servTime:any)
 {
  this.postSubjectMappingListArray = [];
 
  for(let i=0; i<postSubjectMappingList.length; i++){
    var postSubjectMappingListTemp = [];
    postSubjectMappingListTemp.push(postSubjectMappingList[i]?.sno)
    postSubjectMappingListTemp.push(postSubjectMappingList[i]?.postCode)
    postSubjectMappingListTemp.push(postSubjectMappingList[i]?.postName)
    postSubjectMappingListTemp.push(postSubjectMappingList[i]?.subjectCode)
    postSubjectMappingListTemp.push(postSubjectMappingList[i]?.subjectName)
    this.postSubjectMappingListArray.push(postSubjectMappingListTemp)
  }
  this.currentDate = "(" + servTime + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(14);
  doc.setFont('Times-Roman', 'bold');
  doc.text('Station Category Master', 130, 45);    

  
  (doc as any).autoTable({
    head: this.staffTypePostMappingHead,   
    body: this.postSubjectMappingListArray,
    theme: 'grid',
    startY: 40,
    didDrawPage: function (data) {
     const currentDate = servTime.toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report :Post Subject Mapping (M012)', 15, 28);

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str,130, pageHeight - 7);
      doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('postSubjectMapping.pdf')
 }
 sanctionedPostMappingList(sanctionPostMappingList:any,servTime:any,regionName,stationName,schoolName)
 {

  // console.log(JSON.stringify(sanctionPostMappingList));

  this.sanctionPostMappingListArray = [];
 
  for(let i=0; i<sanctionPostMappingList.length; i++){
    var sanctionPostMappingListTemp = [];
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.sno)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.staffType=="1"?"Teaching":"Non Teaching")
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.postName)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.postCode)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.subjectName)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.subjectCode)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.sanctionedPost)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.occupiedPost)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.vacant)
    sanctionPostMappingListTemp.push(sanctionPostMappingList[i]?.surplus)
    this.sanctionPostMappingListArray.push(sanctionPostMappingListTemp)
  }
  this.currentDate = "(" + servTime + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(12);
  doc.setFont('Times-Roman', 'bold');
  // doc.text('Station Category Master', 130, 45);    
  if(stationName !="" && stationName !='undefined' && stationName !=null){
  doc.text('Region Name: '+regionName,15 , 45);
  }else{
    doc.text('Region Name: All',15 , 45);
  }
  // alert(stationName);

  if(stationName !="" && stationName !='undefined' && stationName !=null){
    doc.text('Station Name: '+stationName, 80, 45);
  }

  if(stationName !="" && stationName !='undefined' && stationName !=null){
    doc.text('School Name: '+schoolName, 140, 45);
  }
  

  
  (doc as any).autoTable({
    head: this.sanctionPostMappingHead,   
    body: this.sanctionPostMappingListArray,
    theme: 'grid',
    startY: 50,
    didDrawPage: function (data) {
     const currentDate = servTime.toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report :Sanctioned Post (M013)', 15, 28);


      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str,130, pageHeight - 7);
      doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('sanctionedPostMapping.pdf')
 }
 /////////////////  Dashboard master /////////////////////////////////////////////////////

 dashboardMasterList(dashboardMasterList:any,kvNameCode:any){
  this.dashboardMasterListArray = [];
  for(let i=0; i<dashboardMasterList.length; i++){
    var dashboardlistTemp = [];
    dashboardlistTemp.push(dashboardMasterList[i]?.sno)
    dashboardlistTemp.push(dashboardMasterList[i]?.empcode)
    dashboardlistTemp.push(dashboardMasterList[i]?.name)

    dashboardlistTemp.push(dashboardMasterList[i]?.postName)
    dashboardlistTemp.push(dashboardMasterList[i]?.subjectName)
   // dashboardlistTemp.push(dashboardMasterList[i]?.staffType)
    dashboardlistTemp.push(dashboardMasterList[i]?.approvedStatus)

   // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
 
    this.dashboardMasterListArray.push(dashboardlistTemp)
  }
  this.currentDate = "(" + this.currentDate + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(14);
  doc.setFont('Times-Roman', 'bold');
  doc.text('Station Category Master', 130, 45);    

  
  (doc as any).autoTable({
    head: this.dashboardHead,
    body: this.dashboardMasterListArray,
    theme: 'grid',
    startY: 40,
    didDrawPage: function (data) {
     const currentDate = new Date().toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('REPORT : EMPLOYEE DETAILS OF '+kvNameCode, 15, 28);

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str,130, pageHeight - 7);
      doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('kvDetails.pdf')
 }
 exportTransferOutDataList(relevingDataArray:any,serTime:any){
  this.relevingDataListArray = [];
  console.log("pdf data")
  console.log(relevingDataArray);
  for(let i=0; i<relevingDataArray.length; i++){

 //   relieviengData=[['S.No', 'Employee Code','Name','Post Name','Subject Name','Transfer Ground','Relieving Date','Transfer To']]
    var relevingDatalistTemp = [];
    relevingDatalistTemp.push(relevingDataArray[i]?.sno)
    relevingDatalistTemp.push(relevingDataArray[i]?.empcode)
    relevingDatalistTemp.push(relevingDataArray[i]?.name)
    relevingDatalistTemp.push(relevingDataArray[i]?.postName)
    relevingDatalistTemp.push(relevingDataArray[i]?.subjectName)
    relevingDatalistTemp.push(relevingDataArray[i]?.transferGround)
    relevingDatalistTemp.push(relevingDataArray[i]?.relivingdate)
    relevingDatalistTemp.push(relevingDataArray[i]?.To + '(' +relevingDataArray[i]?.allot_kv_code+')')
  
    this.relevingDataListArray.push(relevingDatalistTemp)
  }
  this.currentDate = "(" + this.currentDate + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(14);
  doc.setFont('Times-Roman', 'bold');
  doc.text('Station Category Master', 130, 45);    

  
  (doc as any).autoTable({
    head: this.relieviengData,
    body: this.relevingDataListArray,
    theme: 'grid',
    startY: 40,
    didDrawPage: function (data) {
     const currentDate = serTime.toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('REPORT : EMPLOYEE TRANSFR OUT DETAILS', 15, 28);

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str,130, pageHeight - 7);
      doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('EmployeeTransferOut.pdf')
 }


 exportTransferInDataList(joiningDataArray:any,serTime:any){
  this.joiningDataListArray = [];
  console.log("pdf data")
  console.log(joiningDataArray);
  for(let i=0; i<joiningDataArray.length; i++){

 //   relieviengData=[['S.No', 'Employee Code','Name','Post Name','Subject Name','Transfer Ground','Relieving Date','Transfer To']]
    var joiningDataListTemp = [];
    joiningDataListTemp.push(joiningDataArray[i]?.sno)
    joiningDataListTemp.push(joiningDataArray[i]?.empcode)
    joiningDataListTemp.push(joiningDataArray[i]?.name)
    joiningDataListTemp.push(joiningDataArray[i]?.postName)
    joiningDataListTemp.push(joiningDataArray[i]?.subjectName)
    joiningDataListTemp.push(joiningDataArray[i]?.transferGround)
    joiningDataListTemp.push(joiningDataArray[i]?.relivingdate)
    joiningDataListTemp.push(joiningDataArray[i]?.joiningdate)
    joiningDataListTemp.push(joiningDataArray[i]?.From + '(' +joiningDataArray[i]?.from_kv+')')
  
    this.joiningDataListArray.push(joiningDataListTemp)
  }
  this.currentDate = "(" + this.currentDate + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(14);
  doc.setFont('Times-Roman', 'bold');
  doc.text('Station Category Master', 130, 45);    

  
  (doc as any).autoTable({
    head: this.joiningData,
    body: this.joiningDataListArray,
    theme: 'grid',
    startY: 40,
    didDrawPage: function (data) {
     const currentDate = serTime.toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('REPORT : EMPLOYEE TRANSFR IN DETAILS', 15, 28);

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str,130, pageHeight - 7);
      doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('EmployeeTransferIn.pdf')
 }

 employeeTransferList(employeeTransferList:any,){
  this.dashboardMasterListArray = [];
  for(let i=0; i<employeeTransferList.length; i++){
    var dashboardlistTemp = [];
    dashboardlistTemp.push(employeeTransferList[i]?.sno)
    dashboardlistTemp.push(employeeTransferList[i]?.empcode)
    dashboardlistTemp.push(employeeTransferList[i]?.name)
    dashboardlistTemp.push(employeeTransferList[i]?.postName)
    dashboardlistTemp.push(employeeTransferList[i]?.subjectName)
    dashboardlistTemp.push(employeeTransferList[i]?.From)
    dashboardlistTemp.push(employeeTransferList[i]?.To)
    dashboardlistTemp.push(employeeTransferList[i]?.transferGround)
    dashboardlistTemp.push(employeeTransferList[i]?.relivingdate)
    this.dashboardMasterListArray.push(dashboardlistTemp)
  }
  this.currentDate = "(" + this.currentDate + ")"
  // var tchId = "" + teacherProfile.teacherId + ""
  const doc = new jsPDF('l', 'mm', 'a4');
  doc.setTextColor(138, 24, 34);
  doc.setFontSize(14);
  doc.setFont('Times-Roman', 'bold');
  doc.text('Station Category Master', 130, 45);    

  
  (doc as any).autoTable({
    head: this.dashboardHead,
    body: this.dashboardMasterListArray,
    theme: 'grid',
    startY: 40,
    didDrawPage: function (data) {
     const currentDate = new Date().toString();
     var index = currentDate.lastIndexOf(':') +3
     const convtCurrentDate = "(" + currentDate.substring(0, index) + ")"
      // Header
      doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 100, 4, 100, 20);
      doc.setDrawColor(0, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(15, 35, 280, 35);

      doc.setTextColor(138, 24, 34);
      doc.setFontSize(14);
      doc.setFont('Times-Roman', 'bold');
      doc.text('REPORT : EMPLOYEE TRANSFR DETAILS OF '+'12345', 15, 28);

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str,130, pageHeight - 7);
      doc.addImage("assets/assets/img/nic-logo.png", "png", 13, 198, 0, 0);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'bold');
      doc.text('Report Generation Date & Time',  data.settings.margin.left+210, pageHeight - 10)
  
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont('Times-Roman', 'normal');
      doc.text(convtCurrentDate,  data.settings.margin.left+210, pageHeight - 5)       
    },

    didDrawCell: data => {
      this.yPoint = data.cursor.y
    },
    headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [255, 251, 245] },
    valign: 'top',
    margin: {
      top: 40,
      bottom: 15,
    },
  })
  doc.save('kvDetails.pdf')
 }
}
