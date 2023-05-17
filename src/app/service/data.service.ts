import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }

  getSchoolProfileByUdiseCode(data) {
    let url = environment.udiseApi + data
    return this._http.get<any>(url);
    //return this._http.get(url);
  }

  getAuthUserDetails(data){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    return this._http.post<any>(environment.auth_service + "/get-usercradential", data,{headers});
  }
}