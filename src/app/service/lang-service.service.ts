import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangServiceService {

  constructor() { }

  selectedLang = new BehaviorSubject('en')


}
