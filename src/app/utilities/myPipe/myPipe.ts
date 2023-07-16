import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'yesNoPipe'
})
export class YesNoPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Yes";
    }
    else if (value == 0 || value == '0') {
      return "No";
    }
  }
}

@Pipe({
  name: 'tecahingNonTeaching'
})
export class TecahingNonTeaching implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Teaching";
    }
    else if (value == 2 || value == '2') {
      return "Non-Teaching";
    }
  }
}


@Pipe({
  name: 'nationality'
})
export class NationalityPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "India";
    }
    else if (value == 2 || value == '2') {
      return "Others";
    }
  }
}

@Pipe({
  name: 'bloodGroup'
})
export class BloodGroupPipe implements PipeTransform {
  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "A+";
    }
    else if (value == 2 || value == '2') {
      return "A-";
    }
    else if (value == 3 || value == '3') {
      return "B+";
    }
    else if (value == 4 || value == '4') {
      return "B-";
    }
    else if (value == 5 || value == '5') {
      return "AB+";
    }
    else if (value == 6 || value == '6') {
      return "AB-";
    }
    else if (value == 7 || value == '7') {
      return "O+";
    }
    else if (value == 8 || value == '8') {
      return "O-";
    }
    else if (value == 9 || value == '9') {
      return "Others";
    }
  }
}

@Pipe({
  name: 'transferGround'
})
export class TransferGroundPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Request Transfer General";
    }
    else if (value == 2 || value == '2') {
      return "Request On LTR";
    }
    else if (value == 3 || value == '3') {
      return "Request On MDG";
    }
    else if (value == 4 || value == '4') {
      return "Request On DFP";
    }
    else if (value == 5 || value == '5') {
      return "Request On PH";
    }
    else if (value == 6 || value == '6') {
      return "Request On Spouse Ground";
    }
    else if (value == 7 || value == '7') {
      return "Surplus";
    }
    else if (value == 8 || value == '8') {
      return "Displacement";
    }
    else if (value == 9 || value == '9') {
      return "ADMN Ground Under PARA7(E)";
    }
    else if (value == 10 || value == '10') {
      return "ADMN Ground Under 40 Years Of Age";
    }
    else if (value == 11|| value == '11') {
      return "Direct Recruitment";
    }
    else if (value == 12|| value == '12') {
      return "Promotion";
    }
    else if (value == 13|| value == '13') {
      return "Request On SP";
    }
    else if (value == 14|| value == '14') {
      return "Request On Widow/Widower";
    }
    else if (value == 15|| value == '15') {
      return "Mutual Transfer";
    }
    else if (value == 16|| value == '16') {
      return "Request On Any Other Ground";
    }
    else if (value == 17|| value == '17') {
      return "No Taker Vacancy Availed";
    }
    else if (value == 18|| value == '18') {
      return "Any Other Administrative Ground";
    }
  }
}

@Pipe({
  name: 'maritalStatus'
})
export class MaritalStatusPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Married";
    }
    else if (value == 4 || value == '4') {
      return "Single";
    }
    else if (value == 7 || value == '7') {
      return "Widow/Widower";
    }
  }
}

@Pipe({
  name: 'staffType'
})
export class StaffTypePipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Teaching";
    }
    else if (value == 2 || value == '2') {
      return "Non-Teaching";
    }
  }
}

@Pipe({
  name: 'natureOfAppointment'
})
export class NatureOfAppointmentPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Regular";
    }
    else if (value == 2 || value == '2') {
      return "Contractual";
    }
  }
}


@Pipe({
  name: 'genderPipe'
})
export class GenderPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Male";
    }
    else if (value == 2 || value == '2') {
      return "Female";
    }
    else if (value == 3 || value == '3') {
      return "Transgender";
    }
  }
}

@Pipe({
  name: 'natureOfApntmntPipe'
})
export class NatureOfApntmntPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Regular";
    }
    else if (value == 2 || value == '2') {
      return "Contract";
    }
    else if (value == 3 || value == '3') {
      return "Part-Time";
    }
  }
}

@Pipe({
  name: 'appointedForLevelPipe'
})
export class AppointedForLevelPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Primary";
    }
    else if (value == 2 || value == '2') {
      return "Upper Primary";
    }
    else if (value == 3 || value == '3') {
      return "Secondary";
    }
    else if (value == 4 || value == '4') {
      return "Higher secondary";
    }
    else if (value == 5 || value == '5') {
      return "Pre-Primary";
    }
  }
}


