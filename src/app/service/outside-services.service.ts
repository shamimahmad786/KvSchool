import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Response } from 'src/app/beans/response';
// import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OutsideServicesService {

  constructor(private _http: HttpClient) { }

  fetchTeacherByTeacherId(data){
    // const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getTeacherByTeacherId", data, {headers})
  }

  fetchSpouseByEmpCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getSpouseByEmpCode", data, {headers})
  }

  getTeacherBySchool(udise_code: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });
    // let url = environment.BASE_URL_DATA + "getTeacherBySchool/" + JSON.stringify(udise_code);
    // return this._http.post(url);    
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherBySchool",udise_code, {headers});
  }

  saveSingleTeacher(data: any): Observable<Response> {
    debugger
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacher", data, {headers});
  }

  getMasterDataByStateCode(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data);
  }


  getMasterData(data: any): Observable<Response> {
    // alert("call for get master");
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data);
  }

  getVerified(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "verifyTeacher", data, {headers});
  }

  saveCustomQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_QUESTION+ "saveQuestion", data, {headers})
  }

  getCustomQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_QUESTION+ "getAllQuestionByBusinessUnit", data, {headers})
  }

  saveSurveyMaster(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "saveSurveyMaster", data, {headers})
  }

  getSurveyMasterList(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "getSurveyMasterBySchCode", data, {headers})
  }

  saveSurveyMstQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "saveSurveyMasterQues", data, {headers})
  }

  getSurveyMstQues(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "getSurveyMasterQues", data, {headers});
  }

  removeSurveyMstQuesBySurveyId(data:any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_SURVEY+ "deleteSurveyMasterQues", data, {headers})
  }

  saveKvTeacher(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "saveTeacher", data, {headers});
  }

  fetchKvTeacherByKvCode(data: any): Observable<Response> {
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getKvTeacherByKvCode", data, {headers})
  }

  getEmployeetransferDetails(data: any): Observable<Response> { 
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferINByKvCode", data, {headers})
  }
  sendEmplooyeeJoiningDate(data: any): Observable<Response> { 
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "updateTransferINByKvCode", data, {headers})
  }
  sendEmplooyeeRelevingDate(data: any): Observable<Response> { 
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "updateTransferOutByKvCode", data, {headers})
  }

  getKvTeacherByUdiseCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getKvTeacherByUdiseCode", data, {headers})
  }

  fetchAllMaster(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getAllMaster", data, {headers})
  }

  fetchKvSchoolDetails(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolDetailsByKVCode", data, {headers})
  }

  fetchKvSubjectListByTchType(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSubjectByTeacherTypeId", data, {headers})
  }

  saveTchExperience(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "saveExperience", data, {headers})
  }

  
  fetchTchExpByTchId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "getExperienceByTeacherId", data, {headers})
  }

  fetchPromotionByTchId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION+ "getPromotionByTeacherId", data, {headers})
  }

  savePromotion(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION+ "savePromotion", data, {headers})
  }

  fetchQualByType(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getQualificationByType", data, {headers})
  }

  fetchSubByQual(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSubjectByQualification", data, {headers})
  }

  saveTchAcadQual(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "saveEducationalQualification", data, {headers})
  }

  saveTchProfQual(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "saveProfessionalQualification", data, {headers})
  }

  fetchAcdQual(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "getEducationalQualificationByTeacherId", data, {headers})
  }

  fetchProfQual(data){  
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });  
    
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "getProfesionalQualificationByTeacherId", data, {headers})
  }

  saveAwards(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "saveAwards", data, {headers})
  }

  fetchAwardsByTchId(data){   
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    }); 
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "getAwardsByTeacherId", data, {headers})
  }

  fetchAwardsList(data){    
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getAwards",data, {headers})
  }

  saveTraining(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "saveTraning", data, {headers})
  }

  fetchTrainingList(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "getTraningByTeacherId", data, {headers})
  }

  fetchStateMaster(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getState", data, {headers})
  }

  fetchDistrictByStateId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getDistrictByStateId", data, {headers})
  }
  getTransferRegionByEmployee(data) {
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'text/plain; charset=utf-8',
    });

    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferRegionByEmployee", data, { headers })
  }
  fetchTchDuplicateMobile(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherDublicateMobile", data, {headers})
  }

  createUserOnVerify(data){
    
    // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/create-kvuser', data)
    // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/create-kvuser', data)
    return this._http.post<any>(environment.LOGIN_URL_JWT + "createKvUser", data)
  }

  fetchCorrectionInitiatedDetails(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getTeacherProfileQueryInitiate", data, {headers})

  }

  fetchKvRegion(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getKVRegion", data, {headers})
  }

  fetchStationByRegionId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    // return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data, {headers})
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-station-by-region", data, {headers})
  }

  fetchKvSchoolByStationCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolByStation", data, {headers})
  }

  updateSysTchCode(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updateTeacherSystemGeneratedCode", data, {headers})
  }

  deleteExpByWorkExpId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_EXPERIENCE+ "deleteByWorkExperienceId", data, {headers})
  }

  updateFlagByTeacherId(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updateFlagByTeachId", data, {headers})

  }
  sentReport(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });

    
    return this._http.post<any>(environment.BASE_URL_REPORT + "sentReport", data, {headers})
  }

  getUpdatedFlag(data){
    
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "getUpdatdFlag", data, {headers})
  }

