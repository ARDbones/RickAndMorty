import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  favouritesIdList : number[] = [];
  private favSubject = new BehaviorSubject<any>([]);

  constructor() {
    console.log('costruito servizio')
  }

  public getFavouritesState() {
    return this.favSubject.asObservable();
  }

  addFavourite(id : number){
    this.favouritesIdList.push(id)
    this.favSubject.next(this.favouritesIdList);
  }

  removeFavourite(id : number){
    const index = this.favouritesIdList.indexOf(id);
    this.favouritesIdList.splice(index,1);
    this.favSubject.next(this.favouritesIdList);
  }
}