@Pipe({
  name: 'disabilityPipe'
})
export class DisabilityPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Visually Handicapped";
    }
    else if (value == 2 || value == '2') {
      return "Hearing Impairment";
    }
    else if (value == 3 || value == '3') {
      return "Physically Disabled";
    }
    else if (value == 4 || value == '4') {
      return "Leprosy Cured";
    }
    else if (value == 5 || value == '5') {
      return "Mental Retardation";
    }
    else if (value == 2 || value == '6') {
      return "Mental Illness";
    }
    else if (value == 3 || value == '7') {
      return "Multiple Disabilities";
    }
    else if (value == 4 || value == '8') {
      return "Autism";
    }
    else if (value == 5 || value == '9') {
      return "Thalassemia";
    }
    else if (value == 5 || value == '10') {
      return "Hemophilia";
    }else{
      return 'Not Applicable'
    }
  }
}


@Pipe({
  name: 'socialCatPipe'
})
export class SocialCatPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "General";
    }
    else if (value == 2 || value == '2') {
      return "SC";
    }
    else if (value == 3 || value == '3') {
      return "ST";
    }
    else if (value == 4 || value == '4') {
      return "OBC";
    }
    else if (value == 5 || value == '5') {
      return "ORC";
    }
    else if (value == 6 || value == '6') {
      return "Others";
    }
  }

}

@Pipe({
  name: 'typeOfTeacherPipe'
})
export class TypeOfTeacherPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Head teacher";
    }
    else if (value == 2 || value == '2') {
      return "Acting head teacher";
    }
    else if (value == 3 || value == '3') {
      return "Teacher";
    }
    else if (value == 5 || value == '5') {
      return "Instructor positioned as per RTE";
    }
    else if (value == 6 || value == '6') {
      return "Principal";
    }
    else if (value == 7 || value == '7') {
      return "Vice Principal";
    }
    else if (value == 8 || value == '8') {
      return "Lecturer";
    }
  }
}


@Pipe({
  name: 'hAcdQualPipe'
})
export class HAcdQualPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Below secondary";
    }
    else if (value == 2 || value == '2') {
      return "Secondary";
    }
    else if (value == 3 || value == '3') {
      return "Higher secondary";
    }
    else if (value == 4 || value == '4') {
      return "Graduate";
    }
    else if (value == 5 || value == '5') {
      return "Post graduate";
    }
    else if (value == 6 || value == '6') {
      return "M.Phil.";
    }
    else if (value == 7 || value == '7') {
      return "Ph.D.";
    }
    else if (value == 8 || value == '8') {
      return "PostDoctoral";
    }
  }
}

@Pipe({
  name: 'profQualPipe'
})
export class ProfQualPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Diploma or certificate in basic teachers’ training of a duration not less than two years";
    }
    else if (value == 2 || value == '2') {
      return "Bachelor of Elementary Education (B.El.Ed.)";
    }
    else if (value == 3 || value == '3') {
      return "B.Ed. or equivalent";
    }
    else if (value == 4 || value == '4') {
      return "M.Ed. or equivalent";
    }
    else if (value == 5 || value == '5') {
      return "Others";
    }
    else if (value == 6 || value == '6') {
      return "None";
    }
    else if (value == 7 || value == '7') {
      return "Diploma/degree in special education";
    }
    else if (value == 8 || value == '8') {
      return "Pursuing any relevant professional course";
    }
  }
}

@Pipe({
  name: 'trainingPipe'
})
export class TrainingPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Subject knowledge";
    }
    else if (value == 2 || value == '2') {
      return "Pedagogical issues";
    }
    else if (value == 3 || value == '3') {
      return "ICT Skills";
    }
    else if (value == 4 || value == '4') {
      return "Knowledge and skills to engage with CWSN";
    }
    else if (value == 5 || value == '5') {
      return "Leadership and management skills";
    }
    else if (value == 6 || value == '6') {
      return "Sanitation & Hygiene";
    }
    else if (value == 7 || value == '7') {
      return "Others";
    }
    else if (value == 8 || value == '8') {
      return "Not required";
    }
  }
}