deteleEducationalQualification(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
  return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "deteleEducationalQualification", data, {headers})
}
deleteProfessionalQualification(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_QUALIFICATION+ "deleteProfessionalQualification", data, {headers})
}
deletePromotion(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_PROMOTION+ "deletePromotion", data, {headers})
}
deleteByWorkExperienceId(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "deleteByWorkExperienceId", data, {headers})
}
deleteAwards(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "deleteAwards", data, {headers})
}
deleteTraning(data){
  
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
  
    return this._http.post<any>(environment.BASE_URL_DATA_AWARDS+ "deleteTraning", data, {headers})
}

fetchDashboardData(data){  

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });  
    return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getDashboard", data, {headers})

}

checkEmployeeCodeByEmpCode(data){
  

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });  
    return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "checkEmployeeCode", data, {headers})

}

dropTeacherBySchoolByTchId(data){
  

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "dropTeacherBySchool", data, {headers})
}

getOutboxTeacherByUdisecode(data){
  
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getOutboxTeacherByUdisecode", data, {headers})
}

changeTeacherSchool(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "changeTeacherSchool", data, {headers})
}



fetchConfirmedTchDetails(data){

    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER+ "getConfirmedTeacherDetails", data, {headers})

}



fetchInitiatedTransferByUdisecode(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getInitiatedTransferByUdisecode", data, {headers})

}

fetchTransferBasicProfileByTchId(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getTransferBasicProfileByTeacherId", data, {headers})

}

fetchUploadedDoc(data){
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getDocumentByTeacherId", data)
}

saveInitiatedTeacherTransfer(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "transfer/saveTransferDCTCPoints", data, {headers})
}

fetchInitiateTeacherTransfer(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "getInitiateTeacherTransfer", data, {headers})
}

initiateTeacherTransfer(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    
  
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "initiateTeacherTransfer", data, {headers})
}


fetchSchoolPreferenceByStationCode(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    

return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolByMultipleStation", data, {headers})
}


deleteUploadedDoc(data){

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "deleteDocumentByTeacherIdAndName", data)

}

uploadDocument(data){
return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "uploadDocument", data);
}



resetPassword(data){
  debugger
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  // return this._http.post<any>('http://10.25.26.251:8090/meuser/api/user/', data);
  
  return this._http.post<any>(environment.LOGIN_URL_JWT + "resetPassword", data,{headers})

  // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/resetPassword', data);
  // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/resetPassword', data);
}


