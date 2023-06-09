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
export class TransferService {

  constructor(private _http: HttpClient) { }



  getInitiatedTransferByKvCode(data){
    var token = JSON.parse(sessionStorage.getItem('authTeacherDetails'))?.token
    var headers = new HttpHeaders({
      'Authorization':token,
      'Content-Type': 'text/plain; charset=utf-8',
    });    
    return this._http.post<any>(environment.BASE_URL_DATA_TRANSFER+ "getInitiatedTransferByKvCode", data, {headers})
  }


}
