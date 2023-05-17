import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
    
   }

  login(userDto) {
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    // alert("At service--->"+JSON.stringify(userDto));
     return this.http.post<any>(environment.LOGIN_URL_JWT + "sign-in", userDto,{headers});
  }

//   getRoles()
//   {
//     return this.http.get<any>(environment.user_service_url + "/getRole")
//   }

//   register(userDto)
//   {
//     return this.http.post<any>(environment.user_service_url + "/sign-up", userDto)
//   }

//   getUsers(flag,stateId)
//   {
//     return this.http.get<any>(environment.user_service_url + "/getUserList", {params:{search : flag,stateId:stateId}});
//   }
//   getUserByStateId(){
//     return this.http.get<any>(environment.user_service_url + "/getUserByStateId", {params:{search : 'A'}});
//   }

//   deleteUserById(userDto){
//     return this.http.post<any>(environment.user_service_url + "/delete-user", userDto);
//   }

//   getAuthUserDetails(authCode){
//     return this.http.post<any>(environment.auth_service + "/get-usercradential", authCode);
//   }


 }
