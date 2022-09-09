import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }

  openModal(id : string) : void {
    let modal = document.getElementById(id);
    modal?.classList.add('open');
  }

  closeModal(id : string) : void {
    let modal = document.getElementById(id);
    modal?.classList.remove('open');
  }
}