import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public getData = new BehaviorSubject('Title');
  public getDeletedData = new BehaviorSubject('Title');

  setData(apiData) {
    this.getData.next(apiData);
  }

  setDeletedData(deletedData){
    this.getDeletedData.next(deletedData)
  }

}