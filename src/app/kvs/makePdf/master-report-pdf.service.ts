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
  regionHead = [['S.No', 'Region Code', 'Region Name', 'Status']]
  stationHead = [['S.No', 'Station Code', 'Station Name', 'Status']]
  schoolHead = [['S.No', 'School Code', 'School Name', 'Shift', 'Status']]
  stationCategoryHead = [['S.No', 'Category Name', 'Status']]
  staffTypeHead = [['S.No', 'Staff Type Name', 'Status']]
  designationHead = [['S.No', 'Designation Code','Designation Name', 'Status']]
  subjectHead = [['S.No', 'Subject Code','Subject Name', 'Status']]
  regionStationMappingHead = [['S.No', 'Region Name','Station Name','From Date','To Date','Status']]
  stationCategoryMappingHead = [['S.No', 'Station Name','Category Name','From Date','To Date','Status']]
  schoolStationMappingHead = [['S.No', 'Station Name','School Name','From Date','To Date','status']]
  yPoint: any;
  currentDate: any;
  constructor(private date: DatePipe) {
  }
//------------------- region master --------------------------------------------------------------------------
  regionMasterList(regionList:any) {
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
        doc.text('Master table : Region (M01)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);

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

  stationMasterList(stationList:any) {
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

    this.currentDate = "(" + this.currentDate + ")"
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
        doc.text('Master table : Station (M02)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);

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
  schoolMasterList(schoollist:any)
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
    this.currentDate = "(" + this.currentDate + ")"
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
        doc.text('Master table : School (M03)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);

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
    stationCategoryMasterList(stationCategorylist:any)
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
      this.currentDate = "(" + this.currentDate + ")"
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
          doc.text('Master table : Station Category (M04)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
  
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
    staffTypemasterList(staffTypelist:any)
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
      this.currentDate = "(" + this.currentDate + ")"
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
          doc.text('Master table : Station Category (M04)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
  
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


     designationMasterList(designationlist:any)
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
       this.currentDate = "(" + this.currentDate + ")"
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
           doc.text('Master table : Station Category (M05)', 15, 28);
   
           // Footer
           var str = "Page " + data.doc.internal.getNumberOfPages();
   
           doc.setFontSize(10);
           // jsPDF 1.4+ uses getWidth, <1.4 uses .width
           var pageSize = doc.internal.pageSize;
           var pageHeight = pageSize.height
             ? pageSize.height
             : pageSize.getHeight();
           doc.text(str, data.settings.margin.left, pageHeight - 10);
   
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


     subjectMasterList(subjectMasterList:any){
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
      this.currentDate = "(" + this.currentDate + ")"
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
          doc.text('Master table : Subject (M06)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
  
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

   regionStationMappingList(regionStationMappingList:any){
      this.regionStationMappingListArray = [];
   
      for(let i=0; i<regionStationMappingList.length; i++){
        var regionStationMappinglistTemp = [];
        regionStationMappinglistTemp.push(regionStationMappingList[i]?.sno)
        regionStationMappinglistTemp.push(regionStationMappingList[i]?.regionname)
        regionStationMappinglistTemp.push(regionStationMappingList[i]?.stationname)
        regionStationMappinglistTemp.push(regionStationMappingList[i]?.fromdate)
        regionStationMappinglistTemp.push(regionStationMappingList[i]?.todate)
       // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
        if(regionStationMappingList[i]?.status==true)
        {
          regionStationMappinglistTemp.push('Active')
        }
        else{
          regionStationMappinglistTemp.push('Inactive')
        }
        this.regionStationMappingListArray.push(regionStationMappinglistTemp)
      }
      this.currentDate = "(" + this.currentDate + ")"
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
          doc.text('Table : Region Station Mapping (M07)', 15, 28);
  
          // Footer
          var str = "Page " + data.doc.internal.getNumberOfPages();
  
          doc.setFontSize(10);
          // jsPDF 1.4+ uses getWidth, <1.4 uses .width
          var pageSize = doc.internal.pageSize;
          var pageHeight = pageSize.height
            ? pageSize.height
            : pageSize.getHeight();
          doc.text(str, data.settings.margin.left, pageHeight - 10);
  
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
        doc.text('Table :Station Category Mapping (M08)', 15, 28);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 10);

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

schoolStationMappingList(schoolStationMappingList:any){
  console.log("------------mapping list")
  console.log(schoolStationMappingList)
  this.schoolStationMappingListArray = [];

  for(let i=0; i<schoolStationMappingList.length; i++){
    var schoolStationMappinglistTemp = [];
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.sno)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.stationname)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.schoolname)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.fromdate)
    schoolStationMappinglistTemp.push(schoolStationMappingList[i]?.todate)
   // stationCategorylistTemp.push(stationCategorylist[i]?.schoolname)
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
  this.currentDate = "(" + this.currentDate + ")"
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
      doc.text('Table :School Station Mapping (M09)', 15, 28);

      // Footer
      var str = "Page " + data.doc.internal.getNumberOfPages();

      doc.setFontSize(10);
      // jsPDF 1.4+ uses getWidth, <1.4 uses .width
      var pageSize = doc.internal.pageSize;
      var pageHeight = pageSize.height
        ? pageSize.height
        : pageSize.getHeight();
      doc.text(str, data.settings.margin.left, pageHeight - 10);

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
}
