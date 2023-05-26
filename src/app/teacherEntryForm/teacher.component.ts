import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  title = 'teacherNew';

  ngOnInit(): void {
    $(document).ready(function () {

      $(".side-toggler").on('click', function () {
  
          if($('.main-wrapper').hasClass('side-toggled')){
              $('.main-wrapper').removeClass('side-toggled')
           }else{
             $('.main-wrapper').addClass('side-toggled')
           }
      });
  
  });
  }

}