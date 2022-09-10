import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject : Subject<number> = new Subject<number>();

  constructor() { }

  getCharacterId() : Observable<number> {
    return this.modalSubject.asObservable();
  }

  setCharacterId(characterId : number) : void {
    this.modalSubject.next(characterId);
  }

  openModal(id : string) : void {
    let modal : HTMLElement | null = document.getElementById(id);
    modal?.classList.add('open');
  }

  closeModal(id : string) : void {
    let modal : HTMLElement | null = document.getElementById(id);
    modal?.classList.remove('open');
  }
}