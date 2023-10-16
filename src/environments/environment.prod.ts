export const environment = {
  production: true,

  //Local
  BASE_URL_DATA_TEACHER: 'http://10.25.26.251:8014/api/teacher/',
  BASE_URL_DATA_MASTER: 'http://10.25.26.251:8014/api/master/',
  BASE_URL_DATA_QUESTION: 'http://10.25.26.251:8014/api/question/',
  BASE_URL_DATA_SURVEY: 'http://10.25.26.251:8014/api/survey/',
  BASE_URL_DATA_EXPERIENCE: 'http://10.25.26.251:8014/api/experience/',
  BASE_URL_DATA_PROMOTION: 'http://10.25.26.251:8014/api/promotion/',
  BASE_URL_DATA_QUALIFICATION: 'http://10.25.26.251:8014/api/qualification/',
  BASE_URL_DATA_AWARDS: 'http://10.25.26.251:8014/api/awards/',
  BASE_URL_DATA_TRANSFER: 'http://10.25.26.251:8014/api/transfer/',
  BASE_URL_DATA_DASHBOARD: 'http://10.25.26.251:8014/api/dashboard/',
  BASE_URL_DATA_USER:'http://10.25.26.251:8090/meuser/api/user/',
  BASE_URL_DATA_SURPLUS_TRANSFER:'http://10.25.26.251:8015/api/transfer/',
  LOGOUT_URL:'http://10.25.26.251:8385/meauth/logout?returnTo=http://10.25.26.10:4200/',
  LOGIN_URL_INDIVIDUAL:'http://10.25.26.251:8385/meauth/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=http://10.25.26.10:4200/teacher/profile&scopes=read',
  LOGIN_URL_COMMON:'http://10.25.26.10:4200/tDashboard',
  LOGIN_URL_COMMON_LOCAL1:'',
  LOGIN_URL_COMMON_LOCAL2:'',
  AUTH_GUARD_HREF:'http://10.25.26.10:6200/teacher/profile',
  AUTH_GUARD_HREF1:'http://10.25.26.251:8385/meauth/logout?returnTo=http://10.25.26.10:4200/',
  BASE_URL_MEUSER:'http://10.25.26.251:8090/meuser/api/user/',
  BASE_URL_DATA_MASTER1:'http://10.25.26.251:8014/unee-api/v1/master/',
  BASE_URL_DATA_MAPPING:'http://10.25.26.251:8014/unee-api/v1/mapping/',

  //Demo
  // BASE_URL_DATA_TEACHER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/awards/', 
  // BASE_URL_DATA_TRANSFER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transfer/',
  // BASE_URL_DATA_DASHBOARD: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/dashboard/',
  // BASE_URL_DATA_USER: 'https://pgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/user/',
  // BASE_URL_DATA_SURPLUS_TRANSFER:'https://pgi.udiseplus.gov.in/MOE-RAD-TRANSFER/api/transfer/',


  // LOGIN_URL_INDIVIDUAL:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://pgi.udiseplus.gov.in/school/teacher/profile&scopes=read',
  // LOGOUT_URL:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
  // LOGIN_URL_COMMON:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://pgi.udiseplus.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON_LOCAL1:'',
  // LOGIN_URL_COMMON_LOCAL2:'',

  // AUTH_GUARD_HREF:'https://pgi.udiseplus.gov.in/teacher/teacher/profile',
  // AUTH_GUARD_HREF1:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',

  // BASE_URL_MEUSER:'https://pgi.udiseplus.gov.in/UserService/api/user/',




  //Demo 2
  // BASE_URL_DATA_TEACHER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/awards/', 
  // BASE_URL_DATA_TRANSFER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/transfer/',
  // BASE_URL_DATA_DASHBOARD: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/dashboard/',
  // BASE_URL_DATA_USER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/user/',
  // BASE_URL_DATA_SURPLUS_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TRANSFER-V1/api/transfer/',
  // BASE_URL_DATA_TEACHER_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/transprofile/',
  // LOGOUT_URL:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://demopgi.udiseplus.gov.in/school',
  // LOGIN_URL_INDIVIDUAL:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://demopgi.udiseplus.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://demopgi.udiseplus.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON_LOCAL1:'',
  // LOGIN_URL_COMMON_LOCAL2:'',
  // AUTH_GUARD_HREF:'https://demopgi.udiseplus.gov.in/teacher/teacher/profile',
  // AUTH_GUARD_HREF1:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
  // BASE_URL_MEUSER:'https://demopgi.udiseplus.gov.in/UserService/api/user/',
  // LOGIN_URL_JWT:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/api/login/',
  // BASE_URL_REPORT:'https://demopgi.udiseplus.gov.in/MOE-KVS-PDF/api/kvsreport/',
  // BASE_URL_DATA_MASTER1:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/unee-api/v1/master/',
  // BASE_URL_DATA_MAPPING:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/unee-api/v1/mapping/',
  //  BASE_URL_DATA_USERMANAGEMENT:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER-V1/usermanagement/',






//   BASE_URL_DATA_TEACHER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/teacher/',
//   BASE_URL_DATA_MASTER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/master/',
//  BASE_URL_DATA_QUESTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/question/',
//  BASE_URL_DATA_SURVEY: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/survey/',
//  BASE_URL_DATA_EXPERIENCE: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/experience/',
//   BASE_URL_DATA_PROMOTION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/promotion/',
//   BASE_URL_DATA_QUALIFICATION: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/qualification/',
//  BASE_URL_DATA_AWARDS: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/awards/', 
//  BASE_URL_DATA_TRANSFER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transfer/',
//  BASE_URL_DATA_DASHBOARD: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/dashboard/',
//  BASE_URL_DATA_USER: 'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/user/',
//  BASE_URL_DATA_SURPLUS_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TRANSFER/api/transfer/',
//  BASE_URL_DATA_TEACHER_TRANSFER:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/transprofile/',
//  LOGOUT_URL:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsonlinetransfer.kvs.gov.in/school',
//  LOGIN_URL_INDIVIDUAL:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
//  LOGIN_URL_COMMON:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
//  LOGIN_URL_COMMON_LOCAL1:'',
//   LOGIN_URL_COMMON_LOCAL2:'',
//   AUTH_GUARD_HREF:'https://demopgi.udiseplus.gov.in/teacher/teacher/profile',
//  AUTH_GUARD_HREF1:'https://demopgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
//  BASE_URL_MEUSER:'https://demopgi.udiseplus.gov.in/UserService/api/user/',
//  LOGIN_URL_JWT:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/api/login/',
//  BASE_URL_REPORT:'https://demopgi.udiseplus.gov.in/MOE-KVS-PDF/api/kvsreport/',
//  BASE_URL_DATA_MASTER1:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/unee-api/v1/master/',
//  BASE_URL_DATA_MAPPING:'https://demopgi.udiseplus.gov.in/MOE-RAD-TEACHER/unee-api/v1/mapping/',



  // KVS Main

  // BASE_URL_DATA_TEACHER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/awards/', 
  // BASE_URL_DATA_TRANSFER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/transfer/',
  // BASE_URL_DATA_DASHBOARD: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/dashboard/',
  // BASE_URL_DATA_USER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/user/',
  // BASE_URL_DATA_SURPLUS_TRANSFER:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TRANSFER/api/transfer/',
  // BASE_URL_DATA_TEACHER_TRANSFER:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/transprofile/',
  // LOGOUT_URL:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsonlinetransfer.kvs.gov.in/school',
  // LOGIN_URL_INDIVIDUAL:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON_LOCAL1:'',
  // LOGIN_URL_COMMON_LOCAL2:'',
  // AUTH_GUARD_HREF:'https://kvsonlinetransfer.kvs.gov.in/teacher/teacher/profile',
  // AUTH_GUARD_HREF1:'https://kvsonlinetransfer.kvs.gov.in/SpringAuthSecurity/logout?returnTo=https://pgi.udiseplus.gov.in/school',
  // BASE_URL_MEUSER:'https://kvsonlinetransfer.kvs.gov.in/UserService/api/user/',
  // LOGIN_URL_JWT:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/login/',
  // BASE_URL_REPORT:'https://kvsonlinetransfer.kvs.gov.in/MOE-KVS-PDF/api/kvsreport/',
  // BASE_URL_DATA_MASTER1:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/unee-api/v1/master/',
  // BASE_URL_DATA_MAPPING:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/unee-api/v1/mapping/',





  //KVS Main old
  // BASE_URL_DATA_TEACHER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/teacher/',
  // BASE_URL_DATA_MASTER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/master/',
  // BASE_URL_DATA_QUESTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/question/',
  // BASE_URL_DATA_SURVEY: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/survey/',
  // BASE_URL_DATA_EXPERIENCE: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/experience/',
  // BASE_URL_DATA_PROMOTION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/promotion/',
  // BASE_URL_DATA_QUALIFICATION: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/qualification/',
  // BASE_URL_DATA_AWARDS: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/awards/', 
  // BASE_URL_DATA_TRANSFER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/transfer/',
  // BASE_URL_DATA_DASHBOARD: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/dashboard/',
  // BASE_URL_DATA_USER: 'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TEACHER/api/user/',
  // BASE_URL_DATA_SURPLUS_TRANSFER:'https://kvsonlinetransfer.kvs.gov.in/MOE-RAD-TRANSFER/api/transfer/',


  // LOGOUT_URL:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=https://kvsonlinetransfer.kvs.gov.in/school',
  // LOGIN_URL_INDIVIDUAL:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/oauth/authorize?response_type=code&user_oauth_approval=true&client_id=teacher&redirect_uri=https://kvsonlinetransfer.kvs.gov.in/school/teacher/profile&scopes=read',
  // LOGIN_URL_COMMON_LOCAL1:'',
  // LOGIN_URL_COMMON_LOCAL2:'',

  // AUTH_GUARD_HREF:'https://kvsonlinetransfer.kvs.gov.in/teacher/teacher/profile',
  // AUTH_GUARD_HREF1:'https://pgi.udiseplus.gov.in/SpringAuthSecurity/logout?returnTo=http://kvsonlinetransfer.kvs.gov.in/school',

  // BASE_URL_MEUSER:'https://pgi.udiseplus.gov.in/UserService/api/user/',
  // BASE_URL_REPORT:'https://kvsonlinetransfer.kvs.gov.in/MOE-KVS-PDF/api/kvsreport/',


  
  

  udiseApi: 'https://pgi.udiseplus.gov.in/api-v1/public/getSchoolMaster/',
  auth_service: 'http://' + "10.25.26.10:8090/meuser" + '/api/userCradential',
  applicationId: 2

};
