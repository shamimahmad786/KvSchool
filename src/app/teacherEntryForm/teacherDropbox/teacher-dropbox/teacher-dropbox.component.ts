import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/internalService/data-service';
// import { DataService } from '../service/internalService/data-service';

@Component({
  selector: 'app-teacher-dropbox',
  templateUrl: './teacher-dropbox.component.html',
  styleUrls: ['./teacher-dropbox.component.css']
})
export class TeacherDropboxComponent implements OnInit {

  constructor(private getDataService: DataService ) { }

  ngOnInit(): void {
    this.getDataService.getDeletedData.subscribe((response)=>{
    })
  }

}
