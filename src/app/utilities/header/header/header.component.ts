import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logoutLink = environment.LOGOUT_URL

  constructor(private router: Router) { }

  public ngOnInit(): void {

    // alert("called");

    


    $(document).ready(function(){
      $(".dropdown").mouseenter(function(){
        $(".dropdown-menu").show(500);
      });
      $(".dropdown").mouseleave(function(){
        $(".dropdown-menu").hide(500);
      });
    });
  }

  authlogout(){
    

    

    if(sessionStorage.getItem("loginType")=="jwt"){
      // alert("in if");
      // this.logoutLink=environment.LANDING_PAGE_URL
      this.router.navigate(['/mainPage']);
}else if(sessionStorage.getItem("loginType")=="auth"){
  // alert("in else");
  window.location.href=this.logoutLink;
}
sessionStorage.clear();
  }

  

}
