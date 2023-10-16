import { Component, HostListener,OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
export let browserRefresh = false;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnDestroy {
  time: any;
  logoutLink = environment.LOGOUT_URL
  title = 'teacherNew';
  timeLeft: number = 30;
  subscription: Subscription;
  interval;
  constructor(private router: Router) {
  //******************************** Browser referesh logout functionality********************/ 
  //   if(sessionStorage.getItem("authTeacherDetails") != null && JSON.parse(sessionStorage.getItem("authTeacherDetails")).status != 0){
  //   this.subscription = router.events.subscribe((event) => {
  //     if (event instanceof NavigationStart) {
  //       browserRefresh = !router.navigated;
  //       if(browserRefresh==true){
  //            sessionStorage.clear();
  //            setTimeout(() => {
  //             this.router.navigate(['/mainPage']);
  //             }, 500);
  //          }
  //     }
  //   });
  // }

  
  }
  //******************************** user event track functionality**************************/ 
  // @HostListener('document:mousemove')
  // @HostListener('document:keypress')
  // @HostListener('document:click')
  // @HostListener('document:wheel') 
  // resetTimer() {
  //   if(sessionStorage.getItem("authTeacherDetails") != null && JSON.parse(sessionStorage.getItem("authTeacherDetails")).status != 0){
  //   clearTimeout(this.time);
  //   this.time = setTimeout(() => {
  //   if(sessionStorage.getItem("loginType")=="jwt"){
  //     this.router.navigate(['/mainPage']);
  //   }else if(sessionStorage.getItem("loginType")=="auth"){
  //   window.location.href=this.logoutLink;
  //   }
  //  sessionStorage.clear();
  //   }, 30000);
  //   }
  // }
  ngOnDestroy() {
  //  this.subscription.unsubscribe();
  }
  //******************************** refresh token functionality**************************/ 
 

}
