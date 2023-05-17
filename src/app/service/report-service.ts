import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _http: HttpClient) { }

  reportData:any

  pushReportBasicData(data: any){
    this.reportData=data;
    localStorage.reportData=JSON.stringify(data);
    return data;
  }

  pullReportBasicData() {
  return JSON.parse(localStorage.reportData);
}


getReportData(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    return this._http.post<any>(environment.BASE_URL_REPORT+ "getReportData", data);
}


fetchKvRegion(data){
    
    // var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
    //   'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',

    });
    
    return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getKVRegion", data, {headers})
  }

  getStationByRegion(data){
    var headers = new HttpHeaders({
          'Content-Type': 'text/plain; charset=utf-8',
        });
        return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getStationByRegion", data, {headers})
  }

  getSchoolByStation(data){
    var headers = new HttpHeaders({
        'Content-Type': 'text/plain; charset=utf-8',
      });
      return this._http.post<any>(environment.BASE_URL_DATA_MASTER+ "getSchoolByStation", data, {headers})
  }


}