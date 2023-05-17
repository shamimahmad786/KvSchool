import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { BloodGroupPipe, DisabilityPipe, TransferGroundPipe } from '../../utilities/myPipe/myPipe';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TeacherTransferPdfService {

  stationChoicesArray: any;
  dispalcementArray: any;
  workExperienceArray: any;
  transferArray: any;
  declarationArray: any;

  workExpHead = [['KV Code', 'School Name ', 'Shift', 'Station Name', 'From', 'To', 'Transfer Ground', 'Station Type']]
  displacementHead = [['S.No.', 'Question Description', 'User Inputs', 'Points']]
  stationChoicesHead = [['S.No', 'Question Description', 'User Inputs']]
  transferHead = [['S.No.', 'Question Description', 'User Inputs', 'Points']]
  declarationHead = [['S.No.', 'Question Description', 'User Inputs']]




  yPoint: any;


  currentDate: any;

  constructor(private date: DatePipe) { }

  teacherTransferFnc(teacherProfile, kvNameCode, stationNameCode, workExperience, uploadDocument, image) {

    

    var displacementStationChoices = [];
    displacementStationChoices.push(teacherProfile?.displacement1StationName);
    displacementStationChoices.push(teacherProfile?.displacement2StationName);
    displacementStationChoices.push(teacherProfile?.displacement3StationName);
    displacementStationChoices.push(teacherProfile?.displacement4StationName);
    displacementStationChoices.push(teacherProfile?.displacement5StationName);

    var userTransferChoices = [];
    if (teacherProfile?.shiftChangeSameSchool == '1') {

    } if (teacherProfile?.shiftChangeSameSchool == '2') {
      userTransferChoices.push(teacherProfile?.choiceKv1UdiseCodePresentStation);
      userTransferChoices.push(teacherProfile?.choiceKv2UdiseCodePresentStation);
      userTransferChoices.push(teacherProfile?.choiceKv3UdiseCodePresentStation);
      userTransferChoices.push(teacherProfile?.choiceKv4UdiseCodePresentStation);
      userTransferChoices.push(teacherProfile?.choiceKv5UdiseCodePresentStation);
    } if (teacherProfile?.shiftChangeSameSchool == '3') {
      userTransferChoices.push(teacherProfile?.choiceKv1StationName);
      userTransferChoices.push(teacherProfile?.choiceKv2StationName);
      userTransferChoices.push(teacherProfile?.choiceKv3StationName);
      userTransferChoices.push(teacherProfile?.choiceKv4StationName);
      userTransferChoices.push(teacherProfile?.choiceKv5StationName);
    } if (teacherProfile?.shiftChangeSameSchool == '0') {
      userTransferChoices.push('')
    }

    var ltrDfp = [];
    if (teacherProfile.personalStatusLtr == '1') {
      ltrDfp.push('LTR')
    } if (teacherProfile.personalStatusDfp == '1') {
      ltrDfp.push('DFP')
    } if (teacherProfile.personalStatusMdg == '1') {
      ltrDfp.push('MDG')
    } if (teacherProfile.personalStatusWid == '1') {
      ltrDfp.push('WIDOW')
    } if (teacherProfile.personalStatusSp == '1') {
      ltrDfp.push('SP')
    } if (teacherProfile.personalStatusLtr != '1' && teacherProfile.personalStatusDfp != '1'
      && teacherProfile.personalStatusMdg != '1' && teacherProfile.personalStatusWid != '1 ' && teacherProfile.personalStatusSp != '1') {
      ltrDfp.push('Not Applicable')
    }



    this.dispalcementArray = [
      ['1', 'Stay at a station in the same post as on 30 June, 2022', '', teacherProfile?.q1DPt],
      ['', '1A. No. of days in current station since posted.', teacherProfile?.numberOfWorkingDays, ''],
      ['', '1B. Posting period of absence on any account.', teacherProfile?.absenceDaysOne, ''],
      ['', '1C. If any employee returns to a station X on request after being transferred from X within three years, the stay of such an employee at X shall be no. of years spent at X before being transferred plus no. of years spent after coming at X. However, if an employee returns to station after a Posting Period of 02 years in Very Hard (existed earlier) and 03 years from Hard/ NER station the stay shall be counted afresh.', teacherProfile?.absenceDaysTwo, ''],
      ['', '1D. Total days (present). 1A+1C-(1B)', teacherProfile?.actualNumberOfWorkingDays, ''],
      ['', 'Present Station Posting Date', teacherProfile?.workExperiencePositionTypePresentStationStartDate, ''],
      ['', 'Present Station Name', teacherProfile?.presentStationName, ''],
      ['', 'Present Station Code', teacherProfile?.presentStationCode, ''],
      ['', '', '', ''],
      ['2', 'Annual Performance Appraisal Report (APAR) Grading for the last 02(two) years.', teacherProfile?.apprGrade1, teacherProfile?.q2DPt],
      ['', '  +2 for each below average grading (0-4)', teacherProfile?.apprGrade2, ''],
      ['', '', '', ''],
      ['3', "Employee below 40 years of age (as on 30th June, 2021) who have completed one tenure at hard/very hard (existed earlier)/ NE stations. (Indicate 'Yes' for tenure completed & 'No' for tenure not completed.)", teacherProfile?.q3DYn == '1' ? 'Yes' : 'No', ''],
      ['', 'Date Of Birth', teacherProfile?.teacherDob, ''],
      ['', 'Hard Station Name', teacherProfile?.hardStationName, ''],
      ['', 'Hard Station Work Start Date', teacherProfile?.hardStationWorkStartDate, ''],
      ['', 'Hard Station Work End Date', teacherProfile?.hardStationWorkEndDate, ''],
      ['', '  Only those employee who are below 40 years of age as on 30th June 2021 should fill this column.', '', ''],
      ['', '', '', ''],
      ['4', 'Select whichever is applicable', ltrDfp, teacherProfile?.q4DPt],
      ['', '', '', ''],
      ['5', 'Spouse', '', teacherProfile?.q5DPt],
      ['', 'A. Spouse if a KVS Employee and posted at the same station or within 100 km.', teacherProfile?.spouseStatus == '1' ? 'Yes' : 'No', ''],
      ['', 'B. Spouse if a Central Government/Central Govt. Autonomous body/Central Govt. Public Sector Undertaking/ Defense Employee and Central Armed Police Forces employee posted at the same station or within 100 km.', teacherProfile?.spouseStatus == '2' ? 'Yes' : 'No', ''],
      ['', 'C. Spouse if a State Covernment / State Govt. Autonomous body / State Govt. Public Sectors Undertaking Employee & posted at the same station or within 100km.', teacherProfile?.spouseStatus == '3' ? 'Yes' : 'No', ''],
      ['', 'D. Woman employee not covered under 4(A), 4(B), 4(C) above, or an unmarried lady, is eligible for these points.', teacherProfile?.spouseStatus == '4' ? 'Yes' : 'No', ''],
      ['', 'E. None of the above.', teacherProfile?.spouseStatus == '5' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['6', 'Physically challenged employee', teacherProfile?.teacherDisabilityYn == '1' ? 'Yes' : 'No', teacherProfile?.q9DPt],
      ['', '', '', ''],
      ['7', 'Members of Recognized Associations of KVS staff.', '', teacherProfile?.q10DPt],
      ['', 'A. Members of JCM at KVS Regional Office (RJCM).', teacherProfile?.associationMemberYn == '1' ? 'Yes' : 'No', ''],
      ['', 'B. Members of JCM at KVS Headquarters (NJCM).', teacherProfile?.associationMemberYn == '2' ? 'Yes' : 'No', ''],
      ['', 'C. None.', teacherProfile?.associationMemberYn == '3' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['8', 'Award winning employees', '', teacherProfile?.q11DPt],
      ['', 'A. National Award given by the President of India.', teacherProfile?.presidentAward == '1' ? 'Yes' : 'No', ''],
      ['', 'B. KVS National Incentive Award.', teacherProfile?.nationalAward == '1' ? 'Yes' : 'No', ''],
      ['', 'C. KVS Regional Incentive Award.', teacherProfile?.regionalAward == '1' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['9', 'Whether child of the employee is appearing in class X or XII Exam in the Academic year ending March 2023 and whether the employee is seeking exemption from displacement.', teacherProfile?.child_10_12_yn == '1' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['10', 'Employee who serves as the main care-giver to the persons with disability in the family (spouse or dependent son/ daughter of the employee) would have a bearing on the systematic rehabilitation of persons with disabilities, as per KVS Transfer guideline.', teacherProfile?.careGiverYn == '1' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['', 'Total', '', teacherProfile?.totalDisplacementCount]
    ]

    this.stationChoicesArray = [
      ['1', 'Have you been recruited under special recruitment for NER ?', teacherProfile?.recruitedSpclDriveNer == '1' ? 'Yes' : 'No'],
      ['2', 'Employee for eligible to apply either for shift change in the same Vidyalaya ( Column 18A ) or INTRA STATION ( Column 18B ) or INTER STATION ( Column 18C )', ''],
      ['', 'A. Shift change in the same school', teacherProfile?.shiftChangeSameSchool == '1' ? 'Yes' : 'No'],
      ['', 'B. Intra station', teacherProfile?.shiftChangeSameSchool == '2' ? 'Yes' : 'No'],
      ['', 'C. Inter station', teacherProfile?.shiftChangeSameSchool == '3' ? 'Yes' : 'No'],
      ['', 'D. None', teacherProfile?.shiftChangeSameSchool == '0' ? 'Yes' : 'No'],
      ['', 'User Choices : ' + userTransferChoices, ''],
      ['', '', ''],
      ['3', 'Kindly fill maximum five stations choice other than present station, incase you are transferred on displacement.', ''],
      ['', 'User Choices : ' + displacementStationChoices, ''],
    ]

    this.transferArray = [
      ['', 'Wheather the employee is willing to apply for request transfer as per choice shift / KVs / Stations filled in column 10A / 10B / 10C of part A of application form.', teacherProfile?.applyTransferYn == '1'?'Yes':'No', ''],
      ['', '', '', ''],
      ['1', 'Stay at a station in the same post as on 30 June, 2021', '', teacherProfile?.q1TPt],
      ['', 'A. Total working days.', teacherProfile?.numberOfWorkingDays, ''],
      ['', 'B. Periods of continuous absence of 30 days or more (45 days or more for Hard/NER stations) shall not be counted.', teacherProfile?.absenceDaysTcone, ''],
      ['', 'C. Total days (present).', teacherProfile?.actualNumberOfWorkingTcdays, ''],
      ['', 'Present Station Posting Date', teacherProfile?.workExperiencePositionTypePresentStationStartDate, ''],
      ['', 'Present Station Name', teacherProfile?.presentStationName, ''],
      ['', 'Present Station Code', teacherProfile?.presentStationCode, ''],
      ['', '', '', ''],
      ['2', 'Annual Performance Appraisal Report (APAR) Grading for the last 02(two) years.', teacherProfile?.apprGrade1, teacherProfile?.q2TPt],
      ['', ' +2 for outstanding grading (8-10)', teacherProfile?.apprGrade2, ''],
      ['', '', '', ''],
      ['3', 'Award winning employees', '', teacherProfile?.q3TPt],
      ['', 'A. National Award given by the President of India.', teacherProfile?.presidentAward == '1' ? 'Yes' : 'No', ''],
      ['', 'B. KVS National Incentive Award.', teacherProfile?.nationalAward == '1' ? 'Yes' : 'No', ''],
      ['', 'C. KVS Regional Incentive Award.', teacherProfile?.regionalAward == '1' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['4', 'Spouse', '', teacherProfile?.q4TPt],
      ['', 'A. Spouse if a KVS Employee and posted at the same station or within 100 km.', teacherProfile?.spouseStatus == '1' ? 'Yes' : 'No', ''],
      ['', 'B. Spouse if a Central Government/Central Govt. Autonomous body/Central Govt. Public Sector Undertaking/ Defense Employee and Central Armed Police Forces employee posted at the same station or within 100 km.', teacherProfile?.spouseStatus == '2' ? 'Yes' : 'No', ''],
      ['', 'C. Spouse if a State Covernment / State Govt. Autonomous body / State Govt. Public Sectors Undertaking Employee & posted at the same station or within 100km.', teacherProfile?.spouseStatus == '3' ? 'Yes' : 'No', ''],
      ['', 'D. None of the above.', teacherProfile?.spouseStatus == '5' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['5', 'A. LTR/DFP/MDG/Widow/Single Parent(SP) Cases (Select whichever is applicable) (50)', ltrDfp, teacherProfile?.q6TPt],
      ['', 'B. Whether last transfer is based on above ground (4a).', teacherProfile?.isLastTransferGroundPersonalStatusYn == '1'?'Yes':'No', ''],
      ['', '', '', ''],
      ['6', 'Completion of tenure in Hard/NER stations (03 years) at present station.', teacherProfile?.q7TYyn == '1'?'Yes':'No', teacherProfile?.q7TPt],
      ['', '', '', ''],
      ['7', 'A. Physically challenged employee. Further, if an employee has already secured a request transfer in previous year(s) on the basis of these additional points the points shall not given again.', teacherProfile?.teacherDisabilityYn == '1'?'Yes':'No', teacherProfile?.q8TPt],
      ['', 'B. Whether last transfer is based on above ground (8A).', teacherProfile?.isLastTransferGroundTeacherDisabilityYn == '1'?'Yes':'No', ''],
      ['', '', '', ''],
      ['8', 'Woman Employee', (teacherProfile?.unmarriedWomanYn == '4')?'Yes':(teacherProfile?.unmarriedWomanYn == '0')?'No':'', teacherProfile?.q9TPt],
      ['', '', '', ''],
      ['9', 'Members of Recognized Associations of KVS staff.', '', teacherProfile?.q10TPt],
      ['', 'A. Members of JCM at KVS Regional Office (RJCM).', teacherProfile?.associationMemberYn == '1' ? 'Yes' : 'No', ''],
      ['', 'B. Members of JCM at KVS Headquarters (NJCM).', teacherProfile?.associationMemberYn == '2' ? 'Yes' : 'No', ''],
      ['', 'C. None.', teacherProfile?.associationMemberYn == '3' ? 'Yes' : 'No', ''],
      ['', '', '', ''],
      ['10', "For employee having a differently abled dependent child as per DOP&T Norms. In case you don't get transfer as per you choice(s) of the form, would you like your transfer to another class A or B city to facilitate the treatment of your child. if yes, please indicate two such stations.", teacherProfile?.childDifferentAbleYn == '1'?'Yes':'No', ''],
      ['', '', '', ''],
      ['', 'Total', '', teacherProfile?.totalTransferCount]
    ]

    this.declarationArray = [
      ['1', 'Whether the employee is seeking benefit of spouse who is working at the same station or within the distance of 100Km where employee is posted/transfer is being sought for.', teacherProfile?.spouseKvsYnd == '1'?'Yes':'No'],
      ['', 'Spouse employee code', teacherProfile?.spouseKvsYnd == '1'? teacherProfile?.spouseEmpCode:'Not Applicable'],
      ['', 'Post held by Spouse', teacherProfile?.spouseKvsYnd == '1'? teacherProfile?.spousePost:'Not Applicable'],
      ['', 'Name of Station', teacherProfile?.spouseKvsYnd == '1'? teacherProfile?.spouseStationName:'Not Applicable'],
      ['', 'Spouse Declaration Document Uploaded', uploadDocument[5]?.docName == 'Spouse_Declaration.pdf'?'Yes':'No'],
      ['', '', ''],
      ['2', 'Whether the employee is seeking benefit of medical ground (MDG Ground).', teacherProfile?.personalStatusMdg == '1'?'Yes':'No'],
      ['', 'Name of Patient', teacherProfile?.personalStatusMdg == '1'? teacherProfile?.patientName:'Not Applicable'],
      ['', 'Type of alignment', teacherProfile?.personalStatusMdg == '1'? teacherProfile?.patientAilment:'Not Applicable'],
      ['', 'Name of the Hospital and the place where treatement is being undertaken', teacherProfile?.personalStatusMdg == '1'? teacherProfile?.patientHospital:'Not Applicable'],
      ['', 'Name of Medical officer', teacherProfile?.personalStatusMdg == '1'? teacherProfile?.patientMedicalOfficerName:'Not Applicable'],
      ['', 'Designation of Medical officer', teacherProfile?.personalStatusMdg == '1'? teacherProfile?.patientMedicalOfficerDesignation:'Not Applicable'],
      ['', 'MDG Ground Declaration Document Uploaded', uploadDocument[0]?.docName == 'Medical_Certificate.pdf'?'Yes':'No'],
      ['', '', ''],
      ['3', 'Whether the employee is seeking benefit of single parent (SP Ground)', teacherProfile?.personalStatusSp == '1'?'Yes':'No'],
      ['', 'SP Ground Declaration Document Uploaded', uploadDocument[6]?.docName == 'Single_Parent_Declaration.pdf'?'Yes':'No'],
      ['', '', ''],
      ['4', 'Whether the employee is seeking benefit of Death of Family Person (DFP Ground)', teacherProfile?.personalStatusDfp == '1'?'Yes':'No'],
      ['', 'DFP Ground Declaration Document Uploaded', uploadDocument[7]?.docName == 'DFP_Declaration.pdf'?'Yes':'No'],
      ['', '', ''],
      ['5', 'Whether your son/daughter is/are studying in board exam during the academic year ending March 2023', teacherProfile?.child_10_12_yn == '1'?'Yes':'No'],
      ['', 'Name of son/daughter', teacherProfile?.child_10_12_yn == '1'?teacherProfile?.child1012Name:'Not Applicable'],
      ['', 'School name where son/daughter studying', teacherProfile?.child_10_12_yn == '1'?teacherProfile?.child1012School:'Not Applicable'],
      ['', 'Board Name', teacherProfile?.child_10_12_yn == '1'?teacherProfile?.child1012Board:'Not Applicable'],
      ['', 'Class in which the son/daughter studying in the academic session 2021-2022', teacherProfile?.child_10_12_yn == '1'?teacherProfile?.child1012Class:'Not Applicable'],
      ['', 'Board Examination Declaration Document Uploaded', uploadDocument[1]?.docName == 'Board_examination_Proof.pdf'?'Yes':'No'],
      ['', '', ''],
      ['6', 'Whether your are main care-giver to the person with disability in the family (i.e spouse or own son/own daughter)', teacherProfile?.careGiverYn == '1'?'Yes':'No'],
      ['', 'Name of the family member who is having disability', teacherProfile?.careGiverYn == '1'?teacherProfile?.careGiverName:'Not Applicable'],
      ['', 'Relation with care giver', teacherProfile?.careGiverYn == '1'?teacherProfile?.careGiverRelation:'Not Applicable'],
      ['', 'Name the type of disability as per the transfer guideline', teacherProfile?.careGiverYn == '1'?teacherProfile?.careGiverDisabilityName:'Not Applicable'],
      ['', 'Percentage of disability', teacherProfile?.careGiverYn == '1'?teacherProfile?.careGiverDisabilityPrcnt:'Not Applicable'],
      ['', 'Care Giver Declaration Document Uploaded', uploadDocument[2]?.docName == 'Disability_Certificate.pdf'?'Yes':'No'],
      ['', '', ''],
      ['7', 'Whether you have a differently-able child', teacherProfile?.childDifferentAbleYn == '1'?'Yes':'No'],
      ['', 'Name of the son/daughter who is having disability', teacherProfile?.childDifferentAbleYn == '1'?teacherProfile?.childDifferentName:'Not Applicable'],
      ['', 'Name the type of disability as per the transfer guideline', teacherProfile?.childDifferentAbleYn == '1'?teacherProfile?.childDifferentDisabilityName:'Not Applicable'],
      ['', 'Percentage of disability', teacherProfile?.childDifferentAbleYn == '1'?teacherProfile?.childDifferentDisabilityPrcnt:'Not Applicable'],
      ['', 'Differently-able Child Declaration Document Uploaded', uploadDocument[3]?.docName == 'Differentially_Abled_Certificate.pdf'?'Yes':'No'],
      ['', '', ''],
      ['8', 'Members of JCM at KVS Regional Office (RJCM) / KVS Headquarters (NJCM)', teacherProfile?.memberJCM == '1'?'Yes':'No'],
      ['', 'RJCM/NJCM Declaration Document Uploaded', uploadDocument[8]?.docName == 'NJCM_RJCM_Declaration.pdf'?'Yes':'No']
    ]




    const transferGround = new TransferGroundPipe();
    this.workExperienceArray = [];
    for (let i = 0; i < workExperience.length; i++) {
      var temp = [];
      for(let j=0; j<workExperience[i].groundForTransfer.length; j++){
        temp.push(transferGround.transform(workExperience[i].groundForTransfer[j]))
      }

      const tempExpData = JSON.parse(JSON.stringify(workExperience[i]))
      if(tempExpData.workEndDate != null && tempExpData.workEndDate != "null"){
        tempExpData.workEndDate = this.date.transform(new Date(tempExpData.workEndDate*1),'yyyy-MM-dd')
      }
      tempExpData.workStartDate = this.date.transform(new Date(tempExpData.workStartDate*1),'yyyy-MM-dd')

      // if(workExperience[i].workEndDate != null && workExperience[i].workEndDate != "null"){
      //   workExperience[i].workEndDate = this.date.transform(new Date(workExperience[i].workEndDate*1),'yyyy-MM-dd')
      // }
      // workExperience[i].workStartDate = this.date.transform(new Date(workExperience[i].workStartDate*1),'yyyy-MM-dd')

      
      var workExperienceTemp = [];
      workExperienceTemp.push(tempExpData?.kvCode)
      workExperienceTemp.push(tempExpData?.udiseSchoolName)
      workExperienceTemp.push(tempExpData?.shiftType == 'null' ? 'NA' : tempExpData?.shiftType)
      workExperienceTemp.push(tempExpData?.stationName)
      workExperienceTemp.push(tempExpData?.workStartDate)
      workExperienceTemp.push(tempExpData?.workEndDate == 'null' ? 'NA' : tempExpData?.workEndDate)     
      workExperienceTemp.push(temp)         
      workExperienceTemp.push((tempExpData?.stationType == '3') ? 'Hard/NER' : (tempExpData?.stationType == '1') ? 'Hard' : (tempExpData?.stationType == '2') ? 'NER' : 'NA')

      this.workExperienceArray.push(workExperienceTemp)
    }


    const disabilityPipe = new DisabilityPipe();
    const bloodGroupPipe = new BloodGroupPipe();


    this.currentDate = new Date();
    this.currentDate = "(" + this.currentDate + ")"
    var tchId = "" + teacherProfile.teacherId + ""
    const doc = new jsPDF('p', 'mm', 'a4');


    doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 50, 10, 100, 20);
    doc.line(168, 48, 200, 48);
    doc.line(168, 83, 200, 83);
    doc.addImage(image, "JPG", 170, 50, 30, 30);
    doc.setLineWidth(0.2);
    doc.line(15, 35, 200, 35);
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Basic Profile', 15, 45)

    doc.setTextColor(2, 72, 0);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Transfer Application Number :', 100, 43)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(teacherProfile?.transferApplicationNumber, 170, 43);

    //Transfer 1.1
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Employee Name', 15, 52)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.teacherName == null || teacherProfile?.teacherName == 'null' || teacherProfile?.teacherName == '') {
      doc.text('Not Given', 85, 52)
    } else {
      doc.text(teacherProfile?.teacherName, 85, 52)
    }



   

    //Transfer1.2
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Teacher Id', 15, 59)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (tchId == null || tchId == 'null' || tchId == '') {
      doc.text('Not Given', 85, 59)
    } else {
      doc.text(tchId, 85, 59)
    }



    

    //Transfer 1.3
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Gender', 15, 66)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.teacherGender == null || teacherProfile?.teacherGender == 'null' || teacherProfile?.teacherGender == '') {
      doc.text('Not Given', 85, 66)
    } else {
      doc.text((teacherProfile?.teacherGender == '1') ? 'Male' : (teacherProfile?.teacherGender == '2') ? 'Female' : 'Not Given', 85, 66)
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Date of Birth',  15, 73)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.teacherDob == null || teacherProfile?.teacherDob == 'null' || teacherProfile?.teacherDob == '') {
      doc.text('Not Given', 85, 73)
    } else {
      doc.text(teacherProfile?.teacherDob, 85, 73)
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Employee Code', 15, 80)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.teacherEmployeeCode == null || teacherProfile?.teacherEmployeeCode == 'null' || teacherProfile?.teacherEmployeeCode == '') {
      doc.text('Not Given', 85, 80)
    } else {
      doc.text(teacherProfile?.teacherEmployeeCode, 85, 80)
    }


    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Employee Type', 15, 87)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text('Regular', 85, 87)

    //Transfer 1.5
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Post Name', 15, 94)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.lastPromotionPositionType == null || teacherProfile?.lastPromotionPositionType == 'null' || teacherProfile?.lastPromotionPositionType == '') {
      doc.text('Not Given', 85, 94)
    } else {
      doc.text(teacherProfile?.lastPromotionPositionType, 85, 94)
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Subject Name', 15, 101)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.workExperienceAppointedForSubject == null || teacherProfile?.workExperienceAppointedForSubject == 'null' || teacherProfile?.workExperienceAppointedForSubject == '') {
      doc.text('Not Given', 85, 101)
    } else {
      doc.text(teacherProfile?.workExperienceAppointedForSubject, 85, 101)
    }


    //Transfer 1.6
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present Station Name', 15, 108)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (stationNameCode == null || stationNameCode == 'null' || stationNameCode == '') {
      doc.text('Not Given', 85, 108)
    } else {
      doc.text(stationNameCode, 85, 108)
    }



    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present KV Name', 15, 115)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (kvNameCode == null || kvNameCode == 'null' || kvNameCode == '') {
      doc.text('Not Given', 85, 115)
    } else {
      doc.text(kvNameCode, 85, 115)
    }


    //Transfer 1.7
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present Post Date', 15, 122)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.lastPromotionPositionDate == null || teacherProfile?.lastPromotionPositionDate == 'null' || teacherProfile?.lastPromotionPositionDate == '') {
      doc.text('Not Given', 85, 122)
    } else {
      doc.text(teacherProfile?.lastPromotionPositionDate, 85, 122)
    }



    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present Station in Present Post Date', 15, 129)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.workExperiencePositionTypePresentStationStartDate == null || teacherProfile?.workExperiencePositionTypePresentStationStartDate == 'null' || teacherProfile?.workExperiencePositionTypePresentStationStartDate == '') {
      doc.text('Not Given', 85, 129)
    } else {
      doc.text(teacherProfile?.workExperiencePositionTypePresentStationStartDate, 85, 129)
    }



    //Transfer 1.8
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Present KV in Present Post Date', 15, 136)

    doc.setFont('Times-Roman', 'normal');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    if (teacherProfile?.workExperienceWorkStartDatePresentKv == null || teacherProfile?.workExperienceWorkStartDatePresentKv == 'null' || teacherProfile?.workExperienceWorkStartDatePresentKv == '') {
      doc.text('Not Given', 85, 136)
    } else {
      doc.text(teacherProfile?.workExperienceWorkStartDatePresentKv, 85, 136)
    }

    // let finalY3 = (doc as any).lastAutoTable.finalY;

    // Posting details Start
    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Posting Details', 15, 146);

    (doc as any).autoTable({
      head: this.workExpHead,
      body: this.workExperienceArray,
      theme: 'grid',
      startY: 151,
      didDrawPage: function (data) {

        const currentDate = new Date();
        const convtCurrentDate = "" + currentDate + ""

        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 50, 10, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(15, 35, 200, 35);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 5);

        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'bold');
        // doc.text('Report Generation Date & Time', data.settings.margin.left + 110, pageHeight - 10)

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate, data.settings.margin.left + 95, pageHeight - 5)

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
    // Posting details End

    let finalY3 = (doc as any).lastAutoTable.finalY;
    

    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Displacement Count', 15, finalY3 + 10);

    // Displacement Count Start 

    (doc as any).autoTable({
      head: this.displacementHead,
      body: this.dispalcementArray,
      theme: 'striped',
      startY: finalY3 + 15,
      didDrawPage: function (data) {

        const currentDate = new Date();
        const convtCurrentDate = "" + currentDate + ""

        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 50, 10, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(15, 35, 200, 35);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 5);

        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'bold');
        // doc.text('Report Generation Date & Time', data.settings.margin.left + 110, pageHeight - 10)

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate, data.settings.margin.left + 95, pageHeight - 5)

      },

      didDrawCell: data => {
        this.yPoint = data.cursor.y
      },

      didParseCell: function (cell, data) {
        



        //  if (cell.row.raw[0] == "1") {
        //   cell.cell.styles.fontStyle = 'bold';
        //   // let finalY4 = (doc as any).lastAutoTable.finalY;

        //   //         doc.setLineWidth(0.2);
        //   // doc.line(15, finalY4, 280, finalY4);
        //   // doc.setLineWidth(0.2);
        //   // doc.line(15, 35, 280, 35);
        
        //   // cell.settings.tableLineColor = 500;
        //   // cell.cell.styles.lineColor = 500;
        // }


      },

      headStyles: { fillColor: [255, 228, 181], textColor: 0, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [255, 251, 245] },
      valign: 'top',
      margin: {
        top: 40,
        bottom: 15,
      },
    })
    // Displacement Count End

    let finalY4 = (doc as any).lastAutoTable.finalY;

    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Station Choices', 15, finalY4 + 10);

    // Station Choices Start

    (doc as any).autoTable({
      head: this.stationChoicesHead,
      body: this.stationChoicesArray,
      theme: 'striped',
      startY: finalY4 + 15,
      didDrawPage: function (data) {

        const currentDate = new Date();
        const convtCurrentDate = "" + currentDate + ""

        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 50, 10, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(15, 35, 200, 35);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 5);

        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'bold');
        // doc.text('Report Generation Date & Time', data.settings.margin.left + 110, pageHeight - 10)

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate, data.settings.margin.left + 95, pageHeight - 5)

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
    // Station Choices End

    let finalY5 = (doc as any).lastAutoTable.finalY;

    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Transfer Count', 15, finalY5 + 10);

    // Transfer Start

    (doc as any).autoTable({
      head: this.transferHead,
      body: this.transferArray,
      theme: 'striped',
      startY: finalY5 + 15,
      didDrawPage: function (data) {

        const currentDate = new Date();
        const convtCurrentDate = "" + currentDate + ""

        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 50, 10, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(15, 35, 200, 35);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 5);

        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'bold');
        // doc.text('Report Generation Date & Time', data.settings.margin.left + 110, pageHeight - 10)

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate, data.settings.margin.left + 95, pageHeight - 5)

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
    // Transfer End
    let finalY6 = (doc as any).lastAutoTable.finalY;

    doc.setTextColor(138, 24, 34);
    doc.setFontSize(14);
    doc.setFont('Times-Roman', 'bold');
    doc.text('Declaration', 15, finalY6 + 10);
    // Declaration Start

    (doc as any).autoTable({
      head: this.declarationHead,
      body: this.declarationArray,
      theme: 'striped',
      startY: finalY6 + 15,
      didDrawPage: function (data) {

        const currentDate = new Date();
        const convtCurrentDate = "" + currentDate + ""

        // Header
        doc.addImage("assets/assets/img/kvslogo1.jpg", "JPG", 50, 10, 100, 20);
        doc.setDrawColor(0, 0, 0);
        doc.setTextColor(0, 0, 0);
        doc.setLineWidth(0.2);
        doc.line(15, 35, 200, 35);

        // Footer
        var str = "Page " + data.doc.internal.getNumberOfPages();

        doc.setFontSize(10);
        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 5);

        // doc.setTextColor(0, 0, 0);
        // doc.setFontSize(12);
        // doc.setFont('Times-Roman', 'bold');
        // doc.text('Report Generation Date & Time', data.settings.margin.left + 110, pageHeight - 10)

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.setFont('Times-Roman', 'normal');
        doc.text(convtCurrentDate, data.settings.margin.left + 95, pageHeight - 5)

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
    // Declaration End

    //Save
    doc.save(teacherProfile?.teacherName + '.pdf')
  }
}