@Pipe({
  name: 'classTaughtPipe'
})
export class ClassTaughtPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "Primary only";
    }
    else if (value == 2 || value == '2') {
      return "Upper primary only";
    }
    else if (value == 3 || value == '3') {
      return "Primary and Upper primary";
    }
    else if (value == 5 || value == '5') {
      return "Secondary only";
    }
    else if (value == 6 || value == '6') {
      return "Higher Secondary only";
    }
    else if (value == 7 || value == '7') {
      return "Upper primary and Secondary";
    }
    else if (value == 8 || value == '8') {
      return "Secondary and Higher secondary";
    }
    else if (value == 10 || value == '10') {
      return "Pre-Primary only";
    }
    else if (value == 11 || value == '11') {
      return "Pre- Primary & Primary";
    }
  }
}


@Pipe({
  name: 'mainSubjectPipe'
})
export class MainSubjectPipe implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "All subjects";
    }
    else if (value == 2 || value == '2') {
      return "Language";
    }
    else if (value == 3 || value == '3') {
      return "Mathematics";
    }
    else if (value == 4 || value == '4') {
      return "Environment studies";
    }
    else if (value == 5 || value == '5') {
      return "Sports";
    }
    else if (value == 6 || value == '6') {
      return "Music";
    }
    else if (value == 7 || value == '7') {
      return "Science";
    }
    else if (value == 8 || value == '8') {
      return "Social studies";
    }
    else if (value == 10 || value == '10') {
      return "Accountancy";
    }
    else if (value == 11 || value == '11') {
      return "Biology";
    }
    else if (value == 12 || value == '12') {
      return "Business Studies";
    }
    else if (value == 13 || value == '13') {
      return "Chemistry";
    }
    else if (value == 14 || value == '14') {
      return "Computer Science";
    }
    else if (value == 15 || value == '15') {
      return "Economics";
    }
    else if (value == 16 || value == '16') {
      return "Engineering Drawing";
    }
    else if (value == 17 || value == '17') {
      return "Fine Arts";
    }
    else if (value == 18 || value == '18') {
      return "Geography";
    }
    else if (value == 19 || value == '19') {
      return "History";
    }
    else if (value == 20 || value == '20') {
      return "Home Science";
    }
    else if (value == 21 || value == '21') {
      return "Philosophy";
    }
    else if (value == 22 || value == '22') {
      return "Physics";
    }
    else if (value == 23 || value == '23') {
      return "Political Science";
    }
    else if (value == 24 || value == '24') {
      return "Psychology";
    }
    else if (value == 25 || value == '25') {
      return "Foreign Language";
    }
    else if (value == 26 || value == '26') {
      return "Botany";
    }
    else if (value == 27 || value == '27') {
      return "Zoology";
    }
    else if (value == 41 || value == '41') {
      return "Hindi";
    }
    else if (value == 43 || value == '43') {
      return "Sanskrit";
    }
    else if (value == 45 || value == '45') {
      return "Urdu";
    }
    else if (value == 46 || value == '46') {
      return "English";
    }
    else if (value == 47 || value == '47') {
      return "Regional Language";
    }
    else if (value == 91 || value == '91') {
      return "Art education";
    }
    else if (value == 92 || value == '92') {
      return "Health & physical education";
    }
    else if (value == 93 || value == '93') {
      return "Work Education";
    }
    else if (value == 99 || value == '99') {
      return "Other";
    }
  }  
}

@Pipe({
  name: 'experienceType'
})
export class ExperienceType implements PipeTransform {

  transform(value: any): any {
    if (value == 1 || value == '1') {
      return "School";
    }
    else if (value == 2 || value == '2') {
      return "Zone";
    }
    else if (value == 3 || value == '3') {
      return "Region";
    }else if(value == 4 || value == '4'){
      return "Head Quater";
    }else{
      return "";
    }
  }
}

@Pipe({
  name: 'institutionType'
})
export class InstitutionType implements PipeTransform {

  transform(value: any): any {

    // alert(value)

    if (value == 1 || value == '1') {
      return "School";
    }
    else if (value == 2 || value == '2') {
      return "ZIET";
    }
    else if (value == 3 || value == '3') {
      return "Region";
    }else if(value == 4 || value == '4'){
      return "Head Quater";
    }else{
      return "";
    }
  }
}