getUniversalSurplus(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_SURPLUS_TRANSFER+ "getUniversalSurplus", data, {headers});
}


saveSurplusDataBySchool(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_SURPLUS_TRANSFER+ "saveSurplusDataBySchool", data, {headers});
}

updateFormStatusFlag(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });    

  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER + "updatdFlag", data, {headers})

}

fetchTransferRegion(data){
  
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getTransferRegion", data, {headers})
}

fetchTransferStation(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getTransferStation", data, {headers})
}


// 10.25.26.251:8014/api/dashboard/getDashboardBasicCountDetails
dashboardReportData(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getDashboardBasicCountDetails", data, {headers})
}



getDashboardOnMoreClick(data){    
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD + "getDashboardOnMoreClick",data,{headers})
}

getProfileImage(data){
  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getProfileImage", data)
}

deleteInitiatedTeacherTransfer(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER + "resetTransfer",data,{headers})


}

fetchIntraStationSchool(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getMaster", data, {headers})

}

fetchSanctionedData(data){
  // http://10.25.26.251:8014/api/transfer
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "sanction/getSanctionData", data, {headers})
}

saveSanctionedFormData(data){
  // http://10.25.26.251:8014/api/transfer/sanction/saveSanctionData
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "sanction/saveSanctionData", data, {headers})
}



getMainDashboard(){
  return this._http.get<any>(environment.BASE_URL_DATA_MASTER+ "getMaster1/1")
}


// New Uploaded Service By abhinesh

saveTransProfile(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveTransProfile", data, {headers});
}

saveStationChoice(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "saveStationChoice", data, {headers});
} 

getTransferData(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',

  });
  
  return this._http.post<any>(environment.BASE_URL_DATA_TEACHER_TRANSFER + "getTransProfile", data, {headers});
}


//  Unicoff


addRegionMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-region", data, {headers})

}
editRegionMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-region", data, {headers})

}
addStationMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-station", data, {headers})

}
editStationMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-station", data, {headers})

}
addStationCategoryMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-station-category", data, {headers})

}
editStationCategoryMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-station-category", data, {headers})

}
addSchoolMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-school", data, {headers})

}
editSchoolMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-school", data, {headers})

}
addRegionStationMapping(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/region-stations", data, {headers})

}
addStationCategoryMapping(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/station-category", data, {headers})

}
addSchoolStationMapping(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/schools-station", data, {headers})

}
fetchRegionList(){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-region", {headers})

}
fetchStationList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-station", data, {headers})

}
checkPasswordChanged(data)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.LOGIN_URL_JWT+ "checkPasswordChanged", data, {headers})
}

fetchUnmappedStationList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-unmaped-station", data, {headers})

}



fetchSchoolList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-school", data, {headers})
}
fetchSchoolUnmappedList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-unmapped-school", data, {headers})
}


fetchStationCategoryList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-category", data, {headers})
}
searchRegionStationMList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/region-station-mapping-list", data, {headers})
}
searchStationCategoryMList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/station-category-mapping-list", data, {headers})
}

searchSchoolStationMList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/school-sation-mapping-list", data, {headers})
}



addStaffTypeMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-staff-type", data, {headers})

}
fetchStaffTypeList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-all-staff-type", data, {headers})
}
editStaffTypeMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-staff-type", data, {headers})

}
addDesignationMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-designation", data, {headers})

}
fetchDesignationList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-designations", data, {headers})
}
editDesignationMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-designation", data, {headers})

}
addSubjectMaster(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-subject", data, {headers})

}
fetchSubjectList(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/list-of-subjects", data, {headers})
}
editSubjectMaster(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-subject", data, {headers})
}
addStaffTypePostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "save/staff-type-post", data, {headers})

}
fetchStaffTypePostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch/staff-type-post-mapping-list", data, {headers})

}
addSubjectPostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "master/save-post-subject", data, {headers})

}
// fetchSubjectPostMapping(data){

