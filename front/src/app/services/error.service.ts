import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  //Objektas kuriam perduosime informaciją apie klaida (komponentai išsiųs, o subscriberiai pasiims)
  public errorEmitter=new EventEmitter<String>();
  constructor() { }
}
