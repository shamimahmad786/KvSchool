import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouteConfigLoadEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LangServiceService } from 'src/app/service/lang-service.service';
import { OutsideServicesService } from 'src/app/service/outside-services.service';
import { environment } from 'src/environments/environment';

declare const owlScroller:any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  defaultLang:any;
  browserLang:any;
  noOfSchool:any;
  noOfStaff:any;
  dashboarData:any;

  // loginUrlCommon = environment.LOGIN_URL_COMMON;environment.LOGIN_URL_INDIVIDUAL
  loginUrlCommon=environment.LOGIN_URL_INDIVIDUAL;
  // loginUrlCommon2=environment.LOGIN_URL_INDIVIDUAL2;

  loginUrlCommonLocal1 = environment.LOGIN_URL_COMMON_LOCAL1;
  loginUrlCommonLocal2 = environment.LOGIN_URL_COMMON_LOCAL2;
  languageName="English"
  constructor( private langSer: LangServiceService,
    private router: Router,
    public translate: TranslateService,
    private ser: OutsideServicesService,
    @Inject(DOCUMENT) private document:Document,
    ) {

    this.langSer.selectedLang.subscribe(res=>{
      
      this.defaultLang = res;
    })

    translate.addLangs(['hn','en']);
    translate.setDefaultLang('en');
    translate.use('en');
    this.browserLang = translate.getDefaultLang();
    this.languageChanged();    
    this.langSer.selectedLang.next(this.browserLang);
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|hn/)? browserLang:'en');

   }

  ngOnInit(): void {
  
    // alert("in");
    // debugger;
    // owlScroller();
    // this.ser.getMainDashboard().subscribe((res)=>{
    //   this.noOfSchool = res.response.rowValue[0].no_of_school;
    //   this.noOfStaff = res.response.rowValue[0].no_of_staff;
    // })
    this.dashboardData();
  }

  selectedLang(lang){
    console.log(lang)
    if(lang=='en'){
      this.languageName='English';
    }else{
      this.languageName='Hindi';
    }
    this.langSer.selectedLang.next(lang)
    this.translate.use(lang);
    // this.defaultLang = lang;
    

  }

  languageChanged(){
    this.translate.use(this.browserLang.match(/en|hn/)? this.browserLang :'en')
  }

  onToggle(event){
    console.log(event)
    if(event.checked){
      //true or dark mode
      console.log("dark")
      this.document.body.classList.add('dark');
    }else{
      //false or light mode
      console.log("light")
      this.document.body.classList.remove('dark');
    }
  }
  adminLogin(){
    window.location.href=this.loginUrlCommon;
  }
  teacherLogin(){
    // window.location.href=this.loginUrlCommon2;
  }


  dashboardData(){

    
  this.ser.getkvsDashboardReport().subscribe((res) => {
this.dashboarData=res.response[0];
  })

  }




}