//   var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
//   var headers = new HttpHeaders({
//     'Authorization':token,
//     'Content-Type': 'text/plain; charset=utf-8',
//   }); 

//   return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "master/fetch-post-subject-mapping-list", data, {headers})

// }
fetchSubjectPostMapping(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MAPPING+ "master/fetch-post-subject-mapping-list-with-staff-details", data, {headers})

}
fetchSanctionPostList(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "fetch-list-of-school-sanctioned-post", data, {headers})

}

schoolCodeExistOrNot(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "school-code-exist-in-sanctioned-post", data, {headers})

}
saveSanctionedData(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "save-school-sanctioned-post-v2", data, {headers})

}
updateSanctionedData(data){

  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-school-sanctioned-post-detail", data, {headers})
}

getMasterDetail(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "list-of-all-master-edit-allowed", data, {headers})
}
updateMasterDetail(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 

  return this._http.post<any>(environment.BASE_URL_DATA_MASTER1+ "update-master-edit-allowed", data, {headers})
}
//download report
downloadExcel(data,url){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "excel/report/"+url,data,{responseType: 'blob'})
}

downloadPdf(data,url){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "pdf/download/"+url,data,{responseType: 'blob'})
}
getkvsDashboardReport(){
  return this._http.post<any>(environment.BASE_URL_DATA_DASHBOARD+ "getkvsDashboardReport","")
}

getSubjectByPost(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "getSubjectByPost",data,{headers})
}

fetchSanctionPost(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetchSanctionPost",data,{headers})
}

getStationCategoryByRegion(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/get-station-category-by-region",data,{headers})
}

freezeSanctionPost(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "freeze-sanction-post",data,{headers})
}
updateFreezeMaster(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  });
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "freeze-master",data,{headers})
}

getFreezeMaster(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/get-freeze-master","",{headers})
}
fetchFreezeStatus(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/get-freeze-master-by-id",data,{headers})
}
fetchTcDcData(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TEACHER+ "transfer/getTeacherTransferDetails",data,{headers})
}
fetchAllSactionedPostMapping(data:any)
{
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_MASTER1+ "fetch/school-region-mapping-list",data,{headers})
}

schoolTransferVerify(data:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_TRANSFER+ "schoolTransferVerify",data,{headers})
}
getChilduserList(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.refreshToken
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_USERMANAGEMENT+ "getChildUser",data,{headers})
}

childActiveDeactiveAction(data:any, userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.refreshToken
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.BASE_URL_DATA_USERMANAGEMENT+ "updateUser",data,{headers})
}
createInstitutionUser(data:any,userName:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.refreshToken
  var headers = new HttpHeaders({
    'Authorization':token,
    'username':userName,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.LOGIN_URL_JWT+ "createUsers",data,{headers})
}
// exportToPdf(data:any){
//   var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
//   var headers = new HttpHeaders({
//     'Authorization':token,
//     'Content-Type': 'text/plain; charset=utf-8',
//   }); 
//   return this._http.get(environment.BASE_URL_REPORT+ "sentReport",data,{headers})
// }

unlockEmloyee(data:any){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token,
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  return this._http.post(environment.LOGIN_URL_JWT+ "correctPassword",data,{headers})
}
schoolResetPassword(data){
  var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
  var headers = new HttpHeaders({
    'Authorization':token, 
    'Content-Type': 'text/plain; charset=utf-8',
  }); 
  // return this._http.post<any>('http://10.25.26.251:8090/meuser/api/user/', data);
  return this._http.post<any>(environment.LOGIN_URL_JWT + "schoolResetPassword", data)

  // return this._http.post<any>('https://pgi.udiseplus.gov.in/UserService/api/user/resetPassword', data);
  // return this._http.post<any>('https://kvsdemo.udiseplus.gov.in/UserService/api/user/resetPassword', data);
}
}
