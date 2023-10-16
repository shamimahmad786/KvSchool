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

  login(userDto,userName:any) {

    // alert(userName);

    var headers = new HttpHeaders({
      'username':userName,
      // 'Content-Type': 'text/plain; charset=utf-8'
     });
     return this.http.post<any>(environment.LOGIN_URL_JWT + "sign-in", userDto,{headers});
  }
  fetchOtp(data:any){
    var headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
    }); 
    return this.http.post<any>(environment.LOGIN_URL_JWT + "getOtpForAuthentication", data,{headers});
  }
  otpLogin(data:any){
    var headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
    }); 
    return this.http.post<any>(environment.LOGIN_URL_JWT + "otpSignin", data,{headers});
  }
  forgetPasswordMail(data:any){
    var headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
    }); 
    return this.http.post<any>(environment.LOGIN_URL_JWT + "forgetPasswordMail", data,{headers});
  }
  resetPassword(data:any,paramSesId:any){
    console.log(paramSesId)
    var headers = new HttpHeaders({
      'Content-Type': 'text/plain; charset=utf-8',
    }); 
    return this.http.post<any>(environment.LOGIN_URL_JWT + "changePassword", data,{headers,params: {sessionId: paramSesId}});
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
